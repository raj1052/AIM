import { HTTP } from './Http.service';
import {headerSetting} from './setHeaders';
var React = require('react-native');
var { AsyncStorage } = React;

export async function setStorage(key, data) {
  const value = await AsyncStorage.setItem(key, data);
  if(key==="Authorization")
    headerSetting.authorization = data;
  return value;
}

export async function getStorage(key) {
  const value = await AsyncStorage.getItem(key);
  return value;
}

// export function getRights(modulename) {
//   let value = JSON.parse(AsyncStorage.getItem('user_rights'));
//   let result = value.filter(function(a) {
//     return a.module_name === modulename;
//   });
//   return prepareAccessObj;
// }

//for set page rights value to boolean
  function setBooleanValue(value) {
    return (value==="1"?true:false);
  }


export async function removeStorage(key) {
  return await AsyncStorage.removeItem(key);
}

export async function defaultAccount(token) {
  const response = HTTP('get', 'getDefaultAccount', null, { 'Authorization': token });
  return response;
}
