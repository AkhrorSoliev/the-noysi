import toast from "react-hot-toast";
import { auth, db } from "../firebase/firebaseConfig";
import { useGlobalContext } from "./useGlobalContext";
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { useEffect, useState } from "react";
import { doc, setDoc } from "firebase/firestore";

export function useGoogle() {
  const [isCancelled, setIsCancelled] = useState(false);
  const [isPending, setIsPending] = useState(false);
  const { dispatch } = useGlobalContext();

  const withGoogle = async () => {
    const provider = new GoogleAuthProvider();
    setIsPending(true);
    try {
      const res = await signInWithPopup(auth, provider);
      if (!res) {
        throw new Error("Could not complete signup");
      }

      await setDoc(doc(db, "users", auth.currentUser.uid), {
        online: true,
        displayName: auth.currentUser.displayName,
        photoURL: auth.currentUser.photoURL,
      });
      if (!isCancelled) {
        setIsPending(false);
        dispatch({ type: "LOGIN", payload: res.user });
      }
    } catch (err) {
      toast.success(err.message);
      setIsPending(false);
    }
  };

  useEffect(() => {
    return () => setIsCancelled(true);
  }, []);

  return { withGoogle, isPending };
}
