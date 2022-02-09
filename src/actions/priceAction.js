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
} from "../constants/priceConstants";
import * as api from "../api";

export const listPrice = (dateTime) => async (dispatch) => {
  try {
    dispatch({ type: PRICE_LIST_REQUEST });

    const { data } = await api.listPricesAPI(dateTime);

    dispatch({
      type: PRICE_LIST_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: PRICE_LIST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const getPriceDetails = (id) => async (dispatch) => {
  try {
    dispatch({ type: PRICE_DETAILS_REQUEST });

    const { data } = await api.PriceDetailsAPI(id)
;

    dispatch({
      type: PRICE_DETAILS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: PRICE_DETAILS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const priceRegister =
  (item, centre, price, dateTime) => async (dispatch) => {
    try {
      dispatch({
        type: PRICE_REGISTER_REQUEST,
      });
      
      const { data } = await api.PriceRegisterAPI(item, centre, price, dateTime);

      dispatch({
        type: PRICE_REGISTER_SUCCESS,
        payload: data,
      });

      dispatch({
        type: PRICE_DETAILS_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: PRICE_REGISTER_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

export const deletePrice = (id) => async (dispatch) => {
  try {
    dispatch({
      type: PRICE_DELETE_REQUEST,
    });

    await api.PriceDeleteAPI(id)
;

    dispatch({
      type: PRICE_DELETE_SUCCESS,
    });
  } catch (error) {
    dispatch({
      type: PRICE_DELETE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const updatePrice = (price) => async (dispatch) => {
  try {
    dispatch({
      type: PRICE_UPDATE_REQUEST,
    });

    const { data } = await api.PriceUpdateAPI(price);

    dispatch({
      type: PRICE_UPDATE_SUCCESS,
    });

    dispatch({
      type: PRICE_DETAILS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: PRICE_UPDATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
