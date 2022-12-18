import { enablePromise, openDatabase, closeDBConnection } from 'react-native-sqlite-storage';

const DB_NAME = 'screens.db';

enablePromise(true);

export const getDBConnection = async () => {
  return openDatabase({name: DB_NAME, location: 'default'},
    (ok) => {
      console.log('database is opened');
    },
    (error) => {
      console.log('ERROR: ' + error);
    },);

};

export const closeConnection = async () => {
  return closeDBConnection(DB_NAME);
};