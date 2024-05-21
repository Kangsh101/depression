import React, { useState } from 'react';
import '../css/Section2.css';

const Section2 = ({ userData, handleInputChange, handleNext }) => {
  const [passwordMismatch, setPasswordMismatch] = useState(false);
  const [emailId, setEmailId] = useState('');
  const [emailDomain, setEmailDomain] = useState('');
  const [showCustomDomain, setShowCustomDomain] = useState(false);
  const [customDomain, setCustomDomain] = useState('');
  const [role, setRole] = useState('');

  const isFormComplete = () => {
    return (
      userData.username !== '' &&
      userData.password !== '' &&
      userData.confirmPassword !== '' &&
      userData.name !== '' &&
      userData.birthdate !== '' &&
      userData.phoneNumber !== '' &&
      role !== ''
    );
  };

  const handleNextClick = () => {
    if (isFormComplete()) {
      if (!emailId || !emailDomain || (showCustomDomain && !customDomain)) {
        alert('이메일을 입력하거나 옵션을 선택하세요.');
        return;
      }
      const email = showCustomDomain ? `${emailId}@${customDomain}` : `${emailId}@${emailDomain}`;
      handleInputChange({ target: { name: 'email', value: email } });
      handleInputChange({ target: { name: 'role', value: role } });
      handleNext(); 
    } else {
      if (userData.username === '') {
        alert('아이디를 입력하세요.');
      } else if (userData.password === '') {
        alert('비밀번호를 입력하세요.');
      } else if (userData.confirmPassword === '') {
        alert('비밀번호 확인을 입력하세요.');
      } else if(userData.password !== userData.confirmPassword){
        alert('비밀번호와 비밀번호확인이 틀립니다.')
      } else if (userData.name === '') {
        alert('이름을 입력하세요.');
      } else if (userData.birthdate === '') {
        alert('생년월일을 입력하세요.');
      } else if (userData.phoneNumber === '') {
        alert('휴대전화번호를 입력하세요.');
      } else if (role === '') {
        alert('역할을 선택하세요.');
      }
    }
  };

  const handleEmailIdChange = (e) => {
    const { value } = e.target;
    setEmailId(value);
  };

  const handleEmailDomainChange = (e) => {
    const { value } = e.target;
    setEmailDomain(value);
    setShowCustomDomain(value === '직접입력');
  };

  const handleCustomDomainChange = (e) => {
    const { value } = e.target;
    setCustomDomain(value);
  };

  const handleRoleChange = (e) => {
    const selectedRole = e.target.value;
    setRole(selectedRole);
    handleInputChange({ target: { name: 'role', value: selectedRole } });
  };

  return (
    <div className='section-container'>
      <div className="Signup-topbar">
          <div className='Signup-topbar-title'>
              <h2>Signup</h2>
          </div>
      </div>
      <ol className="nav nav-pills nav-pills-step">
        <li className="nav-item"><span className="num">01</span> 약관동의</li>
        <li className="nav-item active"><span className="num">02</span> 가입정보입력</li>
        <li className="nav-item"><span className="num">03</span> 가입완료</li>
      </ol>
      <div className='signup-info'>
        <p className='section2-title'>가입정보입력</p>
      </div>
      <div className='signup-id'>
        <div className='Section2-container'>
          <div>
            <input type='text' id='userid' name='username' value={userData.username} onChange={handleInputChange} placeholder='아이디' className='Section2-field' />
          </div>
          <div>
            <input type='password' id='userpassword' name='password' value={userData.password} onChange={handleInputChange} placeholder='비밀번호' className='Section2-field' />
          </div>
          <div>
            <input type='password' id='confirmPassword' name='confirmPassword' value={userData.confirmPassword} onChange={handleInputChange} placeholder='비밀번호 확인' className='Section2-field' />
            {passwordMismatch && <p className='error-message'>비밀번호가 일치하지 않습니다.</p>}
          </div>
          <div className='email-container'>
            <input type='text' id='emailId' name='emailId' value={emailId} onChange={handleEmailIdChange} placeholder='이메일' className='Section2-field input-email' />
            <span>@</span>
            {showCustomDomain ? (
              <>
                <input type='text' id='customDomain' value={customDomain} onChange={handleCustomDomainChange} placeholder='' className='input-field' />
                <button onClick={() => setShowCustomDomain(false)}>확인</button>
              </>
            ) : (
              <select id='emailDomain' value={emailDomain} onChange={handleEmailDomainChange} className='select-field1'>
                <option value=''>옵션 선택</option>
                <option value='naver.com'>naver.com</option>
                <option value='gmail.com'>gmail.com</option>
                <option value='daum.com'>daum.com</option>
              </select>
            )}
          </div>
          <div>
            <label>유저 타입: </label>
            <select id='role' value={role} onChange={handleRoleChange} className='select-field'>
              <option value=''>역할 선택</option>
              <option value='환자'>환자</option>
              <option value='일반인'>일반인</option>
            </select>
          </div>
        </div>
        <div>
          <input type='text' id='name' name='name' value={userData.name} onChange={handleInputChange} placeholder='이름' className='Section2-field'></input>
        </div>
        <div>
          <input type='text' id='birthdate' name='birthdate' value={userData.birthdate} onChange={handleInputChange} placeholder='생년월일 8자' className='Section2-field'></input>
        </div>
        <div>
          <input type='text' id='phoneNumber' name='phoneNumber' value={userData.phoneNumber} onChange={handleInputChange} placeholder='휴대전화번호' className='Section2-field'></input>
        </div>
      </div>
      <button onClick={handleNextClick} className="next-button">
        다음
      </button>
    </div>
  );
};

export default Section2;
