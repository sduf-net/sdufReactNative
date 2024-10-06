
import * as React from "react";
import { VirtualizedList } from "react-native";
import { Fab } from "react-native-magnus";
import { getItem, getItemCount } from "../../../utils";

const FabWidget = (config) => {
    const renderWidget = ({ item }) => <config.factory props={item} />;

    return (
        <Fab {...config.data.props}>
            <VirtualizedList
                data={config.nestedComponents}
                renderItem={renderWidget}
                keyExtractor={(item) => item.id}
                getItemCount={getItemCount}
                getItem={getItem}
            />
        </Fab>
    );
};

export default FabWidget;
