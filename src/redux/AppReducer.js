import * as types from './AppConstants';

export const AppReducer = (state = {
  loading: false,
  location: null,
  nextLocation: null,
}, action) => {
  switch (action.type) {
    case types.SHOW_LOADER:
      return {
        ...state,
        loading: true,
      };

    case types.HIDE_LOADER:
      return {
        ...state,
        loading: false,
      };

    default:
      return state;
  }
};