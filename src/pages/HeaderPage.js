import React, { useState } from 'react';
import styled from 'styled-components';
import { Link, useNavigate } from 'react-router-dom';

// NOTE: 스타일이 적용된 컴포넌트 정의
const HeaderContainer = styled.header`
    width: 100%;
    max-width: 544px;
    display: flex;
    justify-content: center;
    position: relative;
    align-items: center;
    padding-top: 10px;
    padding-bottom: 10px;
`;

const BackButton = styled.button`
    font-size: 1.5rem;
    background: none;
    border: none;
    cursor: pointer;
    color: #333;
`;

const Title = styled.h2`
    font-weight: normal;
    margin: 0 auto;
    font-size: 32px;
`;

const ProfileContainer = styled.div`
    position: relative;
    display: flex;
    align-items: center;
`;

const ProfileIcon = styled.div`
    font-size: 1.5rem;
    width: 36px;
    height: 36px;
`;

const ProfileMenu = styled.div`
    display: ${(props) => (props.show ? 'block' : 'none')};
    position: absolute;
    top: 100%;
    right: 0;
    background: white;
    border: 1px solid #ddd;
    box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
    z-index: 10;
    padding: 8px;
    width: 120px;
`;

const MenuButton = styled.button`
    width: 100%;
    padding: 8px;
    background: none;
    border: none;
    cursor: pointer;
    text-align: center;
    &:hover {
        background-color: #f0f0f0;
    }
`;

// NOTE: Header 컴포넌트
const Header = () => {
    const navigate = useNavigate();
    const [showProfileMenu, setShowProfileMenu] = useState('');

    const handleBack = () => {
        window.history.back();
    };

    const toggleProfileMenu = () => {
        setShowProfileMenu((prev) => !prev);
    };

    const handleUserEdit = (type) => {
        navigate(`/userEdit?type=${type}`);
    };
    const isLoginPage = window.location.href.includes('login');

    return (
        <HeaderContainer>
            {!isLoginPage && (
            <BackButton className="back-button" onClick={handleBack}>⬅</BackButton>
            )}
            <Title>아무 말 대잔치</Title>
            <ProfileContainer>
                <ProfileIcon onClick={toggleProfileMenu}>😊</ProfileIcon>
                <ProfileMenu show={showProfileMenu}>
                    <MenuButton id="btn_profile_menu" onClick={() => handleUserEdit('user')}>회원정보수정</MenuButton>
                    <MenuButton id="btn_pwd_menu" onClick={() => handleUserEdit('password')}>비밀번호수정</MenuButton>
                    <MenuButton id="btn_logout_menu">로그아웃</MenuButton>
                </ProfileMenu>
            </ProfileContainer>
        </HeaderContainer>
    );
};

export default Header;