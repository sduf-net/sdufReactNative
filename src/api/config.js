import { URL } from "../utils/constants";

let configs = null;

export const getAppConfig = async () => {
    try {
        const apiUrl = `${URL}/api/v1/configs`;
        const response = await fetch(apiUrl);
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const json = await response.json();

        json.forEach(element => {
            configs = { ...configs, ...{ [element.name]: element.value } }
        });

        return configs;

    } catch (error) {
        console.error('Fetch error:', error);
    }
}

export const getAppConfigByKey = (key) => {
    return configs[key] ?? null;
}