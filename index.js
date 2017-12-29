import { AppRegistry } from 'react-native';
import App from './src/App';

// Instead of depending on yet another module, use the following for uuid v4 gen.
function uuidv4() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    let r = (Math.random() * 16) | 0;
    let v = c === 'x' ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

window.uuidv4 = uuidv4;

AppRegistry.registerComponent('mdroid', () => App);
