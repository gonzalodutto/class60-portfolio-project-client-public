import { createSlice, current } from "@reduxjs/toolkit";

const initialState = {
  productsInInvoice: [
    // {
    //   id: "HC1526",
    //   title: "E.g.: Website design",
    //   price: "300",
    //   quantity: 0,
    //   invoiceProductId: 1,
    // },
    // {
    //   id: "HC1356",
    //   title: "E.g.: Hosting (3 months)",
    //   price: "75",
    //   quantity: 0,
    //   invoiceProductId: 2,
    // },
    // {
    //   id: "HC6565",
    //   title: "E.g.: Domain name (1 year)",
    //   price: "12",
    //   quantity: 0,
    //   invoiceProductId: 3,
    // },
  ],
};

export const shoppingCardSlice = createSlice({
  name: "shoppingCard",
  initialState,
  reducers: {
    addToInvoice: (state, action) => {
      state.productsInInvoice = [
        ...state.productsInInvoice,
        { ...action.payload },
      ];
      // console.log(action.payload);
      // console.log("hola");
    },
    deletInInvoice: (state, action) => {
      const invoiceProductId = action.payload;
      // console.log(action.payload);
      // console.log(invoiceProductId);
      state.productsInInvoice = state.productsInInvoice.filter(
        (product) => product.invoiceProductId !== invoiceProductId
      );
      console.log(current(state), `delete`);
    },
    changeQuantity: (state, action) => {
      // Get payload data in a variable
      const invoiceProductId = action.payload.invoiceProductId;
      const quantityToChange = parseInt(action.payload.toChange);
      const isNegativeNumber = quantityToChange < 0;
      // console.log(isNegativeNumber);
      // Filter product to modify from the redux initialState
      const selectedProduct = state.productsInInvoice.filter(
        (product) => product.invoiceProductId === invoiceProductId
      );
      // Change value "completed" of the product
      if (!isNegativeNumber) {
        selectedProduct[0].quantity =
          selectedProduct[0].quantity + quantityToChange;
      } else if (isNegativeNumber & (selectedProduct[0].quantity > 1)) {
        selectedProduct[0].quantity =
          selectedProduct[0].quantity + quantityToChange;
      }
      // Create a new array with the new product updated
      const newProductsArray = [
        ...state.productsInInvoice.filter(
          (product) => product.invoiceProductId !== invoiceProductId
        ),
        ...selectedProduct,
      ];
      // update tasks array in redux initialState
      state.productsInInvoice = newProductsArray;
    },
    applyDiscount: (state, action) => {
      const discountValue = action.payload.discountValue;
      const invoiceProductId = action.payload.invoiceProductId;
      // console.log(discountValue, invoiceProductId);
      // Filter product to modify from the redux initialState
      const selectedProduct = state.productsInInvoice.filter(
        (product) => product.invoiceProductId === invoiceProductId
      );
      // Change value "completed" of the product
      selectedProduct[0].discount = parseInt(discountValue);
      // Create a new array with the new product updated
      const newProductsArray = [
        ...state.productsInInvoice.filter(
          (product) => product.invoiceProductId !== invoiceProductId
        ),
        ...selectedProduct,
      ];
      // update tasks array in redux initialState
      state.productsInInvoice = newProductsArray;
    },
  },
});

export const { addToInvoice, deletInInvoice, changeQuantity, applyDiscount } =
  shoppingCardSlice.actions;

export default shoppingCardSlice.reducer;
