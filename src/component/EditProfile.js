import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../css/EditProfile.css';

const EditProfile = () => {
  const [name, setName] = useState('');
  const [gender, setGender] = useState('남성');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [email, setEmail] = useState('');
  const [userInfo, setUserInfo] = useState(null); 

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const response = await axios.get('/api/userinfo', { withCredentials: true });
        if (response.status === 200) {
          const userInfo = response.data; 
          setName(userInfo.name);
          setGender(userInfo.gender);
          setPhoneNumber(userInfo.phoneNumber);
          setEmail(userInfo.email);
          setUserInfo(userInfo); 
        } else {
          console.error('Failed to fetch user info');
        }
      } catch (error) {
        console.error('Error fetching user info:', error);
      }
    };
    fetchUserInfo();
  }, []);

  useEffect(() => {
    if (userInfo !== null) {
      setEmail(userInfo.email);
    }
  }, [userInfo]);

  const handleSave = async () => {
    try {
      const response = await axios.post('/api/updateuserinfo', {
        name,
        gender: gender, 
        phoneNumber,
        email
      });
      if (response.status === 200) {
        console.log('사용자 정보가 성공적으로 업데이트되었습니다.');
        alert('사용자 정보가 성공적으로 업데이트되었습니다.')
      }
    } catch (error) {
      console.error('사용자 정보 업데이트 실패:', error);
      alert('사용자 정보 업데이트 실패.')
    }
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
