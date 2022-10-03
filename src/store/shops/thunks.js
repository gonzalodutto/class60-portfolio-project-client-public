import { fetchShopsSuccess } from "./slice";
import axios from "axios";
import { apiUrl } from "../../config/constants";

export const fetchShops = () => {
  return async (dispatch, getState) => {
    try {
      const response = await axios.get(`${apiUrl}/users`);

      //   console.log(response.data);
      dispatch(fetchShopsSuccess(response.data));
    } catch (e) {
      console.log(e.message);
    }
  };
};
