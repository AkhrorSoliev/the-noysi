import { useGlobalContext } from "../hooks/useGlobalContext";
import { MdOutlinePhotoCamera, MdDoneOutline } from "react-icons/md";
import { Button, FormInput } from "../components";
import { useRef, useState } from "react";
import { useUpdateUser } from "../hooks/updateProfile";
import toast from "react-hot-toast";

function Profile() {
  const {
    user: { displayName, email, photoURL, emailVerified },
  } = useGlobalContext();

  const { updateUserProfile, isPending } = useUpdateUser();
  const fileInputRef = useRef();
  const formRef = useRef();
  const [profileImage, setProfileImage] = useState(photoURL);
  const [userEmail, setUserEmail] = useState(email);
  const [userDisplayName, setUserDisplayName] = useState(displayName);

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

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      userEmail === email ||
      userDisplayName === displayName ||
      photoURL == profileImage
    ) {
      toast.error("No changes made");
      return;
    } else {
      await updateUserProfile(userDisplayName, formRef.current, userEmail);
    }
  };

  return (
    <form ref={formRef} onSubmit={handleSubmit} className="mt-16">
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
          onChange={(e) => setUserDisplayName(e.target.value)}
          label="Name"
          type="search"
          value={userDisplayName}
        />
        <FormInput
          onChange={(e) => setUserEmail(e.target.value)}
          label="Email"
          type="search"
          value={userEmail}
        />
        <div className="flex flex-col">
          <div className="label">
            <span className="label-text">Email Status</span>
          </div>
          {!emailVerified ? (
            <div className="profile-input-card">
              <p>
                Email is not verified. Please verify your email. Click button to
                send verification email.
              </p>
              <Button buttonType="button">Send</Button>
            </div>
          ) : (
            <div className="profile-input-card">
              Email is Verified
              <MdDoneOutline className="text-xl text-green-500" />
            </div>
          )}
        </div>
      </div>
      <div className="flex justify-end">
        <Button type="primary" loading={isPending}>
          Save
        </Button>
      </div>
    </form>
  );
}

export default Profile;
