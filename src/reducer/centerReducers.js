import {
  CENTRE_LIST_REQUEST,
  CENTRE_LIST_SUCCESS,
  CENTRE_LIST_FAIL,
  CENTRE_DETAILS_REQUEST,
  CENTRE_DETAILS_SUCCESS,
  CENTRE_DETAILS_FAIL,
  CENTRE_REGISTER_REQUEST,
  CENTRE_REGISTER_SUCCESS,
  CENTRE_REGISTER_FAIL,
  CENTRE_DELETE_REQUEST,
  CENTRE_DELETE_SUCCESS,
  CENTRE_DELETE_FAIL,
  CENTRE_UPDATE_REQUEST,
  CENTRE_UPDATE_SUCCESS,
  CENTRE_UPDATE_FAIL,
  CENTRE_UPDATE_RESET,
} from "../constants/centreConstants";

export const centreListReducer = (state = { centres: [] }, action) => {
  switch (action.type) {
    case CENTRE_LIST_REQUEST:
      return { loading: true, centres: [] };
    case CENTRE_LIST_SUCCESS:
      return { loading: false, centres: action.payload };
    case CENTRE_LIST_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const centreDetailsReducer = (state = { centreDetails: [] }, action) => {
  switch (action.type) {
    case CENTRE_DETAILS_REQUEST:
      return { loading: true, ...state };
    case CENTRE_DETAILS_SUCCESS:
      return { loading: false, centreDetails: action.payload };
    case CENTRE_DETAILS_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const centreRegisterReducer = (state = { centres: [] }, action) => {
  switch (action.type) {
    case CENTRE_REGISTER_REQUEST:
      return { loading: true, centres: [] };
    case CENTRE_REGISTER_SUCCESS:
      return { loading: false, centreInfo: action.payload };
    case CENTRE_REGISTER_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const centreDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case CENTRE_DELETE_REQUEST:
      return { loading: true, centres: [] };
    case CENTRE_DELETE_SUCCESS:
      return { loading: false, success: true };
    case CENTRE_DELETE_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const centreUpdateReducer = (state = { centre: {} }, action) => {
  switch (action.type) {
    case CENTRE_UPDATE_REQUEST:
      return { loading: true };
    case CENTRE_UPDATE_SUCCESS:
      return { loading: false, success: true };
    case CENTRE_UPDATE_FAIL:
      return { loading: false, error: action.payload };
    case CENTRE_UPDATE_RESET:
      return { centre: {} };
    default:
      return state;
  }
};

