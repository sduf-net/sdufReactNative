import AsyncStorage from "@react-native-async-storage/async-storage";
let usertoken = null;

export const getUserToken = async () => {
    usertoken = await AsyncStorage.getItem('usertoken');
    return usertoken;
}

export const saveUserToken = async (token) => {
    await AsyncStorage.setItem('usertoken', token);
}

export const removeUserToken = async () => {
    await AsyncStorage.removeItem('usertoken');
}


