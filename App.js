import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';
import AppNavigation from './src/routes';
import { Provider } from 'react-redux';
import store from './src/redux/store';

export default class App extends Component {
  render() {
    return (
      <View style={{flex:1,flexDirection:'row'}}>
        <Provider store={store}>
          <AppNavigation/>
        </Provider>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection:'row',
    // justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});