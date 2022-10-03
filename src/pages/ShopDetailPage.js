import styled from "styled-components";
import { hardCodeCategories } from "../data/hardCoded";
import { ProductCard, IconCard } from "../components";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectShops } from "../store/shops/selector";
import { selectProducts } from "../store/products/selectors";
import { NavLink } from "react-router-dom";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { addToInvoice } from "../store/shoppingCard/slice";
import GoToTop from "../../src/components/GoToTop";
import { selectUser } from "../store/user/selectors";

const ShopDetailPage = () => {
  const dispatch = useDispatch();
  const params = useParams();
  const shops = useSelector(selectShops);
  const ProductsArray = useSelector(selectProducts);
  const [filter, setFilter] = useState("all");
  const categories = hardCodeCategories;
  const user = useSelector(selectUser);

  const shopId = parseInt(params.id);
  const shop = shops.filter((shop) => shop.id === shopId);

  // console.log(shopId);
  // console.log(shop[0]?.id);
  // console.log(user.id);

  const filteredProducs = ProductsArray.filter(
    (product) => product.userId === shopId
  );

  const updateCategoryFilter = (category) => {
    setFilter(category);
  };

  const productToInvoice = (product_id) => {
    // console.log("Add this product to invoice:", product_id);
    const id = product_id;
    const selectedProduct = ProductsArray.filter(
      (product) => product.id === id
    );
    // console.log(selectedProduct);

    dispatch(addToInvoice(selectedProduct));
  };

  return (
    <Container>
      <div
        className="jumbotron"
        style={{
          backgroundImage: `url(${shop[0]?.imageUrl})`,
          height: "50vh",
          borderRadius: "10px",
          boxShadow: "0 2px 20px rgba(0, 0, 0, 0.2)",
          margin: "20px",
        }}
      >
        <div
          className="mask"
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            backgroundColor: "rgba(0, 0, 0, 0.4)",
            height: "50vh",
            borderRadius: "10px",
            padding: "40px",
            color: "white",
          }}
        >
          <div>
            <h1 className="display-6">
              Wellcome to{" "}
              <b style={{ fontSize: "3rem" }}> {shop[0]?.commercialName}</b>{" "}
              shop section{" "}
            </h1>

            <p className="lead">
              In this section you can see and buy all the products that{" "}
              <b>{shop[0]?.commercialName}</b> shop sells. If you want to see
              the complete catalog of Bukloo.com products, go to the home page.
            </p>
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-end",
            }}
          >
            <hr className="my-4" />
            <p>
              To see the full catalog of all the shops sellers, go to Home Page.
            </p>
            <p className="lead">
              {user?.id === shop[0]?.id ? (
                <NavLink
                  to="/products/new"
                  className="btn btn-success"
                  style={{ marginRight: "1rem" }}
                >
                  Publish product
                </NavLink>
              ) : (
                ""
              )}
              <NavLink to="/" className="btn btn-success">
                Go to HomePage
              </NavLink>
            </p>
          </div>
        </div>
      </div>

      <div
        style={{
          display: "flex",
          flexDirection: "row",
          flexWrap: "wrap",
          justifyContent: "center",
        }}
      >
        {categories
          ? categories.map((category, i) => (
              <IconCard
                key={i}
                name={category.name}
                icon={category.icon}
                changeCategoryFilter={updateCategoryFilter}
              />
            ))
          : ""}
      </div>
      <CardsContainer>
        {filteredProducs
          ? filteredProducs
              .filter((product) =>
                filter === "all" ? product : product.category === filter
              )
              .map((product, i) => (
                <ProductCard
                  key={i}
                  id={product.id}
                  title={product.title}
                  price={product.price}
                  imageUrl={product.imageUrl}
                  offers={product.offers}
                  available={product.available}
                  userId={product.userId}
                  productToInvoice={productToInvoice}
                />
              ))
          : "loading..."}
      </CardsContainer>

      <GoToTop />
    </Container>
  );
};

export { ShopDetailPage };

const Container = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  margin: auto;
  max-width: 1300px;
`;

const CardsContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
`;
