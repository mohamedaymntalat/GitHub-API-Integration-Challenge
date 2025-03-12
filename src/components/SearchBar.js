import { useState } from "react";

export default function SearchBar({ onSearch }) {
  const [input, setInput] = useState("");

  const handleSearch = () => {
    if (input.trim() !== "") {
      onSearch(input.trim());
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <div className="search-bar">
      <input
        type="text"
        placeholder="Enter GitHub username"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={handleKeyDown}
      />
      <button onClick={handleSearch}>Search</button>
    </div>
  );
}
