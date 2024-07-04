// src/components/AlbumList.js

import React from 'react';
import '../css/AlbumList.css';

const AlbumList = ({ albums, onSelectAlbum, onBack, username }) => {
  const rows = [];
  for (let i = 0; i < albums.length; i += 4) {
    const rowAlbums = albums.slice(i, i + 4);
    const row = (
      <tr key={i}>
        {rowAlbums.map(album => (
          <td key={album.id} onClick={() => onSelectAlbum(album.id)}>
            <div className="album-square">
              {album.name} ({album.photoCount} photos)
            </div>
          </td>
        ))}
      </tr>
    );
    rows.push(row);
  }

  return (
    <div className="album-list">
      <h2>{username} Albums</h2>
      <button onClick={onBack}>Go Back</button>
      <table>
        <tbody>
          {rows}
        </tbody>
      </table>
    </div>
  );
};

export default AlbumList;
