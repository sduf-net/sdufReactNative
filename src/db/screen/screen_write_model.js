import uuid from 'react-native-uuid';
// import { useDispatch } from 'react-redux';
import { setCurrentScreen } from '../../redux/screens';

const tableName = "screens";
const expiredTableName = "screens_expiration_dates";
// const dispatch = useDispatch();
import store from '../../redux/store'
/*
Screen
  id: string
  name: string
  data: object
  nestedComponents: array<object>
  expitedAt: timestamp
*/
export const saveScreen = async (db, screen) => {
  if (screen && screen.nestedComponents && screen.nestedComponents.length) {
    screen.nestedComponents.forEach(widget => {
      const query =
        `INSERT OR REPLACE INTO ${tableName}(id, screenId, screenName, widgetId, widgetName, data, nestedComponents, updated_at) values` +
        `(
        '${uuid.v4()}', 
        '${screen.id}', 
        '${screen.name}', 
        '${widget.id}', 
        '${widget.name}', 
        '${widget.data ? JSON.stringify(widget.data) : null}',
        '${widget.nestedComponents ? JSON.stringify(widget.nestedComponents) : null}',
        strftime('%s','now')
        )`;

      const expitedQuery = `INSERT OR REPLACE INTO ${expiredTableName}(screenName, expired_at, updated_at) values` +
        `(
          '${screen.name}', 
          '${screen.expitedAt ? new Date(screen.expitedAt).getTime() : null}', 
          strftime('%s','now')
          )`;

      db.transaction((tx) => {
        tx.executeSql(query, [],
          (_, res) => res,
          (_, err) => console.warn(err),
        );
        tx.executeSql(expitedQuery, [],
          (_, res) => console.log(res),
          (_, err) => console.warn(err),
        );
      });
    });
    console.log("=========================");
    store.dispatch(setCurrentScreen(screen));
  } else {
    console.warn("empty screen");
  }
};

export const saveWidget = async (db, widget) => {
  if (widget) {
    screen.nestedComponents.forEach(widget => {
      const query =
        `INSERT OR REPLACE INTO ${tableName}(widgetName, data, nestedComponents, updated_at) values` +
        `(
        '${widget.name}', 
        '${widget.data ? JSON.stringify(widget.data) : null}',
        '${widget.nestedComponents ? JSON.stringify(widget.nestedComponents) : null}',
        strftime('%s','now')
        )` +
        `WHERE widgetId = '${widget.id}'`;
      db.transaction((tx) => {
        tx.executeSql(query, [],
          (_, res) => console.log(res),
          (_, err) => console.warn(err),
        );
      });
    });
  } else {
    console.warn("empty widget");
  }
};

// export const deleteTodoItem = async (db: SQLiteDatabase, id: number) => {
//   const deleteQuery = `DELETE from ${tableName} where rowid = ${id}`;
//   await db.executeSql(deleteQuery);
// };
