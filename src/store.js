import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import {
  centreListReducer,
  centreDetailsReducer,
  centreDeleteReducer,
  centreUpdateReducer,
} from "./reducer/centerReducers";
import {
  itemsListReducer,
  itemDetailsReducer,
  itemDeleteReducer,
  itemUpdateReducer,
} from "./reducer/itemReducers";
import {
  userLoginReducer,
  userListReducer,
  userRegisterReducer,
  userDetailsReducer,
  userDeleteReducer,
  userUpdateProfileReducer,
} from "./reducer/userReducers";
import {
  priceListReducer,
  priceRegisterReducer,
  priceDeleteReducer,
  priceUpdateReducer,
} from "./reducer/priceReducers";

const reducer = combineReducers({
  //   centre
  centreList: centreListReducer,
  centreDetails: centreDetailsReducer,
  centreDelete: centreDeleteReducer,
  centreUpdate: centreUpdateReducer,
  //   item
  itemList: itemsListReducer,
  itemDetails: itemDetailsReducer,
  itemDelete: itemDeleteReducer,
  itemUpdate: itemUpdateReducer,
  //   users
  userLogin: userLoginReducer,

  userList: userListReducer,
  userRegister: userRegisterReducer,
  userDetails: userDetailsReducer,
  userDelete: userDeleteReducer,
  userUpdateProfile: userUpdateProfileReducer,
  //   price
  priceList: priceListReducer,
  priceRegister: priceRegisterReducer,
  priceDelete: priceDeleteReducer,
  priceUpdate: priceUpdateReducer,
});

const userInfoFromStorage = localStorage.getItem("userInfo")
  ? JSON.parse(localStorage.getItem("userInfo"))
  : null;

const centresFromStorage = localStorage.getItem("centres")
  ? JSON.parse(localStorage.getItem("centres"))
  : null;

const initialState = {
  userLogin: { userInfo: userInfoFromStorage },
  centreList: { centres: centresFromStorage },
};

const middleware = [thunk];

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
