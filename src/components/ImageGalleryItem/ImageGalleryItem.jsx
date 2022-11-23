import React, { Component } from 'react';
import './ImageGalleryItem.css';
import PropTypes from 'prop-types';

export class ImmageGalleryItem extends Component {
  render() {
    const { gallery, onModal, modalImg } = this.props;
    // if (status === 'resolved') {
    return gallery.map(({ id, webformatURL, tags, largeImageURL }) => (
      <li key={id} className="ImageGalleryItem" onClick={onModal}>
        <img
          src={webformatURL}
          alt={tags}
          onClick={() => modalImg(largeImageURL)}
        />
      </li>
    ));
    // }
  }
}

ImmageGalleryItem.propTypes = {
  onModal: PropTypes.func,
  gallery: PropTypes.array,

  modalImg: PropTypes.func,
};
