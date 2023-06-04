-- admin create
INSERT INTO admins (admin_id, username, password)
VALUES (
    1,
    'admin',
    '8c6976e5b5410415bde908bd4dee15dfb167a9c873fc4bb8a81f6f2ab448a918'
  );
-- author create
INSERT INTO authors (full_name, phone_number, job)
VALUES ('PostgreSQL', '+998909992122', 'Dizayn');
-- categries create
INSERT INTO categories(category_name)
VALUES ('Information Texnologies'),
  ('Dizayn'),
  ('Biznes'),
  ('Tal''im');
-- subCategries create
INSERT INTO subcategries(sub_category_name, category_id)
VALUES ('Web dasturlash', 1),
  ('Mobile dasturlash', 1),
  ('UI/UX dizayn', 2),
  ('Grafik dizayn', 2),
  ('Menejment', 3),
  ('Kredit va audit', 3),
  ('Matematika', 4),
  ('Fizika', 4);
-- posters create
INSERT INTO posters(
    poster_title,
    poster_body,
    poster_started_date,
    poster_image,
    poster_event_type,
    poster_link,
    author_id,
    sub_category_id,
    poster_views,
    poster_status
  )
VALUES (
    'Postgresql ni elephantsql.com ga uladik',
    'poster body lorem ipsum dolor somit postgresql postgresql',
    '22-01-2022/14:00',
    'postgresql.jpg',
    'offline',
    'nimadir.com/new/post/link',
    1,
    1,
    3,
    'active'
  )