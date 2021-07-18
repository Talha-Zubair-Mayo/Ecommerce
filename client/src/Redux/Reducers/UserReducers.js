import {
  User_Login_Request,
  User_Login_Success,
  User_Login_Fails,
} from "../Constants/UserConstants";

export const UserLoginReducer = (state = { userLogin: [] }, action) => {
  switch (action.type) {
    case User_Login_Request:
      return { loading: true };
    case User_Login_Success:
      return { loading: false, userLogin: action.payload };
    case User_Login_Fails:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
