// src/components/UserList.js

import React from 'react';
import '../css/UserList.css';

const UserList = ({ users, onSelectUser }) => {
  // Assuming each user has an 'id' and 'username' property
  const rows = [];
  for (let i = 0; i < users.length; i += 6) {
    const rowUsers = users.slice(i, i + 6);
    const row = (
      <tr key={i}>
        {rowUsers.map(user => (
          <td key={user.id} onClick={() => onSelectUser(user.id)}>
            <div className="user-square">
              {user.username}
            </div>
          </td>
        ))}
      </tr>
    );
    rows.push(row);
  }

  return (
    <div className="user-list">
      <h2>USERS OVERVIEW</h2>
      <table>
        <tbody>
          {rows}
        </tbody>
      </table>
    </div>
  );
};

export default UserList;
