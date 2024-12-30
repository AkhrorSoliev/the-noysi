import { useGlobalContext } from "../hooks/useGlobalContext";
import { MdOutlinePhotoCamera, MdDoneOutline } from "react-icons/md";
import { Button, FormInput } from "../components";

function Profile() {
  const {
    user: { displayName, email, photoURL, emailVerified, providerId },
  } = useGlobalContext();

  return (
    <div className="mt-16">
      <h1 className="mb-10 text-center text-3xl font-semibold capitalize">
        Profile Settings
      </h1>

      <div className="flex flex-col items-center">
        <figure className="group relative cursor-pointer overflow-hidden">
          <img
            className="mb-4 rounded-full"
            src={photoURL}
            alt=""
            width={200}
          />
          <span className="backgorund-opacity-50 invisible absolute bottom-4 left-0 flex h-[100px] w-full items-center justify-center rounded-b-full bg-black bg-opacity-30 opacity-0 transition duration-300 group-hover:visible group-hover:opacity-100">
            <MdOutlinePhotoCamera className="text-4xl text-white" />
          </span>
        </figure>
      </div>
      <div className="mb-10 grid w-full grid-cols-2 items-end gap-5">
        <FormInput label="Name" type="text" value={displayName} />
        <FormInput label="Email" type="text" value={email} />
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
              <Button>Send</Button>
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
        <Button type="primary">Save</Button>
      </div>
    </div>
  );
}

export default Profile;
