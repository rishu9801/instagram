import TopNav from "./components/TopNav";
import Auth from "./pages/Auth";
import Home from "./pages/Home";
import { app, db, storage } from "./firebase-config";
import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  updateProfile,
  signOut,
  setPersistence,
  browserSessionPersistence,
} from "firebase/auth";
import { useEffect, useState, useContext } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import UserContext from "./userContext";
import Profile from "./pages/Profile";

function App() {
  //auth
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [userName, setUserName] = useState();
  const [profileImg, setProfileImg] = useState();
  const navigate = useNavigate();
  const auth = getAuth();
  const { user, setUser } = useContext(UserContext);

  const localData = sessionStorage.getItem("User Data");

  useEffect(() => {}, []);

  useEffect(() => {
    if (localData) {
      setUser({
        displayName: localData.displayName,
        email: localData.email,
        photoURL: localData.photoURL,
        accessToken: localData.accessToken,
      });
    }
  }, []);

  const handleAuth = (type) => {
    console.log(user, "from context api");

    if (type === "login") {
      console.log(email, password);
      auth
        .setPersistence(browserSessionPersistence)
        .then(() => {
          signInWithEmailAndPassword(auth, email, password)
            .then((res) => {
              sessionStorage.setItem(
                "User Data",
                JSON.stringify({
                  displayName: auth.currentUser.displayName,
                  email: auth.currentUser.email,
                  photoURL: auth.currentUser.photoURL,
                  accessToken: res._tokenResponse.refreshToken,
                })
              );
            })
            .then(() => {
              navigate("/home");
              console.log(user);
            })
            .catch((err) => {
              if (err.code === "auth/user-not-found") {
                alert("auth/user-not-found");
              }
            });
        })
        .catch((error) => {
          // Handle Errors here.
          const errorCode = error.code;
          const errorMessage = error.message;
        });
    } else if (type === "signup") {
      createUserWithEmailAndPassword(auth, email, password)
        .then((res) => {
          console.log(userName, "userName");
          updateProfile(auth.currentUser, {
            displayName: userName,
            photoURL: profileImg,
          })
            .then(() => {
              // Profile updated!
              // ...
              console.log(auth.currentUser.displayName);
              setUser(auth.currentUser);
              sessionStorage.setItem(
                "User Data",
                JSON.stringify({
                  displayName: auth.currentUser.displayName,
                  email: auth.currentUser.email,
                  photoURL: auth.currentUser.photoURL,
                  accessToken: res._tokenResponse.refreshToken,
                })
              );
              navigate("/home");
            })
            .catch((error) => {
              // An error occurred
              console.log(error);
              // ...
            });
        })
        .catch((err) => {
          console.log(err);
          if (err.code == "auth/email-already-in-use") {
            alert.error("Email Already In use");
          }
        });
    }
  };

  const logOut = () => {
    signOut(auth)
      .then(() => {
        sessionStorage.removeItem("User Data");
        setUser(null);
        navigate("/");
        // Sign-out successful.
      })
      .catch((error) => {
        // An error happened.
        console.log(error);
      });
  };
  //auth end

  return (
    <div className="App">
      <Routes>
        <Route
          path="/"
          element={
            <Auth
              setEmail={setEmail}
              setPassword={setPassword}
              setUserName={setUserName}
              handleAuth={handleAuth}
              setProfileImg={setProfileImg}
            />
          }
        ></Route>
        <Route path="/home" element={<Home logOut={logOut} />}></Route>
        <Route path="/profile" element={<Profile logOut={logOut} />}></Route>
      </Routes>
    </div>
  );
}

export default App;
