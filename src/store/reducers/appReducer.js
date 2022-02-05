const initState = {
  users: [],
  userCreated: false,
  userDeleted: false,
  creationErrors: [],
};

const appReducer = (state = initState, action) => {
  switch (action.type) {
    case "addUserInit":
      state.userCreated = false;
      state.creationErrors = [];
      return {
        ...state,
      };
    case "addUser":
      debugger;
      if (state.users.length) {
        state.users.push(action.value);
      } else {
        state.users = [action.value];
      }
      state.creationErrors = [];
      state.userCreated = true;
      return {
        ...state,
      };

    case "deleteUserInit":
      state.userCreated = false;
      state.userDeleted = false;
      return {
        ...state,
      };

    case "deleteUser":
      state.users = state.users.filter(function (user) {
        return user.id !== action.value;
      });
      state.userCreated = false;
      state.userDeleted = true;
      return {
        ...state,
      };

    case "getUsers":
      state.users = action.value.users.map((user) => {
        return { id: user._id, ...user };
      });
      state.creationErrors = [];
      state.userCreated = false;
      return {
        ...state,
      };

    case "addUserError":
      if (typeof action.value === "string" || action.value instanceof String) {
        state.creationErrors = [action.value];
      } else {
        state.creationErrors = action.value.map((err) => err.message);
      }
      state.userCreated = false;
      return {
        ...state,
      };

    default:
      return state;
  }
};

export default appReducer;
