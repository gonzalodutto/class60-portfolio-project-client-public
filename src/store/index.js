import { configureStore } from "@reduxjs/toolkit";

import appStateReducer from "./appState/slice";
import userReducer from "./user/slice";
import productsReducer from "./products/slice";
import shoppingCardReducer from "./shoppingCard/slice";
import shopsReducer from "./shops/slice";

export default configureStore({
  reducer: {
    appState: appStateReducer,
    user: userReducer,
    products: productsReducer,
    shoppingCard: shoppingCardReducer,
    shops: shopsReducer,
  },
});
