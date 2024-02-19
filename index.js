/**
 * @format
 */
import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import { configurePushNotification, setBackgroundMessageHandler } from './src/push_notfication';

// Register background handler
setBackgroundMessageHandler();
// Must be outside of any component LifeCycle (such as `componentDidMount`).
configurePushNotification();

AppRegistry.registerComponent(appName, () => App);
