import React, { useState } from 'react';
import '../css/idppl.css';
import { Link } from 'react-router-dom';
import Footer from './Footer'; 

const Idppl = () => {
  const [findMethod, setFindMethod] = useState('email');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [verificationCode, setVerificationCode] = useState('');
  const [verificationCodeSent, setVerificationCodeSent] = useState(false);
  const [foundUsername, setFoundUsername] = useState('');
  const [searched, setSearched] = useState(false);
  const [showInputFields, setShowInputFields] = useState(true);
  const [showFindButtons, setShowFindButtons] = useState(true);
  const [showRadioButtons, setShowRadioButtons] = useState(true);

  const handleFindMethodChange = (event) => {
    const selectedMethod = event.target.value;
    setFindMethod(selectedMethod);
  };

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePhoneChange = (event) => {
    setPhoneNumber(event.target.value);
  };

  const handleSendVerificationCode = () => {
    setVerificationCodeSent(true);
  };

  const handleVerificationCodeChange = (event) => {
    setVerificationCode(event.target.value);
  };

  const handleVerify = () => { };

  const handleFindUsername = () => {
    fetch('/findUser', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email, name })
    })
      .then(response => response.json())
      .then(data => {
        if (data.username) {
          setFoundUsername(data.username);
          setSearched(true);
          setShowInputFields(false);
          setShowFindButtons(false);
          setShowRadioButtons(false);
        } else {
          alert('사용자를 찾을 수 없습니다.');
        }
      })
      .catch(error => console.error('Error:', error));
  };

  const handleFindUserPhone = () => {
    fetch('/findUserPhone', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ name, phoneNumber })
    })
      .then(response => response.json())
      .then(data => {
        if (data.username) {
          setFoundUsername(data.username);
          setSearched(true);
          setShowInputFields(false);
          setShowFindButtons(false);
          setShowRadioButtons(false);
        } else {
          alert('사용자를 찾을 수 없습니다.');
        }
      })
      .catch(error => console.error('Error:', error));
  };

  return (
    <div id="root">
      <main>
        <div className="login-topbar">
          <div className='login-topbar-title'>
            <h2>아이디</h2>
          </div>
        </div>
        <div className="Idppl-section-content">
          <div className='section-title'>
            <strong>아이디 찾기</strong>
          </div>
          <div className='info-card'>
            {showRadioButtons && (
              <div className="radio-group">
                <label className="radio-option">
                  <input type="radio" name="findMethod" value="email" checked={findMethod === 'email'} onChange={handleFindMethodChange} />
                  이메일로 찾기
                </label>
                <label className="radio-option">
                  <input type="radio" name="findMethod" value="phoneNumber" checked={findMethod === 'phoneNumber'} onChange={handleFindMethodChange} />
                  전화번호로 찾기
                </label>
              </div>
            )}

            {showInputFields && (
              <div className='info-group'>
                <div className='info-item'>
                  <label className='info-label'>이름</label>
                  <input type="text" name="name" value={name} onChange={handleNameChange} required className='info-value' />
                </div>
                {findMethod === 'email' && (
                  <div className='info-item'>
                    <label className='info-label'>이메일</label>
                    <input type="text" name="email" value={email} onChange={handleEmailChange} required className='info-value' />
                    <button onClick={handleSendVerificationCode} className="submit-btn submit-btn-num">인증번호 받기</button>
                  </div>
                )}
                {findMethod === 'phoneNumber' && (
                  <div className='info-item'>
                    <label className='info-label'>전화번호</label>
                    <input type="text" name="phoneNumber" value={phoneNumber} onChange={handlePhoneChange} required className='info-value' />
                    <button onClick={handleSendVerificationCode} className="submit-btn submit-btn-num">인증번호 받기</button>
                  </div>
                )}
                {verificationCodeSent && (
                  <div className='info-item'>
                    <input type="text" name="verificationCode" value={verificationCode} onChange={handleVerificationCodeChange} required className='info-value' />
                    <button onClick={handleVerify} className="submit-btn submit-btn-yes">확인</button>
                  </div>
                )}
              </div>
            )}
            <div className="button-group">
              {!searched && (
                <button onClick={findMethod === 'email' ? handleFindUsername : handleFindUserPhone} className="submit-btn">아이디 찾기</button>
              )}
            </div>
            {searched && (
              <div className='info-result'>
                <p>아이디: {foundUsername}</p>
                <div className="button-group">
                  <button><Link to="/Passwordppl">비밀번호 찾기</Link></button>
                  <button><Link to="/Login">로그인</Link></button>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Idppl;
