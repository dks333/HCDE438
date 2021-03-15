import "./App.css";
import DropZone from "./DropZone";
import Comment from "./Comment";
import PopupForm from "./PopupForm";

function App() {
  const comments = ["Hello World!", "YoYo Check it out"];

  return (
    <div className="App">
      <h1>File Sharing</h1>
      <DropZone />
      <h2>Comments</h2>
      <main className="comments">
        {comments.map((comment, i) => {
          return <Comment key={i} comment={comment} />;
        })}
      </main>
      <PopupForm send={(t) => console.log(t)} />
    </div>
  );
}

export default App;
