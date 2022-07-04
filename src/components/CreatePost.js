import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { db, storage } from "../firebase-config";
import { collection, addDoc, Timestamp } from "firebase/firestore";
import {
  getDownloadURL,
  ref,
  uploadBytes,
  uploadBytesResumable,
} from "firebase/storage";
import postModalImage from "../images/post-modal.svg";
import { useContext } from "react";
import UserContext from "../userContext";

const CreatePost = ({ setPostModalOpen }) => {
  const [image, setImage] = useState();
  const [preview, setPreview] = useState();
  const [caption, setCaption] = useState();
  const [uploadProgress, setUploadProgress] = useState();
  const [uploadStatus, setUploadStatus] = useState();
  const postRef = collection(db, "posts");
  const { user } = useContext(UserContext);

  useEffect(() => {
    if (image) {
      const reader = new FileReader();
      reader.readAsDataURL(image);
      reader.onloadend = () => {
        setPreview(reader.result);
      };
    } else {
      setPreview(null);
    }
  }, [image]);

  const handlePostUpload = () => {
    const imageRef = ref(storage, `images/${image.name}`);
    const uploadTask = uploadBytesResumable(imageRef, image);
    console.log(image);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress = (
          (snapshot.bytesTransferred / snapshot.totalBytes) *
          100
        ).toFixed(0);
        setUploadProgress(progress);
        setUploadStatus(true);
        console.log(progress);
      },
      (err) => {
        console.log(err);
      },
      () => {
        setUploadProgress(false);
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          console.log(downloadURL, "-> image URL");
          let newPost = {
            caption: caption ? caption : "No caption....",
            userName: user.displayName,
            imageUrl: downloadURL,
            createdAt: Timestamp.now().seconds,
          };
          console.log(newPost);
          addDoc(postRef, newPost)
            .then((res) => {
              setCaption("");
              setPreview("");
              setUploadStatus();
            })
            .then(() => {
              setPostModalOpen(false);
            })
            .catch((err) => console.log(err));
        });
      }
    );
  };

  return (
    <div className="modal is-active create-post">
      <div className="modal-background">
        <button
          className="button is-pulled-right is-dark has-background-transparent is-small"
          onClick={() => {
            setPostModalOpen(false);
          }}
        >
          <i className="fas fa-times"></i>
        </button>
      </div>
      <div className="modal-card">
        <header className="modal-card-head has-background-white has-padding-10 ">
          <p className="modal-card-title title has-text-centered is-size-6">
            <small>Create New Post</small>
          </p>
        </header>
        <section className="modal-card-body">
          {uploadStatus && (
            <progress
              className="progress is-info"
              value={uploadProgress}
              max="100"
            ></progress>
          )}
          {preview ? (
            <div>
              <div className="image is-1by1">
                <img src={preview} alt="" />
              </div>
              <div className="field has-margin-top-30">
                <input
                  className="input is-small"
                  type="text"
                  placeholder="Upload a Caption"
                  onChange={(e) => {
                    setCaption(e.target.value);
                  }}
                />
              </div>
            </div>
          ) : (
            <div
              className="is-flex is-flex-direction-column is-align-items-center is-justify-content-center"
              style={{ height: "100%" }}
            >
              <img src={postModalImage} alt="" />
              <input
                type="file"
                id="file-input"
                className="is-hidden"
                onChange={(e) => {
                  setImage(e.target.files[0]);
                }}
              />
              <h5 className="title is-5 has-margin-top-20 has-margin-bottom-20">
                Drag your Photos Here
              </h5>
              <button
                className="button is-info is-small"
                onClick={() => {
                  document.getElementById("file-input").click();
                }}
              >
                <b>Select From Computer</b>
              </button>
            </div>
          )}
        </section>
        {preview && (
          <footer className="modal-card-foot has-padding-10 has-background-white">
            <button
              className="button is-info is-small"
              onClick={handlePostUpload}
              disabled={uploadProgress}
            >
              Post
            </button>
            <button
              className="button is-small"
              onClick={() => {
                setPostModalOpen(false);
              }}
            >
              Cancel
            </button>
          </footer>
        )}
      </div>
    </div>
  );
};

export default CreatePost;
