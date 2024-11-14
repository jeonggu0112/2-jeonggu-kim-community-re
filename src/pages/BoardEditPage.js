// BoardEditPage.js
import React from 'react';
import HeaderPage from './HeaderPage.js';
import '../resources/styles/BoardEdit.css';
import '../resources/styles/Common.css';

// NOTE : 제목 입력 부분
function TitleSection() {
    return (
        <section className="post-section post-section-title">
            <label htmlFor="txt_title">제목*</label>
            <hr className="section-content-line" />
            <input 
                type="text" 
                id="txt_title" 
                defaultValue="제목을 입력해주세요. (최대 26글자)" 
                maxLength="26" 
                placeholder="제목을 입력해주세요. (최대 26글자)" 
            />
            <hr className="section-content-line" />
        </section>
    );
}

// NOTE : 제목 입력 부분
function ContentSection() {
    return (
        <section className="post-section post-section-content">
            <label htmlFor="txt_content">내용*</label>
            <hr className="section-content-line" />
            <textarea 
                id="txt_content" 
                placeholder="내용을 입력해주세요."
                defaultValue={`무엇을 얘기할까요? 아무말이라면, 삶은 항상 놀라운 모험이라고 생각합니다. 
                                우리는 매일 새로운 경험을 하고 배우며 성장합니다.
                                때로는 어려움과 도전이 있지만, 그것들이 우리를 더 강하고 지혜롭게 만듭니다.
                                또한 우리는 주변의 사람들과 연결되며 사랑과 지지를 받습니다.
                                그래서 우리의 삶은 소중하고 의미가 있습니다.`}
            />
            <hr className="section-content-line" />
            <p id="p_content_helper">* helper text</p>
        </section>
    );
}

// NOTE : 이미지 등록 부분
function ImageUploadSection() {
    return (
        <section className="post-section post-section-image">
            <label htmlFor="img_upload">이미지</label>
            <div className="file-upload-container">
                <label className="file-upload-label" htmlFor="img_upload" id="lbl_file_upload">파일 선택</label>
                <input type="file" id="img_upload" accept="image/*" style={{ display: 'none' }} />
                <span id="file-name-display">선택된 파일 없음</span>
            </div>
        </section>
    );
}

// NOTE : 수정 버튼 부분
function UpdateButton() {
    return (
        <button id="btn_board_update">수정하기</button>
    );
}

function BoardEditPage() {
    return (
        <div>
            <HeaderPage />
            <hr className="full-width-line" />
            <main className="width-570">
                <h2 className="board-title">게시글 수정</h2>
                {/* NOTE :  게시물 제목 섹션 */}
                <TitleSection />
                {/* NOTE :  게시물 내용 섹션 */}
                <ContentSection />
                <ImageUploadSection />
                <UpdateButton />
            </main>
        </div>
    );
}

export default BoardEditPage;