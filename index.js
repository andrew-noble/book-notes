import express from "express";
import axios from "axios";
import queryString from "query-string";
import bodyParser from "body-parser";
import "dotenv/config";
import pg from "pg";

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

app.get("/", async (req, res) => {
  //default sort is most recent
  const result = await db.query("SELECT * FROM books ORDER BY date DESC");
  const bookList = result.rows;
  res.render("index.ejs", {
    bookList: bookList,
  });
});

app.post("/add", async (req, res) => {});

//would strictly be a PATCH, html forms only support get/post tho
app.post("/edit", async (req, res) => {});

//would strictly be a DELETE
app.post("/delete", async (req, res) => {});

app.get("/sort", async (req, res) => {});

app.get("/search", async (req, res) => {});

const server = app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

//Added this, should probably carry to future projects.
process.on("SIGINT", () => {
  //process is the lowest level node.js entity here
  console.log("Ctrl-C detected, ending server");
  db.end();
  //this is a higher level http.server object created by the even higher level express object express.app
  server.close();
});
