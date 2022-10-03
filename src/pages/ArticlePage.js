import styled from "styled-components";
import { apiUrl } from "../config/constants";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { selectToken, selectUser } from "../store/user/selectors";
import { postOffer, acceptOffer } from "../store/products/thunks";
import axios from "axios";

const ArticlePage = () => {
  const dispatch = useDispatch();
  const params = useParams();
  const token = useSelector(selectToken);
  const user = useSelector(selectUser);
  const [product, setProduct] = useState("");
  const [offersList, setOffersList] = useState("");
  const [offer, setOffer] = useState("");
  const [trigger, setTrigger] = useState(false);
  const [amountsArray, setAmountsArray] = useState("");
  const maxOffer =
    amountsArray.length === 0 ? product.price : Math.max(...amountsArray);

  useEffect(() => {
    try {
      const getProduct = async () => {
        const response = await axios.get(`${apiUrl}/products/${params.id}`);
        // console.log(response);
        setProduct(response.data);
        setOffersList(response.data.offers);
        setAmountsArray(
          response.data.offers.map(function (el) {
            return el.amount;
          })
        );
      };
      getProduct();
    } catch (e) {
      console.log(e.message);
    }
  }, [params.id, trigger]);

  function submitForm(event) {
    event.preventDefault();

    const productId = product.id;
    const userId = user.id;
    const userEmail = user.email;

    dispatch(postOffer(offer, productId, userId, userEmail, maxOffer));

    setOffer("");

    setTimeout(() => {
      setTrigger(!trigger);
    }, 500);
  }

  const triggerAcceptOffer = (offerId) => {
    dispatch(acceptOffer(offerId, product.id));
    console.log(offerId, product.id);

    setTimeout(() => {
      setTrigger(!trigger);
    }, 500);
  };

  return (
    <Container>
      <Header>
        <CardHeaderImg src={product.imageUrl} alt="safd" />
      </Header>
      <TextContainer>
        <h3>{product.title} </h3>
        <h4>
          List price:{" "}
          {new Intl.NumberFormat("de-DE", {
            style: "currency",
            currency: "EUR",
          }).format(product.price)}{" "}
        </h4>
        <h3> Offers:</h3>
        {offersList
          ? offersList.map((offer, i) => (
              <div key={i}>
                <div>
                  {" "}
                  <b>{offer.email}: </b>
                  {new Intl.NumberFormat("de-DE", {
                    style: "currency",
                    currency: "EUR",
                  }).format(offer.amount)}
                  {token &&
                  user?.isSeller === true &&
                  user?.id === product.userId ? (
                    <button onClick={() => triggerAcceptOffer(offer.id)}>
                      Accept
                    </button>
                  ) : (
                    ""
                  )}
                  {offer.accepted ? "Accepted" : ""}
                </div>
              </div>
            ))
          : "loading..."}
      </TextContainer>
      <TextContainer>
        {token && user?.isSeller !== true && product?.available === true ? (
          <form onSubmit={submitForm}>
            <div>
              <label>
                Your offer (minimum: $
                {maxOffer === null ? product.price + 1 : maxOffer + 1}):
                <input
                  value={offer}
                  onChange={(event) => setOffer(event.target.value)}
                  type="number"
                  placeholder="Your offer here"
                  min={maxOffer === null ? product.price + 1 : maxOffer + 1}
                  required
                />
              </label>
              <button variant="primary" type="submit">
                Offer!
              </button>
            </div>
          </form>
        ) : (
          ""
        )}
      </TextContainer>
    </Container>
  );
};

export { ArticlePage };

const Container = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 0 2px 20px rgba(0, 0, 0, 0.2);
  overflow: hidden;

  width: 1000px;
  display: block;
  margin: 90px auto 0;
`;

const Header = styled.div`
  width: 100%;
  /* padding: 30px; */
  object-fit: cover;
`;

const TextContainer = styled.div`
  margin: 30px;
`;

const CardHeaderImg = styled.img`
  width: 100%;
  height: 500px;
  object-fit: cover;
`;
