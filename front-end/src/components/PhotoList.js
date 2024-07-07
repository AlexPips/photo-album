import React, { useState, useRef } from 'react';
import '../css/PhotoList.css';
import '@fortawesome/fontawesome-free/css/all.min.css';

const PhotoList = ({ photos, onBack, albumName }) => {
  const [loadedPhotos, setLoadedPhotos] = useState(15); // Initial number of photos to load
  const observer = useRef();

  const lastPhotoElementRef = (node) => {
    if (observer.current) observer.current.disconnect();
    observer.current = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        loadMorePhotos();
      }
    });
    if (node) observer.current.observe(node);
  };

  const loadMorePhotos = () => {
    setLoadedPhotos((prevLoadedPhotos) => prevLoadedPhotos + 15);
  };

  return (
    <div className="photo-list">
      <h2>{albumName}  Album</h2>
      <button onClick={onBack} className="back-button">
        <i className="fas fa-arrow-left"></i> Go Back
      </button>
      <div className="photos-container">
        {photos.slice(0, loadedPhotos).map((photo, index) => (
          <div
            key={photo.id}
            ref={index === loadedPhotos - 1 ? lastPhotoElementRef : null}
            className="photo-square"
          >
            <img src={photo.thumbnailUrl} alt={photo.title} />
            <div className="photo-title">{photo.title}</div>
          </div>
        ))}
      </div>
      {loadedPhotos < photos.length && (
        <p className="loading-message">Loading more photos...</p>
      )}
    </div>
  );
};

export default PhotoList;
