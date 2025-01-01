import toast from "react-hot-toast";
import { MdOutlinePhotoCamera, MdDoneOutline } from "react-icons/md";
import { Button, FormInput } from "../components";
import { useEffect, useRef, useState } from "react";
import { useUpdateUser } from "../hooks/updateProfile";
import { Form, useActionData } from "react-router-dom";
import { useVerifyEmail } from "../hooks/useVerifyEmail";
import BackImg from "../assets/back.jpg";
import { useDocument } from "../hooks/useDocument";
import { useGlobalContext } from "../hooks/useGlobalContext";
import { base } from "motion/react-client";

export async function action({ request }) {
  const formData = await request.formData();
  const displayName = formData.get("displayName");
  const email = formData.get("email");
  return { displayName, email };
}

function Profile() {
  const profileActionData = useActionData();
  const { user } = useGlobalContext();
  const { document } = useDocument("users", user.uid);

  const { updateUserProfile, isPending } = useUpdateUser();
  const { verifyEmail, isPending: _isPending } = useVerifyEmail();
  const [profileImage, setProfileImage] = useState(null);
  const [coverImage, setCoverImage] = useState(null);
  const fileAvatarInputRef = useRef();
  const fileCoverInputRef = useRef();

  const hanldeAvatar = () => {
    fileAvatarInputRef.current.click();
  };

  const hanldeCover = () => {
    fileCoverInputRef.current.click();
  };

  // check size
  const handleCoverImage = (event) => {
    const file = event.target.files[0];
    if (file.size / 1024 ** 2 <= 5) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const base64Data = e.target.result;
        setCoverImage(base64Data);
      };
      reader.readAsDataURL(file);
    } else {
      toast.error("Image size should be less than 5MB");
    }
  };

  // check size
  const handleAvatarChange = (event) => {
    const file = event.target.files[0];
    if (file.size / 1024 ** 2 <= 5) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const base64Data = e.target.result;
        setProfileImage(base64Data);
      };
      reader.readAsDataURL(file);
    } else {
      toast.error("Image size should be less than 5MB");
    }
  };

  useEffect(() => {
    if (profileActionData) {
      updateUserProfile(
        profileActionData.displayName,
        fileAvatarInputRef.current?.files[0],
        fileCoverInputRef.current?.files[0],
      );
      fileAvatarInputRef.current.value = null;
      fileCoverInputRef.current.value = null;
    }
  }, [profileActionData]);

  useEffect(() => {
    if (document) {
      setProfileImage(document.photoURL);
      setCoverImage(document.coverURL);
    }
  }, [document]);

  if (!document) {
    return <div className="loading">Loading...</div>;
  }

  const {
    displayName,
    emailVerified,
    email,
    coverURL,
    photoURL,
    createdAt,
    online,
  } = document;

  return (
    <Form method="post" className="mt-16">
      <h1 className="mb-10 text-center text-3xl font-semibold capitalize">
        Profile Settings
      </h1>

      <div>
        <div
          className="relative h-56 w-full rounded-xl bg-cover bg-center bg-no-repeat shadow-2xl shadow-neutral"
          style={{
            backgroundImage: `url(${coverImage || coverURL})`,
          }}
        >
          <span
            onClick={hanldeCover}
            className="absolute right-5 top-5 cursor-pointer rounded-full bg-white p-2 text-black shadow-2xl shadow-neutral"
          >
            <MdOutlinePhotoCamera className="h-7 w-7" />
          </span>
          <input
            ref={fileCoverInputRef}
            onChange={handleCoverImage}
            type="file"
            className="hidden"
            accept=".png, .jpg, .jpeg"
            name="file1"
          />
        </div>
        <div className="mt-[-100px] flex flex-col items-center">
          <figure
            className="group relative cursor-pointer"
            title="Click to change profile picture"
          >
            {/* Wrapper with shadow and border-radius */}
            <div className="relative h-[200px] w-[200px] overflow-hidden rounded-full">
              {/* Profile Image */}
              <img
                className="h-full w-full object-cover"
                src={profileImage || photoURL}
                alt="User profile picture"
              />
              {/* Hover effect */}
              <span
                onClick={hanldeAvatar}
                className="invisible absolute bottom-0 left-0 flex h-full w-full items-center justify-center bg-black bg-opacity-30 opacity-0 transition duration-300 group-hover:visible group-hover:opacity-100"
              >
                <MdOutlinePhotoCamera className="text-4xl text-white" />
              </span>
            </div>
          </figure>
          <input
            ref={fileAvatarInputRef}
            onChange={handleAvatarChange}
            type="file"
            className="hidden"
            accept=".png, .jpg, .jpeg"
            name="file2"
          />
        </div>
      </div>
      <div className="mb-10 grid w-full grid-cols-2 items-end gap-5">
        <FormInput
          label="Name"
          type="search"
          val={displayName}
          name="displayName"
          required
        />

        <div className="flex flex-col">
          <div className="label">
            <span className="label-text">Email Status</span>
          </div>
          {!emailVerified ? (
            <div className="flex items-center gap-2">
              <div className="profile-input-card w-full">
                <p>{email} is not verified.</p>
              </div>
              <div>
                <Button
                  onClick={verifyEmail}
                  loading={_isPending}
                  buttonType="button"
                >
                  Send
                </Button>
              </div>
            </div>
          ) : (
            <div className="profile-input-card">
              Email is Verified
              <MdDoneOutline className="text-xl text-green-500" />
            </div>
          )}
        </div>
      </div>
      <div className="flex justify-center">
        <Button type="primary" loading={isPending}>
          Save
        </Button>
      </div>
    </Form>
  );
}

export default Profile;
