import React from 'react';
import '../css/AlbumList.css';
import '@fortawesome/fontawesome-free/css/all.min.css';

const AlbumList = ({ albums, onSelectAlbum, onBack, userName }) => {
  return (
    <div className="album-list">
      <h2>{userName}'s Albums</h2>
      <button onClick={onBack} className="back-button">
        <i className="fas fa-arrow-left"></i> Go Back
      </button>
      <div className="albums-container">
        {albums.map((album) => (
          <div
            key={album.id}
            className="album-square"
            onClick={() => onSelectAlbum(album.id)}
          >
            <div className="album-title">{album.title}</div>
            <p className="album-photo-count">{album.photoCount} photos</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AlbumList;
