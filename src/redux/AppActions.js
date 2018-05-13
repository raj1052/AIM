import * as types from './AppConstants';

export const showLoader = () => ({
  type: types.SHOW_LOADER,
});

export const hideLoader = () => ({
  type: types.HIDE_LOADER,
});