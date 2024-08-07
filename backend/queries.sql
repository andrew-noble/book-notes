CREATE TABLE books
(
    id integer SERIAL PRIMARY KEY NOT NULL,
    title varchar(90) NOT NULL UNIQUE,
    author varchar(45) NOT NULL,
    isbn varchar(13)  NOT NULL UNIQUE,
    notes text,
    genre varchar(20),
    date date,
    rating integer CHECK (rating < 3),
);