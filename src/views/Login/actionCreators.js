import { asyncActionNames, buildAsyncActions } from '../../components/GlobalActionCreators';
import { HTTP, setStorage, getStorage } from '../../services';
import { Alert} from 'react-native'

const actionNames = asyncActionNames('LOGIN');
const actionCreators = buildAsyncActions(actionNames);


export function handleLogin(formData) {
  console.log("formData------------------------>", formData);
  return function (dispatch) {
    return new Promise((resolve, reject) => {
      HTTP('post', 'user//user-verifyotp', formData)
        .then(async (result) => {
          console.log("result---->", result.data);
          if (result.data && result.data.status) {
              await setStorage('Authorization', result.data.data.access_token.toString());
              await setStorage('username', result.data.data.name.toString());
              await setStorage('usertypeid', result.data.data.user_type_id.toString());
              await setStorage('usertype', result.data.data.user_type.toString());
              await setStorage('userid', result.data.data.user_id.toString());
            dispatch(actionCreators.success(result.data));
            resolve(true);
          }
          else {
            Alert.alert("Invalid Credential","Username or Password is Invalid");
          }
        }).catch((error) => {
          console.log("Error ->", error);
          Alert.alert("Bad Request","Invalid SignIn Request");
        })
    })
  }
}

export function signUp(formData) {
  console.log("-------------------->");
  return function (dispatch) {
    return new Promise((resolve, reject) => {
      HTTP('post', 'user/signup', formData)
        .then(async (result) => {
          console.log("result----------->", result);
          if (result.data && result.data.status) {
            dispatch(actionCreators.success(result.data));
            resolve(true);
          }
        }).catch((error) => {
          console.log("error", error);
          Alert.alert("Bad Request","Invalid SignIn Request");
        })
    })
  }
}
