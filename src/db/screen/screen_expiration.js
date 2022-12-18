const tableName = "screens_expiration_dates"

export const createTable = async (db) => {
    const query = `CREATE TABLE IF NOT EXISTS ${tableName}(
        screenName TEXT primary key not null,
        expired_at TIMESTAMP,
        inserted_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL
    );`;

    return new Promise((resolve, reject) => {
        db.transaction((tx) => {
            tx.executeSql(query, [],
                (_, res) => resolve(res),
                (_, err) => reject(err),
            );
        });
    })
};

export const deleteTable = async (db) => {
    const query = `drop table ${tableName}`;

    return new Promise((resolve, reject) => {
        db.transaction((tx) => {
            tx.executeSql(query, [],
                (_, res) => resolve(res),
                (_, err) => reject(err),
            );
        });
    })
};
