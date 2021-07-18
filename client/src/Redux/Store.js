import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import {
  ProductListReducer,
  ProductDetailsReducer,
} from "../Redux/Reducers/ProductReducers";
import { UserLoginReducer } from "./Reducers/UserReducers";

const reducer = combineReducers({
  productList: ProductListReducer,
  productDetail: ProductDetailsReducer,
  userLogin: UserLoginReducer,
});
const initialState = {};
const middleware = [thunk];
const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
