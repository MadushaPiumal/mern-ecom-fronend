import {
  ITEM_LIST_REQUEST,
  ITEM_LIST_SUCCESS,
  ITEM_LIST_FAIL,
  ITEM_DETAILS_REQUEST,
  ITEM_DETAILS_SUCCESS,
  ITEM_DETAILS_FAIL,
  ITEM_REGISTER_REQUEST,
  ITEM_REGISTER_SUCCESS,
  ITEM_REGISTER_FAIL,
  ITEM_DELETE_REQUEST,
  ITEM_DELETE_SUCCESS,
  ITEM_DELETE_FAIL,
  ITEM_UPDATE_REQUEST,
  ITEM_UPDATE_SUCCESS,
  ITEM_UPDATE_FAIL,
  ITEM_UPDATE_RESET,
} from "../constants/itemConstants";

export const itemsListReducer = (state = { items: [] }, action) => {
  switch (action.type) {
    case ITEM_LIST_REQUEST:
      return { loading: true, items: [] };
    case ITEM_LIST_SUCCESS:
      return { loading: false, items: action.payload };
    case ITEM_LIST_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const itemDetailsReducer = (state = { itemDetails: [] }, action) => {
  switch (action.type) {
    case ITEM_DETAILS_REQUEST:
      return { loading: true, ...state };
    case ITEM_DETAILS_SUCCESS:
      return { loading: false, itemDetails: action.payload };
    case ITEM_DETAILS_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const itemRegisterReducer = (state = { items: [] }, action) => {
  switch (action.type) {
    case ITEM_REGISTER_REQUEST:
      return { loading: true, items: [] };
    case ITEM_REGISTER_SUCCESS:
      return { loading: false, itemInfo: action.payload };
    case ITEM_REGISTER_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const itemDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case ITEM_DELETE_REQUEST:
      return { loading: true, items: [] };
    case ITEM_DELETE_SUCCESS:
      return { loading: false, success: true };
    case ITEM_DELETE_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const itemUpdateReducer = (state = { items: {} }, action) => {
  switch (action.type) {
    case ITEM_UPDATE_REQUEST:
      return { loading: true };
    case ITEM_UPDATE_SUCCESS:
      return { loading: false, success: true };
    case ITEM_UPDATE_FAIL:
      return { loading: false, error: action.payload };
    case ITEM_UPDATE_RESET:
      return { item: {} };
    default:
      return state;
  }
};
