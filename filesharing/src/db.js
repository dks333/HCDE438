import { useState, useEffect } from "react";
import firebase from "firebase";
import "firebase/firestore";
import "firebase/storage";

let store;
var storage;
const commentCollection = "Comments";

function useDB(fileID) {
  const [comments, setComments] = useState([]);

  function add(t) {
    setComments((current) => {
      const cmts = [t, ...current];
      cmts.sort(
        (a, b) => (b.date && b.date.seconds) - (a.date && a.date.seconds)
      );
      return cmts;
    });
  }
  function remove(id) {
    setComments((current) => current.filter((cmt) => cmt.id !== id));
  }

  useEffect(() => {
    const collection = fileID
      ? store.collection(commentCollection).where("fileID", "==", fileID)
      : store.collection(commentCollection);
    collection.onSnapshot((snap) =>
      snap.docChanges().forEach((c) => {
        const { doc, type } = c;
        if (type === "added") add({ ...doc.data(), id: doc.id });
        if (type === "removed") remove(doc.id);
      })
    );
  }, [fileID]);
  return comments;
}

function uploadFile(file) {
  let docID = "1bdpMnF3D9iTsMjtAX62";
  let ref = storage.ref(file.name);
  let docRef = store.collection("Files").doc(docID);

  ref.put(file).then((snapshot) => {
    console.log("Uploaded a blob or file!");
    // get downloadable url
    ref.getDownloadURL().then((downloadURL) => {
      // upload to firestore
      return docRef
        .update({
          url: downloadURL,
        })
        .then(() => {
          console.log("Document successfully written!");
        })
        .catch((error) => {
          console.error("Error writing document: ", error);
        });
    });
  });
}

const db = {};
db.send = function (comment) {
  return store.collection(commentCollection).add(comment);
};
db.delete = function (id) {
  return store.collection(commentCollection).doc(id).delete();
};

export { db, useDB, uploadFile };

const firebaseConfig = {
  apiKey: "AIzaSyCRjaNmyuAFsQJe1yFxLgw-JaiydNA8XIc",
  authDomain: "filesharing-b289e.firebaseapp.com",
  projectId: "filesharing-b289e",
  storageBucket: "filesharing-b289e.appspot.com",
  messagingSenderId: "855586958193",
  appId: "1:855586958193:web:2d51a64262d88fd32ae4d0",
  measurementId: "G-BVRTQ33T13",
};

firebase.initializeApp(firebaseConfig);
store = firebase.firestore();
storage = firebase.storage();
