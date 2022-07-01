import React, { useState, useEffect, useContext } from "react";
import {
  collection,
  query,
  orderBy,
  onSnapshot,
  addDoc,
  Timestamp,
} from "firebase/firestore";
import { db } from "../firebase-config";
import UserContext from "../userContext";
import likeIcon from "../images/likes.png";
import likedIcon from "../images/liked.svg";
import commentIcon from "../images/comment.png";
import sendIcon from "../images/send.png";
import bookmarkIcon from "../images/bookmark.png";

const Post = ({ id, data }) => {
  //comments
  const commentRef = collection(db, "posts", id, "comments");
  const commentQuery = query(commentRef, orderBy("createdAt", "desc"));
  const [comments, setComments] = useState([]);
  const [newComments, setNewComments] = useState("");
  const [commentStatus, setCommentStatus] = useState(false);
  const { user } = useContext(UserContext);

  useEffect(() => {
    if (id) {
      onSnapshot(commentQuery, (snapshot) => {
        setComments(
          snapshot.docs.map((doc) => {
            return doc.data();
          })
        );
      });
      if (newComments) {
        setCommentStatus(false);
      } else {
        setCommentStatus(true);
      }
    }
  }, [comments, newComments]);

  //likes
  const likeRef = collection(db, "posts", id, "likes");
  const likeQuery = query(likeRef);
  const [likes, setLikes] = useState([]);
  const [isLiked, setIsLiked] = useState(false);

  useEffect(() => {
    onSnapshot(likeQuery, (snapshot) => {
      setLikes(
        snapshot.docs.map((doc) => {
          if (doc.data().user === user) {
            setIsLiked(true);
          }
          return { data: doc.data(), id: doc.id };
        })
      );
    });
  }, []);

  const handleLike = () => {
    setIsLiked(true);
    let newLike = {
      user: "rishu9801",
    };
    if (!isLiked) {
      addDoc(likeRef, newLike)
        .then((res) => {
          console.log(res);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };
  const handleComment = (e) => {
    setCommentStatus(true);
    e.preventDefault();
    let newComment = {
      comment: newComments,
      userName: user,
      createdAt: Timestamp.now().seconds,
    };
    addDoc(commentRef, newComment)
      .then((res) => {
        setNewComments("");
        setCommentStatus(false);
      })
      .catch((err) => console.log(err));
  };

  //view post modal
  const handlePostModal = () => {};

  return (
    <div className="card post">
      <div className="card-header">
        <div className="level is-mobile">
          <div className="level-left">
            <div className="level-item">
              <h6 className="card-header-title">{data.userName}</h6>
            </div>
          </div>
          <div className="level-right">
            <div className="level-item">
              <i className="fas fa-ellipsis-h"></i>
            </div>
          </div>
        </div>
      </div>
      <div className="card-image">
        <div className="image is-1by1">
          <img src={data.imageUrl} alt="" loading="lazy" />
        </div>
      </div>
      <div className="card-content is-paddingless">
        <div className="has-padding-10">
          <div className="level my-2 is-mobile">
            <div className="level-left">
              <div className="level-item">
                <div
                  className="image is-24x24"
                  onClick={handleLike}
                  style={{ cursor: "pointer" }}
                >
                  <img src={isLiked ? likedIcon : likeIcon} />
                </div>
              </div>
              <div className="level-item">
                <div className="image is-24x24">
                  <img src={commentIcon} />
                </div>
              </div>
              <div className="level-item">
                <div className="image is-24x24">
                  <img src={sendIcon} />
                </div>
              </div>
            </div>
            <div className="level-right">
              <div className="level-item">
                <div className="image is-24x24">
                  <img src={bookmarkIcon} />
                </div>
              </div>
            </div>
          </div>
          <p>
            <small>
              {likes.length > 2
                ? `Liked by ${likes[0].data.user} and ${
                    likes.length - 1
                  } others`
                : ""}
              {likes.length > 0 && likes.length === 1
                ? likes.length + "like"
                : ""}
              {likes.length > 1 ? likes.length + "likes" : ""}
            </small>
          </p>
          {data.caption.length > 0 && (
            <p className="subtitle is-6 my-2">
              <small>
                <b>{data.userName}</b> {data.caption}
              </small>
            </p>
          )}
          <div>
            {
              <>
                <ul>
                  {comments.map((comment, i) => {
                    if (i < 2) {
                      return (
                        <li key={i}>
                          <small>
                            <b>{comment.userName}</b>
                            <span className="has-margin-left-5">
                              {comment.comment}
                            </span>
                          </small>
                        </li>
                      );
                    } else {
                      return null;
                    }
                  })}
                </ul>
                {comments.length > 0 ? (
                  <a type="button" onClick={handlePostModal}>
                    <small>View all {comments.length} comments</small>
                  </a>
                ) : null}
              </>
            }
          </div>
        </div>
        <form onSubmit={handleComment}>
          <div className="field has-addons">
            <p className="control is-expanded">
              <input
                type="text"
                placeholder="Add a Comment.."
                className="input is-small comment-input is-expanded"
                value={newComments}
                onChange={(e) => {
                  setNewComments(e.target.value);
                }}
              />
            </p>
            <button
              className="button is-small is-inverted has-text-info"
              onClick={handleComment}
              disabled={commentStatus}
            >
              <b>Post</b>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Post;
