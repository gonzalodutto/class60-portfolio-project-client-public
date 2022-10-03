import styled from "styled-components";
import { Input, LinkWord } from "../styled";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { login } from "../store/user/thunks";
import { selectToken } from "../store/user/selectors";
import { NavLink } from "react-router-dom";
import GoToTop from "../../src/components/GoToTop";

export const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const token = useSelector(selectToken);

  useEffect(() => {
    if (token !== null) {
      navigate("/");
    }
  }, [token, navigate]);

  const submitForm = (e) => {
    e.preventDefault();
    dispatch(login(email, password));
  };

  return (
    <div style={{ textAlign: "center" }}>
      <Container>
        <h1 style={{ color: "#198754" }}>Login</h1>
        <form onSubmit={submitForm}>
          <Input
            placeholder="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <br />
          <Input
            type="password"
            placeholder="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <br />
          <button
            type="submit"
            className="btn btn-outline-success"
            style={{ marginTop: "1rem" }}
          >
            Login
          </button>
        </form>
        <SubText>
          Don't have an account yet? Click{" "}
          <NavLink to={`/signup`} style={LinkWord}>
            here{" "}
          </NavLink>
          to sign up
        </SubText>
      </Container>

      <GoToTop />
    </div>
  );
};

const Container = styled.div`
  display: "flex";
  flex-direction: "column";
  margin: 10% auto 10%;
  width: 20%;
`;

const SubText = styled.p`
  text-align: center;
  color: #1e3163;
  padding: 20px 0px 5px 0px;
`;
