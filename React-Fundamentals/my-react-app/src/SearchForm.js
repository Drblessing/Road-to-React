import React from "react";
import InputWithLabel from "./InputWithLabel";
import styles from "./App.module.css";

const SearchForm = ({
  searchTerm,
  onSearchInput,
  onSearchSubmit,
  buttonClass,
}) => {
  return (
    <form onSubmit={onSearchSubmit} className={styles.searchForm}>
      <InputWithLabel
        id="search"
        value={searchTerm}
        isFocused
        onInputChange={onSearchInput}
      >
        <strong>Search:</strong>
      </InputWithLabel>

      <button
        type="submit"
        disabled={!searchTerm}
        className={`${styles.button} ${styles.buttonSmall}`}
      >
        Submit
      </button>
    </form>
  );
};

export default SearchForm;
