import { HTTP } from '../../services';
import { asyncActionNames, buildAsyncActions } from '../../components/GlobalActionCreators';
import { Alert } from 'react-native'
import * as AppActions from '../../redux/AppActions';

// creating actions name and action creators
const actionNamesLocations = asyncActionNames('LOCATIONS');
const actionCreatorsLocations = buildAsyncActions(actionNamesLocations);

export function getLocations() {
    console.log("locations called------------>");
    return function (dispatch) {
        dispatch(AppActions.showLoader());
        HTTP('get', `device/get-user-locations`)
            .then((result) => {
                console.log("result------------>", result);
                dispatch(actionCreatorsLocations.success(result.data));
            }).catch((error) => {
                if (error) {
                    console.log("error----->", error)
                    Alert.alert(error);
                }
                dispatch(AppActions.hideLoader());
            })
    }
}

export function deleteLocation(id) {
    return function (dispatch) {
        dispatch(AppActions.showLoader());
        return new Promise((resolve, reject) => {
            HTTP('delete', `device/delete-user-location/${id}`)
                .then((result) => {
                    console.log("result------------------------------->", result);
                    dispatch(AppActions.hideLoader());
                    if(result.data.status === true){
                        Alert.alert(result.data.data.message);
                    } else {
                        Alert.alert(result.data.error.message);
                    }
                    resolve();
                }).catch((error) => {
                    reject();
                    if (error.response) {
                        Alert.alert('error');
                    }
                    dispatch(AppActions.hideLoader());
                })
            })
    };
}

export function saveLocation(values) {
    return function (dispatch) {
        dispatch(AppActions.showLoader());
        return new Promise((resolve, reject) => {
            HTTP('post', 'device/save-device-location', values)
                .then((result) => {
                    console.log("result------------------------------->", result);
                    dispatch(AppActions.hideLoader());
                    Alert.alert("Success");
                    resolve();
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
