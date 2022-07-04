import { createContext, useEffect, useState } from "react";

const UserContext = createContext();

export function UserProvider({ children }) {
  const localData = JSON.parse(sessionStorage.getItem("User Data"));
  const [user, setUser] = useState({
    displayName: "",
    email: "",
    photoURL: "",
    accessToken: "",
  });

  useEffect(() => {
    if (localData) {
      console.log(localData);
      setUser({
        displayName: localData.displayName,
        email: localData.email,
        photoURL: localData.photoURL,
        accessToken: localData.accessToken,
      });
    }
  }, []);

  const [profileImg, setProfileImg] = useState(
    "https://img.site/p/200/200/F39C19/solid-box"
  );
  return (
    <UserContext.Provider value={{ user, setUser, profileImg, setProfileImg }}>
      {children}
    </UserContext.Provider>
  );
}

export default UserContext;
