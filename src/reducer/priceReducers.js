import {
    PRICE_LIST_REQUEST,
    PRICE_LIST_SUCCESS,
    PRICE_LIST_FAIL,
    PRICE_DETAILS_REQUEST,
    PRICE_DETAILS_SUCCESS,
    PRICE_DETAILS_FAIL,
    PRICE_REGISTER_REQUEST,
    PRICE_REGISTER_SUCCESS,
    PRICE_REGISTER_FAIL,
    PRICE_DELETE_REQUEST,
    PRICE_DELETE_SUCCESS,
    PRICE_DELETE_FAIL,
    PRICE_UPDATE_REQUEST,
    PRICE_UPDATE_SUCCESS,
    PRICE_UPDATE_FAIL,
    PRICE_UPDATE_RESET,
  } from "../constants/priceConstants";  

export const priceListReducer = (state = { price: [] }, action) => {
    switch (action.type) {
      case PRICE_LIST_REQUEST:
        return { loading: true, prices: [] };
      case PRICE_LIST_SUCCESS:
        return { loading: false, prices: action.payload };
      case PRICE_LIST_FAIL:
        return { loading: false, error: action.payload };
      default:
        return state;
    }
  };
  
  export const priceDetailsReducer = (state = { priceDetails: [] }, action) => {
    switch (action.type) {
      case PRICE_DETAILS_REQUEST:
        return { loading: true, ...state };
      case PRICE_DETAILS_SUCCESS:
        return { loading: false, priceDetails: action.payload };
      case PRICE_DETAILS_FAIL:
        return { loading: false, error: action.payload };
      default:
        return state;
    }
  };
  
  export const priceRegisterReducer = (state = { price: [] }, action) => {
    switch (action.type) {
      case PRICE_REGISTER_REQUEST:
        return { loading: true, price: [] };
      case PRICE_REGISTER_SUCCESS:
        return { loading: false, priceInfo: action.payload };
      case PRICE_REGISTER_FAIL:
        return { loading: false, error: action.payload };
      default:
        return state;
    }
  };
  
  export const priceDeleteReducer = (state = {}, action) => {
    switch (action.type) {
      case PRICE_DELETE_REQUEST:
        return { loading: true, price: [] };
      case PRICE_DELETE_SUCCESS:
        return { loading: false, success: true };
      case PRICE_DELETE_FAIL:
        return { loading: false, error: action.payload };
      default:
        return state;
    }
  };
  
  export const priceUpdateReducer = (state = { price: {} }, action) => {
    switch (action.type) {
      case PRICE_UPDATE_REQUEST:
        return { loading: true };
      case PRICE_UPDATE_SUCCESS:
        return { loading: false, success: true };
      case PRICE_UPDATE_FAIL:
        return { loading: false, error: action.payload };
      case PRICE_UPDATE_RESET:
        return { price: {} };
      default:
        return state;
    }
  };
  