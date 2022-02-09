import React, { useEffect } from "react";
import { useSelector } from "react-redux";

const ProfileScreen = () => {
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {}, []);

  return (
    <div>
      <h1>Hello {userInfo.name}</h1>
      <h4>Centre {userInfo.centre.name}</h4>
      <p>Email  : {userInfo.email}</p>
    </div>
  );
};

export default ProfileScreen;
