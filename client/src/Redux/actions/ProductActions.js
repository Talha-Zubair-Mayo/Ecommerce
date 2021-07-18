import {
  Product_List_Request,
  Product_List_Success,
  Product_List_Fails,
  Product_Details_Request,
  Product_Details_Success,
  Product_Details_Fails,
} from "../Constants/ProductConstants";

import axios from "axios";
export const ListProducts = () => async (dispatch) => {
  try {
    dispatch({
      type: Product_List_Request,
    });
    const res = await axios.get(`http://localhost:5000/api/products`);
    dispatch({
      type: Product_List_Success,
      payload: res.data.products,
    });
  } catch (error) {
    dispatch({
      type: Product_List_Fails,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const productDetails = (_id) => async (dispatch) => {
  try {
    dispatch({
      type: Product_Details_Request,
    });
    const res = await axios.get(`http://localhost:5000/api/products/${_id}`);
    dispatch({
      type: Product_Details_Success,
      payload: res.data,
    });
  } catch (error) {
    dispatch({
      type: Product_Details_Fails,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
