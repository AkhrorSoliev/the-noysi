import { sendEmailVerification } from "firebase/auth";
import { auth } from "../firebase/firebaseConfig";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

export function useVerifyEmail() {
  const [isPending, setIsPending] = useState(false);
  const [isCancelled, setIsCancelled] = useState(false);

  const verifyEmail = async () => {
    setIsPending(true);
    try {
      await sendEmailVerification(auth.currentUser, {
        url: "http://localhost:5173/profile",
      });
      toast.success("Email sent successfully");
    } catch (error) {
      if (!isCancelled) {
        toast.error(error.message);
      }
    } finally {
      setIsPending(false);
    }
  };

  useEffect(() => {
    return () => setIsCancelled(true);
  }, []);

  return { verifyEmail, isPending };
}
