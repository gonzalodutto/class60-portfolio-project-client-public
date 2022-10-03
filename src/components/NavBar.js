import Button from "react-bootstrap/Button";
import styled from "styled-components";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { IoInfiniteSharp } from "react-icons/io5";
import { FiShoppingCart } from "react-icons/fi";
import { selectToken, selectUser } from "../store/user/selectors";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logOut } from "../store/user/slice";
import { NavLink } from "react-router-dom";
import { selectInvoiceState } from "../store/shoppingCard/selectors";

function NavBar() {
  const dispatch = useDispatch();

  const navigate = useNavigate();
  const token = useSelector(selectToken);
  const user = useSelector(selectUser);
  const shoppingCart = useSelector(selectInvoiceState);

  const notificationsNumber = shoppingCart.length;

  function triggerLogout() {
    dispatch(logOut());
    navigate(`/`);
  }

  // console.log(user);

  return (
    <Navbar
      className="sticky-top navbar-dark bg-dark"
      expand="lg"
      style={{
        boxShadow: "0 2px 20px rgba(0, 0, 0, 0.2)",
        // backgroundColor: "#e3f2fd",
      }}
    >
      <Container fluid>
        <NavLink to={"/"}>
          <IoInfiniteSharp
            style={{
              fontSize: "30px",
              color: "white",
            }}
          />
        </NavLink>
        <NavLink
          to={"/"}
          className="navbar-brand"
          style={{ marginLeft: "0.5rem" }}
        >
          Bukloo<small style={{ fontSize: "15px", color: "gray" }}>.com</small>
        </NavLink>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: "100px" }}
            navbarScroll
          >
            <NavLink to={"/"} className="nav-link">
              Home
            </NavLink>
            <NavLink to={"/map"} className="nav-link">
              Map
            </NavLink>
            <NavLink to={"/feed/news"} className="nav-link">
              NewsFeed
            </NavLink>
          </Nav>
          <Nav
            // className="me-auto"
            style={{ maxHeight: "100px", marginRight: "1rem" }}
            navbarScroll
          >
            {token ? (
              <NavLink className="nav-link" onClick={triggerLogout} to={"/"}>
                Logout
              </NavLink>
            ) : (
              <NavLink to={"/login"} className="nav-link">
                Login
              </NavLink>
            )}
            <NavLink to={`/shops/${user?.id}`} className="nav-link">
              <b>{token && user ? `Hi ${user.commercialName}` : null} </b>
              {/* {token && user?.isSeller === true ? "Seller" : ""}
              {token && user?.isSeller !== true ? "User" : ""}{" "} */}
            </NavLink>
            <NavLink to={"/shopcard"} className="nav-link">
              <FiShoppingCart />
              <Notification>{notificationsNumber}</Notification>
            </NavLink>
          </Nav>
          <Form className="d-flex">
            <Form.Control
              type="search"
              placeholder="Search"
              className="me-2"
              aria-label="Search"
            />
            <Button variant="outline-success">Search</Button>
          </Form>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export { NavBar };

const Notification = styled.span`
  position: relative;
  top: -8px;
  right: 5px;
  padding: 2px 5px;
  border-radius: 40%;
  background-color: red;
  color: white;
  font-size: 11px;
`;
