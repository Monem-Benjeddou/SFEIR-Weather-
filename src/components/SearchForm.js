import React from "react";

const SearchForm = ({ onSearch }) => (
  <div className="search-container">
    <form
      id="search-form"
      onSubmit={(e) => {
        e.preventDefault();
        const location = e.target.elements["search-input"].value;
        onSearch(location);
      }}
    >
      <input type="text" id="search-input" placeholder="Search location..." />
      <button type="submit">Search</button>
    </form>
  </div>
);

export default SearchForm;
