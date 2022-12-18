import uuid from 'react-native-uuid';

const tableName = "screens"
const expiredTableName = "screens_expiration_dates"
/*
кожен екран має дату валідності
вона може бути нулл тоді скрін валідний весь час
може бути якась дата, тоді після того як валідність вийшла треба заново з бека витягнути цей скрін
*/
export const getScreen = async (db, screenName) => {
  const expired = await isExpired(db, screenName);
  if (expired) return null;

  const query = `SELECT * FROM ${tableName} WHERE screenName = '${screenName}'`;
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(query, [],
        (_, res) => resolve(mapResult(res)),
        (_, err) => reject(err)
      );
    });
  })
};

const isExpired = async (db, screenName) => {
  const query = `SELECT * FROM ${expiredTableName} WHERE screenName = '${screenName}'`;
  const isExpiredMapResult = (res) => {
    const screenExpiration = res.rows.item(0);

    if (res.rows.length == 0) return false;
    if (screenExpiration.expired_at == "null") return false;
    if (new Date(screenExpiration.expired_at) > (new Date().getTime())) return false;

    return true;
  };
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(query, [],
        (_, res) => resolve(isExpiredMapResult(res)),
        (_, err) => reject(false)
      );
    });
  })
}

const mapResult = (results) => {
  let newstedComponents = [];

  for (let index = 0; index < results.rows.length; index++) {
    const row = results.rows.item(index);

    let widget = {
      id: row.widgetId,
      name: row.widgetName,
      data: JSON.parse(row.data),
      nestedComponents: JSON.parse(row.nestedComponents),
      inserted_at: row.inserted_at,
      updated_at: row.updated_at
    }

    newstedComponents.push(widget);
  }

  return {
    id: uuid.v4(),
    name: newstedComponents[0].screenName,
    nestedComponents: newstedComponents
  }
}
