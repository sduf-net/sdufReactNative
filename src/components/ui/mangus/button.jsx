
import * as React from "react";
import { VirtualizedList } from "react-native";
import { Button, Icon, Text } from "react-native-magnus";
import { getItem, getItemCount } from "../../../utils";

const ButtonWidget = (config) => {
    const { data } = config;
    const renderWidget = ({ item }) => <config.factory props={item} />;

    return (
        <>
            {data.props && <Button
                {...data.props}
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