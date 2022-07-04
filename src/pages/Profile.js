import React, { useContext, useState, useEffect } from "react";
import UserContext from "../userContext";
import TopNav from "../components/TopNav";
import {
  collection,
  query,
  orderBy,
  onSnapshot,
  where,
} from "firebase/firestore";
import { db } from "../firebase-config";

const Profile = ({ logOut }) => {
  const { user } = useContext(UserContext);
  const [posts, setPosts] = useState([]);
  const postsRef = collection(db, "posts");
  const postsQuery = query(postsRef, where("userName", "==", user.displayName));

  useEffect(() => {
    onSnapshot(postsQuery, (snapshot) => {
      setPosts(
        snapshot.docs.map((doc) => ({
          id: doc.id,
          data: doc.data(),
        }))
      );
    });
  }, [user.displayName]);

  return (
    <>
      <TopNav logOut={logOut}></TopNav>
      <div className="container has-margin-top-100">
        <div className="columns is-centered">
          <div className="column is-full">
            <div className="media">
              <div className="media-left">
                <div className="image is-128x128">
                  {user.photoURL ? (
                    <img
                      src={
                        user.photoURL
                          ? user.photoURL
                          : "https://img.site/p/150/150/F39C19/solid-box"
                      }
                      alt=""
                      className="is-rounded"
                    />
                  ) : (
                    <i className="fas fa-3x fa-user"></i>
                  )}
                </div>
              </div>
              <div className="media-content">
                <h3>{user.displayName}</h3>
              </div>
            </div>
          </div>
        </div>
        {posts &&
          posts.map((post) => {
            return (
              <div key={post.id}>
                <h1 key={post.id}>{post.data.userName}</h1>
                <img
                  src={post.data.imageUrl}
                  alt=""
                  width={200}
                  style={{ aspectRatio: 1, objectFit: "cover" }}
                />
              </div>
            );
          })}
      </div>
    </>
  );
};

export default Profile;
