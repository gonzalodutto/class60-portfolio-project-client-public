import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { selectUser } from "../store/user/selectors";
import { postProduct } from "../store/products/thunks";
import { useNavigate } from "react-router-dom";
import { Input } from "../styled";
import { hardCodeCategories } from "../data/hardCoded";
import Select from "react-select";
import { fetchProducts } from "../store/products/thunks";

export function AddProductPage(props) {
  const dispatch = useDispatch();
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [imageUrl, setImageUrl] = useState(
    "https://thumbs.dreamstime.com/b/picture-gallery-icon-logo-vector-illustrattion-photo-design-template-trendy-flat-website-symbol-sign-app-ui-179690657.jpg"
  );
  const [category, setCategory] = useState("");
  const user = useSelector(selectUser);
  const navigate = useNavigate();
  const categories = hardCodeCategories;

  const handleSelectChange = (event) => {
    setCategory(event.value);
  };

  function submitForm(event) {
    event.preventDefault();

    const userId = user.id;

    dispatch(postProduct(title, price, imageUrl, userId, category));
    // duda con profesor: por que no carga el producto en estado redux, si ya lo despache en la linea de codigo de abajo
    navigate(`/`);
  }

  return (
    <div style={{ textAlign: "center" }}>
      <Container>
        <form onSubmit={submitForm} style={{ width: "800px" }}>
          <h1 style={{ color: "#198754" }}>Add product:</h1>
          <Input
            value={title}
            onChange={(event) => setTitle(event.target.value)}
            type="text"
            placeholder="Product title"
            required
          />
          <Input
            value={price}
            onChange={(event) => setPrice(event.target.value)}
            type="number"
            placeholder="List price"
          />
          <Input
            value={imageUrl}
            onChange={(event) => setImageUrl(event.target.value)}
            type="text"
            placeholder="Image URL"
          />
          <div
            style={{
              textAlign: "left",
              margin: "8px 0 ",
            }}
          >
            <Select
              options={
                categories
                  ? categories
                      .filter((category) => category.name !== "all")
                      .map((category, i) => ({
                        label:
                          category.name.charAt(0).toUpperCase() +
                          category.name.slice(1),
                        value: category.name,
                      }))
                  : []
              }
              onChange={handleSelectChange}
            />
          </div>

          <button
            variant="primary"
            type="submit"
            className="btn btn-outline-success"
            style={{ marginTop: "1rem" }}
          >
            Publish!
          </button>
        </form>
        <CardBody>
          {imageUrl ? (
            <CardHeaderImg
              src={imageUrl}
              alt="preview"
              thumbnail
              width={"300px"}
            />
          ) : null}
        </CardBody>
      </Container>
    </div>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: row;
  margin: 15%;
`;

// const SubText = styled.p`
//   text-align: center;
//   color: #1e3163;
//   padding: 20px 0px 5px 0px;
// `;

const CardBody = styled.div`
  margin: 30px;
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 0 2px 20px rgba(0, 0, 0, 0.2);
  overflow: hidden;
  width: 500px;
  height: 350px;
`;

const CardHeaderImg = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;
