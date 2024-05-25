import express from "express";
import axios from "axios";
import queryString from "query-string";
import bodyParser from "body-parser";
import "dotenv/config";
import pg from "pg";
//import sortBooks from "./helpers/sorter.js";

const db_pw = process.env.DB_PASSWORD;

const app = express();
const port = 3000;
const db = new pg.Client({
  user: "postgres",
  host: "localhost",
  database: "book_notes",
  password: db_pw,
  port: 5432,
});
db.connect();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
let sortMode = "title"; //default sort is alphabetical by title
const validSortModes = ["title", "date", "rating"];

function getCover(isbn) {
  return `https://covers.openlibrary.org/b/isbn/${isbn}-M.jpg`;
}

//this endpoint just shows the whole list of books, sorted per sortMode
app.get("/", async (req, res) => {
  try {
    const text = `SELECT * FROM books ORDER BY ${sortMode} DESC`;
    const result = await db.query(text);
    const bookList = result.rows;

    //Fixing dates to make it simple -- should be able to do this in the query but it makes me have to not use *
    //which causes pg to output an string rather than object which is annoying to parse, so I'm doing this.
    //This also appears to be important for inserting dates back into the DB down in /edit and /add
    bookList.forEach((entry) => {
      entry.date = entry.date.toISOString().split("T")[0];
      entry.cover = getCover(entry.isbn);
    });

    res.render("index.ejs", {
      bookList: bookList,
    });
  } catch (error) {
    console.log("Error with displaying the books:" + error);
  }
});

//this endpoint adds a new entry to the database
app.post("/add", async (req, res) => {
  try {
    const entry = {
      title: req.body.addTitle,
      author: req.body.addAuthor,
      isbn: req.body.addIsbn,
      notes: req.body.addNotes,
      genre: req.body.addGenre,
      date: req.body.addDate,
      rating: req.body.addRating,
    };

    await db.query(
      "INSERT INTO books VALUES (DEFAULT, $1, $2, $3, $4, $5, $6, $7)",
      [
        entry.title,
        entry.author,
        entry.isbn,
        entry.notes,
        entry.genre,
        entry.date,
        entry.rating,
      ]
    );
    res.redirect("/");
  } catch (error) {
    console.log("Error with adding a book entry:" + error);
  }
});

//this endpoint alters a book entry in the database
//would strictly be a PATCH, html forms only support get/post tho
app.post("/edit", async (req, res) => {
  try {
    const updatedEntryId = req.body.updatedItemId;
    const updatedEntry = {
      title: req.body.updatedTitle,
      author: req.body.updatedAuthor,
      isbn: req.body.updatedIsbn,
      notes: req.body.updatedNotes,
      genre: req.body.updatedGenre,
      date: req.body.updatedDate,
      rating: req.body.updatedRating,
      id: req.body.updatedItemId,
    };

    await db.query(
      "UPDATE books SET (title, author, isbn, notes, genre, date, rating) = ($1, $2, $3, $4, $5, $6, $7) WHERE id = $8",
      [
        updatedEntry.title,
        updatedEntry.author,
        updatedEntry.isbn,
        updatedEntry.notes,
        updatedEntry.genre,
        updatedEntry.date,
        updatedEntry.rating,
        updatedEntryId,
      ]
    );
    res.redirect("/");
  } catch (error) {
    console.log("Error editing the book entry:" + error);
  }
});

//this endpoint takes the user to the page that lets them add a new entry
app.post("/addPage", async (req, res) => {
  try {
    res.render("add.ejs");
  } catch (error) {
    console.log("Error adding a new book entry:" + error);
  }
});

//this enpoint takes the user to the edit page with the entry-to-be-edited populated
app.post("/editPage", async (req, res) => {
  try {
    const updateEntry = {
      title: req.body.updatedTitle,
      author: req.body.updatedAuthor,
      isbn: req.body.updatedIsbn,
      notes: req.body.updatedNotes,
      genre: req.body.updatedGenre,
      date: req.body.updatedDate,
      rating: req.body.updatedRating,
      id: req.body.updatedItemId,
    };

    res.render("edit.ejs", { item: updateEntry });
  } catch (error) {
    console.log("Error editing the book entry:" + error);
  }
});

//this endpoint deletes a book entry
//would strictly be a DELETE
app.post("/delete", async (req, res) => {
  try {
    const deleteId = req.body.deleteId;
    await db.query("DELETE FROM books WHERE id = $1", [deleteId]);
    res.redirect("/");
  } catch (error) {
    console.log("Error deleting book entry:" + error);
  }
});

//the /sort endpoint just sanitizes the user's choice for sort, changes the sortMode variable,
//and redirects to '/' for re-displaying

//goddamn this was a good way to do this. So simple on frontend and backend
//remember querystrings are good for sorting/filtering bc. They lend themselves to when
//the user is specifying a choice from pre-made options (like 'title' or 'recency')
app.get("/sort", async (req, res) => {
  try {
    console.log(req.query.sortMode);
    //this prevents SQL injection I think
    if (!validSortModes.includes(req.query.sortMode)) {
      console.log("Invalid sort mode.");
    } else {
      sortMode = req.query.sortMode;
      res.redirect("/");
    }
  } catch (error) {
    console.log("Error sorting the books:" + error);
  }
});

//this endpoint retrieves a smaller booklist that satisfies the user's search, and renders index.ejs like / does
app.post("/search", async (req, res) => {
  try {
    const query = req.body.searchField.toLowerCase();
    const result = await db.query(
      "SELECT * FROM books WHERE LOWER(title) LIKE '%' || $1 || '%' OR LOWER(author) LIKE '%' || $1 || '%'",
      [query]
    );
    const bookList = result.rows;
    res.render("index.ejs", {
      bookList: bookList,
    });
  } catch (error) {
    console.log("Error searching" + error);
  }
});

const server = app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

//This is logic that handles the server closing
process.on("SIGINT", () => {
  //process is the lowest level node.js entity here
  console.log("Ctrl-C detected, ending server");
  db.end();
  //this is a higher level http.server object created by the even higher level express object express.app
  server.close();
});
