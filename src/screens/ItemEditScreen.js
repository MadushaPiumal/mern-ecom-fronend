import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Button, Form } from "react-bootstrap";
import { getItemDetails, updateItem } from "../actions/itemActions";
import { ITEM_UPDATE_RESET } from "../constants/itemConstants";
import Loader from "../components/Loader";
import Message from "../components/Message";
import FormContainer from "../components/FormContainer";

const ItemEditScreen = ({ match, history }) => {
  const itemId = match.params.id;

  const [id, setId] = useState("");
  const [itemName, setItemName] = useState("");

  const dispatch = useDispatch();

  const Details = useSelector((state) => state.itemDetails);
  const { loading, error, itemDetails } = Details;

  const update = useSelector((state) => state.itemUpdate);
  const {
    loading: loadingUpdate,
    error: errorUpdate,
    success: successUpdate,
  } = update;

  useEffect(() => {
    if (successUpdate) {
      dispatch({ type: ITEM_UPDATE_RESET });
      history.push("/items");
    } else {
      if (!itemDetails.name || itemDetails._id !== itemId) {
        dispatch(getItemDetails(itemId));
      } else {
        setId(itemDetails._id);
        setItemName(itemDetails.name);
      }
    }
  }, [dispatch, itemDetails, successUpdate, itemId, history]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(updateItem({ _id: id, name: itemName }));
  };

  return (
    <>
      <Link to="/item" className="btn bttn-ligth my-3">
        Go back
      </Link>
      <FormContainer>
        <h1>Edit Item</h1>

        {loadingUpdate && <Loader />}
        {errorUpdate && <Message variant="danger">{errorUpdate}</Message>}

        {loading ? (
          <Loader />
        ) : error ? (
          <Message variant="danger">{error}</Message>
        ) : (
          <Form onSubmit={submitHandler}>
            <Form.Group controlId="name">
              <Form.Label>Item Name</Form.Label>
              <Form.Control
                type="name"
                placeholder="Enter Name"
                value={itemName}
                onChange={(e) => setItemName(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Button type="submit" variant="primary">
              Update Item
            </Button>
          </Form>
        )}
      </FormContainer>
    </>
  );
};

export default ItemEditScreen;
