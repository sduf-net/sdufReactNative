
import * as React from "react";
import { VirtualizedList } from "react-native";
import { Button, Icon } from "react-native-magnus";
import { getItem, getItemCount } from "../../../utils";
import { onLongPress, onPress } from "../../../event_handler";
import { useNavigation, useRoute } from "@react-navigation/native";

const ButtonWidget = (config) => {
    const { data } = config;
    const route = useRoute();
    const navigation = useNavigation();
    const renderWidget = ({ item }) => <config.factory props={item} />;

    const onPressHandle = () => {
        onPress(data.actions, navigation, route);
    };

    const onLongPressHandle = () => {
        onLongPress(data.actions, navigation, route);
    };

    return (
        <>
            {data.props && <Button
                {...data.props}
                onPress={onPressHandle}
                onLongPress={onLongPressHandle}
                prefix={data.prefix ? <Icon {...data.prefix.props} /> : null}
                suffix={data.suffix ? <Icon {...data.suffix.props} /> : null}
            >
                {config?.nestedComponents?.length > 0 ? <VirtualizedList
                    data={config.nestedComponents}
                    renderItem={renderWidget}
                    keyExtractor={(item) => item.id}
                    getItemCount={getItemCount}
                    getItem={getItem}
                /> : data.text.value ? data.text.value : null}
            </Button>}
        </>
    );
}

export default ButtonWidget;