import { AppRegistry } from 'react-native';
import App from './src/App';

// Instead of depending on yet another module, use the following for uuid v4 gen.
window.uuidv4 = () => {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    let r = (Math.random() * 16) | 0;
    let v = c === 'x' ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
};

Object.defineProperty(Number.prototype, 'fileSize', {
  value: (a, b, c, d) => {
    return (
      ((a = a ? [1e3, 'k', 'B'] : [1024, 'K', 'iB']),
      (b = Math),
      (c = b.log),
      (d = (c(this) / c(a[0])) | 0),
      this / b.pow(a[0], d)).toFixed(2) +
      ' ' +
      (d ? (a[1] + 'MGTPEZY')[--d] + a[2] : 'Bytes')
    );
  },
  writable: false,
  enumerable: false
});

console.ignoredYellowBox = [
  'Warning: Failed prop type: Invalid props.style key',
  'Modal with',
  'Warning: Can only update a mounted or mounting component.'
];

AppRegistry.registerComponent('mdroid', () => App);
