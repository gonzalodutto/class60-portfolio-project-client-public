import styled from "styled-components";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { apiUrl } from "../config/constants";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useParams } from "react-router-dom";
import { addToInvoice } from "../store/shoppingCard/slice";
import { selectToken, selectUser } from "../store/user/selectors";
import { selectShops } from "../store/shops/selector";
import { selectProducts } from "../store/products/selectors";
import { selectInvoiceState } from "../store/shoppingCard/selectors";
import { FiShoppingCart } from "react-icons/fi";
import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import GoToTop from "../components/GoToTop";
import { deleteProduct } from "../store/products/thunks";

import axios from "axios";

const DetailPage = () => {
  const navigate = useNavigate();
  const timestamp = require("time-stamp");
  const dispatch = useDispatch();
  const params = useParams();
  const token = useSelector(selectToken);
  const user = useSelector(selectUser);
  const shops = useSelector(selectShops);
  const ProductsArray = useSelector(selectProducts);
  const invoiceState = useSelector(selectInvoiceState);
  const [product, setProduct] = useState("");

  const selectedShop = shops.filter((shop) => shop?.id === product.userId);

  useEffect(() => {
    try {
      const getProduct = async () => {
        const response = await axios.get(`${apiUrl}/products/${params.id}`);
        // console.log(response);
        setProduct(response.data);
      };
      getProduct();
    } catch (e) {
      console.log(e.message);
    }
  }, [params.id]);

  const onClickToInvoice = (product_id) => {
    const id = product_id;
    const selectedProduct = ProductsArray.filter(
      (product) => product.id === id
    );

    const selectedProductPlusInvoicePlace = {
      ...selectedProduct[0],
      invoiceProductId: parseInt(timestamp("YYYYMMDDHHmmss")),
    };

    const filterProduct = invoiceState.filter((product) => product.id === id);

    const productExistInShoppingCard = filterProduct[0]
      ? Object.values(filterProduct[0]).includes(id)
      : false;

    if (!productExistInShoppingCard) {
      dispatch(addToInvoice(selectedProductPlusInvoicePlace));
    }
  };

  const onClickDeleteAndGoHome = (product_id) => {
    dispatch(deleteProduct(product_id));
    navigate(`/`);
  };

  return (
    <ProductDetailsContainer>
      <Container>
        <Image src={product.imageUrl} />
        <InfoContainer>
          <div>
            <h2 style={{ marginBottom: "-5px" }}>{product.title} </h2>
            <small
              style={{
                fontSize: ".8rem",
                fontWeight: "normal",
              }}
            >
              {" "}
              Sold by{" "}
              <NavLink
                to={`/shops/${product.userId}`}
                className="link-secondary"
              >
                {selectedShop[0]?.commercialName}{" "}
              </NavLink>
            </small>
            <h4 style={{ marginTop: "2%", color: "#198754" }}>
              {new Intl.NumberFormat("de-DE", {
                style: "currency",
                currency: "EUR",
              }).format(product.price)}{" "}
            </h4>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime
              mollitia, molestiae quas vel sint commodi repudiandae consequuntur
              voluptatum laborum numquam blanditiis harum quisquam eius sed odit
              fugiat iusto fuga praesentium optio, eaque rerum! Provident
              similique accusantium nemo autem. Veritatis obcaecati tenetur iure
              eius earum ut molestias architecto voluptate aliquam nihil,
              eveniet aliquid culpa.
            </p>

            <ButtonsContainer>
              <button
                type="button"
                className="btn btn-outline-success"
                onClick={() => onClickToInvoice(product.id)}
              >
                Buy <FiShoppingCart />
              </button>
              {user?.id === product.userId ? (
                <div style={{ marginLeft: "1rem" }}>
                  <button
                    type="button"
                    className="btn btn-outline-danger"
                    onClick={() => onClickDeleteAndGoHome(product.id)}
                  >
                    Delet
                  </button>
                </div>
              ) : (
                ""
              )}
            </ButtonsContainer>
            <p>
              <small
                style={{
                  fontSize: ".8rem",
                  fontWeight: "normal",
                }}
              >
                Category{" "}
                <NavLink to={`/`} className="link-secondary">
                  {product.category}{" "}
                </NavLink>
              </small>
            </p>
          </div>
        </InfoContainer>
      </Container>
      {selectedShop[0]?.latitude ? (
        <MapContainer
          style={{
            height: "500px",
            width: "100%",
            margin: "auto",
            marginBottom: "-30px",
          }}
          center={[selectedShop[0]?.latitude, selectedShop[0]?.longitude]}
          zoom={10}
          scrollWheelZoom={false}
        >
          <TileLayer
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          <Marker
            key={selectedShop[0]?.commercialName}
            position={[selectedShop[0]?.latitude, selectedShop[0]?.longitude]}
          >
            <Popup>
              <img
                alt={selectedShop[0]?.commercialName}
                style={{ width: "100px", borderRadius: "0.5em" }}
                src={selectedShop[0]?.imageUrl}
              />
              <NavLink
                to={`/shops/${selectedShop[0]?.id}`}
                className="nav-link"
              >
                <p>{selectedShop[0]?.commercialName}</p>
              </NavLink>
            </Popup>
          </Marker>
        </MapContainer>
      ) : (
        ""
      )}
      <GoToTop />
    </ProductDetailsContainer>
  );
};

export { DetailPage };

const ProductDetailsContainer = styled.div``;

const Container = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: row;
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 0 2px 20px rgba(0, 0, 0, 0.2);
  overflow: hidden;
  height: 500px;
  max-width: 1250px;
  margin: 3% auto 3%;
`;

const Image = styled.img`
  max-width: 40%;
  max-height: 100%;
  display: block;
  object-fit: cover;
  border-radius: 5px 0 0 5px;
  box-shadow: 0 2px 20px rgba(0, 0, 0, 0.2);
`;

const InfoContainer = styled.div`
  margin: 2% 4%;
`;

const ButtonsContainer = styled.div`
  display: flex;
  flex-direction: row;
  margin-bottom: 1%;
`;
