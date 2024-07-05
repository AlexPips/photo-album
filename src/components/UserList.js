import React from 'react';
import '../css/UserList.css';
import defaultAvatar from '../images/user-default.png'; // Importing the default avatar image

const UserList = ({ users, onSelectUser }) => {
  const rows = [];
  for (let i = 0; i < users.length; i += 6) {
    const rowUsers = users.slice(i, i + 6);
    const row = (
      <tr key={i}>
        {rowUsers.map(user => (
          <td key={user.id} onClick={() => onSelectUser(user.id)}>
            <div className="user-square">
              <img
                src={user.avatarUrl || defaultAvatar}
                alt={`${user.name}'s avatar`}
                className="user-avatar"
              />
              {user.name}
            </div>
          </td>
        ))}
      </tr>
    );
    rows.push(row);
  }

  return (
    <div className="user-list">
      <h2>Users Overview</h2>
      <table>
        <tbody>
          {rows}
        </tbody>
      </table>
    </div>
  );
};

export default UserList;
