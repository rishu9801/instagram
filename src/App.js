import TopNav from "./components/TopNav";
import Auth from "./pages/Auth";
import Home from "./pages/Home";
import { app, db, storage } from "./firebase-config";
import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { useEffect, useState, useContext } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import UserContext from "./userContext";

function App() {
  //auth
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [userName, setUserName] = useState();
  const navigate = useNavigate();
  const { user, setUser } = useContext(UserContext);

  useEffect(() => {
    let authToken = sessionStorage.getItem("Auth Token");
    const currentUser = sessionStorage.getItem("user");

    if (authToken) {
      navigate("/home");
      console.log(currentUser);
      setUser(currentUser);
    } else {
      navigate("/");
    }
  }, []);

  const handleAuth = (type) => {
    console.log(user, "from context api");
    const auth = getAuth();

    if (type === "login") {
      console.log(email, password);
      signInWithEmailAndPassword(auth, email, password)
        .then((res) => {
          setUser(auth.currentUser.displayName);
          console.log(res.user);
          sessionStorage.setItem("Auth Token", res._tokenResponse.refreshToken);
          sessionStorage.setItem("user", auth.currentUser.displayName);
        })
        .then(() => {
          navigate("/home");
        })
        .catch((err) => {
          if (err.code === "auth/user-not-found") {
            alert("auth/user-not-found");
          }
        });
    } else if (type === "signup") {
      createUserWithEmailAndPassword(auth, email, password)
        .then((res) => {
          console.log(userName, "userName");
          updateProfile(auth.currentUser, {
            displayName: userName,
            photoURL: "https://example.com/jane-q-user/profile.jpg",
          })
            .then(() => {
              // Profile updated!
              // ...
              console.log(auth.currentUser.displayName);
              setUser(auth.currentUser.displayName);
              sessionStorage.setItem(
                "Auth Token",
                res._tokenResponse.refreshToken
              );
              sessionStorage.setItem("user", auth.currentUser.displayName);
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
            />
          }
        ></Route>
        <Route path="/home" element={<Home />}></Route>
      </Routes>
    </div>
  );
}

export default App;
