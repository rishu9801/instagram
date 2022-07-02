import React, { useContext, useState, useEffect } from "react";
import UserContext from "../userContext";
import {
  collection,
  query,
  orderBy,
  onSnapshot,
  where,
} from "firebase/firestore";
import { db } from "../firebase-config";

const Profile = () => {
  const { user } = useContext(UserContext);
  const [posts, setPosts] = useState([]);
  const postsRef = collection(db, "posts");
  const postsQuery = query(postsRef, where("userName", "==", user));

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
    <div>
      {posts &&
        posts.map((post) => {
          return <h1 key={post.id}>{post.data.userName}</h1>;
        })}
    </div>
  );
};

export default Profile;
