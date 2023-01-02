import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import userReducer from "../reducers/userReducer";
import adminReducer from "../reducers/adminReducer";
import studentReducer from "../reducers/studentReducer";

const storeSetup = () => {
  const store = createStore(
    combineReducers({
      userData: userReducer,
      studentQuestionsData: studentReducer,
      adminQuestionsData: adminReducer,
    }),
    applyMiddleware(thunk)
  );
  return store;
};

export default storeSetup;
