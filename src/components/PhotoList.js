import React from 'react';
import '../css/PhotoList.css';
import '@fortawesome/fontawesome-free/css/all.min.css';

const PhotoList = ({ photos, onBack, albumName }) => {
  const rows = [];
  for (let i = 0; i < photos.length; i += 4) {
    const rowPhotos = photos.slice(i, i + 4);
    const row = (
      <tr key={i}>
        {rowPhotos.map((photo) => (
          <td key={photo.id}>
            <div className="photo-square">
              <img src={photo.thumbnailUrl} alt={photo.title} />
              <p>{photo.title}</p>
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
      <button onClick={onBack} className="back-button">Go Back</button>
      <table>
        <tbody>
          {rows}
        </tbody>
      </table>
    </div>
  );
};

export default PhotoList;
