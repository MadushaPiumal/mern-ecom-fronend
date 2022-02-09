import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Button, Form } from "react-bootstrap";
import { getUserDetails, updateUserProfile } from "../actions/userActions";
import { USER_UPDATE_RESET } from "../constants/userConstants";

import { listCentres } from "../actions/centreActions";
import Loader from "../components/Loader";
import Message from "../components/Message";
import FormContainer from "../components/FormContainer";

const UserEditScreen = ({ match, history }) => {
  const userId = match.params.id;

  const [id, setId] = useState("");
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [centreName, setCentreName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState(null);

  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const centreList = useSelector((state) => state.centreList);
  const { centres } = centreList;

  const Details = useSelector((state) => state.userDetails);
  const { loading, error, user } = Details;

  const update = useSelector((state) => state.userUpdateProfile);
  const {
    loading: loadingUpdate,
    error: errorUpdate,
    success: successUpdate,
  } = update;

  useEffect(() => {
    if (!userInfo.isAdmin) {
      history.push("/");
    } else if (successUpdate) {
      dispatch({ type: USER_UPDATE_RESET });
      history.push("/users");
    } else {
      dispatch(listCentres());
      if (!user.name || user._id !== userId) {
        dispatch(getUserDetails(userId));
      } else {
        setId(user._id);
        setUserName(user.name);
        setEmail(user.email);
      }
    }
  }, [userInfo, dispatch, user, successUpdate, userId, history]);

  const submitHandler = (e) => {
    e.preventDefault();
    if (password === "") {
      if (userName === "") {
        setMessage("Name Is Empty");
      } else if (email === "") {
        setMessage("Email Is Empty");
      } else if (centreName === "") {
        setMessage("Centre Is Empty");
      } else {
        dispatch(updateUserProfile({ _id: id, name: userName, email: email, centre: centreName}));
      }
    } else {
      if (password !== confirmPassword) {
        setMessage("Password do not Match");
      } else if (userName === "") {
        setMessage("Name Is Empty");
      } else if (email === "") {
        setMessage("Email Is Empty");
      } else {
        dispatch(
          updateUserProfile({
            _id: id,
            name: userName,
            email: email,
            centre: centreName,
            password: password,
          })
        );
      }
    }
  };

  return (
    <>
      <Link to="/users" className="btn bttn-ligth my-3">
        Go back
      </Link>
      <FormContainer>
        <h1>Edit Users</h1>

        {loadingUpdate && <Loader />}
        {errorUpdate && <Message variant="danger">{errorUpdate}</Message>}
        {message && <Message variant="danger">{message}</Message>}

        {loading ? (
          <Loader />
        ) : error ? (
          <Message variant="danger">{error}</Message>
        ) : (
          <Form onSubmit={submitHandler}>
            <Form.Group controlId="name">
              <Form.Label>User Name</Form.Label>
              <Form.Control
                type="name"
                placeholder="Enter Email"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
              ></Form.Control>
            </Form.Group>
            <Form.Group controlId="name">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter Name"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              ></Form.Control>
            </Form.Group>
            <Form.Group controlId="centre">
            <Form.Label>Centre</Form.Label>
            <Form.Control
              as="select"
              value={centreName}
              onChange={(e) => setCentreName(e.target.value)}
            >
              {centres.map((centre) => (
                <option value={centre._id}>{centre.name}</option>
              ))}
            </Form.Control>
          </Form.Group>
            <Form.Group controlId="password">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Enter Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId="ConfirmPassword">
              <Form.Label>Confirm Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Rr-Enter Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Button type="submit" variant="primary">
              Update User
            </Button>
          </Form>
        )}
      </FormContainer>
    </>
  );
};

export default UserEditScreen;
