import { Container, Navbar, Nav, NavDropdown } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../actions/userActions";
import { useHistory } from "react-router-dom";

const Header = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const logoutHandler = () => {
    dispatch(logout(history));
  };

  return (
    <>
      <Navbar
        collapseOnSelect
        expand="lg"
        bg="dark"
        variant="dark"
        fixed="top"
        style={{ paddingTop: "0.5rem", paddingBottom: "0.5rem" }}
      >
        <Container>
          <Navbar.Brand href="/home">EC SL</Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto"></Nav>

            <Nav>
              {userInfo && (
                <>
                  <LinkContainer to="/contact">
                    <Nav.Link>Contact Us</Nav.Link>
                  </LinkContainer>
                  <LinkContainer to="/about">
                    <Nav.Link>About Us</Nav.Link>
                  </LinkContainer>
                  <LinkContainer to="/price">
                    <Nav.Link>Price</Nav.Link>
                  </LinkContainer>
                <LinkContainer to="/centres">
                    <Nav.Link>Centres</Nav.Link>
                  </LinkContainer>
                  <LinkContainer to="/items">
                    <Nav.Link>Items</Nav.Link>
                  </LinkContainer>

                  {userInfo && userInfo.isAdmin && (
                    <LinkContainer to="/users">
                      <Nav.Link>Users</Nav.Link>
                    </LinkContainer>
                  )}

                  <NavDropdown title={userInfo.name} id="username">
                    <LinkContainer to="/profile">
                      <NavDropdown.Item>Profile</NavDropdown.Item>
                    </LinkContainer>
                    <NavDropdown.Item onClick={logoutHandler}>
                      Logout
                    </NavDropdown.Item>
                  </NavDropdown>
                </>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
};

export default Header;
