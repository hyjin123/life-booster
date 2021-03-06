DROP TABLE IF EXISTS tasks CASCADE;

CREATE TABLE tasks(
  id SERIAL PRIMARY KEY NOT NULL,
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  name VARCHAR(255) NOT NULL,
  description TEXT NOT NULL,
  type VARCHAR(255) NOT NULL,
  date DATE NOT NULL,
  status VARCHAR(255) NOT NULL,
  high_priority BOOLEAN DEFAULT FALSE NOT NULL
);