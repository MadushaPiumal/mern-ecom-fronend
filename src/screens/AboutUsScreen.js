import React from "react";
import { useSelector } from "react-redux";

import { useEffect } from "react";

const AboutUsScreen = ({ history }) => {
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    if (!userInfo) {
      history.push("/");
    }
  }, [userInfo, history]);
  return <div>AboutUsScreen</div>;
};

export default AboutUsScreen;
