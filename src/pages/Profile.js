import React, { useContext, useState, useEffect } from "react";
import UserContext from "../userContext";
import TopNav from "../components/TopNav";
import { collection, query, onSnapshot, where } from "firebase/firestore";
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
  }, [user.displayName, postsQuery]);

  return (
    <>
      <TopNav logOut={logOut}></TopNav>
      <div className="container has-margin-top-100">
        <div className="columns is-centered is-multiline">
          <div className="column is-10">
            <div className="columns is-centered">
              <div className="column is-3">
                <div className="image is-150x150">
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
              <div className="column is-6">
                <div className="level has-margin-bottom-15">
                  <div className="level-left">
                    <div className="level-item has-margin-right-25">
                      <h3 className="is-size-4">{user.displayName}</h3>
                    </div>
                    <div className="level-item has-margin-right-25">
                      <button className="button is-small has-background-transparent">
                        <b>Edit Profile</b>
                      </button>
                    </div>
                    <div className="level-item">
                      <button className="button has-background-transparent is-borderless is-paddingless">
                        <i className="fas fa-cog"></i>
                      </button>
                    </div>
                  </div>
                </div>
                <p className="has-margin-bottom-15">
                  <b>{posts.length}</b> Posts
                </p>
                <p className="subtitle">Rishu Saha</p>
              </div>
            </div>
          </div>
          <div className="column is-10 is-paddingless">
            <hr />
          </div>
          <div className="column is-9">
            <div className="columns is-multiline is-mobile">
              {posts &&
                posts.map((post) => {
                  return (
                    <div className="column is-4" key={post.id}>
                      <img
                        src={post.data.imageUrl}
                        alt=""
                        style={{
                          aspectRatio: 1,
                          objectFit: "cover",
                          width: "100%",
                        }}
                      />
                    </div>
                  );
                })}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
