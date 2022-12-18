const tableName = "screens"

export const createTable = async (db) => {
  // deleteTable(db);
  const query = `CREATE TABLE IF NOT EXISTS ${tableName}(
        id TEXT primary key not null,
        screenId TEXT NOT NULL,
        screenName TEXT NOT NULL,
        widgetId TEXT NOT NULL,
        widgetName TEXT NOT NULL,
        data TEXT,
        nestedComponents TEXT,
        inserted_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL
    );`;

  const screenIndexQuery = `CREATE INDEX IF NOT EXISTS screen_id_index ON ${tableName} (screenId)`;
  const widgetIndexQuery = `CREATE UNIQUE INDEX IF NOT EXISTS widget_id_index ON ${tableName} (widgetId)`;

  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(query, [],
        (_, res) => resolve(res),
        (_, err) => reject(err),
      );
      tx.executeSql(screenIndexQuery)
      tx.executeSql(widgetIndexQuery)
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
