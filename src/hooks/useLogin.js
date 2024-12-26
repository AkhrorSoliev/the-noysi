import { signInWithEmailAndPassword } from "firebase/auth";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useGlobalContext } from "./useGlobalContext";
import { auth, db } from "../firebase/firebaseConfig";
import { doc, updateDoc } from "firebase/firestore";

export function useLogin() {
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState(null);
  const [isCancelled, setIsCancelled] = useState(false);
  const { dispatch } = useGlobalContext();

  const login = async (email, password) => {
    setIsPending(true);
    setError(null);

    try {
      const res = await signInWithEmailAndPassword(auth, email, password);

      await updateDoc(doc(db, "users", auth.currentUser.uid), {
        online: true,
      });

      if (!res) {
        throw new Error("Could not complete login");
      }

      if (!isCancelled) {
        setIsPending(false);
        setError(null);
      }
      dispatch({ type: "LOGIN", payload: res.user });
      toast.success(`Welcome back! ${res.user.displayName}`);
    } catch (err) {
      if (!isCancelled) {
        setError(err.message);
        setIsPending(false);
      }
      toast.error("Could not log you in");
    }
  };

  useEffect(() => {
    return () => setIsCancelled(true);
  }, []);

  return { login, isPending, error };
}
