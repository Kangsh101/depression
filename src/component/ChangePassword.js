import React, { useState } from 'react';
import axios from 'axios';
import '../css/ChangePassword.css';

function ChangePassword() {
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [message, setMessage] = useState('');
    const [messageColor, setMessageColor] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name === 'currentPassword') setCurrentPassword(value);
        else if (name === 'newPassword') setNewPassword(value);
        else if (name === 'confirmPassword') setConfirmPassword(value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (currentPassword === '' || newPassword === '' || confirmPassword === '') {
            setMessageColor('red');
            setMessage('모든 필드를 입력해주세요.');
        } else if (newPassword !== confirmPassword) {
            setMessageColor('red');
            setMessage('새 비밀번호가 일치하지 않습니다.');
        } else {
            try {
                const response = await axios.post('/api/changepassword', {
                    currentPassword,
                    newPassword
                });
                if (response.status === 200) {
                    setMessageColor('green');
                    setMessage('비밀번호가 변경되었습니다.');
                    setCurrentPassword('');
                    setNewPassword('');
                    setConfirmPassword('');
                }
            } catch (error) {
                console.error('Error changing password:', error);
                setMessageColor('red');
                setMessage('현재 비밀번호가 일치하지 않습니다.');
            }
        }
    };

    return (
        <div className="ChangePassword-section-content">
            <div className='section-title'>
                <strong>비밀번호 변경 페이지</strong>
            </div>
            <form onSubmit={handleSubmit} className='info-card'>
                <div className='info-item'>
                    <label className='info-label'>현재 비밀번호</label>
                    <input type="password" name="currentPassword" value={currentPassword} onChange={handleChange} required className='info-value' />
                </div>
                <div className='info-item'>
                    <label className='info-label'>새 비밀번호</label>
                    <input type="password" name="newPassword" value={newPassword} onChange={handleChange} required className='info-value' />
                </div>
                <div className='info-item'>
                    <label className='info-label'>새 비밀번호 확인</label>
                    <input type="password" name="confirmPassword" value={confirmPassword} onChange={handleChange} required className='info-value' />
                </div>
                <button type="submit" className="submit-btn">변경</button>
                {message && <p className="message" style={{ color: messageColor }}>{message}</p>}
            </form>
        </div>
    );
}

export default ChangePassword;
