import React from 'react';
import { Route, Routes, Link } from 'react-router-dom';
import LoginPage from './pages/LoginPage'; 
import RegisterPage from './pages/RegisterPage'; 
import BoardPage from './pages/BoardPage'; 
import BoardInfoPage from './pages/BoardInfoPage'; 
import UserEditPage from './pages/UserEditPage'; 

import BoardEditPage from './pages/BoardEditPage'; 
import BoardAddPage from './pages/BoardAddPage'; 


function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Link to="/login">로그인 페이지로 이동</Link><br/>
        <Link to="/register">회원가입 페이지로 이동</Link><br/>
        <Link to="/board">게시판 페이지로 이동</Link><br/>
        <Link to="/boardInfo">게시판 상세 페이지로 이동</Link><br/>
        <Link to="/userEdit">회원 수정 페이지로 이동</Link><br/>
        <Link to="/boardEdit">게시판 수정 페이지로 이동</Link><br/>
        <Link to="/boardAdd">게시판 추가 페이지로 이동</Link>
      </header>
      
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/board" element={<BoardPage />} />
        <Route path="/boardInfo" element={<BoardInfoPage />} />
        <Route path="/userEdit" element={<UserEditPage />} />
        <Route path="/boardEdit" element={<BoardEditPage />} />
        <Route path="/boardAdd" element={<BoardAddPage />} />
      </Routes>
    </div>
  );
}

export default App;