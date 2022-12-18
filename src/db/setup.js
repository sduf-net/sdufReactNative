import { getDBConnection } from "./db";
import { createTable } from "./screen/screen"
import { createTable as createTableScreenExpirationTable } from "./screen/screen_expiration"

export const setupDb = async () => {
    const db = await getDBConnection();

    await createTable(db);
    await createTableScreenExpirationTable(db);

    return db;
}