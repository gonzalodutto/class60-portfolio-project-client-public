import styled from "styled-components";
import "bootstrap/dist/css/bootstrap.min.css";
import { CarouselComp, ProductCard, IconCard } from "../components";
import { selectProducts } from "../store/products/selectors";
import { useSelector } from "react-redux";
import { useState } from "react";
import { hardCodeCategories } from "../data/hardCoded";
import GoToTop from "../../src/components/GoToTop";

export const Homepage = () => {
  const ProductsArray = useSelector(selectProducts);
  const [filter, setFilter] = useState("all");
  const categories = hardCodeCategories;
  const paginationArray = ["Previous", "1", "2", "3", "Next"];

  const updateCategoryFilter = (category) => {
    setFilter(category);
  };

  return (
    <Container>
      <div
        style={{
          margin: "0 1rem 1rem 1rem",
        }}
      >
        <CarouselComp />
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
        {ProductsArray
          ? ProductsArray.filter((product) =>
              filter === "all" ? product : product.category === filter
            ).map((product, i) => (
              <ProductCard
                key={i}
                id={product.id}
                title={product.title}
                price={product.price}
                imageUrl={product.imageUrl}
                offers={product.offers}
                available={product.available}
                userId={product.userId}
              />
            ))
          : "loading..."}
      </CardsContainer>
      <nav aria-label="Page navigation example">
        <ul
          className="pagination justify-content-center"
          style={{ margin: "2rem" }}
        >
          {paginationArray
            ? paginationArray.map((element, i) => (
                <li className="page-item " key={i}>
                  <a className="page-link" href="/">
                    {element}
                  </a>
                </li>
              ))
            : ""}
        </ul>
      </nav>
      <GoToTop />
    </Container>
  );
};

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

// Amazing corousel for categories: https://www.npmjs.com/package/@itseasy21/react-elastic-carousel
