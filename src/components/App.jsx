import { useState, useEffect } from 'react';
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

export function App() {
  const [searchValue, setSearchValue] = useState('');
  const [page, setPage] = useState(1);
  const [gallery, setGallery] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [error, setError] = useState(null);
  const [status, setStatus] = useState('idle');
  const [largeImageURL, setLargeImageURL] = useState('');
  const [loadMore, setLoadMore] = useState(false);

  useEffect(() => {
    if (searchValue === '') {
      return;
    }

    setStatus('pending');

    //! Fetch
    fetchGallery(searchValue, page)
      .then(response => response.json())
      .then(({ hits }) => {
        showLoadMore(hits);
        setGallery(gallery => [...gallery, ...hits]);
        setStatus('resolved');
      })

      .catch(error => {
        setError(error);
        setStatus('rejected');
      });
  }, [page, searchValue]);

  const showLoadMore = arr => {
    if (arr.length === 12) {
      setLoadMore(true);
    } else if (arr.length === 0) {
      setLoadMore(false);
      toast.info('Nothing was found for your query!');
    } else {
      setLoadMore(false);
    }
  };

  // Записуємо результат пошуку в state App
  const handleFormSubmit = searchValue => {
    setSearchValue(searchValue);
    setPage(1);
    setGallery([]);
  };

  // Змінює сторінку пагінації------------------------------------ перевірити
  const changePage = () => {
    console.log(page);
    setPage(prevState => prevState + 1);
  };

  // Відкривашка модального вікна ------------------------------------ перевірити
  const toggleModal = () => {
    setShowModal(prevState => !showModal);
  };

  const modalImg = img => {
    setLargeImageURL(img);
  };

  if (status === 'idle') {
    // return;
  }

  if (status === 'pending') {
    // return;
  }
  if (status === 'rejected') {
    return error('The search field is empty!');
  }

  return (
    <div className="App">
      <Searchbar onSubmit={handleFormSubmit} />
      {gallery && (
        <ImageGallery
          gallery={gallery}
          status={status}
          onModal={toggleModal}
          modalImg={modalImg}
        />
      )}
      {status === 'pending' && <Loader />}
      {loadMore && <Button loadMore={changePage}>Load more</Button>}

      {showModal && <Modal onClose={toggleModal} largeImage={largeImageURL} />}
      <ToastContainer theme="colored" position="top-center" autoClose={2000} />
    </div>
  );
}
