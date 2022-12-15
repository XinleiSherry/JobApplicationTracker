let initialState = {
  userInfo: null,
};

export default function userReducer(state = initialState, action) {
  switch (action.type) {
    case "user/addedUserInfo": {
      return {
        userInfo: action.payload,
      };
    }
    default:
      return state;
  }
}

export function addUserInfo(userinfo) {
  return {
    type: "user/addedUserInfo",
    payload: userinfo,
  };
}
