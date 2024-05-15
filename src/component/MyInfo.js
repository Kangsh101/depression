import '../css/MyInfo.css';

function MyInfo({ userInfo }) {
    const user = userInfo[0];

    return (
        <div className="section-content">
            <div className="section-title">내 정보</div>
            {user ? (
                <table className="info-table">
                    <tbody>
                        <tr>
                            <th>성별</th>
                            <td>{user.gender}</td>
                        </tr>
                        <tr>
                            <th>이름</th>
                            <td>{user.name}</td>
                        </tr>
                        <tr>
                            <th>번호</th>
                            <td>{user.phoneNumber}</td>
                        </tr>
                        <tr>
                            <th>생일</th>
                            <td>{user.birthdate}</td>
                        </tr>
                    </tbody>
                </table>
            ) : (
                <div>로그인 해주세요. 유저 정보를 찾을 수 없습니다.</div>
            )}
        </div>
    );
}

export default MyInfo;
