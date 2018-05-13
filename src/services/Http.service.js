import {headerSetting} from './setHeaders';
import axios from 'axios';
var { AsyncStorage } = require('react-native');

// const baseUrl = ``;
// const localUrl = `http://14.140.154.146:4000/api/v1/`
// const localUrl = `http://192.168.2.9:4000/api/v1/`
const localUrl = `http://192.168.0.3:3000/api/v1/`
export async function HTTP(method, uri, data, headers = null) {


  const url = `${localUrl}${uri}`.trim();
  const query = {
    method: method,
    url: url
  }
  // let authorization = await AsyncStorage.getItem('Authorization');
  // console.log("authorization------------>", authorization);
  if (headers != null) {
    headerSetting['Content-Type'] = headers;
    // headerSetting['authorization'] = authorization !== undefined ? authorization : ""
  }
  query.headers = headerSetting


  // debugger;
  if (method === 'post' || method === 'put' || method === 'delete') {
    query.data = data;
  }

  const response = await axios(query);

  return response;

}
