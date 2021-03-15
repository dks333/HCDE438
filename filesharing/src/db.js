import { useState, useEffect } from "react";
import firebase from "firebase";
import "firebase/firestore";
import "firebase/storage";

let store;
const coll = "Files";

function useDB(room) {
  const [messages, setMessages] = useState([]);

  function add(m) {
    setMessages((current) => {
      const msgs = [m, ...current];
      msgs.sort(
        (a, b) => (b.date && b.date.seconds) - (a.date && a.date.seconds)
      );
      return msgs;
    });
  }
  function remove(id) {
    setMessages((current) => current.filter((m) => m.id !== id));
  }

  useEffect(() => {
    const collection = room
      ? store.collection(coll).where("room", "==", room)
      : store.collection(coll);

    collection.onSnapshot((snap) =>
      snap.docChanges().forEach((c) => {
        const { doc, type } = c;
        if (type === "added") add({ ...doc.data(), id: doc.id });
        if (type === "removed") remove(doc.id);
      })
    );
  }, [room]);
  return messages;
}

const db = {};
db.send = function (msg) {
  return store.collection(coll).add(msg);
};
db.delete = function (id) {
  return store.collection(coll).doc(id).delete();
};

export { db, useDB };

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
