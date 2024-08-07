# Book Notes Project

This is a small project I did to practice working with a full application stack: frontend uses React and tailwind, backend is express.js, and database
is PostgreSQL. Basically, this app allows the user to record books they've read and what they think of them. I also experimented with scss for
the first time in this project.

## Features

- view book note entries with a cover image provided by Open Library
- edit book note entries
- add new book notes entries
- sort books by most recent, highest rating, and alphanumerically by title
- search for book entries by author or title

## Packages Used

- [express](https://expressjs.com/) for the webapp/server
- [EJS](https://ejs.co/) for templating the frontend
- [dotenv](https://www.npmjs.com/package/dotenv) for hiding my client secret and client id
- [sass](https://sass-lang.com/) for styling
- [postgresql](https://www.postgresql.org/) as the database

## Getting started

1. Clone the repo
2. In the folder where you cloned the repo to, install the node packages with `npm i`
3. Create a .env file in in the repo with `touch .env`
4. Populate the .env file with your postgresql password as so: `DB_PASSWORD="<your_password>"`
5. Using pgadmin (or not if you're cool), set up a database named books with the following schema:

```
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
```

6. You should be all set. Go ahead and run the app with `node index.js`, and navigate to http://localhost:3000 in your browser to try out the app.
