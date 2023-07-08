import { useState, useEffect, useCallback, useLayoutEffect } from 'react';
import { useDispatch } from 'react-redux';
import { getScreen } from '../db/screen/screen_read_model';
import { setupDb } from '../db/setup';
import { setCurrentScreen } from '../redux/screens';
// import { getScreenThroughSocket } from '../socket/socketAction';

const useSQLite = () => {
    const [widgets, setWidgets] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const dispatch = useDispatch();

    const loadDataCallback = useCallback(async () => {
        const db = await setupDb(db);
        // let screenName = route.params && route.params.name ? route.params.name : "index";
        // const storedScreens = await getScreen(db, screenName);
        // console.log("storedScreens", storedScreens);
        // if (storedScreens && storedScreens.nestedComponents.length) {
        //     dispatch(setCurrentScreen(storedScreens));
        //     setWidgets(storedScreens.nestedComponents);
        //     setLoading(false);
        // } else {
        //     // push event throught the socket
        //     // and get async responce
        //     // listener screenReceivedCallback handle responce and save it to db and dispatch event to update state
        //     // getScreenThroughSocket(screenName, route);
        //     setLoading(false);
        // }
    }, []);

    useLayoutEffect(() => {
        loadDataCallback();
    }, [loadDataCallback]);

    return { widgets };
};

export { useSQLite };