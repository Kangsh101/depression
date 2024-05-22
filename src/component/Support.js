import React from 'react';
import { Link } from 'react-router-dom';
import '../css/Support.css';

function Support() {
    return (
        <div>
            <div className="login-topbar">
            <div className='login-topbar-title'>
                <h2>고객센터</h2>
            </div>
            </div>
            <div className="support-container">
                <div className="support-header">
                    {/* <h1>고객센터</h1> */}
                    <p>어떤 도움이 필요하신가요? 저희가 도와드리겠습니다.</p>
                </div>
                <div className="support-content">
                    <div className="support-section">
                        <h2>자주 묻는 질문</h2>
                        <p>자주 묻는 질문을 통해 빠르게 답을 찾으세요.</p>
                        <Link to="/community"><button className="support-button">FAQ 보기</button></Link>
                    </div>
               
                    <div className="support-section">
                        <h2>문의하기</h2>
                        <p>직접 문의하고 싶으신가요? 여기를 클릭하세요.</p>
                        <button className="support-button">문의하기</button>
                    </div>
                    <div className="support-section">
                        <h2>고객 지원</h2>
                        <p>고객 지원팀에 전화로 문의하고 싶으신가요?</p>
                        <button className="support-button">고객 지원 연락처</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Support;
