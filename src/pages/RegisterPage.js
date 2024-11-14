// NOTE :  RegisterPage.js
import React, { useState } from 'react';
import '../resources/styles/Common.css';
import '../resources/styles/Register.css';

import HeaderPage from './HeaderPage';

// NOTE :  프로필 사진 업로드 컴포넌트
const ProfilePicture = ({ profileImage, onImageChange }) => (
    <div className="profile-picture">
        <label htmlFor="file_profile_url">프로필 사진</label>
        <p className="register-helper-text">* 프로필 사진을 선택해 주세요</p>
        <input
            type="file"
            id="file_profile_url"
            name="profile_url"
            accept="image/*"
            style={{ display: 'none' }}
            onChange={onImageChange}
        />
        <div
            className="profile-icon"
            onClick={() => document.getElementById('file_profile_url').click()}
            style={{
                backgroundImage: profileImage ? `url(${profileImage})` : 'none',
                backgroundSize: 'cover',
            }}
        >
            {!profileImage && '+'}
        </div>
    </div>
);

// NOTE :  입력 필드 컴포넌트
const InputField = ({ label, type, id, value, onChange, placeholder, helperText }) => (
    <>
        <label htmlFor={id}>{label}</label>
        <input
            type={type}
            id={id}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            required
        />
        <p className="register-helper-text">{helperText}</p>
    </>
);

// NOTE :  회원가입 링크 컴포넌트
const LoginLink = () => (
    <p className="default-link">
        <a href="/login">로그인하러 가기</a>
    </p>
);

// NOTE :  메인 회원가입 페이지 컴포넌트
const RegisterPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [nickname, setNickname] = useState('');
    const [profileImage, setProfileImage] = useState(null);

    const handleRegister = (e) => {
        e.preventDefault();
        // NOTE :  회원가입 로직 구현
    };

    const handleProfileImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setProfileImage(URL.createObjectURL(file));
        }
    };

    return (
        <div className="register-page">
          <HeaderPage />
          <hr className="full-width-line" />
            <main className="width-355">
                <div className="register-container">
                    <h2 id="h2_register_title">회원가입</h2>
                    <form id="registerForm" onSubmit={handleRegister} encType="multipart/form-data">
                        <ProfilePicture profileImage={profileImage} onImageChange={handleProfileImageChange} />
                        <InputField
                            label="이메일*"
                            type="email"
                            id="txt_email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="이메일을 입력하세요"
                            helperText="* 올바른 이메일 형식을 입력해주세요."
                        />
                        <InputField
                            label="비밀번호*"
                            type="password"
                            id="txt_pwd"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="비밀번호를 입력하세요"
                            helperText="* 비밀번호는 8자 이상이어야 합니다."
                        />
                        <InputField
                            label="비밀번호 확인*"
                            type="password"
                            id="txt_confirm_pwd"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            placeholder="비밀번호를 한 번 더 입력하세요"
                            helperText="* 비밀번호가 일치해야 합니다."
                        />
                        <InputField
                            label="닉네임*"
                            type="text"
                            id="txt_nickname"
                            value={nickname}
                            onChange={(e) => setNickname(e.target.value)}
                            placeholder="닉네임을 입력하세요"
                            helperText="* 닉네임을 입력해 주세요."
                        />
                        <button className="default-button" id="btn_register" type="submit">
                            회원가입
                        </button>
                    </form>
                    <LoginLink />
                </div>
            </main>
        </div>
    );
};

export default RegisterPage;
