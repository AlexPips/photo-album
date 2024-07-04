// src/components/PhotoList.js

import React from 'react';
import '../css/PhotoList.css';

const PhotoList = ({ photos, onBack, albumName }) => {
  const rows = [];
  for (let i = 0; i < photos.length; i += 4) {
    const rowPhotos = photos.slice(i, i + 4);
    const row = (
      <tr key={i}>
        {rowPhotos.map((photo, index) => (
          <td key={index}>
            <div className="photo-square">
              <img src={photo} alt={`Photo ${index + 1}`} />
            </div>
          </td>
        ))}
      </tr>
    );
    rows.push(row);
  }

  return (
    <div className="photo-list">
      <h2>{albumName}</h2>
      <button onClick={onBack}>Go Back</button>
      <table>
        <tbody>
          {rows}
        </tbody>
      </table>
    </div>
  );
};

export default PhotoList;
