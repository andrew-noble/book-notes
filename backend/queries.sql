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

--same as SELECT *, but formats the date

SELECT 
      id, 
      title, 
      author, 
      isbn, 
      TO_CHAR(date, 'YYYY-MM-DD') AS date,
      rating,
      review
    FROM books 
    ORDER BY title DESC