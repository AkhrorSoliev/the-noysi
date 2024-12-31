import toast from "react-hot-toast";
import { useGlobalContext } from "../hooks/useGlobalContext";
import { MdOutlinePhotoCamera, MdDoneOutline } from "react-icons/md";
import { Button, FormInput } from "../components";
import { useEffect, useRef, useState } from "react";
import { useUpdateUser } from "../hooks/updateProfile";
import { Form, useActionData } from "react-router-dom";
import { useVerifyEmail } from "../hooks/useVerifyEmail";

export async function action({ request }) {
  const formData = await request.formData();
  const displayName = formData.get("displayName");
  const email = formData.get("email");
  return { displayName, email };
}

function Profile() {
  const profileActionData = useActionData();
  const {
    user: { displayName, email, photoURL, emailVerified },
  } = useGlobalContext();

  const { updateUserProfile, isPending } = useUpdateUser();
  const { verifyEmail, isPending: _isPending } = useVerifyEmail();
  const [profileImage, setProfileImage] = useState(photoURL);

  const fileInputRef = useRef();
  const formRef = useRef();

  const handleImage = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (event) => {
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
      profileImage == photoURL
        ? updateUserProfile(profileActionData.displayName, false)
        : updateUserProfile(profileActionData.displayName, formRef.current);
      formRef.current.reset();
    }
  }, [profileActionData]);

  return (
    <Form method="post" ref={formRef} className="mt-16">
      <h1 className="mb-10 text-center text-3xl font-semibold capitalize">
        Profile Settings
      </h1>

      <div className="flex flex-col items-center">
        <figure
          className="group relative cursor-pointer overflow-hidden"
          title="Click to change profile picture"
        >
          <img
            className="mb-4 h-[200px] w-[200px] rounded-full object-cover"
            src={profileImage}
            alt=""
          />
          <span
            onClick={handleImage}
            className="backgorund-opacity-50 invisible absolute bottom-4 left-0 flex h-[100px] w-full items-center justify-center rounded-b-full bg-black bg-opacity-30 opacity-0 transition duration-300 group-hover:visible group-hover:opacity-100"
          >
            <MdOutlinePhotoCamera className="text-4xl text-white" />
          </span>
        </figure>
        <input
          ref={fileInputRef}
          onChange={handleFileChange}
          type="file"
          className="hidden"
          accept=".png, .jpg, .jpeg"
          name="file"
        />
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
