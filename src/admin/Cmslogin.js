import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../css/Cmslogin.css';

const Cmslogin = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [saveId, setSaveId] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Username:', username);
    console.log('Password:', password);
    console.log('Save ID:', saveId);
  };

  return (
    <div className='login-container'>
      <div>
        <div className="login-layout">
          <h2 className='login-lg'>관리자 로그인</h2>

          <div className="row">
            <div className="login-box col-lg-2">
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <input
                    type="text"
                    id="username"
                    title="아이디"
                    name="username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="form-control flush"
                    placeholder="아이디"
                  />
                </div>
                <div className="form-group">
                  <input
                    type="password"
                    id="password"
                    title="비밀번호"
                    name="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="form-control flush"
                    placeholder="비밀번호"
                  />
                </div>
                <Link to="/cms">
                    <button type='submit' className='btn-primary'>로그인</button>
                </Link>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cmslogin;
