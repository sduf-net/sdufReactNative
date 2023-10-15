import AsyncStorage from "@react-native-async-storage/async-storage";
import { getAppConfigByKey } from "../api/config";
let usertoken = null;

export const getUserToken = async () => {
    usertoken = await AsyncStorage.getItem('usertoken');
    return usertoken;
}

export const saveUserToken = async (token) => {
    await AsyncStorage.setItem('usertoken', token);
}

export const checkUserToken = async () => {
    const loginConfig = getAppConfigByKey('login');
    if (!loginConfig) {
        console.warn('loginConfig is null')
    }
    if (loginConfig.required) {
        console.log("checkUserTokencheckUserTokencheckUserTokencheckUserTokencheckUserTokencheckUserTokencheckUserToken", loginConfig.callback_url);
        try {
            const apiUrl = loginConfig.callback_url;
            const response = await fetch(apiUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json', // Set the content type
                },
                body: JSON.stringify({token: "demo_user_token"}), // Convert data to JSON string
            });
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            const json = await response.json();
            console.log("0-0-0-0-0-0-0-0-0-0-0-0-0-0-0-0", json)

        } catch (error) {
            console.error('Fetch error:', error);
        }
    }
}

