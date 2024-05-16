import '../css/MyInfo.css';

function MyInfo({ userInfo }) {
    const user = userInfo[0];

    return (
        <div className="MyInfo-section-content">
            <div className="section-title">내 정보</div>
            {user ? (
                <div className="info-card">
                    <div className="info-item">
                        <span className="info-label">이름:</span>
                        <span className="info-value">{user.name}</span>
                    </div>
                    <div className="info-item">
                        <span className="info-label">번호:</span>
                        <span className="info-value">{user.phoneNumber}</span>
                    </div>
                    <div className="info-item">
                        <span className="info-label">이메일:</span>
                        <span className="info-value">{user.email}</span>
                    </div>
                    <div className="info-item">
                        <span className="info-label">생일:</span>
                        <span className="info-value">{user.birthdate}</span>
                    </div>
                </div>
            ) : (
                <div>로그인 해주세요. 유저 정보를 찾을 수 없습니다.</div>
            )}
        </div>
    );
}

export default MyInfo;
