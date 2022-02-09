import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  listCentres,
  getCertreDetails,
  centreRegister,
  deleteCentre,
  searchCentres,
} from "../actions/centreActions";
import { Row, Col, Button, Form, Table } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import Loader from "../components/Loader";
import Message from "../components/Message";

const HomeScreen = () => {
  const [message, setMessage] = useState(null);
  const [search, setSearch] = useState("");

  const [centreName, setCentreName] = useState("");
  const [centreAddress, setCentreAddress] = useState("");

  const [previewSource, setPreviewSource] = useState("");
  const [selectedFile, setSelectedFile] = useState("");

  const dispatch = useDispatch();

  const centreList = useSelector((state) => state.centreList);
  const { loading, error, centres } = centreList;

  const centreDelete = useSelector((state) => state.centreDelete);
  const { success: successDelete } = centreDelete;

  const submitHandler = (e) => {
    e.preventDefault();

    if (centreName === "") {
      setMessage("Centre Name Is Empty");
    } else if (centreAddress === "") {
      setMessage("Centre Address Is Empty");
      // } else if (openDays.length === 0) {
      //   setMessage("Select atleast one open Days");
    } else if (!previewFile) {
      setMessage("Select Image");
    } else {
      console.log("no error");
      postDetails();
    }
  };



  
  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    setSelectedFile(file);
    previewFile(file);
  };

  const postDetails = (e) => {
    const formdata = new FormData();
    formdata.append("file", selectedFile);
    formdata.append("upload_preset", "y5sw55jv");
    formdata.append("cloud_name", "m-sonasu");

    fetch("https://api.cloudinary.com/v1_1/m-sonasu/image/upload", {
      method: "post",
      body: formdata,
    })
      .then((res) => res.json())
      .then((data) => {
        dispatch(
          centreRegister(
            centreName,
            centreAddress,
            openDays,
            data.secure_url,
            data.asset_id
          )
        );
      })

      .catch((error) => {
        console.log(error);
      });
  };

  const updateHandler = (id) => {
    dispatch(getCertreDetails(id));
  };

  const deleteHandler = (id) => {
    dispatch(deleteCentre(id));
  };

  const submitSearch = (e) => {
    e.preventDefault();
    dispatch(searchCentres(search));
  };

  useEffect(() => {
    dispatch(listCentres());
  }, [dispatch, successDelete]);

  const openDays = [];
  const updateUsesTools = (item) => {
    if (openDays.includes(item)) {
      var index = openDays.indexOf(item);
      openDays.splice(index, 1);
    } else {
      openDays.push(item);
    }
    //console.log(openDays);
  };
  const previewFile = (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setPreviewSource(reader.result);
    };
  };

  return (
    <Row>
      {error && <Message variant="danger">{error}</Message>}
      {message && <Message variant="danger">{message}</Message>}
      <Col md={6}>
        <h2>Create Centers</h2>

        <Form onSubmit={submitHandler}>
          <Form.Group controlId="name">
            <Form.Label>Centre Name</Form.Label>
            <Form.Control
              type="name"
              placeholder="Enter Centre Name"
              value={centreName}
              onChange={(e) => setCentreName(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Form.Group controlId="name">
            <Form.Label>Address</Form.Label>
            <Form.Control
              type="name"
              placeholder="Enter Address"
              value={centreAddress}
              onChange={(e) => setCentreAddress(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Form.Group controlId="file">
            <Form.Label>Centre Image</Form.Label>
            <Form.Control
              type="file"
              placeholder="Choose image"
              value={selectedFile && selectedFile.length > 0
                ? selectedFile[0].name
                : null}
              onChange={handleFileUpload}
            ></Form.Control>
          </Form.Group>
          <br />
          {previewSource && (
            <img src={previewSource} alt={selectedFile} style={{ height: "300px" }} />
          )}

          <Form.Group controlId="name">
            <Form.Label>Open Days</Form.Label>
            <Form.Check
              type="switch"
              id="custom-switch"
              onChange={(e) => updateUsesTools(e.target.value)}
              label="Monday"
              value={"Monday"}
            />
            <Form.Check
              type="switch"
              id="custom-switch"
              onChange={(e) => updateUsesTools(e.target.value)}
              label="Tuesday"
              value={"Tuesday"}
            />
            <Form.Check
              type="switch"
              id="custom-switch"
              onChange={(e) => updateUsesTools(e.target.value)}
              label="Wednesday"
              value={"Wednesday"}
            />
            <Form.Check
              type="switch"
              id="custom-switch"
              onChange={(e) => updateUsesTools(e.target.value)}
              label="Thusday"
              value={"Thusday"}
            />
            <Form.Check
              type="switch"
              id="custom-switch"
              onChange={(e) => updateUsesTools(e.target.value)}
              label="Firday"
              value={"Firday"}
            />
            <Form.Check
              type="switch"
              id="custom-switch"
              onChange={(e) => updateUsesTools(e.target.value)}
              label="Saturday"
              value={"Saturday"}
            />
            <Form.Check
              type="switch"
              id="custom-switch"
              onChange={(e) => updateUsesTools(e.target.value)}
              label="Sunday"
              value={"Sunday"}
            />
          </Form.Group>

          <Button type="submit" variant="primary" className="mt-3">
            Save Centre
          </Button>
        </Form>
      </Col>

      <Col md={6}>
        <h2>Centres</h2>

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
              {centres?.map((centre) => (
                <tr key={centre._id}>
                  <td>{centre.name}</td>
                  <td>
                    <LinkContainer to={`centre/${centre._id}/edit`}>
                      <Button
                        variant="success"
                        className="btn-sm"
                        onClick={(e) => updateHandler(centre._id)}
                      >
                        Update
                      </Button>
                    </LinkContainer>
                    <Button
                      variant="danger"
                      className="btn-sm"
                      onClick={(e) => deleteHandler(centre._id)}
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

export default HomeScreen;
