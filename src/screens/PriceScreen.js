import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { listCentres } from "../actions/centreActions";
import { listItems } from "../actions/itemActions";
import {
  listPrice,
  // getPriceDetails,
  priceRegister,
  // deletePrice,
} from "../actions/priceAction";
import { Row, Col, Button, Form, Table } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import Loader from "../components/Loader";
import Message from "../components/Message";
// import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const PriceScreen = () => {
  const [centreName, setCentreName] = useState("");
  const [itemName, setItemName] = useState("");
  const [price, setPrice] = useState("");
  const [date] = useState(new Date());
  const [message, setMessage] = useState(null);

  var year = date.getUTCFullYear();
  var month = date.getUTCMonth();
  var day = date.getUTCDate();
  const dateTime = year + "-" + (month + 1) + "-" + day;

  const dispatch = useDispatch();

  const centreList = useSelector((state) => state.centreList);
  const { centres } = centreList;

  const itemList = useSelector((state) => state.itemList);
  const { items } = itemList;

  const priceList = useSelector((state) => state.priceList);
  const { loading, error, prices } = priceList;

  const itemDelete = useSelector((state) => state.itemDelete);
  const { success: successDelete } = itemDelete;

  const submitHandler = (e) => {
    e.preventDefault();
    if (centreName === "") {
      setMessage("Centre Is Empty");
    } else if (itemName === "") {
      setMessage("Item Is Empty");
    } else if (price === "") {
      setMessage("Price Is Empty");
    } else {
      dispatch(priceRegister(itemName, centreName, price, dateTime));
    }
  };

  const updateHandler = (id) => {
    // dispatch(getItemDetails(id));
  };

  const deleteHandler = (id) => {
    // dispatch(deleteItem(id));
  };

  useEffect(() => {
    dispatch(listItems());
    dispatch(listCentres());
    dispatch(listPrice(dateTime));
  }, [dispatch, successDelete, dateTime]);
  return (
    <Row>
      {error && <Message variant="danger">{error}</Message>}
      {message && <Message variant="danger">{message}</Message>}
      <Col md={6}>
        <h2>Enter details</h2>

        <Form onSubmit={submitHandler}>
          <Form.Group controlId="centre">
            <Form.Label>Select Item</Form.Label>
            <Form.Control
              as="select"
              value={itemName}
              onChange={(e) => setItemName(e.target.value)}
            >
              {items?.map((item) => (
                <option value={item._id} key={item._id}>
                  {item.name}
                </option>
              ))}
            </Form.Control>
          </Form.Group>

          <Form.Group controlId="centre">
            <Form.Label>Select Centre</Form.Label>
            <Form.Control
              as="select"
              value={centreName}
              onChange={(e) => setCentreName(e.target.value)}
            >
              {centres?.map((centre) => (
                <option value={centre._id} key={centre._id}>
                  {centre.name}
                </option>
              ))}
            </Form.Control>
          </Form.Group>

          <Form.Group controlId="name">
            <Form.Label>Price</Form.Label>
            <Form.Control
              type="number"
              placeholder="Enter Price"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Button type="submit" variant="primary" className="mt-3">
            Save
          </Button>
        </Form>
      </Col>

      <Col md={6}>
        <h2>Todays Price List</h2>

        {loading ? (
          <Loader />
        ) : error ? (
          <h2>{error}</h2>
        ) : (
          <Table strriped="true" bordered hover responsive className="table-sm">
            <thead>
              <tr>
                <th>Centre</th>
                <th>NAME</th>
                <th>PRICE</th>
                <th>ACTION</th>
              </tr>
            </thead>
            <tbody>
              {prices &&
                prices.map((price) => (
                  <tr key={price._id}>
                    <td>{price.centre.name}</td>
                    <td>{price.name.name}</td>
                    <td>{price.price}</td>
                    <td>
                      <LinkContainer to={`price/${price._id}/edit`}>
                        <Button
                          variant="success"
                          className="btn-sm"
                          onClick={(e) => updateHandler(price._id)}
                        >
                          Update
                        </Button>
                      </LinkContainer>
                      <Button
                        variant="danger"
                        className="btn-sm"
                        onClick={(e) => deleteHandler(price._id)}
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

export default PriceScreen;
