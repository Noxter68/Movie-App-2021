import React from "react";

const SearchBar = ({ value, onSubmit, onChange }) => {
  return (
    <div className="searchbar">
      <form
        action="/search"
        method="get"
        acceptCharset="utf-8"
        onSubmit={onSubmit}
      >
        <input
          type="text"
          placeholder="Search a movie.."
          name="query"
          value={value}
          onChange={onChange}
        ></input>
        <input className="btn-search" type="submit" />
      </form>
    </div>
  );
};

export default SearchBar;
