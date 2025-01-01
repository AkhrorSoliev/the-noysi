import toast from "react-hot-toast";
import { auth, db } from "../firebase/firebaseConfig";
import { useGlobalContext } from "./useGlobalContext";
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { useEffect, useState } from "react";
import { doc, setDoc, Timestamp } from "firebase/firestore";

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

      const displayName = res.user.displayName;
      const coverURL = `https://api.dicebear.com/9.x/glass/svg?seed=${displayName}`;

      await setDoc(doc(db, "users", res.user.uid), {
        online: true,
        displayName: res.user.displayName,
        photoURL: res.user.photoURL,
        coverURL,
        email: res.user.email,
        emailVerified: res.user.emailVerified,
        createdAt: Timestamp.fromMillis(parseInt(res.user.metadata.createdAt)),
      });

      if (!isCancelled) {
        setIsPending(false);
        dispatch({ type: "LOGIN", payload: res.user });
      }
    } catch (err) {
      console.error("Error saving user to Firestore:", err);
      toast.error(err.message);
      setIsPending(false);
    }
  };

  useEffect(() => {
    return () => setIsCancelled(true);
  }, []);

  return { withGoogle, isPending };
}
