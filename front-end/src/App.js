// src/App.js

import React, { useState, useEffect } from 'react';
import UserList from './components/UserList';
import AlbumList from './components/AlbumList';
import PhotoList from './components/PhotoList';
import './css/App.css';

const App = () => {
  const [users, setUsers] = useState([]);
  const [albums, setAlbums] = useState([]);
  const [photos, setPhotos] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [selectedAlbum, setSelectedAlbum] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [usersResponse, albumsResponse, photosResponse] = await Promise.all([
          fetch('http://localhost:5000/users'),
          fetch('http://localhost:5000/albums'),
          fetch('http://localhost:5000/photos')
        ]);

        const usersData = await usersResponse.json();
        const albumsData = await albumsResponse.json();
        const photosData = await photosResponse.json();
        // Add photo count to each album
        const albumsWithPhotoCount = albumsData.map(album => ({
          ...album,
          photoCount: photosData.filter(photo => photo.albumId === album.id).length,
          thumbnailPhoto: photosData.filter(photo => photo.albumId === album.id).slice(0, 4)
        }));

        setUsers(usersData);
        setAlbums(albumsWithPhotoCount);
        setPhotos(photosData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const handleSelectUser = (userId) => {
    setSelectedUser(userId);
    setSelectedAlbum(null);
  };

  const handleSelectAlbum = (albumId) => {
    setSelectedAlbum(albumId);
  };

  const handleBackToUsers = () => {
    setSelectedUser(null);
  };

  const handleBackToAlbums = () => {
    setSelectedAlbum(null);
  };

  let content;

  if (selectedAlbum !== null) {
    const album = albums.find(album => album.id === selectedAlbum);
    const albumPhotos = photos.filter(photo => photo.albumId === selectedAlbum);
    content = (
      <PhotoList
        photos={albumPhotos}
        onBack={handleBackToAlbums}
        albumName={album?.title}
      />
    );
  } else if (selectedUser !== null) {
    const user = users.find(user => user.id === selectedUser);
    const userAlbums = albums.filter(album => album.userId === selectedUser);
    content = (
      <AlbumList
        albums={userAlbums}
        onSelectAlbum={handleSelectAlbum}
        onBack={handleBackToUsers}
        userName={user?.username}
      />
    );
  } else {
    content = <UserList users={users} onSelectUser={handleSelectUser} />;
  }

  return (
    <div className="app">
      {content}
    </div>
  );
};

export default App;
