import {
    getStorage
} from './Common.services';

import {Platform, StyleSheet} from 'react-native';
console.log("Platform.OS ----->", Platform.OS);
let os = Platform.OS;

var headerSetting = {
    "Content-Type": "application/json",
    "api-key": 1,
    "udid": '88174805',
    "device-type": os
};

// function setAuthorization() {
//     if (getStorage('Authorization') != null) {
//         let auth = getStorage('Authorization');
//         console.log("auth-------------------------->", auth);
//     }
// }

// function getUDID() {
//     return window.navigator.userAgent.replace(/\D+/g, '');
// }

// function getDeviceType() {
//     var Sys = {};

//     if (Sys.ie) return ('IE: ' + Sys.ie);
//     if (Sys.firefox) return ('Firefox: ' + Sys.firefox);
//     if (Sys.chrome) return ('Chrome: ' + Sys.chrome);
//     if (Sys.opera) return ('Opera: ' + Sys.opera);
//     if (Sys.safari) return ('Safari: ' + Sys.safari);
//     return "web";
// }

export {
    headerSetting
};
