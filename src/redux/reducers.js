import {
  combineReducers
} from 'redux';

import { reducer as reduxFormReducer } from 'redux-form';

import {
  LoginReducer,
  DeviceReducer,
  LocationReducer,
  HomeReducer,
  DeviceDetailsReducer
} from '../views/';

import {
  AppReducer
} from './AppReducer';

export default combineReducers({
  LoginReducer,
  DeviceReducer,
  LocationReducer,
  HomeReducer,
  DeviceDetailsReducer,
  form: reduxFormReducer,
});
