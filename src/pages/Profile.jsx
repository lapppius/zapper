import React, { useEffect, useRef, useState } from "react";
import { upload, auth, deleteP } from "../firebase";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { Avatar } from "@mui/material";
import { updateProfile } from "firebase/auth";

const Profile = () => {
  const authContext = useAuth();
  const { logout } = useAuth();
  const emailRef = useRef();
  const navigate = useNavigate();
  const [user, setUser] = useState(0);
  let [loading, setLoading] = useState(false);
  let [userPhoto, setUserPhoto] = useState(undefined);
  let [userPhotoURL, setUserPhotoURL] = useState(undefined);
  let [progress, setProgress] = useState(0);
  const fileRef = useRef();

  useEffect(() => {
    setUser(authContext.currentUser);
  }, [authContext]);

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/");
    } catch (error) {}
  };

  // useEffect(() => {
  //   if (authContext.currentUser === null) {
  //     navigate("/login");
  //   }
  // }, [authContext]);

  // useEffect(() => {
  //   console.log(fileRef.current.value);
  //   if (fileRef.current.files[0] && fileRef && fileRef.current) {
  //     setUserPhoto(fileRef.current.files[0]);
  //   }
  // }, [fileRef.current.files[0]]);

  function handleChange(e) {
    e.preventDefault();
    if (fileRef.current.files[0]) {
      setUserPhoto(fileRef.current.files[0]);
    }
  }

  function handleClick() {
    const progress = upload(userPhoto, authContext.currentUser, setLoading);
    setProgress(progress);
    setUserPhoto(undefined);
  }

  function deletePhoto() {
    deleteP(authContext.currentUser.photoURL, authContext.currentUser);
    console.log(authContext.currentUser);
  }

  useEffect(() => {
    if (!loading) {
      fileRef.current.value = null;
    }
  }, [loading]);

  useEffect(() => {
    if (authContext.currentUser && authContext.currentUser.photoURL) {
      setUserPhotoURL(authContext.currentUser.photoURL);
      console.log(authContext.currentUser.photoURL);
    }
  }, [authContext.currentUser.photoURL]);

  return (
    <>
      <nav>
        <p ref={emailRef}>Welcome Home {user ? user.email : ""}</p>

        <div>
          <Avatar
            loading="lazy"
            alt={user.email + "'s profile photo"}
            src={userPhotoURL}
            sx={{ width: 100, height: 100 }}
          />
          <input type="file" ref={fileRef} onChange={handleChange}></input>

          <button disabled={loading || !userPhoto} onClick={handleClick}>
            upload
          </button>
          {authContext.currentUser.photoURL !== null ? (
            <button onClick={deletePhoto}>Delete Photo</button>
          ) : (
            ""
          )}

        </div>
      </nav>
    </>
  );
};

export default Profile;
