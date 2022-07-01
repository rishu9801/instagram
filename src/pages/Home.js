import { onSnapshot } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import Post from "../components/Post";
import TopNav from "../components/TopNav";
import { collection, query, orderBy } from "firebase/firestore";
import { db } from "../firebase-config";

const Home = ({ logOut }) => {
  //getPosts
  const [posts, setPosts] = useState([]);
  const postsRef = collection(db, "posts");
  const postsQuery = query(postsRef, orderBy("createdAt", "desc"));

  useEffect(() => {
    onSnapshot(postsQuery, (snapshot) => {
      setPosts(
        snapshot.docs.map((doc) => ({
          id: doc.id,
          data: doc.data(),
        }))
      );
    });
  }, []);

  return (
    <div className="homepage">
      <TopNav logOut={logOut}></TopNav>
      <div className="columns is-flex-direction-column is-align-items-center">
        {posts &&
          posts.map((post) => {
            return (
              <div
                className="column is-12-mobile is-5-tablet is-3-desktop"
                key={post.id}
              >
                <Post id={post.id} data={post.data}></Post>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default Home;
