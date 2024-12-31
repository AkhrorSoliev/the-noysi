import { useEffect, useState } from "react";
import { updateProfile, updateEmail } from "firebase/auth";
import { useGlobalContext } from "./useGlobalContext";
import { auth } from "../firebase/firebaseConfig";
import axios from "axios";
import toast from "react-hot-toast";
import { useFirestore } from "./useFirestore";

const imageBase = "https://json-api.uz/api/project/images-api/upload";

export function useUpdateUser() {
  const { updateDocument, response } = useFirestore("users");
  const { user, dispatch } = useGlobalContext();
  const [isCancelled, setIsCancelled] = useState(false);
  const [isPending, setIsPending] = useState(false);

  const updateUserProfile = async (displayName = false, imageForm = false) => {
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

      if (displayName && user.displayName !== displayName) {
        updateData.displayName = displayName;
      }

      if (Object.keys(updateData).length > 0 && !isCancelled) {
        await updateProfile(auth.currentUser, updateData);
        await updateDocument(user.uid, {
          id: auth.currentUser.uid,
          displayName: auth.currentUser.displayName,
          photoURL: auth.currentUser.photoURL,
          online: true,
        });
        dispatch({ type: "LOGIN", payload: { ...user, ...updateData } });
        toast.success("Profile updated successfully");
      } else {
        toast.error("No changes to update");
      }
    } catch (error) {
      console.error("Profile update error:", error.message);
      toast.error(error.message);
    } finally {
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
