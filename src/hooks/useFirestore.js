import { useReducer } from "react";
import {
  addDoc,
  collection,
  updateDoc,
  doc,
  deleteDoc,
} from "firebase/firestore";
import { timestamp, db, storage } from "../firebase/config";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";

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
    case "UPDATED_DOCUMENT":
      return {
        isPending: false,
        document: action.payload,
        success: true,
        error: null,
      };
    case "DELETED_DOCUMENT":
      return { isPending: false, document: null, success: true, error: null };
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

export const useFirestore = (clctn) => {
  const [response, dispatch] = useReducer(firestoreReducer, initialState);

  // collection ref
  const reference = collection(db, clctn);

  // add a document
  const addDocument = async (doc, img = null) => {
    dispatch({ type: "IS_PENDING" });

    try {
      const createdAt = timestamp.fromDate(new Date());
      const addedDocument = await addDoc(reference, { ...doc, createdAt });
      if (img) {
        const uploadPath = `img/${doc.name}/${img.name}`;
        const imgRef = ref(storage, uploadPath);
        await uploadBytes(imgRef, img);
        const imgURL = await getDownloadURL(imgRef);

        await updateDocument(addedDocument.id, { imgURL });
      }
      dispatch({ type: "ADDED_DOCUMENT", payload: addedDocument });
      return addedDocument.id
    } catch (err) {
      dispatch({ type: "ERROR", payload: err.message });
    }
  };

  const updateDocument = async (id, updates, img = null) => {
    dispatch({ type: "IS_PENDING" });

    try {
      if (img) {
        const uploadPath = `img/${updates.name}/${img.name}`;
        const imgRef = ref(storage, uploadPath);
        await uploadBytes(imgRef, img);
        const imgURL = await getDownloadURL(imgRef);

        updates = await { ...updates, imgURL };
      }
      const updatedDocument = await updateDoc(doc(db, clctn, id), updates);
      dispatch({ type: "UPDATED_DOCUMENT", payload: updatedDocument });
      return updatedDocument;
    } catch (err) {
      dispatch({ type: "ERROR", payload: err.message });
      return null;
    }
  };

  // delete a document
  const deleteDocument = async (id) => {
    dispatch({ type: "IS_PENDING" });

    try {
      await deleteDoc(doc(db, clctn, id));
      dispatch({ type: "DELETED_DOCUMENT" });
    } catch (err) {
      dispatch({ type: "ERROR", payload: "could not delete" });
    }
  };

  return { addDocument, deleteDocument, updateDocument, response };
};
