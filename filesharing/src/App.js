import "./App.css";
import DropZone from "./DropZone";
import Comment from "./Comment";
import PopupForm from "./PopupForm";
import { db, useDB } from "./db";
import React, { useState } from "react";
import firebase from "firebase";

function App() {
  const fileID = "1bdpMnF3D9iTsMjtAX62";
  const comments = useDB(fileID);
  const [file, setFile] = useState(undefined);

  React.useEffect(() => {
    const unsubscribe = firebase
      .firestore()
      .collection("Files")
      .onSnapshot((snapshot) => {
        const data = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setFile(data[0].url);
      });
  }, []);

  return (
    <div className="App">
      <h1>Quick File Sharing</h1>
      <DropZone file={file} />
      <h2>Comments</h2>
      <main className="comments">
        {comments.map((comment, i) => {
          return <Comment key={i} comment={comment.comment} />;
        })}
      </main>
      <PopupForm
        send={(t) => db.send({ comment: t, date: new Date(), fileID: fileID })}
      />
    </div>
  );
}

export default App;
