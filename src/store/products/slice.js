import { createSlice } from "@reduxjs/toolkit";

const initialState = { allProducts: [], productDetails: null };

export const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    fetchProductsSuccess: (state, action) => {
      state.allProducts = [...state.allProducts, ...action.payload];
      // console.log(action.payload);
      // console.log("hola");
    },
    productsDetailsFetched: (state, action) => {
      state.productDetails = action.payload;
    },
    loginSuccessProducts: (state, action) => {
      // console.log(action.payload);
      state.allProducts = [...state.allProducts, action.payload.space];
    },
    deleteProductInRedux: (state, action) => {
      const productId = action.payload;
      state.allProducts = state.allProducts.filter(
        (product) => product.id !== productId
      );
    },
    addProductInRedux: (state, action) => {
      console.log(action.payload);

      state.allProducts = [...state.allProducts, action.payload];
    },
  },
});

export const {
  fetchProductsSuccess,
  productsDetailsFetched,
  loginSuccessProducts,
  deleteProductInRedux,
  addProductInRedux,
} = productsSlice.actions;

export default productsSlice.reducer;
