import AsyncStorage from "@react-native-async-storage/async-storage";
import store from "../redux/store";
import { setCurrentUser } from "../redux/users";

export const getUser = async () => {
    let user = await AsyncStorage.getItem('user');
    if(user) {
        user = JSON.parse(user)
    }
    return user;
}

export const saveUser = async (user) => {
    const stringifiedUser = JSON.stringify(user);
    await AsyncStorage.setItem('user', stringifiedUser);
}

export const removeUser = async () => {
    await AsyncStorage.removeItem('user');
}

export const restoreUserToState = async () => {
    const user = await getUser();

    console.log("USER FROM MEMPRY", user)

    if (user) {
        store.dispatch(setCurrentUser(user));
    }
}

