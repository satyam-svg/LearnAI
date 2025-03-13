-- Create the database, user, and grant privileges
-- CREATE DATABASE learnai;
-- CREATE USER learnai_user WITH PASSWORD 'securepassword';
-- GRANT ALL PRIVILEGES ON DATABASE learnai TO learnai_user;


-- Connect to the 'learnai' database (this command is used only in the psql shell)
\c learnai

-- Create the 'users' table
CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    email VARCHAR(255) UNIQUE,
    mobile VARCHAR(15) UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);


-- Alter the 'users' table to add additional columns and modify mobile column type
ALTER TABLE users
  ADD COLUMN IF NOT EXISTS full_name VARCHAR(255) NOT NULL,
  ADD COLUMN IF NOT EXISTS nick_name VARCHAR(255),
  ADD COLUMN IF NOT EXISTS dob DATE,
  ADD COLUMN IF NOT EXISTS class INTEGER,
  ADD COLUMN IF NOT EXISTS country_code VARCHAR(5),
  ADD COLUMN IF NOT EXISTS profile_image_url TEXT,
  ALTER COLUMN mobile TYPE VARCHAR(20);

