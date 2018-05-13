import axios from 'axios';
import { notify } from 'react-notify-toast';
import { browserHistory } from 'react-router';
axios.interceptors.response.use(function (response) {
  console.log(response, 'response');
    if(response.data.code !== undefined &&  response.data.code === "401"){
        localStorage.clear();
        notify.show('Bad request login First', 'error');
        browserHistory.push('/');
    }else{
        if(response.data.status){
          return response;
        }
        else{
          throw {response: {data:{ message:response.data.error.message}}};
        }
    }


}, function (error) {
    if (error.response && 401 === error.response.status) {
        localStorage.clear();
        notify.show('Bad request login First', 'error');
    } else {
        notify.show(error.response.data.message, 'error');
        return Promise.reject(error);
    }
});
