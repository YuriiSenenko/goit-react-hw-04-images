import { useState } from 'react';
import { toast } from 'react-toastify';
import './Searchbar.css';

import PropTypes from 'prop-types';

import { ImSearch } from 'react-icons/im';

export function Searchbar({ onSubmit }) {
  const [searchValue, setSearchValue] = useState('');

  // Записує значення пошуку в state при зміні input
  const handleChange = e => {
    setSearchValue(e.currentTarget.value.toLowerCase());
  };

  // Відправляє значення searchValue в state App
  const handleSubmit = e => {
    e.preventDefault();
    // const { searchValue } = this.state;

    //якщо input пустий, не сабмітити форму
    if (searchValue.trim() === '') {
      toast.error('The search field is empty!');
      return;
    }
    onSubmit(searchValue);
  };

  return (
    <header className="Searchbar">
      <form className="SearchForm" onSubmit={handleSubmit}>
        <button type="submit" className="SearchForm-button">
          <ImSearch />
        </button>

        <input
          className="SearchForm-input"
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          value={searchValue}
          onChange={handleChange}
        />
      </form>
    </header>
  );
}

Searchbar.propTupes = {
  onSubmit: PropTypes.func,
};
