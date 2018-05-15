import React, { Component } from "react";
import { Alert} from 'react-native'
import {  getStorage, removeStorage } from '../../services';
import {
  Container,
  Button,
  Text

} from "native-base";
import Icon from 'react-native-vector-icons/FontAwesome';

class Logout extends Component {

  constructor(props) {
    super(props);
    this.clearStorage();
    this.props.navigation.navigate("Login");
  }

  async clearStorage() {
    try {
      await removeStorage('userid');
      await removeStorage('Authorization');      
      console.log("Log out successfully");
    } catch (error) {
      Alert.alert("Error in Logout, Please Try again");
    }
  }
  render() {
    return(
      <Container></Container>
    );
  }


}

export default Logout;
