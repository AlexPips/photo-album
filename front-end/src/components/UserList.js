import React from 'react';
import '../css/UserList.css';
import defaultAvatar from '../images/user-default.png'; // Importing the default avatar image

const UserList = ({ users, onSelectUser }) => {
  return (
    <div className="user-list">
      <h2>Users Overview</h2>
      <div className="users-container">
        {users.map(user => (
          <div key={user.id} className="user-square" onClick={() => onSelectUser(user.id)}>
            <img
              src={user.avatarUrl || defaultAvatar}
              alt={`${user.name}'s avatar`}
              className="user-avatar"
            />
            <div className="user-name">{user.name}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserList;
