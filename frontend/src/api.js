import axios from "axios";

const API_URL = "http://localhost:3000/";

export const createBook = async (book) =>
  await axios.post(
    API_URL,
    { newEntry: book },
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

export const readAllBooks = async () => await axios.get(API_URL);

export const updateBook = async (id, book) =>
  axios.patch(
    `${API_URL}edit/${id}`,
    { updatedEntry: book },
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

export const deleteBook = async (id) => axios.delete(`${API_URL}delete/${id}`);

//TO-DO later: integrate sorting and searching API calls (will require backend work)
