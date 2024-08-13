import express from "express";
import "dotenv/config";
import pg from "pg";
import cors from "cors";

const db_pw = process.env.DB_PASSWORD;

const app = express();
app.use(express.json());
app.use(express.static("public"));

const corsOptions = {
  origin: ["http://localhost:5173"],
};
app.use(cors(corsOptions));

const port = 3000;
const db = new pg.Client({
  user: "postgres",
  host: "localhost",
  database: "book_notes",
  password: db_pw,
  port: 5432,
});
db.connect();

//gets all the book note entries
app.get("/", async (req, res) => {
  console.log("Request for all book notes received");
  try {
    const response = await db.query(
      "SELECT id, title, author, genre, TO_CHAR(date, 'YYYY-MM-DD') AS date, rating, notes FROM books ORDER BY title DESC"
    );
    res.status(200).json(response.rows);
  } catch (e) {
    res.status(500).send({ error: "Server side error" });
    console.log("Error with displaying the books: " + e);
  }
});

//add new entry
app.post("/", async (req, res) => {
  console.log("Request to add a book received");
  try {
    const newEntry = req.body.newEntry;
    await db.query(
      "INSERT INTO books VALUES (DEFAULT, $1, $2, $3, $4, $5, $6)",
      [
        newEntry.title,
        newEntry.author,
        newEntry.notes,
        newEntry.genre,
        newEntry.date,
        newEntry.rating,
      ]
    );
    res.status(201).json(newEntry);
  } catch (e) {
    res.status(500).send({ error: "Server side error" });
    console.log("Error adding a new entry: " + e);
  }
});

app.delete("/delete/:id", async (req, res) => {
  console.log("Request to delete a book received");
  try {
    const id = parseInt(req.params.id);

    await db.query("DELETE FROM books WHERE id = $1", [id]);
    res.status(204);
  } catch (e) {
    res.status(500).send({ error: "Server side error" });
    console.log("Error deleting an entry: " + e);
  }
});

app.patch("/edit/:id", async (req, res) => {
  console.log("Request to edit a book received");
  try {
    const id = parseInt(req.params.id);
    const updatedEntry = req.body.updatedEntry;

    await db.query(
      "UPDATE books SET title = $1, author = $2, notes = $3, genre = $4, date = $5, rating = $6 WHERE id = $7",
      [
        updatedEntry.title,
        updatedEntry.author,
        updatedEntry.notes,
        updatedEntry.genre,
        updatedEntry.date,
        updatedEntry.rating,
        id,
      ]
    );

    res.status(200).json(updatedEntry);
  } catch (e) {
    res.status(500).send({ error: "Server side error" });
    console.log("Error updaing an entry: " + e);
  }
});

app.get("/search", async (req, res) => {
  console.log("Request for all book notes received");

  try {
    const query = req.query.s.toLowerCase();
    const result = await db.query(
      "SELECT id, title, author, TO_CHAR(date, 'YYYY-MM-DD') AS date, rating, note FROM books WHERE LOWER(title) LIKE '%' || $1 || '%' OR LOWER(author) LIKE '%' || $1 || '%'",
      [query]
    );

    res.status(200).json(result.rows);
  } catch (e) {
    res.status(500).send({ error: "Server side error" });
    console.log("Error executing search: " + e);
  }
});

app.get("/sort", async (req, res) => {
  console.log("Request for all book notes received");

  try {
    const { sort } = req.query;
    if (!["title", "date", "rating"].includes(sort)) {
      console.log("issue");
      throw new Error(
        "Invalid sort mode. You can sort by recency, title, or rating"
      );
    } else {
      const response = await db.query(
        "SELECT id, title, author, TO_CHAR(date, 'YYYY-MM-DD') AS date, rating, notes FROM books ORDER BY $1 DESC",
        [sort]
      );
      res.status(200).json(response.rows);
    }
  } catch (e) {
    res.status(500).send({ error: "Server side error" });
    console.log("Error sorting the books:" + e);
  }
});

const server = app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

process.on("SIGINT", () => {
  console.log("Ctrl-C detected, ending server");
  db.end();
  server.close();
});
