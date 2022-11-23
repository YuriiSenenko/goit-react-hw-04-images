import React from 'react';
import { toast } from 'react-toastify';
import './Searchbar.css';
// import { ReactComponent as SearchIcon } from '../icons/icon-search.svg';
import PropTypes from 'prop-types';
import { Component } from 'react';
import { ImSearch } from 'react-icons/im';

export class Searchbar extends Component {
  state = {
    searchValue: '',
  };

  // Записує значення пошуку в state при зміні input
  handleChange = e => {
    this.setState({ searchValue: e.currentTarget.value.toLowerCase() });
  };

  // Відправляє значення searchValue в state App
  handleSubmit = e => {
    e.preventDefault();
    const { searchValue } = this.state;

    //якщо input пустий, не сабмітити форму
    if (this.state.searchValue.trim() === '') {
      toast.error('The search field is empty!');
      return;
    }
    this.props.onSubmit(searchValue);
  };

  render() {
    return (
      <header className="Searchbar">
        <form className="SearchForm" onSubmit={this.handleSubmit}>
          <button type="submit" className="SearchForm-button">
            <ImSearch />
          </button>

          <input
            className="SearchForm-input"
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            value={this.state.searchValue}
            onChange={this.handleChange}
          />
        </form>
      </header>
    );
  }
}

Searchbar.propTupes = {
  onSubmit: PropTypes.func,
};
