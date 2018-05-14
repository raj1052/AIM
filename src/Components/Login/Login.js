import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actionCreators from './actionCreators';
import { Alert, Text, View, TextInput, Button, TouchableOpacity, Modal, TouchableHighlight, Keyboard, ActivityIndicator, StyleSheet, Image } from 'react-native';
import { getStorage } from '../../services';
import Icon from 'react-native-vector-icons/FontAwesome';
import { headerSetting } from '../../services/setHeaders';


class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mobile: '',
      isVisible: false,
      isLoading: true
    };
  }
  componentWillMount() {
    this.checkLoggedin();
  }
  componentWillReceiveProps(nextProps) {
    console.log("componentWillReceiveProps---------->", nextProps.data);

    // if (this.props.location.state && this.props.location.state.isListing) {
    //   this.setState({
    //     isListing: this.props.location.state.isListing
    //   })
    // }
    this.setState({ isLoading: true })
    this.checkLoggedin();
    if (nextProps.data !== undefined) {
      this.setState({
        data: nextProps.data,
        otp: nextProps.data.data.message !== undefined ? nextProps.data.data.message.substr(107, 111) : "",
        isVisible: true
      });
    }
    this.setState({ isLoading: false })
  };

  async checkLoggedin() {
    let user_id = await getStorage("userid");
    let authorization = await getStorage("Authorization");
    console.log("user_id---->", user_id);
    console.log("authorization---->", authorization);
    if (user_id !== undefined && user_id > 0 && authorization !== undefined && authorization.length > 0) {
      headerSetting.authorization = authorization;
      this.props.navigation.navigate("Drawer", { name: 'Jane' })
    } else {
      this.setState({ isLoading: false })
    }
  }

  handleSubmit = async () => {
    this.setState({ isLoading: true })
    console.log("submit---->");
    if (this.state.mobile.length > 7 && this.state.mobile.length < 12) {
      let formdata = {
        mobile: this.state.mobile
      }
      await this.props.actions.signUp(formdata);
    } else {
      this.setState({
        errorMsg: '*Invalid mobile number'
      })
    }
    this.setState({ isLoading: false })
  }

  handleLogin = async () => {
    this.setState({ isLoading: true })
    console.log("----------------------> otp", this.state);
    let formdata = {
      "mobile": this.state.mobile,
      "otp": this.state.otp
    }
    await this.props.actions.handleLogin(formdata);
    this.setState({ isLoading: false })
  }

  render() {
    console.log("test", this.state);
    if (this.state.isLoading !== true) {
      if (this.state.isVisible) {
        return (
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <View style={{ height: 40, width: 200 }}>
              <TextInput
                placeholder="OTP"
                style={{ fontSize: 18 }}
                maxLength={5}
                value={this.state.data.data.message !== undefined ? this.state.data.data.message.substr(107, 111) : ""}
                keyboardType="numeric"
                onChangeText={(text) => this.setState({ otp: text })}
              />
              <Text style={{ padding: 10, fontSize: 14, color: "#FF0000" }}>
                {this.state.errorMsg ? this.state.errorMsg : ''}
              </Text>
              <View style={{ padding: 35, justifyContent: 'center', alignItems: 'center' }}>
                <TouchableOpacity
                  onPress={this.handleLogin}
                  style={{
                    borderWidth: 1,
                    borderColor: 'rgba(0,0,0,0)',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: 60,
                    height: 60,
                    backgroundColor: '#841584',
                    borderRadius: 100,
                  }}
                >
                  <Icon name="chevron-right" size={30} color="#fff" />
                </TouchableOpacity>
              </View>
            </View>
          </View>
        );
      } else {
        return (
          <View style={{ flex: 1, flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
            <View
              style={{
                position: 'absolute',
                top:0,
                bottom:0,
                width: '100%',
                height: '100%',
              }}
            >
              <Image
                style={{width: 1080, height: 1366}}
                source={require('../../assets/img/background-login.jpg')}
              />
            </View>
            <View style={{alignItems: 'center'}}>
              <Image
                style={{ height: 100, width: 100, marginBottom: 35 }}
                source={require('../../assets/img/250.png')}
              />
              <TextInput
                placeholder="Mobile"
                style={{ fontSize: 18, color:'white', width: 200 }}
                maxLength={10}
                dataDetectorTypes ="phoneNumber"
                keyboardType="numeric"
                onChangeText={(text) => this.setState({ mobile: text })}
              />
              <Text style={{ padding: 10, fontSize: 14, color: "#FF0000" }}>
                {this.state.errorMsg ? this.state.errorMsg : ''}
              </Text>
              <View style={{ padding: 35, justifyContent: 'center', alignItems: 'center' }}>
                <TouchableOpacity
                  onPress={this.handleSubmit}
                  style={{
                    borderWidth: 1,
                    borderColor: 'rgba(0,0,0,0)',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: 60,
                    height: 60,
                    backgroundColor: '#841584',
                    borderRadius: 100,
                  }}
                >
                  <Icon name="chevron-right" size={30} color="#fff" />
                </TouchableOpacity>
              </View>
            </View>
          </View>
        );
      }
    } else {
      return (
        <View style={[styles.container, styles.horizontal]}>
          <ActivityIndicator size="large" color="#0000ff" />
        </View>
      );
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center'
  },
  horizontal: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10
  }
})

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(actionCreators, dispatch)
  }
}

function mapStateToProps(state) {
  console.log("state------------------>", state);
  return {
    data: state.LoginReducer.data
  }
}


export default (connect(mapStateToProps, mapDispatchToProps)(Login));
