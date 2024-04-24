import React, { useState } from 'react';
import '../css/EditProfile.css';

const EditProfile = () => {
  const [name, setName] = useState('');
  const [gender, setGender] = useState('남성');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [classification, setClassification] = useState('환자');
  const [email, setEmail] = useState('');

  const handleSave = () => {
    console.log("Saved:", { name, gender, phoneNumber, classification, email });
  };

  return (
    <div className='editprofile-container'>
        <div className='editprofile-title'>
                <strong>개인정보 수정</strong>
            </div>
      <div className='editprofile-context-container'>
        <div className='editprofile-row'>
        <strong>이름</strong>
        <input className='editprofile-nameinput'
          type="text"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <strong>성별</strong>
        <select value={gender} onChange={(e) => setGender(e.target.value)}>
          <option value="남성">남성</option>
          <option value="여성">여성</option>
        </select>
      </div>
      <div className='editprofile-row'>
        <strong>전화번호</strong>
        <input className='editprofile-numberinput'
          type="text"
          id="phoneNumber"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
        />
        <strong>분류</strong>
        <select value={classification} onChange={(e) => setClassification(e.target.value)}>
          <option value="환자">환자</option>
          <option value="보호자">보호자</option>
        </select>
        </div>
      <div className='editprofile-row'>
        <strong>이메일</strong>
        <input className='editprofile-emailinput'
          type="text"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <button onClick={handleSave}>저장</button>
    </div>
    </div>
  );
};

export default EditProfile;
