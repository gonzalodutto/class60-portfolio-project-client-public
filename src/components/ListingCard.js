import { NavLink } from "react-router-dom";
import styled from "styled-components";

export const ProductCard = (props) => {
  return (
    <CardBody>
      <CardHeaderImg src={props.imageUrl} alt="asf" width="200px" />
      <TextArea>
        <div>Adress: {props.title}</div>
        <div>
          Price:{" "}
          {new Intl.NumberFormat("de-DE", {
            style: "currency",
            currency: "EUR",
          }).format(props.price)}
        </div>
        <div>Offers: {props.offers.length} </div>
        <HorizontalTextArea>
          <div>
            <NavLink to={`/products/${props.id}`}>
              <button>Details</button>
            </NavLink>
          </div>
          <div>{props.available ? "Available" : "Not available"} </div>
        </HorizontalTextArea>
      </TextArea>
    </CardBody>
  );
};

const CardBody = styled.div`
  display: flex;
  flex-direction: column;
  margin: 15px;
  background-color: #fff;
  border-radius: 5px;
  box-shadow: 0 2px 20px rgba(0, 0, 0, 0.2);
  overflow: hidden;
  width: 290px;
  height: 450px;
`;

const CardHeaderImg = styled.img`
  width: 100%;
  height: 300px;
  object-fit: cover;
`;

const TextArea = styled.div`
  margin: 20px;
`;

const HorizontalTextArea = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin: 5px 15px 0 0;
`;
