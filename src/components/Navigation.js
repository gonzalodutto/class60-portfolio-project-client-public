import styled from "styled-components";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectToken, selectUser } from "../store/user/selectors";
import { logOut } from "../store/user/slice";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { IoInfiniteSharp } from "react-icons/io5";

export const Navigation = () => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const token = useSelector(selectToken);
  const user = useSelector(selectUser);

  function triggerLogout() {
    dispatch(logOut());
    navigate(`/`);
  }

  return (
    <Nav>
      <Logo href="/">
        Bukloo
        <span> </span>
        <IoInfiniteSharp />
      </Logo>
      <Hamburger onClick={() => setOpen(!open)}>
        <span />
        <span />
        <span />
      </Hamburger>
      <Menu open={open}>
        {token && user?.isSeller === true ? (
          <MenuLink to="/AddProductPage">
            {" "}
            <b>Add Product</b>{" "}
          </MenuLink>
        ) : (
          ""
        )}
        <MenuLink to="/empty1">
          {token ? "Hi" : null}{" "}
          {token && user?.isSeller === true ? "Seller" : ""}
          {token && user?.isSeller !== true ? "User" : ""}{" "}
        </MenuLink>
        {token ? (
          <button onClick={triggerLogout}>Logout</button>
        ) : (
          <MenuLink to="/login">Login</MenuLink>
        )}
      </Menu>
    </Nav>
  );
};

const MenuLink = styled(Link)`
  padding: 1rem 2rem;
  cursor: pointer;
  text-align: center;
  text-decoration: none;
  color: #ececec;
  transition: all 0.3s ease-in;
  font-size: 0.9rem;

  &:hover {
    color: #9cc094;
  }
`;

const Nav = styled.div`
  padding: 0 9rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  background: #000000;
  /* position: absolute; */
  top: 0;
  left: 0;
  right: 0;
  /* position: fixed; Set the navbar to fixed position */
  top: 0; /* Position the navbar at the top of the page */
`;

const Logo = styled.a`
  padding: 0.5rem 0;
  color: #ececec;
  text-decoration: none;
  font-weight: 800;
  font-size: 1.7rem;

  span {
    font-weight: 300;
    font-size: 1.3rem;
  }
`;

const Hamburger = styled.div`
  display: none;
  flex-direction: column;
  cursor: pointer;
  span {
    height: 2px;
    width: 25px;
    background-color: #ececec;
    margin-bottom: 4px;
    border-radius: 5px;
  }

  @media (max-width: 780px) {
    display: flex;
  }
`;

const Menu = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;

  @media (max-width: 780px) {
    overflow: hidden;
    flex-direction: column;
    width: 100%;
    max-height: ${({ open }) => (open ? "300px" : "0")};
    transition: max-height 0.3s ease-in;
  }
`;
