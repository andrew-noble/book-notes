import axios from "axios";

const API_URL = "http://localhost:3000/";

//this needs a return value because we need to use the SQL-generated id for the new book
export const createBook = async (book) => {
  const response = await axios.post(
    API_URL,
    { newEntry: book },
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  return response.data;
};

export const readAllBooks = async () => await axios.get(API_URL);

export const updateBook = async (book) =>
  axios.patch(
    `${API_URL}edit/${book.id}`,
    { updatedEntry: book },
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

export const deleteBook = async (book) =>
  axios.delete(`${API_URL}delete/${book.id}`);

//TO-DO later: integrate sorting and searching API calls (will require backend work)
