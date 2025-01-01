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

  const updateUserProfile = async (
    displayName = false,
    avatarImage = false,
    coverImage = false,
  ) => {
    setIsPending(true);

    const updateData = {};

    let _avatarImage;
    let _coverImage;

    try {
      if (avatarImage) {
        const formData1 = new FormData();
        formData1.append("file", avatarImage);
        const res1 = await axios.post(imageBase, formData1, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });

        updateData.photoURL = res1.data;
        _avatarImage = res1.data;
      }

      if (coverImage) {
        const formData2 = new FormData();
        formData2.append("file", coverImage);
        const res2 = await axios.post(imageBase, formData2, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
        _coverImage = res2.data;
      }

      if (displayName && user.displayName !== displayName) {
        updateData.displayName = displayName;
      }

      if (_coverImage) {
        await updateDocument(user.uid, {
          coverURL: _coverImage,
        });
      }

      if (Object.keys(updateData).length > 0 && !isCancelled) {
        await updateProfile(auth.currentUser, updateData);
        await updateDocument(user.uid, {
          displayName: auth.currentUser.displayName,
          photoURL: auth.currentUser.photoURL,
          online: true,
          email: auth.currentUser.email,
          emailVerified: auth.currentUser.emailVerified,
          createdAt: auth.currentUser.metadata.createdAt,
        });
        dispatch({ type: "LOGIN", payload: { ...user, ...updateData } });
      }

      if (_coverImage && Object.keys(updateData).length > 0 && !isCancelled) {
        toast.error("No any changes made");
      } else {
        toast.success("Profile updated successfully");
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
