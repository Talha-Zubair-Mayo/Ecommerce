import axios from "axios";

import {
  User_Login_Request,
  User_Login_Success,
  User_Login_Fails,
} from "../Constants/UserConstants";

export const LoginAction = (email, pass) => async (dispatch) => {
  try {
    dispatch({
      type: User_Login_Request,
    });
    const config = { Headers: { "content-type": "application/json" } };
    const res = await axios.post(
      `http://localhost:5000/api/login`,
      { email, pass },
      config
      );
    //   console.log(res);
    dispatch({
      type: User_Login_Success,
      payload: res,
    });
  } catch (error) {
    dispatch({
      type: User_Login_Fails,
      payload:
        error.response && error.response.data.msg
          ? error.response.data.msg
          : error.msg,
    });
  }
};
