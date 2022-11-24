// import React from 'react';
import './ImageGalleryItem.css';
import PropTypes from 'prop-types';

export function ImmageGalleryItem({ gallery, onModal, modalImg }) {
  return gallery.map(({ id, webformatURL, tags, largeImageURL }) => (
    <li key={id} className="ImageGalleryItem" onClick={onModal}>
      <img
        src={webformatURL}
        alt={tags}
        onClick={() => modalImg(largeImageURL)}
      />
    </li>
  ));
}

ImmageGalleryItem.propTypes = {
  onModal: PropTypes.func,
  gallery: PropTypes.array,

  modalImg: PropTypes.func,
};
