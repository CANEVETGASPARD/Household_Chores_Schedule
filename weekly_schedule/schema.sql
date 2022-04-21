DROP TABLE IF EXISTS people;
DROP TABLE IF EXISTS family;
DROP TABLE IF EXISTS schedule;

CREATE TABLE family (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  familyName TEXT UNIQUE NOT NULL,
  password TEXT NOT NULL
);

CREATE TABLE people (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  familyId INTEGER NOT NULL,
  username TEXT NOT NULL,
  monday INTEGER,
  tuesday INTEGER,
  wednesday INTEGER,
  thursday INTEGER,
  friday INTEGER,
  saturday INTEGER,
  sunday INTEGER,
  FOREIGN KEY (familyId) REFERENCES family(id),
  CONSTRAINT uniqueRelationPeopleFamily UNIQUE (username,familyId)
);

CREATE TABLE calendar (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  familyId INTEGER NOT NULL,
  created TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  title TEXT NOT NULL,
  monday TEXT,
  tuesday TEXT,
  wednesday TEXT,
  thursday TEXT,
  friday TEXT,
  saturday TEXT,
  sunday TEXT,
  FOREIGN KEY (familyId) REFERENCES family(id)
);
