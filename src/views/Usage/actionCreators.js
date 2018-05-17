import { HTTP } from '../../services';
import { asyncActionNames, buildAsyncActions } from '../../components/GlobalActionCreators';
import { Alert } from 'react-native'
import * as AppActions from '../../redux/AppActions';

// creating actions name and action creators
const actionNames = asyncActionNames('USAGE');
const actionCreators = buildAsyncActions(actionNames);

export function getUsage() {
    console.log("getUsage called------------>");
    return function (dispatch) {
        dispatch(AppActions.showLoader());
            HTTP('get', `device/get-usage`)
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

// export function clearFormData() {
//     return function(dispatch){
//         dispatch(EditFormActionNamesActionCreators.failure());
//     }
// }
