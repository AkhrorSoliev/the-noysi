import { useEffect, useState } from "react";
import { auth } from "../firebase/firebaseConfig";
import { signOut } from "firebase/auth";
import { updateDoc, doc } from "firebase/firestore";
import { db } from "../firebase/firebaseConfig";

import toast from "react-hot-toast";

export function useLogout() {
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState(null);
  const [isCancelled, setIsCancelled] = useState(false);

  const logout = async () => {
    setIsPending(true);
    setError(null);

    try {
      await updateDoc(doc(db, "users", auth.currentUser.uid), {
        online: false,
      });

      await signOut(auth);
      toast.success("You have been signed out");
      if (!isCancelled) {
        setIsPending(false);
        setError(null);
      }
    } catch (err) {
      if (!isCancelled) {
        setError(err.message);
        setIsPending(false);
      }
      toast.error("Could not sign you out");
    }
  };

  useEffect(() => {
    return () => setIsCancelled(true);
  }, []);

  return { logout, isPending, error };
}
