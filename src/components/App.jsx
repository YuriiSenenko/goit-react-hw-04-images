import React, { Component } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';
import { toast } from 'react-toastify';

import { Searchbar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Button } from './Button/Button';
import { Modal } from './Modal/Modal';
import { Loader } from './Loader/Loader';
import { fetchGallery } from '../api/GalleryAPI';

export class App extends Component {
  state = {
    searchValue: '',
    page: 1,
    gallery: [],
    showModal: false,
    error: null,
    status: 'idle',
    largeImageURL: '',
    loadMore: false,
  };

  componentDidUpdate = (_, prevState) => {
    const { page, searchValue } = this.state;
    const prevValue = prevState.searchValue;

    if (prevValue !== searchValue || prevState.page !== page) {
      //! Запуск loader
      this.setState({ status: 'pending' });

      //! Fetch
      fetchGallery(searchValue, this.state.page)
        .then(response => response.json())
        .then(({ hits }) => {
          this.showLoadMore(hits);
          this.setState(() => ({
            gallery: [...this.state.gallery, ...hits],
            status: 'resolved',
          }));
        })

        .catch(error => this.setState({ error, status: 'rejected' }));
    }
  };

  showLoadMore = arr => {
    if (arr.length === 12) {
      this.setState({ loadMore: true });
    } else if (arr.length === 0) {
      this.setState({ loadMore: false });
      toast.info('Nothing was found for your query!');
    } else {
      this.setState({ loadMore: false });
    }
  };

  // Записуємо результат пошуку в state App
  handleFormSubmit = searchValue => {
    this.setState({ searchValue: searchValue, page: 1, gallery: [] });
  };

  // Змінює сторінку пагінації
  changePage = () => {
    this.setState(prevState => ({ page: prevState.page + 1 }));
  };

  // Відкривашка модального вікна
  toggleModal = () => {
    this.setState(state => ({
      showModal: !state.showModal,
    }));
  };

  modalImg = img => {
    this.setState({ largeImageURL: img });
  };

  render() {
    const { status, gallery, showModal, loadMore } = this.state;

    if (status === 'idle') {
      // return;
    }

    if (status === 'pending') {
      // return;
    }
    if (status === 'rejected') {
      return toast.error('The search field is empty!');
    }
    return (
      <div className="App">
        <Searchbar onSubmit={this.handleFormSubmit} />
        {gallery && (
          <ImageGallery
            gallery={gallery}
            status={status}
            onModal={this.toggleModal}
            modalImg={this.modalImg}
          />
        )}
        {status === 'pending' && <Loader />}
        {loadMore && <Button loadMore={this.changePage}>Load more</Button>}

        {showModal && (
          <Modal
            onClose={this.toggleModal}
            largeImage={this.state.largeImageURL}
          />
        )}
        <ToastContainer
          theme="colored"
          position="top-center"
          autoClose={2000}
        />
      </div>
    );
  }
}
