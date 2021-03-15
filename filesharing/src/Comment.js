import React from "react";
import "./Comment.css";

function Comment(props) {
  return (
    <div className="comment-row">
      <div className="comment">{props.comment}</div>
    </div>
  );
}

export default Comment;
