import React from 'react';
import PropTypes from 'prop-types';
import styles from './ImageGalleryItem.module.css';

const ImageGalleryItem = ({ webformatURL, largeImageURL, onClick }) => (
  <li className={styles.galleryItem}>
    <img
      src={webformatURL}
      alt=""
      className={styles.image}
            onClick={() => onClick(largeImageURL)}
            style={{ width: '400px'  }}
    />
  </li>
);

ImageGalleryItem.propTypes = {
  webformatURL: PropTypes.string.isRequired,
  largeImageURL: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default ImageGalleryItem;