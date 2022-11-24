import { ImmageGalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem';
import './ImageGallery.css';
// import React from 'react';
import PropTypes from 'prop-types';

export function ImageGallery({ gallery, onModal, modalImg }) {
  return (
    //Перекидую пропс далі
    <div>
      <ul className="ImageGallery">
        <ImmageGalleryItem
          onModal={onModal}
          modalImg={modalImg}
          gallery={gallery}
        />
      </ul>
    </div>
  );
}

ImageGallery.propTypes = {
  onModal: PropTypes.func,
  gallery: PropTypes.array,
  modalImg: PropTypes.func,
};
