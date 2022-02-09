import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { listCentres } from "../actions/centreActions";
import { Row, Col, Button, Form } from "react-bootstrap";
import { register } from "../actions/userActions";
import Message from "../components/Message";
import Loader from "../components/Loader";
import FormContainer from "../components/FormContainer";

const UserRegisterScreen = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [centreName, setCentreName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState(null);

  const dispatch = useDispatch();

  const centreList = useSelector((state) => state.centreList);
  const { centres } = centreList;

  const userRegister = useSelector((state) => state.userRegister);
  const { loading: regLoading, error: regError } = userRegister;

  useEffect(() => {
    dispatch(listCentres());
  }, [dispatch]);

  const submitHandler = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setMessage("Password do not Match");
    } else if (name === "") {
      setMessage("Name Is Empty");
    } else if (centreName === "") {
      setMessage("Centre Is Empty");
    } else if (email === "") {
      setMessage("Email Is Empty");
    } else {
      // console.log(centreName);

      dispatch(register(name, email, centreName, password));
    }
  };

  return (
    <FormContainer>
      <Row>
        <Col md={12}>
          {message && <Message variant="danger">{message}</Message>}
          <h2>New User</h2>

          {regError && <Message variant="danger">{regError}</Message>}

          <Form onSubmit={submitHandler}>
            <Form.Group controlId="name">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="name"
                placeholder="Enter Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId="email">
              <Form.Label>Email Address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter Address"
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
                placeholder="Re-Enter Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              ></Form.Control>
            </Form.Group>

            {regLoading && <Loader />}

            <Button type="submit" variant="primary">
              Register
            </Button>
          </Form>
        </Col>
      </Row>
    </FormContainer>
  );
};

export default UserRegisterScreen;
