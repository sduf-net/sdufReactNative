
import React, { useEffect } from "react";
import { VirtualizedList } from "react-native";
import { Drawer } from "react-native-magnus";
import { getItem, getItemCount } from "../../../utils";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { registerDrawerById, selectDrawerById } from "../../../redux/drawer";

const DrawerWidget = (config) => {
    const drawer = useSelector((state) => selectDrawerById(state, config.id), shallowEqual);
    const renderWidget = ({ item }) => <config.factory props={item} />;
    const dispatch = useDispatch();
    const drawerRef = React.createRef();

    useEffect(() => {
        if (!drawerRef || !config.id) return;
        dispatch(registerDrawerById(config.id));
    }, []);

    useEffect(() => {
        if (!drawer || !drawerRef || !config.id) return;

        if (drawer === -1) {
            drawerRef.current.close();
        } else {
            drawerRef.current.open();
        }
    }, [drawer]);

    return (
        <Drawer ref={drawerRef}>
            <VirtualizedList
                data={config.nestedComponents}
                renderItem={renderWidget}
                keyExtractor={(item) => item.id}
                getItemCount={getItemCount}
                getItem={getItem}
            />
        </Drawer>
    );
};

export default DrawerWidget;