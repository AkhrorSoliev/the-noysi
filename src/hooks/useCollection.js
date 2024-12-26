import { useState, useEffect, useRef } from "react";
import { onSnapshot, query, collection, where } from "firebase/firestore";
import { db } from "../firebase/firebaseConfig";

export function useCollection(collectionName, _q, _w) {
  const [document, setDocument] = useState([]);

  const q = useRef(_q).current;
  const w = useRef(_w).current;

  useEffect(() => {
    let ref = collection(db, collectionName);

    if (q) {
      ref = query(ref, where(...w), query(...q));
    }

    const unsubscribe = onSnapshot(ref, (snapshots) => {
      const documents = snapshots.docs.map((doc) => {
        return { id: doc.id, ...doc.data() };
      });
      setDocument(documents);
    });

    return unsubscribe;
  }, [collectionName, q, w]);

  return { document };
}
