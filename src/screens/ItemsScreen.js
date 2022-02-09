import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  listItems,
  getItemDetails,
  itemRegister,
  deleteItem,
  searchItems,
} from "../actions/itemActions";
import { Row, Col, Button, Form, Table } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import Loader from "../components/Loader";
import Message from "../components/Message";

const ItemsScreen = () => {
  const [itemName, setItemName] = useState("");
  const [search, setSearch] = useState("");
  const [message, setMessage] = useState(null);

  const dispatch = useDispatch();

  const itemList = useSelector((state) => state.itemList);
  const { loading, error, items } = itemList;

  const itemDelete = useSelector((state) => state.itemDelete);
  const { success: successDelete } = itemDelete;

  const submitHandler = (e) => {
    if (itemName === "") {
      setMessage("Item Name Is Empty");
    } else {
      dispatch(itemRegister(itemName));
    }
  };

  const submitSearch = (e) => {
    e.preventDefault();
    dispatch(searchItems(search));
  };

  const updateHandler = (id) => {
    dispatch(getItemDetails(id));
  };

  const deleteHandler = (id) => {
    dispatch(deleteItem(id));
  };

  useEffect(() => {
    dispatch(listItems());
  }, [dispatch, successDelete]);
  return (
    <Row>
      {error && <Message variant="danger">{error}</Message>}
      {message && <Message variant="danger">{message}</Message>}
      <Col md={6}>
        <h2>Create Item</h2>

        <Form onSubmit={submitHandler}>
          <Form.Group controlId="name">
            <Form.Label>Item Name</Form.Label>
            <Form.Control
              type="name"
              placeholder="Enter Item Name"
              value={itemName}
              onChange={(e) => setItemName(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Form.Group controlId="name">
            <Form.Label>Choose file</Form.Label>
            <Form.Control
              type="file"
              placeholder="Enter Item Name"
              value={itemName}
              onChange={(e) => setItemName(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <br/>

          

          <Button type="submit" variant="primary" className="mt-3">
            Save Item
          </Button>
        </Form>
      </Col>

      <Col md={6}>
        <h2>Items</h2>

        <Form onSubmit={submitSearch}>
          <Form.Group controlId="name">
            <Form.Control
              type="name"
              placeholder="Search Centre"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            ></Form.Control>
            <Button type="submit" variant="primary" className="mt-3">
              Search
            </Button>
          </Form.Group>
        </Form>

        <br></br>

        {loading ? (
          <Loader />
        ) : error ? (
          <h2>{error}</h2>
        ) : (
          <Table strriped="true" bordered hover responsive className="table-sm">
            <thead>
              <tr>
                <th>NAME</th>
                <th>ACTION</th>
              </tr>
            </thead>
            <tbody>
              {items.map((item) => (
                <tr key={item._id}>
                  <td>{item.name}</td>
                  <td>
                    <LinkContainer to={`item/${item._id}/edit`}>
                      <Button
                        variant="success"
                        className="btn-sm"
                        onClick={(e) => updateHandler(item._id)}
                      >
                        Update
                      </Button>
                    </LinkContainer>
                    <Button
                      variant="danger"
                      className="btn-sm"
                      onClick={(e) => deleteHandler(item._id)}
                    >
                      Delete
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        )}
      </Col>
    </Row>
  );
};

export default ItemsScreen;
