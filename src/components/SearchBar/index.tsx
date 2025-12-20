import React, { useState, useEffect, useRef } from "react";
import {
  SearchWrapper,
  SearchInput,
  SearchIcon,
  ClearButton,
  LoadingSpinner,
} from "./SearchBar.styles";

interface SearchBarProps {
  onSearch: (query: string) => void;
  isSearching?: boolean;
  placeholder?: string;
}

function SearchBar({
  onSearch,
  isSearching = false,
  placeholder = "Search venues...",
}: SearchBarProps) {
  const [value, setValue] = useState("");
  const debounceRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (debounceRef.current) {
      clearTimeout(debounceRef.current);
    }

    debounceRef.current = setTimeout(() => {
      onSearch(value.trim());
    }, 300);

    return () => {
      if (debounceRef.current) {
        clearTimeout(debounceRef.current);
      }
    };
  }, [value, onSearch]);

  const handleClear = () => {
    setValue("");
  };

  return (
    <SearchWrapper>
      <SearchIcon
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      >
        <circle cx="11" cy="11" r="8" />
        <path d="M21 21l-4.35-4.35" />
      </SearchIcon>

      <SearchInput
        id="venue-search"
        name="search"
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder={placeholder}
        aria-label="Search venues"
      />

      {isSearching && <LoadingSpinner />}

      {value && !isSearching && (
        <ClearButton onClick={handleClear} aria-label="Clear search">
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path d="M18 6L6 18M6 6l12 12" />
          </svg>
        </ClearButton>
      )}
    </SearchWrapper>
  );
}

export default SearchBar;
