import "./InvoicePage.css";
import { FiPrinter, FiPlus, FiMinus } from "react-icons/fi";
import { RiPaypalLine } from "react-icons/ri";
import { IoInfiniteSharp } from "react-icons/io5";
import { NavLink } from "react-router-dom";
import { apiUrl } from "../config/constants";
import { useEffect, useState, useRef } from "react";
import axios from "axios";
import Select from "react-select";
import { selectInvoiceState } from "../store/shoppingCard/selectors";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import {
  addToInvoice,
  deletInInvoice,
  applyDiscount,
} from "../store/shoppingCard/slice";
import { FiDelete } from "react-icons/fi";
import { changeQuantity } from "../store/shoppingCard/slice";
import { useReactToPrint } from "react-to-print";
import { selectUser } from "../store/user/selectors";

const InvoicePage = () => {
  const timestamp = require("time-stamp");
  const invoiceState = useSelector(selectInvoiceState);
  const user = useSelector(selectUser);
  const dispatch = useDispatch();
  const [products, setProducts] = useState("");
  // const [invoiceProducts, setInvoiceProducts] = useState(invoiceState);
  const [selectedProduct, setSelectedProduct] = useState();
  const [quantity, setQuantity] = useState(1);
  const [tempState, setTempState] = useState([]);

  // Fetching data from Backend point:

  useEffect(() => {
    if (user?.id === "USER ID NUMBER") {
      try {
        const getProduct = async () => {
          const response = await axios.get(`${apiUrl}/"USER ENDPOINT API"`);
          // console.log(response.data);
          setProducts(response.data);
        };
        getProduct();
      } catch (e) {
        console.log(e.message);
      }
    } else if (user?.id === "USER ID NUMBER") {
      try {
        const getProduct = async () => {
          const response = await axios.get(`${apiUrl}/"USER ENDPOINT API"`);
          // console.log(response.data);
          setProducts(response.data);
        };
        getProduct();
      } catch (e) {
        console.log(e.message);
      }
    } else {
      try {
        const getProduct = async () => {
          const response = await axios.get(`${apiUrl}/"USER ENDPOINT API"`);
          // console.log(response.data);
          setProducts(response.data);
        };
        getProduct();
      } catch (e) {
        console.log(e.message);
      }
    }
  }, []);

  // Money formatter:

  const formatter = new Intl.NumberFormat("de-DE", {
    style: "currency",
    currency: "EUR",
  });

  // Date formating and declaration

  const now = new Date();
  const options = {
    hour: "numeric",
    minute: "numeric",
    day: "numeric",
    month: "long",
    year: "numeric",
    weekday: "long",
  };

  const options2 = {
    year: "numeric",
    month: "numeric",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
  };

  const locale = navigator.language;

  const dateTime = new Intl.DateTimeFormat(locale, options).format(now);

  const printDateTime = new Intl.DateTimeFormat(locale, options2).format(now);

  // Calculate subtotals and total

  const subTotals = [];

  const subTotalsToArray = () => {
    invoiceState.map((product) => {
      // const subTotal = parseInt(product.quantity) * parseFloat(product.price);
      const subTotal = product.discount
        ? ((parseFloat(product.price) * parseInt(product.quantity)) / 100) *
          (100 - parseInt(product.discount))
        : parseFloat(product.price) * parseInt(product.quantity);
      return subTotals.push(subTotal);
    });
  };

  subTotalsToArray();

  // console.log(subTotalsToArray);

  const totalInvoice = subTotals.reduce((partialSum, a) => partialSum + a, 0);

  // "Select product to add" Form submit function

  const handleSelectChange = (event) => {
    const selectedFormProduct = products.filter(
      (product) => product.id === event.value
    );

    setSelectedProduct(selectedFormProduct);
    setTempState(event);
  };

  const onSelectSubmit = (e) => {
    e.preventDefault();

    const productWithQuantity = {
      ...selectedProduct[0],
      quantity,
      invoiceProductId: parseInt(timestamp("YYYYMMDDHHmmss")),
    };

    // addQuantityToSelectedProduct(quantity);
    dispatch(addToInvoice(productWithQuantity));
    setQuantity(1);
    setTempState([]);
  };

  // Delete product from invoice

  const onClickDelet = (id) => {
    dispatch(deletInInvoice(id));
  };

  // Change quantity

  const onClickChangeQuantity = (invoiceProductId, toChange) => {
    dispatch(changeQuantity({ invoiceProductId, toChange }));
  };

  // Loop focus in form logic

  const handleEnter = (event) => {
    if (event.key.toLowerCase() === "enter") {
      const form = event.target.form;
      const index = [...form].indexOf(event.target);
      if (index === form.elements.length - 2) {
        form.elements[0].focus();
      } else {
        form.elements[index + 1].focus();
        form.elements[index + 1].select();
        event.preventDefault();
      }
    }
  };

  // Print feature

  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
    documentTitle: `Invoice: ${printDateTime}`,
  });

  // Discount logic

  function handleDiscountChange(object) {
    const discountValue = object.e.target.value;
    const invoiceProductId = object.invoiceProductId;
    dispatch(applyDiscount({ discountValue, invoiceProductId }));
  }

  // if (selectedProduct && selectedProduct[0]) {
  //   console.log("products", products, selectedProduct);
  // }

  return (
    <div>
      {user?.isSeller === true ? (
        <div style={{ margin: "2rem" }}>
          <div className="magic-search-bar">
            <div
              style={{
                maxWidth: "900px",
                margin: "1rem auto 1rem",
              }}
            >
              <form
                onSubmit={onSelectSubmit}
                onKeyDown={handleEnter}
                style={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "flex-end",
                  flexWrap: "wrap",
                }}
              >
                <div style={{ flex: "1" }}>
                  <Select
                    options={
                      products
                        ? products.map((product, i) => ({
                            label:
                              product.id +
                              ` - ` +
                              product.title +
                              ` - ` +
                              formatter.format(parseFloat(product.price)),
                            value: product.id,
                          }))
                        : []
                    }
                    onChange={handleSelectChange}
                    autoFocus
                    value={tempState}
                  />
                </div>

                <input
                  type="number"
                  value={quantity}
                  onChange={(e) => setQuantity(parseInt(e.target.value))}
                  className="form-control"
                  style={{ width: "3.5rem", marginLeft: "2rem" }}
                />
                <button
                  type="submit"
                  className="btn btn-outline-light"
                  style={{ marginLeft: "2rem" }}
                >
                  Add
                </button>
              </form>
            </div>
          </div>
        </div>
      ) : (
        ""
      )}

      <div ref={componentRef} style={{ margin: "2rem" }}>
        <div className="invoice-box">
          {user?.logoUrl === "" || !user ? (
            <div>
              <div style={{ textAlign: "center" }}>
                <NavLink
                  to={"/"}
                  className="navbar-brand"
                  style={{ margin: "auto" }}
                >
                  <IoInfiniteSharp
                    style={{
                      fontSize: "30px",
                      marginRight: "0.5rem",
                      // color: "white",
                    }}
                  />
                  Bukloo
                  <small style={{ fontSize: "15px", color: "gray" }}>
                    .com
                  </small>
                </NavLink>
              </div>
              <div className="divider div-transparent"></div>
            </div>
          ) : (
            <div style={{ textAlign: "center", marginBottom: "2rem" }}>
              <img src={user?.logoUrl} alt="logo" width="300px" />
            </div>
          )}
          <table>
            <tbody>
              <tr className="heading">
                <td>Code</td>
                <td></td>
                <td>Qty</td>
                <td></td>
                <td>Description</td>
                <td></td>
                <td>SubTotal</td>
                <td></td>
              </tr>
              {invoiceState
                ? [...invoiceState]
                    .sort((a, b) => a.invoiceProductId - b.invoiceProductId)
                    .map((product, i) => (
                      <tr className="item" key={i}>
                        <td>{product.id} </td>
                        <td>
                          {!product.imageUrl ? (
                            <button
                              onClick={() =>
                                onClickChangeQuantity(
                                  product.invoiceProductId,
                                  -1
                                )
                              }
                              style={{
                                all: "unset",
                                cursor: "pointer",
                              }}
                            >
                              <FiMinus style={{ color: "tomato" }} />
                            </button>
                          ) : (
                            ""
                          )}{" "}
                        </td>
                        <td
                          style={{
                            position: "relative",
                          }}
                        >
                          <div
                            style={{
                              all: "unset",
                              cursor: "pointer",
                            }}
                          >
                            {product.quantity}{" "}
                          </div>
                        </td>
                        <td>
                          {!product.imageUrl ? (
                            <button
                              onClick={() =>
                                onClickChangeQuantity(
                                  product.invoiceProductId,
                                  1
                                )
                              }
                              style={{
                                all: "unset",
                                cursor: "pointer",
                              }}
                            >
                              <FiPlus style={{ color: "rgb(25,135,84)" }} />
                            </button>
                          ) : (
                            ""
                          )}
                        </td>
                        <td>
                          {" "}
                          {product.description
                            ? product.description
                            : product.title}{" "}
                          - {formatter.format(parseFloat(product.price))}
                        </td>

                        <td>
                          <input
                            type="number"
                            onChange={(e) =>
                              handleDiscountChange({
                                e,
                                invoiceProductId: product.invoiceProductId,
                              })
                            }
                            value={product.discount || ""}
                            className="form-control"
                            style={{
                              width: "3rem",
                              height: "1.5rem",
                            }}
                          />
                        </td>
                        <td>
                          {product.discount
                            ? formatter.format(
                                ((parseFloat(product.price) *
                                  parseInt(product.quantity)) /
                                  100) *
                                  (100 - parseInt(product.discount))
                              )
                            : formatter.format(
                                parseFloat(product.price) *
                                  parseInt(product.quantity)
                              )}
                        </td>
                        <td>
                          <button
                            onClick={() =>
                              onClickDelet(product.invoiceProductId)
                            }
                            style={{ all: "unset", cursor: "pointer" }}
                          >
                            <FiDelete style={{ color: "tomato" }} />
                          </button>
                        </td>
                      </tr>
                    ))
                : ""}

              <tr className="total">
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
              </tr>
            </tbody>
          </table>{" "}
          {invoiceState.length === 0 ? (
            <div>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  textAlign: "center",
                  marginTop: "2rem",
                  color: "grey",
                }}
              >
                <h4>
                  In this invoice <br /> you are going to see all
                  <br /> the products that you select to buy.-
                </h4>{" "}
              </div>
              <div
                style={{
                  opacity: 0.1,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <img
                  src="https://www.iconpacks.net/icons/2/free-shopping-cart-icon-3041-thumb.png"
                  alt="shopping-cart"
                  style={{ maxWidth: "100%", height: "auto" }}
                />
              </div>
            </div>
          ) : (
            ""
          )}
          <div
            style={{
              textAlign: "right",
              marginTop: "1rem",
              marginRight: "1rem",
            }}
          >
            <b style={{ fontSize: "1.3rem" }}>
              Total: {formatter.format(totalInvoice)}
            </b>{" "}
          </div>
          <div className="dividerBotton div-transparent"></div>
          <div style={{ textAlign: "center", margin: "1rem" }}>{dateTime}</div>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "flex-end",
              justifyContent: "flex-end",
              marginTop: "2rem",
            }}
          >
            {" "}
            <div>
              <button
                onClick={handlePrint}
                type="button"
                className="btn btn-outline-secondary"
              >
                <FiPrinter /> Print
              </button>
            </div>
            <div>
              <button
                type="button"
                className="btn btn-success"
                style={{ marginLeft: "1rem" }}
              >
                <RiPaypalLine /> Pay
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export { InvoicePage };
