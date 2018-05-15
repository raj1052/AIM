import { HTTP } from '../../services';
import { asyncActionNames, buildAsyncActions } from '../../components/GlobalActionCreators';
import { Alert } from 'react-native'
import * as AppActions from '../../redux/AppActions';

// creating actions name and action creators
const actionNames = asyncActionNames('DEVICEDETAILS');
const actionCreators = buildAsyncActions(actionNames);

export function getDeviceController(device_id) {
    console.log("getDeviceController called------------>");
    return function (dispatch) {
        dispatch(AppActions.showLoader());
            HTTP('get', `device/get-device-controller/${device_id}`)
                .then((result) => {
                    console.log("result------------>", result);
                    dispatch(actionCreators.success(result.data));
                    dispatch(AppActions.hideLoader());
                }).catch((error) => {
                    if (error) {
                        console.log("error----->", error)
                        Alert.alert(error);
                    }
                    dispatch(AppActions.hideLoader());
                })
    }
}

export function changeDeviceStatus(values) {
    return function(dispatch){
        dispatch(AppActions.showLoader());
        return new Promise((resolve, reject) => {
            HTTP('post','device/change-device-status', values)
                .then((result) => {
                    console.log("result------------------------------->", result);
                    dispatch(AppActions.hideLoader());
                    Alert.alert("Your device status is successfully changed");
                    resolve(true);
                }).catch((error) => {
                    Alert(error.response.data.message);
                    reject();
                    dispatch(AppActions.hideLoader());
                })
            })
    };
};

// export function deleteData(id){
//     return function (dispatch) {
//         dispatch(AppActions.showLoader());
//         return new Promise((resolve, reject) => {
//              HTTP('delete',`other/remove-holiday/${id}`)
//                 .then((result) => {
//                     dispatch(AppActions.hideLoader());
//                     notifyAlert('success',result.data.data.message);
//                     resolve();
//                 }).catch((error) => {
//                     reject();
//                     if (error.response) {
//                         notifyAlert('error',error.response.data.message);
//                     }
//                     dispatch(AppActions.hideLoader());
//                 })
//           })
//     };
// }

export function insertDeviceController(values) {
    return function(dispatch){
        dispatch(AppActions.showLoader());
        return new Promise((resolve, reject) => {
            HTTP('post','device/insert-device-controller',values)
                .then((result) => {
                    console.log("result------------------------------->", result);
                    dispatch(AppActions.hideLoader());
                    Alert.alert(result.data);
                    // else
                    //     Alert(result.data.error.message);
                    resolve(true);
                }).catch((error) => {
                    Alert(error.response.data.message);
                    reject();
                    dispatch(AppActions.hideLoader());
                })
            })
    };
};

// export function clearFormData() {
//     return function(dispatch){
//         dispatch(EditFormActionNamesActionCreators.failure());
//     }
// }
