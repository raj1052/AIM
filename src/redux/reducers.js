import {
  combineReducers
} from 'redux';

import { reducer as reduxFormReducer } from 'redux-form';

import {
  LoginReducer,
  DeviceReducer,
  LocationReducer,
  HomeReducer
} from '../Components/';

import {
  AppReducer
} from './AppReducer';

export default combineReducers({
  LoginReducer,
  DeviceReducer,
  LocationReducer,
  HomeReducer,
  form: reduxFormReducer,
});
