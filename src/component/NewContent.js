import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../css/Community.css';
import Ehddudtkd from './Ehddudtkd';
import Notice from './Notice';

const NewContent = () => {
    const [selectedPage, setSelectedPage] = useState('Dhddudtkd');

    return (
        <div className="community">
            <div className="topbar">
                <div className='topbar-title'>
                    <h2>Content</h2>
                </div>

            </div>
            <div>
            <ul className='topbar-menu'>
                    <li onClick={() => setSelectedPage('Dhddudtkd')}
                        className={selectedPage === 'Dhddudtkd' ? 'active' : ''}>
                        <span>동영상</span>
                    </li>

                    <li onClick={() => setSelectedPage('Notice')}
                        className={selectedPage === 'Notice' ? 'active' : ''}>
                        <span>극복글</span>
                    </li>
                </ul>
            </div>
            <div className="community-content">
                {selectedPage === 'Dhddudtkd' && <Ehddudtkd />}
                {selectedPage === 'Notice' && <Notice />}
            </div>
        </div>
    );
}



export default NewContent;