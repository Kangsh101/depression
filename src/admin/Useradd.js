// Useradd.js
import React, { useState } from 'react';

const Useradd = ({ onAddUser }) => {
  const [newUser, setNewUser] = useState({
    number: '',
    userType: '',
    id: '',
    name: '',
    contact: '',
    email: '',
    joinDate: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewUser({
      ...newUser,
      [name]: value,
    });
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    onAddUser(newUser);
    setNewUser({
      number: '',
      userType: '',
      id: '',
      name: '',
      contact: '',
      email: '',
      joinDate: '',
    });
  };

  return (
    <div>
      <h2>사용자 등록</h2>
      <form onSubmit={handleFormSubmit}>
        <label>
          번호:
          <input type="text" name="number" value={newUser.number} onChange={handleInputChange} />
        </label>
        <label>
          사용자타입:
          <input type="text" name="userType" value={newUser.userType} onChange={handleInputChange} />
        </label>
        <label>
          아이디:
          <input type="text" name="id" value={newUser.id} onChange={handleInputChange} />
        </label>
        <label>
          이름:
          <input type="text" name="name" value={newUser.name} onChange={handleInputChange} />
        </label>
        <label>
          연락처:
          <input type="text" name="contact" value={newUser.contact} onChange={handleInputChange} />
        </label>
        <label>
          E-mail:
          <input type="text" name="email" value={newUser.email} onChange={handleInputChange} />
        </label>
        <label>
          가입일:
          <input type="text" name="joinDate" value={newUser.joinDate} onChange={handleInputChange} />
        </label>
        <button type="submit">등록</button>
      </form>
    </div>
  );
};

export default Useradd;
