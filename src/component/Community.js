import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../css/Community.css';
import QnA from './QnA';
import FAQ from './FAQ';
import Notice from './Notice';

const Community = () => {
    const [selectedPage, setSelectedPage] = useState('QnA');

    return (
        <div className="community">
            <div className="topbar">
                <div className='topbar-title'>
                    <h2>Community</h2>
                </div>
            </div>
            <div>
            
            <ul className='topbar-menu'>
                    <li onClick={() => setSelectedPage('QnA')}
                        className={selectedPage === 'QnA' ? 'active' : ''}>
                        <span>QnA</span>
                    </li>

                    <li onClick={() => setSelectedPage('Notice')}
                        className={selectedPage === 'Notice' ? 'active' : ''}>
                        <span>공지사항</span>
                    </li>
                    <li onClick={() => setSelectedPage('FAQ')}
                        className={selectedPage === 'FAQ' ? 'active' : ''}>
                        <span>FAQ</span>
                    </li>
                </ul>
            </div>
            <div className="community-content2">
                {selectedPage === 'QnA' && <QnA />}
                {selectedPage === 'FAQ' && <FAQ />}
                {selectedPage === 'Notice' && <Notice />}
            </div>
        </div>
    );
}



export default Community;