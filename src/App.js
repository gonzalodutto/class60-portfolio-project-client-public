import "./App.css";
import "./bootstrap-custom.css";
import "bootstrap/dist/css/bootstrap.min.css";
import styled from "styled-components";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getUserWithStoredToken } from "./store/user/thunks";
import { fetchProducts } from "./store/products/thunks";
import { fetchShops } from "./store/shops/thunks";
import { Routes, Route } from "react-router-dom";
import { MessageBox, NavBar, Footer } from "./components";
import {
  Homepage,
  Login,
  SignUp,
  DetailPage,
  AddProductPage,
  NewsFeedPage,
  ArticlePage,
  MapPage,
  InvoicePage,
  ShopDetailPage,
} from "./pages";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUserWithStoredToken());
    dispatch(fetchProducts());
    dispatch(fetchShops());
  }, [dispatch]);

  return (
    <>
      <NavBar />
      <Main>
        <MessageBox />
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<Login />} />
          <Route path="/products/:id" element={<DetailPage />} />
          <Route path="/products/new" element={<AddProductPage />} />
          <Route path="/feed/news" element={<NewsFeedPage />} />
          <Route path="/feed/news/:id" element={<ArticlePage />} />
          <Route path="/map" element={<MapPage />} />
          <Route path="/shopcard" element={<InvoicePage />} />
          <Route path="/shops/:id" element={<ShopDetailPage />} />
        </Routes>
      </Main>
      <Footer />
    </>
  );
}

export default App;

const Main = styled.div`
  /* margin-top: 45px; */
`;
