import React from "react";
import Container from "../../../Shared/Container/Container";
import useGetAllBooks from "../../../Util/Hooks/useGetAllBooks";
import usePContext from "../../../Util/Hooks/usePContext";
import AddBook from "./AddBook";
import Book from "./Book";
const PatenteBooks = () => {
  const { Books, refetch } = useGetAllBooks();
  const { loggedUser } = usePContext();

  return (
    <div className="py-10">
      <Container>
        <h1 className="text-4xl my-5 text-center">All Books</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 ">
          {Books.map((book) => (
            <Book key={book._id} book={book} />
          ))}
          {/*Manually added pdf */}
          <Book
            book={{
              title: "পাতেন্তের বাংলা বই",
              description: "এখানে পুরো থিওরি বাংলাতে ব্যাখ্যা করা আছে|",
              route: "PDFBook",
              coverImage: "https://i.ibb.co/M5FVmvJ/1.png",
            }}
          />
        </div>
        {loggedUser.role === "Admin" && <AddBook refetch={refetch} />}
      </Container>
    </div>
  );
};

export default PatenteBooks;
