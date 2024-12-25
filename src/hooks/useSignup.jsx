import { GoogleProvider, auth, db } from "../firebase/firebaseConfig";

export function useSignup() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isCancelled, setIsCancelled] = useState(false);

  const signup = async (email, password, displayName) => {
    setIsLoading(true);
    setError(null);
    try {
      // signup
      const res = await createUserWithEmailAndPassword(auth, email, password);
      // update profile
      await updateProfile(auth.currentUser, { displayName });
      // create user document
      await setDoc(doc(db, "users", res.user.uid), {
        online: true,
        displayName,
      });

      setIsLoading(false);
      setError(null);
      return res;
    } catch (err) {
      if (!isCancelled) {
        setError(err.message);
        setIsLoading(false);
      }
      return null;
    }
  };

  return { signup, isLoading, error };
}
