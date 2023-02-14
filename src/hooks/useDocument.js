import { useEffect, useState } from "react";
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "../firebase/config";

export const useDocument = (c, id) => {
  const [document, setDocument] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const docRef = doc(db, c, id)
    const unsubscribe = onSnapshot(docRef,
      (snapshot) => {
        if (snapshot.data()) {
          setDocument({ ...snapshot.data(), id: snapshot.id });
          setError(null);
        } else {
          setError("no such doc exists");
        }
      },
      (err) => {
        setError("failes to get document");
      }
    );

    return () => unsubscribe();
  }, [c, id]);

  return { document, error };
};
