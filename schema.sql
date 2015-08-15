DROP TABLE IF EXISTS topics;
DROP TABLE IF EXISTS posts;
DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS categories;

CREATE TABLE users(
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  username TEXT,
  password VARCHAR,
  avatar VARCHAR,
  admin TEXT
);

PRAGMA foreign_keys = ON;
CREATE TABLE topics(
  t_id INTEGER PRIMARY KEY AUTOINCREMENT,
  u_id INTEGER,
  topic VARCHAR,
  vote INTEGER,
  num_of_posts INTEGER,
  cat_id INTEGER,
  FOREIGN KEY (u_id) REFERENCES users(id),
  FOREIGN KEY (cat_id) REFERENCES categories(c_id)
);

CREATE TABLE categories(
  c_id INTEGER PRIMARY KEY AUTOINCREMENT,
  name VARCHAR
);

CREATE TABLE posts(
  p_id INTEGER PRIMARY KEY AUTOINCREMENT,
  t_id INTEGER,
  post VARCHAR,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (t_id) REFERENCES topics(t_id)
);