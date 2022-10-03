import styled from "styled-components";
import { Input } from "../styled";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { signUp } from "../store/user/thunks";
import { selectToken } from "../store/user/selectors";
import GoToTop from "../../src/components/GoToTop";

export const SignUp = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [checkedIsWritter, setCheckedIsWritter] = useState(false);
  const isWritter = checkedIsWritter;
  const [checkedIsSeller, setCheckedIsSeller] = useState(false);
  const isSeller = checkedIsSeller;
  const [imageUrl, setImageUrl] = useState("");
  const [commercialName, setCommercialName] = useState("");
  // console.log(isSeller);

  const handleChangeIsSeller = () => {
    setCheckedIsSeller(!checkedIsSeller);
  };

  const handleChangeIsWritter = () => {
    setCheckedIsWritter(!checkedIsWritter);
  };

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
    dispatch(
      signUp(
        name,
        email,
        password,
        isWritter,
        isSeller,
        imageUrl,
        commercialName
      )
    );
  };

  return (
    <div style={{ textAlign: "center" }}>
      <Container>
        <h1 style={{ color: "#198754" }}>Sign Up</h1>
        <form onSubmit={submitForm}>
          <Input
            placeholder="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <br />
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
          <div>
            <input
              type="checkbox"
              onChange={handleChangeIsSeller}
              style={{ marginTop: "2rem" }}
            />{" "}
            Are you an Seller?
            {checkedIsSeller ? " Yes" : " No"}
          </div>
          <div>
            <input
              type="checkbox"
              onChange={handleChangeIsWritter}
              style={{ marginTop: "2rem", marginBottom: "2rem" }}
            />{" "}
            Are you an Writter?
            {checkedIsWritter ? " Yes" : " No"}
          </div>
          <Input
            value={imageUrl}
            onChange={(event) => setImageUrl(event.target.value)}
            type="text"
            placeholder="Seller Image URL"
          />
          <Input
            value={commercialName}
            onChange={(event) => setCommercialName(event.target.value)}
            type="text"
            placeholder="Commercial Name"
          />

          <br />
          {/* <Button type="submit">Sign Up</Button> */}
          <button
            type="submit"
            className="btn btn-outline-success"
            style={{ marginTop: "1rem" }}
          >
            Sign Up
          </button>
        </form>
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
