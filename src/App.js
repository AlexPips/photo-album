// src/App.js

import React, { useState } from 'react';
import UserList from './components/UserList';
import AlbumList from './components/AlbumList';
import PhotoList from './components/PhotoList';
import { users, albums, photos } from './data';

const App = () => {
  const [selectedUser, setSelectedUser] = useState(null);
  const [selectedAlbum, setSelectedAlbum] = useState(null);

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
    const album = albums[selectedUser].find(album => album.id === selectedAlbum);
    content = (
      <PhotoList
        photos={photos[selectedAlbum]}
        onBack={handleBackToAlbums}
        albumName={album.name}
      />
    );
  } else if (selectedUser !== null) {
    const user = users.find(user => user.id === selectedUser);
    content = (
      <AlbumList
        albums={albums[selectedUser]}
        onSelectAlbum={handleSelectAlbum}
        onBack={handleBackToUsers}
        username={user.username}
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
