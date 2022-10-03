import { apiUrl } from "../../config/constants";
import axios from "axios";
import { fetchProductsSuccess } from "./slice";
import { showMessageWithTimeout } from "../appState/thunks";
import { deleteProductInRedux, addProductInRedux } from "./slice";
export const FETCH_LISTINGS_SUCCESS = "FETCH_LISTINGS_SUCCESS";
export const LISTING_DETAILS_FETCHED = "LISTING_DETAILS_FETCHED";

export const fetchProducts = () => {
  return async (dispatch, getState) => {
    try {
      const response = await axios.get(`${apiUrl}/products`);

      //   console.log(response.data);
      dispatch(fetchProductsSuccess(response.data));
    } catch (e) {
      console.log(e.message);
    }
  };
};

export const postOffer = (offer, productId, userId, userEmail, maxOffer) => {
  return async (dispatch, getState) => {
    try {
      const token = getState().user.token;
      // const response =
      await axios.post(
        `${apiUrl}/products/offers`,
        {
          email: userEmail,
          amount: offer,
          userId: userId,
          productId: productId,
          maxOffer: maxOffer,
        },
        {
          headers: {
            authorization: `Bearer ${token}`,
          },
        }
      );

      // console.log(response.data);
      dispatch(showMessageWithTimeout("success", true, "Offer posted"));
    } catch (e) {
      console.log(e.message);
    }
  };
};

export const acceptOffer = (offerId, productId) => {
  return async (dispatch, getState) => {
    try {
      const token = getState().user.token;
      // const response =
      await axios.patch(
        `${apiUrl}/products/${productId}`,
        {
          offerId: offerId,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      console.log(offerId, productId);
    } catch (e) {
      console.log(e.message);
    }
  };
};

export const postProduct = (title, price, imageUrl, userId, category) => {
  return async (dispatch, getState) => {
    try {
      const token = getState().user.token;
      // const response =
      const response = await axios.post(
        `${apiUrl}/products/post`,
        {
          title: title,
          price: price,
          imageUrl: imageUrl,
          userId: userId,
          category: category,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      console.log(response.data);

      dispatch(addProductInRedux(response.data));
      dispatch(showMessageWithTimeout("success", true, "Product posted"));
    } catch (e) {
      console.log(e.message);
    }
  };
};

export const deleteProduct = (productId) => {
  return async (dispatch, getState) => {
    try {
      const token = getState().user.token;
      const response = await axios.delete(`${apiUrl}/products/${productId}`, {
        headers: {
          authorization: `Bearer ${token}`,
        },
      });

      dispatch(deleteProductInRedux(productId));
    } catch (e) {
      console.log(e.message);
    }
  };
};
