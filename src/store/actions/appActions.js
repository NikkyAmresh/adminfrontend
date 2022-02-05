import { APICall } from "../../helper/api";
import { AREA } from "../../helper/constants";

export const getAllUsers = (page) => {
  return (dispatch) => {
    new APICall({
      module: "user",
      apiName: "getUsers",
      area: AREA.SECURE,
      params: page,
    })
      .getResponse()
      .then((data) => {
        console.log("data fetched", data);
        dispatch({
          type: "getUsers",
          value: data.data,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };
};

export const addUser = (user) => {
  return (dispatch) => {
    dispatch({
      type: "addUserInit",
    });
    new APICall({
      module: "user",
      apiName: "create",
      area: AREA.SECURE,
      params: user,
    })
      .getResponse()
      .then(() => {
        dispatch({
          type: "addUser",
          value: { id: new Date().getTime(), ...user },
        });
      })
      .catch((err) => {
        console.log(err);
        dispatch({
          type: "addUserError",
          value: err.response.data.message,
        });
      });
  };
};

export const deleteUser = (userId) => {
  return (dispatch) => {
    dispatch({
      type: "deleteUserInit",
    });
    new APICall({
      module: "user",
      apiName: "delete",
      area: AREA.SECURE,
      params: userId,
    })
      .getResponse()
      .then(() => {
        dispatch({
          type: "deleteUser",
          value: userId,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };
};
