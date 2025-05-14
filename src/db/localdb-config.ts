import * as SQLite from 'expo-sqlite';

let db: SQLite.SQLiteDatabase | undefined;

export const initDatabase = async (): Promise<SQLite.SQLiteDatabase> => {
  if (!db) {
    db = await SQLite.openDatabaseAsync('local.db');
    //db = SQLite.openDatabase('test.db');
  }
  return db;
};
//const db = SQLite.openDatabase('mon_gestionnaire.db');
// 