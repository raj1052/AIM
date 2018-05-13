import { AppRegistry } from 'react-native';
import App from './App';

// Define globally required stuff
GLOBAL.Buffer = require('buffer').Buffer;

// Some dependencies require process to be defined, so we comply with that
GLOBAL.process = {
  browser: true,
  env: {
    NODE_ENV: __DEV__ ? 'development' : 'production',
  }
}

AppRegistry.registerComponent('aim', () => App);
