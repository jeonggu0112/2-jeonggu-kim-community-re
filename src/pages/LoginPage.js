import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../resources/styles/Login.css';
import '../resources/styles/Common.css';

import HeaderPage from './HeaderPage.js';

const LoginForm = ({ loginId, setId, loginPwd, setPwd, onSubmit }) => (
  <form id="loginForm" onSubmit={onSubmit}>
      <label htmlFor="email">이메일:</label>
      <input
          type="email"
          value={loginId}
          onChange={(e) => setId(e.target.value)}
          placeholder="아이디를 입력해주세요."
          required
      />
      <label htmlFor="password">비밀번호:</label>
      <input
          type="password"
          value={loginPwd}
          onChange={(e) => setPwd(e.target.value)}
          placeholder="비밀번호를 입력해주세요."
          required
      />
      <HelperText />
      <button className="default-button" id="btn_login" type="submit">로그인</button>
  </form>
);

const HelperText = () => (
  <p className="helper-text" id="p_helper_text"></p>
);

const RegisterLink = () => (
  <p className="default-link">
      <Link to="/register">회원가입</Link>
  </p>
);

function Login() {
  const [helperText, setHelperText] = useState("");
  const [loginId, setId] = useState("");
  const [loginPwd, setPwd] = useState("");
  const navigate = useNavigate();

  const loginHandler = async(e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:4444/auth/login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          credentials: 'include', // 쿠키를 포함하여 세션 유지
          body: JSON.stringify({ email: loginId, password: loginPwd })
      });

      const result = await response.json();

      if (result.message === 'success') {
          alert('로그인에 성공했습니다.');
          navigate('/board'); // 로그인 성공 시 게시판 페이지로 이동
      } else {
          setHelperText(result.message || '로그인에 실패했습니다.');
      }
    } catch (error) {
        console.error('Error logging in:', error);
        setHelperText('서버 오류가 발생했습니다.');
    }
  };

  return (
      <div className="login-container">
        <HeaderPage />
        <hr className="full-width-line" />
        <main className="width-355">
          <div className="login-container">
            <h2 id="h2_login_title">로그인</h2>
            <LoginForm 
                loginId={loginId} 
                setId={setId} 
                loginPwd={loginPwd} 
                setPwd={setPwd} 
                onSubmit={loginHandler} 
            />
            <RegisterLink />
          </div>
      </main>
    </div>
  );
}

export default Login;