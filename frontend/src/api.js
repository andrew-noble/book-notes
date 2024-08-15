import axios from "axios";

export default function BookApi() {
  const API_URL = "http://localhost:3000/";

  const createBook = async (book) => {
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

  const readAllBooks = async () => {
    const response = await axios.get(API_URL);
    return response.data;
  };

  const updateBook = async (book) => {
    const response = await axios.patch(
      `${API_URL}edit/${book.id}`,
      { updatedEntry: book },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    return response.data;
  };

  const deleteBook = async (book) => {
    const response = await axios.delete(`${API_URL}delete/${book.id}`);

    return response.status;
  };

  return {
    createBook: createBook,
    readAllBooks: readAllBooks,
    updateBook: updateBook,
    deleteBook: deleteBook,
  };
}

//this needs a return value because we need to use the SQL-generated id for the new book

//TO-DO later: integrate sorting and searching API calls (will require backend work)
