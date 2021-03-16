import React, { useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import "./DropZone.css";
import { uploadFile } from "./db";

function DropZone(props) {
  const [files, setFiles] = useState([]);

  const { getRootProps, getInputProps } = useDropzone({
    maxFiles: 1,
    onDrop: (acceptedFiles) => {
      uploadFile(acceptedFiles[0]);
      setFiles(
        acceptedFiles.map((file) =>
          Object.assign(file, {
            preview: URL.createObjectURL(file),
          })
        )
      );
    },
  });

  function thumb() {
    if (files.length > 0) {
      // skip
    } else if (props.file) {
      return (
        <div className="thumb">
          <div className="thumbInner">
            <iframe src={props.file} className="file" title="Preview" />
          </div>
        </div>
      );
    } else {
      return <div></div>;
    }
  }

  const thumbs = files.map((file) => (
    <div className="thumb" key={file.name}>
      <div className="thumbInner">
        <iframe src={file.preview} className="file" title="Preview" />
      </div>
    </div>
  ));

  useEffect(
    () => () => {
      // Make sure to revoke the data uris to avoid memory leaks
      files.forEach((file) => URL.revokeObjectURL(file.preview));
    },
    [files]
  );

  return (
    <section className="container">
      <div {...getRootProps({ className: "dropzone" })}>
        <input {...getInputProps()} />
        <p>DROP or SELECT a single file here</p>
      </div>
      <div className="thumbsContainer">
        {thumb()}
        {thumbs}
      </div>
    </section>
  );
}

export default DropZone;
