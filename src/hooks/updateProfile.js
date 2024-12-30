import { useEffect, useState } from "react";
import { updateProfile, updateEmail } from "firebase/auth";
import { useGlobalContext } from "./useGlobalContext";
import { auth } from "../firebase/firebaseConfig";
import axios from "axios";
import toast from "react-hot-toast";

const imageBase = "https://json-api.uz/api/project/images-api/upload";

export function useUpdateUser() {
  const { user } = useGlobalContext();
  const [isCancelled, setIsCancelled] = useState(false);
  const [isPending, setIsPending] = useState(false);

  const updateUserProfile = async (
    displayName = false,
    imageForm = false,
    email = false,
  ) => {
    setIsPending(true);
    const updateData = {};
    try {
      if (imageForm) {
        const formData = new FormData(imageForm);
        const res = await axios.post(imageBase, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
        updateData.photoURL = res.data;
      }

      if (displayName) updateData.displayName = displayName;

      if (email) {
        await updateEmail(auth.currentUser, email);
      }

      if (Object.keys(updateData).length > 0) {
        await updateProfile(user, updateData);
      }

      if (!isCancelled) {
        setIsPending(false);
        toast.success("Profile updated successfully");
      }
    } catch (error) {
      console.error("Profile update error:", error.message);
      if (!isCancelled) {
        setIsPending(false);
      }
    }
  };

  useEffect(() => {
    return () => setIsCancelled(true);
  }, []);

  return { updateUserProfile, isPending };
}
