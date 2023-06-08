import { combineReducers } from "redux";
import { createDemoApi } from "./loginReducer/authLogin";
import interviewadmin from "../feature/loginReducer/loginReducer";

const rootReducer = combineReducers({
  interviewadmin: interviewadmin,
  [createDemoApi.reducerPath]: createDemoApi.reducer,
});

export default rootReducer;
