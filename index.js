import { AppRegistry } from 'react-native';
import App from './src/App';

window.appVersion = 'v0.5.4';

// Instead of depending on yet another module, use the following for uuid v4 gen.
window.uuidv4 = () => {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    let r = (Math.random() * 16) | 0;
    let v = c === 'x' ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
};

console.ignoredYellowBox = [
  'Warning: Failed prop type: Invalid props.style key',
  'Modal with',
  'Warning: Can only update a mounted or mounting component.'
];

AppRegistry.registerComponent('mdroid', () => App);
