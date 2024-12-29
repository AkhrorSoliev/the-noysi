import { useState, useEffect } from "react";
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "../firebase/firebaseConfig";

export function useDocument(collectionName, id) {
  const [document, setDocument] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const unsub = onSnapshot(doc(db, collectionName, id), (doc) => {
      if (doc.data()) {
        setDocument({ ...doc.data(), id: doc.id });
        setError(null);
      } else {
        setError("No such document exists");
      }
    });

    return () => unsub();
  }, [collectionName, id]);

  return { document, error };
}
