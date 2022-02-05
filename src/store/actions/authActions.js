import { APICall } from "../../helper/api";
import { AREA } from "../../helper/constants";
export const signIn = (credentials) => {
  return (dispatch) => {
    new APICall({
      module: "auth",
      apiName: "login",
      area: AREA.NO_AUTH,
      params: credentials,
    })
      .getResponse()
      .then((user) => {
        localStorage["user"] = JSON.stringify(user.data);
        dispatch({
          type: "LOGIN_SUCCESS",
          user: user.data,
        });
      })
      .catch((err) => {
        dispatch({
          type: "LOGIN_ERROR",
          err,
        });
      });
  };
};

export const checkAuth = () => {
  return (dispatch) => {
    if (localStorage["user"]) {
      let user = JSON.parse(localStorage["user"]);
      dispatch({
        type: "LOGIN_SUCCESS",
        user: user,
      });
      new APICall({
        module: "auth",
        apiName: "checkAuth",
        area: AREA.SECURE,
        params: null,
      })
        .getResponse()
        .then((user) => {
          localStorage["user"] = JSON.stringify(user.data);
        })
        .catch(() => {
          delete localStorage["user"];
          window.location.reload();
        });
    }
  };
};

export const signOut = () => {
  return (dispatch) => {
    delete localStorage["user"];
    dispatch({
      type: "SIGNOUT_SUCCESS",
    });
  };
};
