// import axios from 'axios';

const BASE_URL = 'https://pixabay.com/api/';
const API_KEY = '30036034-49bdb558087010c436563671a';
const FILTER = '&image_type=photo&orientation=horizontal&per_page=12';

export const fetchGallery = (searchValue, page = 1) => {
  return fetch(
    `${BASE_URL}?key=${API_KEY}&q=${searchValue}&${FILTER}&page=${page}`
  );
};
