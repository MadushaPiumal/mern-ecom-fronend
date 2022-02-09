import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Button, Form } from "react-bootstrap";
import { getCertreDetails, updateCentre } from "../actions/centreActions";
import { CENTRE_UPDATE_RESET } from "../constants/centreConstants";
import Loader from "../components/Loader";
import Message from "../components/Message";
import FormContainer from "../components/FormContainer";

const CentreEditScreen = ({ match, history }) => {
  const centreId = match.params.id;

  const [id, setId] = useState("");
  const [centreName, setCentreName] = useState("");

  const dispatch = useDispatch();

  const Details = useSelector((state) => state.centreDetails);
  const { loading, error, centreDetails } = Details;

  const update = useSelector((state) => state.centreUpdate);
  const {
    loading: loadingUpdate,
    error: errorUpdate,
    success: successUpdate,
  } = update;

  useEffect(() => {
    if (successUpdate) {
      dispatch({ type: CENTRE_UPDATE_RESET });
      history.push("/home");
    } else {
      if (!centreDetails.name || centreDetails._id !== centreId) {
        dispatch(getCertreDetails(centreId));
      } else {
        setId(centreDetails._id);
        setCentreName(centreDetails.name);
      }
    }
  }, [dispatch, centreDetails, successUpdate, history, centreId]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(updateCentre({ _id: id, name: centreName }));
  };

  return (
    <>
      <Link to="/home" className="btn bttn-ligth my-3">
        Go back
      </Link>
      <FormContainer>
        <h1>Edit Centre</h1>

        {loadingUpdate && <Loader />}
        {errorUpdate && <Message variant="danger">{errorUpdate}</Message>}

        {loading ? (
          <Loader />
        ) : error ? (
          <Message variant="danger">{error}</Message>
        ) : (
          <Form onSubmit={submitHandler}>
            <Form.Group controlId="name">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="name"
                placeholder="Enter Name"
                value={centreName}
                onChange={(e) => setCentreName(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Button type="submit" variant="primary">
              Update
            </Button>
          </Form>
        )}
      </FormContainer>
    </>
  );
};

export default CentreEditScreen;
