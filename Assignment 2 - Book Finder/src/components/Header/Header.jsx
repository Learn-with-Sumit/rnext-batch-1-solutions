import React from "react";
import SearchBook from "./SearchBook";
import SortBy from "./SortBy";

export default function Header({
  searchTerm,
  handleSearch,
  sortBy,
  handleSort,
}) {
  return (
    <header className="mb-8 lg:mb-10 mx-auto max-w-7xl">
      <div className="mx-auto flex items-end justify-between max-md:max-w-[95%] max-md:flex-col max-md:items-start max-md:space-y-4">
        <div>
          <h6 className="mb-2 text-base lg:text-xl">Trending on 2021</h6>
          <h2 className="mb-6 font-['Playfair_Display'] text-3xl font-bold lg:text-4xl">
            Trending Books of the Year
          </h2>

          <SearchBook searchTerm={searchTerm} handleSearch={handleSearch} />
        </div>
        <SortBy sortBy={sortBy} handleSort={handleSort} />
      </div>
    </header>
  );
}
