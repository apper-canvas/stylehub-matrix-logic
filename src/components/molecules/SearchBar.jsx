import React, { useState } from "react";
import Input from "@/components/atoms/Input";
import ApperIcon from "@/components/ApperIcon";

const SearchBar = ({ onSearch, placeholder = "Search for products..." }) => {
  const [query, setQuery] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(query);
  };

  const handleInputChange = (e) => {
    setQuery(e.target.value);
    if (e.target.value.length > 2) {
      onSearch(e.target.value);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="relative max-w-md">
      <Input
        type="text"
        value={query}
        onChange={handleInputChange}
        placeholder={placeholder}
        icon="Search"
        className="pr-10"
      />
      <button
        type="submit"
        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-primary transition-colors"
      >
        <ApperIcon name="Search" size={16} />
      </button>
    </form>
  );
};

export default SearchBar;