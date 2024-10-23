// Event name constants as an object
const eventNames = {
    INSERT_BEFORE: 'insert_before',
    INSERT_AFTER: 'insert_after',
    REMOVE: 'remove',
    CHANGE: 'change',
    REPLACE: 'replace',
    APPEND: 'append',
    LOGIN: 'login',
    LOGOUT: 'logout',
    OPEN_POPUP: 'open_popup',
    CLOSE_POPUP: 'close_popup',
    OPEN_DRAWER: 'open_drawer',
    CLOSE_DRAWER: 'close_drawer',
    OPEN_SCREEN: 'openScreen',
    SCREEN_RECEIVED: 'screen_received',
    SCREEN_SILENT_UPDATE: 'screen_silent_update',
    SHOW_FLOAT_CARD: 'show_float_card',
    HIDE_FLOAT_CARD: 'close_float_card',
    UPDATE_MAP_MARKERS: 'update_map_markers',
    NAVIGATE_TO_SCREEN: 'navigate_to_screen',
    REQUEST_USER_GEO: 'request_user_geo',
    SHOW_ERROR_MESSAGE: 'show_error_message',
};

// Destructure and export each constant
export const {
    INSERT_BEFORE,
    INSERT_AFTER,
    REMOVE,
    CHANGE,
    REPLACE,
    APPEND,
    LOGIN,
    LOGOUT,
    OPEN_POPUP,
    CLOSE_POPUP,
    OPEN_DRAWER,
    CLOSE_DRAWER,
    OPEN_SCREEN,
    SCREEN_RECEIVED,
    SCREEN_SILENT_UPDATE,
    SHOW_FLOAT_CARD,
    HIDE_FLOAT_CARD,
    UPDATE_MAP_MARKERS,
    NAVIGATE_TO_SCREEN,
    REQUEST_USER_GEO,
    SHOW_ERROR_MESSAGE,
} = eventNames;

// Function to get all event names
export const getAllEvents = () => Object.values(eventNames);
