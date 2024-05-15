import React, { useState,useEffect } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Header from './component/Header';
import Login from './component/Login';
import Signup from './component/Signup';
import Footer from './component/Footer';
import Main from './component/Main';
import Idppl from './component/Idppl';
import Passwordppl from './component/Passwordppl';
import QnA from './component/QnA';
import QnAUp from './component/QnAUp';
import Notice from './component/Notice';
import FAQ from './component/FAQ';
import MyPage from './component/MyPage';
import Contents from './component/Contents';
import Cms from './admin/Cms';
import Cmss from './admin/Cmss';
import Cmscontents from './admin/Cmscontents';
import Cmsuser from './admin/Cmsuser';
import Cmsfaq from './admin/Cmsfaq'
import Community from './component/Community';
import NewContent from './component/NewContent';
import Ehddudtkd from './component/Ehddudtkd';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const storedIsLoggedIn = localStorage.getItem('isLoggedIn');
    if (storedIsLoggedIn) {
      setIsLoggedIn(JSON.parse(storedIsLoggedIn));
    }
  }, []);
  

  const handleLogin = (loginStatus) => {
    setIsLoggedIn(loginStatus);
    localStorage.setItem('isLoggedIn', JSON.stringify(loginStatus));
  };
  const handleLogout = () => {
    setIsLoggedIn(false);
    localStorage.removeItem('isLoggedIn');
    window.location.href = '/main';
  };
  

  return (
    <BrowserRouter>
      <div className="App">
      
        <Routes>
        {/* <Route path="/" element={<><Header isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} /><Main /><Footer/></>} /> */}
          <Route path="/" element={<><Header isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} /><Main /></>} />
          <Route path="/login" element={<><Header isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} /><Login onLogin={handleLogin}  /><Footer /></>} />
          <Route path="/signup" element={<><Header isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} /><Signup /><Footer /></>} />
          <Route path="/Idppl" element={<><Header isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} /><Idppl /><Footer /></>} />
          <Route path="/Passwordppl" element={<><Header isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} /><Passwordppl /><Footer /></>} />
          <Route path="/qna" element={<><Header isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} /><QnA /><Footer /></>} />
          <Route path="/qnaup" element={<><Header isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} /><QnAUp /><Footer /></>} />
          <Route path="/notice" element={<><Header isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} /><Notice /><Footer /></>} />
          <Route path="/faq" element={<><Header isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} /><FAQ /><Footer /></>} />
          <Route path="/main" element={<><Header isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} /><Main /><Footer /></>} />
          <Route path="/MyPage" element={<><Header isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} /><MyPage /><Footer /></>} />
          <Route path="/contents" element={<><Header isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} /><Contents /><Footer /></>} />
          <Route path="/community" element={<><Header isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} /><Community /><Footer /></>} />
          <Route path="/newcontent" element={<><Header isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} /><NewContent /><Footer /></>} />
          <Route path="/Ehddudtkd" element={<><Header isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} /><Ehddudtkd /><Footer /></>} />

          <Route path='/cms' element={<Cms />}/>
          <Route path='/cmscontents' element={<Cmscontents />}/>
          <Route path='/cmsuser' element={<Cmsuser />}/>
          <Route path="/cms" element={<CmsLayout />} />
          {/* <Route path="/noticeup" element={<noticeUp />} /> */}
          <Route path="/cmsfaq" element={<Cmsfaq />} />
        </Routes>
      
      </div>
    </BrowserRouter>
  );
}


const CmsLayout = () => {
  return (
    <Routes>
      <Route path="/cms" element={<Cms />} />
      <Route path="/cmsuser" element={<Cmsuser />} />
      <Route path="/cmsfaq" element={<Cmsfaq />} />
      <Route path="/cmss" element={<Cmss />} />

      <Route path="/Cmscontents" element={<Cmscontents />} />
    </Routes>
  );
};

export default App;
