import { append, insertAfter, insertBefore, remove, setCurrentScreen } from "../redux/screens";
import store from "../redux/store";

export const insertBeforeCallback = (data) => {
    store.dispatch(insertBefore({ parent_id: data.parent_id, widget: data.widget }))
};
export const insertAfterCallback = (data) => {
    store.dispatch(insertAfter({ parent_id: data.parent_id, widget: data.widget }))
};
export const removeCallback = (data) => {
    store.dispatch(remove({ parent_id: data.parent_id }))
};
export const changeCallback = (data) => {
    console.log("changeCallback", data);
};
export const replaceCallback = (data) => {
    store.dispatch(insertAfter({ parent_id: data.parent_id, widget: data.widget }));
    store.dispatch(remove({ parent_id: data.parent_id }));
};
export const appendCallback = (data) => {
    store.dispatch(append({ widget: data.widget }));
};
export const logInCallback = (data) => {
    console.log("logInCallback", data);
};
export const screenReceivedCallback = (data) => {
    if (store.getState().screen.id !== data.id) {
        store.dispatch(setCurrentScreen({ id: data.id, name: data.name, nestedComponents: data.nestedComponents }))
    }
    // getDBConnection().then(db => saveScreen(db, {id: data.id, name: data.name, nestedComponents: data.nestedComponents}));
};
export const openPopupCallback = (data) => {
    console.log("openPopupCallback", data);
};
export const closePopupCallback = (data) => {
    console.log("closePopupCallback", data);
};
export const openScreenCallback = (data) => {
    console.log("openScreenCallback", data);
};