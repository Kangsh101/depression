import React, { useState } from 'react';
import '../css/Section.css';

const Section1 = ({ handleNext }) => {
  const [agreement1, setAgreement1] = useState(false);
  const [allAgreed, setAllAgreed] = useState(false);

  const handleCheckAll = () => {
    const newAllAgreed = !allAgreed;
    setAllAgreed(newAllAgreed);
    setAgreement1(newAllAgreed);
  };

  const handleIndividualCheck = () => {
    setAgreement1(!agreement1);
    setAllAgreed(agreement1);
  };

  const handleNextButton = () => {
    if (agreement1) {
      handleNext();
    } else {
      alert('동의가 필요합니다.');
    }
  };

  return (
    <div className="section-container">
      <div className="Signup-topbar">
        <div className="Signup-topbar-title">
          <h2>회원가입</h2>
        </div>
      </div>
      <ol className="nav nav-pills nav-pills-step">
        <li className="nav-item active"><span className="num">01</span> 약관동의</li>
        <li className="nav-item"><span className="num">02</span> 가입정보입력</li>
        <li className="nav-item"><span className="num">03</span> 가입완료</li>
      </ol>
      <div>
        <div className="terms-scroll">
          <div className="pscheck-box1">
            <label>
              <input type="checkbox" checked={agreement1} onChange={handleCheckAll} />
              <span className="pschecks">(필수)</span> 개인정보 수집 및 이용 동의
            </label>
          </div>
          <div className="terms-text">
            [개인정보 수집 및 이용 동의]
            <br />1. 수집하는 개인정보 항목
            <br />- 이름, 생년월일, 휴대폰 번호, 성별, 이메일
            <br />2. 개인정보의 수집 및 이용 목적
            <br />- 회원 가입 의사 확인, 회원제 서비스 제공에 따른 본인 확인, 회원 자격 유지·관리, 서비스 부정 이용 방지
            <br />3. 개인정보의 보유 및 이용 기간
            <br />- 회원 탈퇴 시까지, 법령에서 정한 시점까지
            <br />4. 동의 거부 권리 및 불이익
            <br />- 개인정보 수집 및 이용에 대한 동의를 거부할 권리가 있으며, 동의 거부 시 서비스 이용에 제한이 있을 수 있습니다.
          </div>
        </div>
        <div>
          <button className="nextBtt" onClick={handleNextButton}>다음</button>
        </div>
      </div>
    </div>
  );
};

export default Section1;
