CREATE DATABASE express_pressa;
DROP TABLE IF EXISTS admins;
CREATE TABLE admins(
  admin_id SERIAL PRIMARY KEY UNIQUE,
  username VARCHAR(32) NOT NULL UNIQUE,
  password VARCHAR(200) NOT NULL
);
DROP TABLE IF EXISTS categories;
CREATE TABLE categories(
  category_id SERIAL PRIMARY KEY UNIQUE,
  category_name VARCHAR(64)
);
DROP TABLE IF EXISTS subCategories;
CREATE TABLE subCategories(
  sub_category_id SERIAL PRIMARY KEY,
  sub_category_name VARCHAR(64),
  category_id INT REFERENCES categories(category_id)
);
DROP TABLE IF EXISTS authors;
CREATE TABLE authors(
  author_id SERIAL PRIMARY KEY UNIQUE,
  full_name VARCHAR(32) NOT NULL,
  phone_number VARCHAR(13) NOT NULL,
  job VARCHAR(32) NOT NULL
);
DROP TABLE IF EXISTS posters;
CREATE TABLE posters(
  poster_id SERIAL PRIMARY KEY UNIQUE,
  poster_title VARCHAR(64) NOT NULL,
  poster_body VARCHAR(260) NOT NULL,
  poster_started_date VARCHAR(64) NOT NULL,
  poster_image VARCHAR(128) NOT NULL,
  poster_event_type VARCHAR(7) NOT NULL,
  poster_link VARCHAR(64) NOT NULL,
  author_id INT REFERENCES authors(author_id),
  sub_category_id INT REFERENCES subCategories(sub_category_id),
  poster_views INT NOT NULL,
  poster_status VARCHAR(7) NOT NULL
);
