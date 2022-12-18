// import { StatusBar } from 'expo-status-bar';
import { useCallback, useEffect, useState } from 'react';
import { ActivityIndicator, View, Button, FlatList, StyleSheet, Text } from 'react-native';
// import { SafeAreaView } from 'react-native-safe-area-context';
import ComponentFactory from '../components/factory';
import Footer from '../components/widgets/footer';
import Header from '../components/widgets/header';
import data from './data';
import { setupDb } from '../db/setup';
import { getScreen } from '../db/screen/screen_read_model';
// import { useSelector, useDispatch } from 'react-redux'
import { useSelector, useDispatch } from 'react-redux'
import { setCurrentScreen } from '../redux/screens';
import { initSocketConnection, joinToUserChannel } from '../socket/connection';
import { listenUserChannelEvents, getScreenThroughSocket } from '../socket/socketAction';

export default function MainScreen({ navigation, route }) {
    // const nestedComponents = useSelector((state) => state);
    const dispatch = useDispatch()
    // let userChannel = null;
    const { nestedComponents } = useSelector(state => state.screen);
    // const dispatch = useDispatch();

    useEffect(() => {
        initSocket();
        // loadDataCallback();

        let screenName = route.params && route.params.name ? route.params.name : "index";
        getScreenThroughSocket(screenName, route);
    }, []);


    const initSocket = () => {
        let token = "ototot";
        let userId = "user1";

        initSocketConnection(token);
        userChannel = joinToUserChannel(userId);
        listenUserChannelEvents(userChannel);
    }

    const loadDataCallback = async () => {
        try {
            const db = await setupDb(db);
            let screenName = route.params && route.params.name ? route.params.name : "index";
            const storedScreens = await getScreen(db, screenName);
            console.log("storedScreens", storedScreens);
            if (storedScreens && storedScreens.nestedComponents.length) {
                dispatch(setCurrentScreen(storedScreens));
                setisLoading(false);
            } else {
                // push event throught the socket
                // and get async responce
                // listener screenReceivedCallback handle responce and save it to db and dispatch event to update state
                getScreenThroughSocket(screenName, route);
                setisLoading(false);

            }
        } catch (error) {
            console.error(error);
        }
    };


    const renderWidget = ({ item }) => (
        // <ComponentFactory props={item} />
        <Text>=====================</Text>
    );

    console.log("nestedComponents", nestedComponents)
    return (
        <View style={styles.container}>
            {/* <StatusBar style="auto" /> */}
            <Header data="" />
            {/* <Button title='Press' onPress={() => navigation.navigate('index', { name: "asjsj", prop: "asdasd" })}></Button> */}
            {/* <FlatList
                data={nestedComponents}
                renderItem={renderWidget}
                keyExtractor={item => item.id}
            /> */}
            {/* 
            {data && data.map((widget) => {
                <Text>{nestedComponents.name}</Text>
            })} */}
            {/* <Text>{nestedComponents.name}</Text> */}


            <Footer data="" />
            <Footer data="" />
            <Footer data="" />
            <Footer data="" />
            <Footer data="" />
            <Footer data="" />
            <Footer data="" />
        </View >
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    }
});
