import { FiShoppingCart } from "react-icons/fi";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { selectShops } from "../store/shops/selector";
import { selectProducts } from "../store/products/selectors";
import { selectInvoiceState } from "../store/shoppingCard/selectors";
import { addToInvoice } from "../store/shoppingCard/slice";
import { deleteProduct } from "../store/products/thunks";
import { selectUser } from "../store/user/selectors";

export const ProductCard = (props) => {
  const timestamp = require("time-stamp");
  const dispatch = useDispatch();
  const shops = useSelector(selectShops);
  const user = useSelector(selectUser);
  const ProductsArray = useSelector(selectProducts);
  const invoiceState = useSelector(selectInvoiceState);

  const selectedShop = shops.filter((shop) => shop?.id === props.userId);

  // Product to Invoice

  const onClickToInvoice = (product_id) => {
    const id = product_id;
    const selectedProduct = ProductsArray.filter(
      (product) => product.id === id
    );

    const selectedProductPlusInvoicePlace = {
      ...selectedProduct[0],
      invoiceProductId: parseInt(timestamp("YYYYMMDDHHmmss")),
    };

    // console.log(selectedProduct[0]);

    // let selectedProductPlusInvoicePlace = selectedProduct.map((item) =>
    //   Object.assign({}, item, { invoicePlace: invoiceState.length + 1 })
    // );

    const filterProduct = invoiceState.filter((product) => product.id === id);

    const productExistInShoppingCard = filterProduct[0]
      ? Object.values(filterProduct[0]).includes(id)
      : false;

    if (!productExistInShoppingCard) {
      dispatch(addToInvoice(selectedProductPlusInvoicePlace));
    }
  };

  return (
    <div className="card" style={{ width: "18rem", margin: "1.15rem" }}>
      <img
        src={props.imageUrl}
        className="card-img-top"
        alt="dfdgdfg"
        style={{
          width: "100%",
          height: "250px",
          objectFit: "cover",
        }}
      />
      <div className="card-body">
        <h5 className="card-title">
          {props.title}
          <br />
          <small style={{ fontSize: ".8rem", fontWeight: "normal" }}>
            {" "}
            Sold by{" "}
            <NavLink to={`/shops/${props.userId}`} className="link-secondary">
              {selectedShop[0]?.commercialName}{" "}
            </NavLink>
          </small>
        </h5>
        <p className="card-text">
          <b style={{ fontSize: "1.2rem", color: "#198754" }}>
            {" "}
            {new Intl.NumberFormat("de-DE", {
              style: "currency",
              currency: "EUR",
            }).format(props.price)}{" "}
            .-
          </b>{" "}
          Some quick example text to build on the card title and make up the
          bulk of the.
        </p>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <div>
            <button
              type="button"
              className="btn btn-outline-success"
              onClick={() => onClickToInvoice(props.id)}
            >
              Buy <FiShoppingCart />
            </button>
          </div>

          <div style={{ marginLeft: "1rem" }}>
            <NavLink
              to={`/products/${props.id}`}
              className="btn btn-outline-secondary"
            >
              + Info
            </NavLink>
          </div>
          {user?.id === props.userId || user?.commercialName === "Gonza" ? (
            <div style={{ marginLeft: "1rem" }}>
              <button
                type="button"
                className="btn btn-outline-danger"
                onClick={() => dispatch(deleteProduct(props.id))}
              >
                Delet
              </button>
            </div>
          ) : (
            ""
          )}
        </div>
      </div>
    </div>
  );
};
