import { onSnapshot } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import Post from "../components/Post";
import TopNav from "../components/TopNav";
import { collection, query, orderBy } from "firebase/firestore";
import { db } from "../firebase-config";

const Home = ({ loggedUser }) => {
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
      <TopNav loggedUser={loggedUser}></TopNav>
      <div className="columns is-flex-direction-column is-align-items-center has-margin-top-50">
        {posts &&
          posts.map((post) => {
            return (
              <div className="column is-3" key={post.id}>
                <Post
                  id={post.id}
                  data={post.data}
                  loggedUser={loggedUser}
                ></Post>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default Home;
