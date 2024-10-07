
import * as React from "react";
import { StyleSheet, VirtualizedList } from "react-native";
import { Fab } from "react-native-magnus";
import { getItem, getItemCount } from "../../../utils";
import { shallowEqual, useSelector } from "react-redux";
import ComponentFactory from './../../factory'
import { selectFab } from "../../../redux/screens";

const FabWidget = () => {
    const fab = useSelector((state) => selectFab(state), shallowEqual);
    const renderWidget = ({ item }) => <ComponentFactory props={item} />;

    return (
        fab && fab.data && <Fab {...fab.data.props} style={styles.container}>
            <VirtualizedList
                data={fab.nestedComponents}
                renderItem={renderWidget}
                keyExtractor={(item) => item.id}
                getItemCount={getItemCount}
                getItem={getItem}
            />
        </Fab>
    );
};

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        left: 0,
        right: 0,
        zIndex: 100,
    },
});

export default FabWidget;
