import React from 'react';
import { useLocation } from 'react-router-dom';
import HeaderPage from './HeaderPage.js';
import '../resources/styles/UserEdit.css';
import '../resources/styles/Common.css';

// NOTE : 회원 정보 수정
function ProfileEdit(){
    return(
        <div className="section" id="div_profile_section">
        <h2 className="text-center">회원정보수정</h2>
        <div id="div_profile_title">
            <p>프로필 사진</p>
        </div>
        <div className="text-center" id="div_profile_img">
            <input type="file" id="file_profile_url" accept="image/*" style={{ display: 'none' }} />
            <img src="" alt="프로필 사진" className="img_profile" id="img_profile_url" />
            <span className="profile-text">변경</span>
        </div>
        <label className="left-sort" htmlFor="txt_email">이메일</label>
        <input type="email" className="input-field" id="txt_email" readOnly />
        <label className="left-sort" htmlFor="txt_nickname"> 닉네임</label>
        <input type="text" className="input-field" id="txt_nickname" placeholder="닉네임을 입력하세요" />
        <p className="p_content_helper" id="p_content_helper"></p>
        <button type="submit" className="defult-button" id="btn_info_edit">수정하기</button>
        <p className="default-link text-center"><a id="a_user_delete" href="#">회원탈퇴</a></p>
        <div className="text-center">
            <button className="input-edit-button" id="btn_info_update" style={{ display: 'none' }}>수정완료</button>
        </div>
    </div>
    );
}

// NOTE : 비밀번호 수정
function PasswordEdit(){
    return (
        <div className="section" id="div_pwd_update">
            <h2 className="text-center">비밀번호 수정</h2>
            <label className="left-sort label-title" htmlFor="txt_pwd">비밀번호</label>
            <input type="password" className="input-field" id="txt_pwd" placeholder="비밀번호를 입력하세요" />
            <p className="p_content_helper" id="p_pwd"></p>
            <label className="left-sort label-title" htmlFor="txt_confirm_pwd">비밀번호 확인</label>
            <input type="password" className="input-field" id="txt_confirm_pwd" placeholder="비밀번호를 한번 더 입력하세요" />
            <p className="p_content_helper" id="p_confirm_pwd"></p>
            <button type="submit" className="defult-button" id="btn_pwd_update">수정하기</button>
        </div>
    );
}

// NOTE : 회원 탈퇴 팝업
function Popup(){
    return(
        <div className="popup" id="div_user_popup" style={{ display: 'none' }}>
            <p>회원탈퇴 하시겠습니까?</p>
            <span>작성된 게시글과 댓글은 삭제됩니다.</span>
            <button className="popup-cancel-button" id="btn_user_cancel">취소</button>
            <button className="popup-confirm-button" id="btn_user_confirm">확인</button>
        </div>
    );
}

function UserEdit() {
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const type = queryParams.get('type') == null ? 'user' : queryParams.get('type'); // 'user' 또는 'password' 값을 가져옵니다.

    return (
        <div>
            <HeaderPage/>
            <hr className="full-width-line" />
            <main id="width-355">
                {/* NOTE : 회원정보 수정 section */}
                {type === 'user' && <ProfileEdit />}
                {/* NOTE : 비밀번호 수정 section */}
                {type === 'password' && <PasswordEdit />}
                {/* NOTE : 팝업 */}
                <Popup/>
            </main>
        </div>
    );
}

export default UserEdit;