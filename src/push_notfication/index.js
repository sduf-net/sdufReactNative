import AsyncStorage from "@react-native-async-storage/async-storage";
import messaging from '@react-native-firebase/messaging';
import PushNotification from "react-native-push-notification";
import { PermissionsAndroid, Platform } from "react-native";

export const checkApplicationPermission = async () => {
    if (Platform.OS === 'android') {
        try {
            await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS,
            );
        } catch (error) {
            console.log('[ERROR]', error)
        }
    }
};

export const getFCMToken = async () => {
    const fcmtoken = await AsyncStorage.getItem('fcmtoken');
    if (!fcmtoken) {
        try {
            const token = await messaging().getToken();
            if (token) {
                await AsyncStorage.setItem('fcmtoken', token);
            }

        } catch (error) {
            console.log("[ERROR]", error)
        }
    }
}

export const notificationListener = () => {
    return messaging().onMessage(async remoteMessage => {
        console.log('A new FCM message arrived!', JSON.stringify(remoteMessage));
    });
}

export const setBackgroundMessageHandler = () => {
    messaging().setBackgroundMessageHandler(async remoteMessage => {
        console.log('Message handled in the background!', remoteMessage);
    });
}

export const configurePushNotification = () => {
    PushNotification.configure({
        // (optional) Called when Token is generated (iOS and Android)
        onRegister: function (token) {
            console.log("TOKEN:", token);
        },

        // (required) Called when a remote is received or opened, or local notification is opened
        onNotification: function (notification) {
            console.log("NOTIFICATION:", notification);

            // process the notification

            // (required) Called when a remote is received or opened, or local notification is opened
            //   notification.finish(PushNotificationIOS.FetchResult.NoData);
        },

        // (optional) Called when Registered Action is pressed and invokeApp is false, if true onNotification will be called (Android)
        onAction: function (notification) {
            console.log("ACTION:", notification.action);
            console.log("NOTIFICATION:", notification);

            // process the action
        },

        // (optional) Called when the user fails to register for remote notifications. Typically occurs when APNS is having issues, or the device is a simulator. (iOS)
        onRegistrationError: function (err) {
            console.error(err.message, err);
        },

        // IOS ONLY (optional): default: all - Permissions to register.
        permissions: {
            alert: true,
            badge: true,
            sound: true,
        },

        // Should the initial notification be popped automatically
        // default: true
        popInitialNotification: true,

        /**
         * (optional) default: true
         * - Specified if permissions (ios) and token (android and ios) will requested or not,
         * - if not, you must call PushNotificationsHandler.requestPermissions() later
         * - if you are not using remote notification or do not have Firebase installed, use this:
         *     requestPermissions: Platform.OS === 'ios'
         */
        requestPermissions: true,
    });
}









