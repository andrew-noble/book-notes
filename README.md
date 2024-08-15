# Book Notes CRUD Project

This app allows the user to store book notes and details in their local postgres server. I made it to practice working with a
full application stack: frontend uses React and tailwind, backend is express.js, and database is PostgreSQL. I also learned
client-side routing with react-router-dom.

It's a CRUD app for book notes.

## Features

- view book note entries
- edit book note entries
- add new book notes entries
- delete book note entries

## Getting started

1. Using pgadmin, set up a database named books with the following schema:

```
CREATE TABLE books
(
    id integer SERIAL PRIMARY KEY NOT NULL,
    title varchar(90) NOT NULL UNIQUE,
    author varchar(45) NOT NULL,
    notes text,
    genre varchar(20),
    date date,
    rating integer CHECK (rating < 3),
);
```

1. Clone this repo
2. In the folder where you cloned the repo to, install the node packages with `npm i`
3. Link your pg database by adding your pg password to the environment variables: `touch backend/.env && echo "DB_PASSWORD="<your_password>" >> backend/.env`
4. You should be all set. Go ahead and run the app with `npm run dev`, and navigate to http://localhost:5173 in your browser to try out the app.
