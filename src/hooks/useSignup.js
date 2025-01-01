import { useState, useEffect } from "react";
import { auth, db } from "../firebase/firebaseConfig";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { useGlobalContext } from "./useGlobalContext";
import { create } from "motion/react-client";

export function useSignup() {
  const { dispatch } = useGlobalContext();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isCancelled, setIsCancelled] = useState(false);

  const signup = async (email, password, displayName) => {
    setIsLoading(true);
    setError(null);
    try {
      const res = await createUserWithEmailAndPassword(auth, email, password);

      if (!res) {
        throw new Error("Could not complete signup");
      }

      const photoURL = `https://api.dicebear.com/6.x/initials/svg?seed=${displayName}`;

      await updateProfile(auth.currentUser, {
        displayName,
        photoURL,
      });

      const coverURL = `https://api.dicebear.com/9.x/glass/svg?seed=${displayName}`;

      await setDoc(doc(db, "users", res.user.uid), {
        online: true,
        displayName: res.user.displayName,
        photoURL: res.user.photoURL,
        coverURL,
        email: res.user.email,
        emailVerified: res.user.emailVerified,
        createdAt: res.user.metadata.createdAt,
      });

      if (!isCancelled) {
        dispatch({ type: "LOGIN", payload: res.user });
        setIsPending(false);
        setError(null);
      }
    } catch (err) {
      if (!isCancelled) {
        setError(err.message);
        setIsLoading(false);
      }
    }
  };
  useEffect(() => {
    return () => setIsCancelled(true);
  }, []);

  return { signup, isLoading, error };
}
