import { addDoc, collection, updateDoc, doc } from "firebase/firestore";
import { useEffect, useReducer, useState } from "react";
import { db } from "../firebase/firebaseConfig";

let initialState = {
  document: null,
  isPending: false,
  error: null,
  success: null,
};

const firestoreReducer = (state, action) => {
  switch (action.type) {
    case "IS_PENDING":
      return { isPending: true, document: null, success: false, error: null };
    case "ADDED_DOCUMENT":
      return {
        isPending: false,
        document: action.payload,
        success: true,
        error: null,
      };
    case "DELETED_DOCUMENT":
      return {
        isPending: false,
        document: null,
        success: true,
        error: null,
      };
    case "ERROR":
      return {
        isPending: false,
        document: null,
        success: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export function useFirestore(collectionName) {
  const [response, dispatch] = useReducer(firestoreReducer, initialState);
  const [isCancelled, setIsCancelled] = useState(false);

  const ref = collection(db, collectionName);

  const dispatchIfNotCancelled = (action) => {
    if (!isCancelled) {
      dispatch(action);
    }
  };

  const addDocument = async (doc) => {
    dispatch({ type: "IS_PENDING" });
    try {
      const docRef = await addDoc(ref, doc);
      dispatchIfNotCancelled({ type: "ADDED_DOCUMENT" });
    } catch (error) {
      dispatchIfNotCancelled({ type: "ERROR" });
      return null;
    }
  };

  const updateDocument = async (id, _doc) => {
    dispatch({ type: "IS_PENDING" });

    const docRef = doc(db, collectionName, id);

    try {
      await updateDoc(docRef, _doc);
      dispatchIfNotCancelled({ type: "UPDATED_DOCUMENT" });
    } catch (error) {
      dispatchIfNotCancelled({ type: "ERROR", payload: error });
      return null;
    }
  };

  useEffect(() => {
    return () => setIsCancelled(true);
  }, []);

  return { addDocument, updateDocument, response };
}
