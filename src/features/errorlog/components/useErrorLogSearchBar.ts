import { useState } from "react";

export default function useErrorLogSearchBar(onSearch: (query: string) => void) {
  const [searchValue, setSearchValue] = useState("");

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(searchValue);
  };

  const handleClear = () => {
    setSearchValue("");
    onSearch("");
  };

  return {
    searchValue,
    handleSearchChange,
    handleSubmit,
    handleClear,
  };
}
