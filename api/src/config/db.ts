import sqlite3 from 'sqlite3';
import { Database, open } from 'sqlite';
import { runSeed } from './seed';

let db: Database<sqlite3.Database, sqlite3.Statement>;

const DB_FILE = './db.sqlite'; // :memory: for in-memory database

export const initializeDb = async () => {
  db = await open({
    filename: DB_FILE,
    driver: sqlite3.Database,
  });

  await db.exec(`PRAGMA foreign_keys = ON;`);

  await db.exec(`
    CREATE TABLE IF NOT EXISTS tours (
      id TEXT PRIMARY KEY,
      name TEXT NOT NULL,
      description TEXT NOT NULL,
      detail TEXT,
      rating REAL,
      price INTEGER,
      days INTEGER,
      picture TEXT
    );

    CREATE TABLE IF NOT EXISTS bookings (
      id TEXT PRIMARY KEY,
      tour_id TEXT,
      name TEXT NOT NULL,
      email TEXT NOT NULL,
      booking_date TEXT NOT NULL,
      status TEXT NOT NULL,
      number_of_pax INTEGER NOT NULL,
      total_price INTEGER NOT NULL,
      FOREIGN KEY (tour_id) REFERENCES tours(id) ON DELETE CASCADE
    );

    CREATE TABLE IF NOT EXISTS feedbacks (
      id TEXT PRIMARY KEY,
      tour_id TEXT NOT NULL,
      full_name TEXT NOT NULL,
      comment TEXT NOT NULL,
      rating REAL NOT NULL,
      FOREIGN KEY (tour_id) REFERENCES tours(id) ON DELETE CASCADE
    );
  `);

  // if it's empty then seed the database
  const tours = await db.all(`SELECT * FROM tours LIMIT 1`);
  if (tours.length === 0) {
    await runSeed(db);
    console.log('SQLite database initialized with fake data.');
  } else {
    console.log('SQLite database initialized.');
  }

};

export const getDb = () => db;
