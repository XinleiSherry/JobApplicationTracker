import { combineReducers } from "redux";
import userSlice from "../store/features/user/userSlice";
let rooReducer = combineReducers({
  user: userSlice,
});
export default rooReducer;
