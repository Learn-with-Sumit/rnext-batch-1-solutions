import { useState } from "react";
import BookGrid from "./components/Books/BookGrid";
import Header from "./components/Header/Header";
import Layout from "./components/Layout";

export default function App() {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("");

  const handleSearch = (searchTerm) => {
    setSearchTerm(searchTerm);
  };

  const handleSort = (sortBy) => {
    setSortBy(sortBy);
  };

  return (
    <>
      <Layout>
        <Header
          searchTerm={searchTerm}
          handleSearch={handleSearch}
          sortBy={sortBy}
          handleSort={handleSort}
        />
        <BookGrid searchTerm={searchTerm} sortBy={sortBy} />
      </Layout>
    </>
  );
}
