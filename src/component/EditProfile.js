import React, { useState } from 'react';
import axios from 'axios';
import '../css/EditProfile.css';

function EditProfile() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name === 'name') setName(value);
        else if (name === 'email') setEmail(value);
        else if (name === 'phone') setPhone(value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('/api/editprofile', {
                name,
                email,
                phone
            });
            if (response.status === 200) {
                alert('프로필이 수정되었습니다.');
                setName('');
                setEmail('');
                setPhone('');
            }
        } catch (error) {
            console.error('Error editing profile:', error);
        }
    };

    return (
        <div className="EditProfile-section-content">
            <div className='section-title'>
                <strong>개인정보 수정 페이지</strong>
            </div>
            <form onSubmit={handleSubmit} className='info-card'>
                <div className='info-item'>
                    <label className='info-label'>이름</label>
                    <input type="text" name="name" value={name} onChange={handleChange} required className='info-value' />
                </div>
                <div className='info-item'>
                    <label className='info-label'>이메일</label>
                    <input type="email" name="email" value={email} onChange={handleChange} required className='info-value' />
                </div>
                <div className='info-item'>
                    <label className='info-label'>전화번호</label>
                    <input type="tel" name="phone" value={phone} onChange={handleChange} required className='info-value' />
                </div>
                <button type="submit" className="submit-btn">수정</button>
            </form>
        </div>
    );
}

export default EditProfile;
