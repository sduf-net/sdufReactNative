import React from 'react';
import { createWormhole } from 'react-native-wormhole';
import { URL, SOCKET_PROJECT_TOKEN } from "@env";
import Error from './error';
import { ActivityIndicator } from 'react-native';

const { Provider, Wormhole } = createWormhole({
    verify: async ({ headers, data }) => {
        // const signature = headers['x-csrf-token'];
        // console.log(data)
        return true;
    },
});

export default function WormholeWidget({ data }) {
    return (
        <Wormhole
            source={{ uri: `${URL}/api/v1/widget/${data.widget_id}/` + encodeURIComponent(SOCKET_PROJECT_TOKEN) }}
            renderError={({ error }) => <Error />}
            renderLoading={() => <ActivityIndicator size="large" color="#007AFF" />}
            data={data}
        />
    );
}