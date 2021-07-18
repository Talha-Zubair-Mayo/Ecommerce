import {
  Product_List_Request,
  Product_List_Success,
  Product_List_Fails,
  Product_Details_Request,
  Product_Details_Success,
  Product_Details_Fails,
} from "../Constants/ProductConstants";

export const ProductListReducer = (state = { products: [] }, action) => {
  switch (action.type) {
    case Product_List_Request:
      return { loading: true, products: [] };
    case Product_List_Success:
      return { loading: false, products: action.payload };
    case Product_List_Fails:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const ProductDetailsReducer = (state = { product:{}}, action) => {
  switch (action.type) {
    case Product_Details_Request:
      return { loading: true, ...state };
    case Product_Details_Success:
      return { loading: false, product: action.payload };
    case Product_Details_Fails:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
