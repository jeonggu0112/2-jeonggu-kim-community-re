// BoardAddPage.js
import React, {useState} from 'react';
import { Link, useNavigate } from 'react-router-dom';
import HeaderPage from './HeaderPage.js';
import '../resources/styles/BoardAdd.css';
import '../resources/styles/Common.css';

// NOTE : 제목 입력 부분
function TitleSection({ title, setTitle }) {
    return (
        <section className="post-section post-section-title">
            <label htmlFor="txt_title">제목*</label>
            <hr className="section-content-line" />
            <input 
                type="text" 
                id="txt_title" 
                maxLength="26" 
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="제목을 입력해주세요. (최대 26글자)" 
            />
            <hr className="section-content-line" />
        </section>
    );
}

// NOTE : 내용 입력 부분
function ContentSection({ content, setContent }) {
    return (
        <section className="post-section post-section-content">
            <label htmlFor="txt_content">내용*</label>
            <hr className="section-content-line" />
            <textarea 
                id="txt_content" 
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="내용을 입력해주세요."
            />
            <hr className="section-content-line" />
            <p id="p_content_helper"></p>
        </section>
    );
}

// NOTE : 이미지 등록 부분
function ImageUploadSection({ setImage }) {
    return (
        <section className="post-section post-section-image">
            <label htmlFor="img_upload">이미지</label>
            <input 
                type="file" 
                id="img_upload" 
                accept="image/*"
                onChange={(e) => setImage(e.target.files[0])}
            />
        </section>
    );
}


// NOTE : 제출 버튼 부분
function SubmitButton({ onSubmit }) {
    return (
        <button id="btn_board_add" onClick={onSubmit}>완료</button>
    );
}

function BoardAddPage() {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [image, setImage] = useState(null);
    const navigate = useNavigate();

    const handleSubmit = async () => {
        if (!title) {
            alert("제목을 입력해주세요.");
            return;
        }
        if (!content) {
            alert("내용을 입력해주세요.");
            return;
        }
        const formData = { title, content };

        try {
            const response = await fetch('http://localhost:4444/boards', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                credentials: 'include',
                body: JSON.stringify(formData)
            });
    
            const result = await response.json();
            if (result.message === 'success' && result.data) {
                alert('게시글이 성공적으로 추가되었습니다.');
                
                navigate('/boardInfo');
            } else {
                alert('게시글 추가에 실패했습니다.');
            }
        } catch (error) {
            console.error('Error:', error);
            alert('서버 오류가 발생했습니다.');
        }
    };

    return (
        <div>
            <HeaderPage />
            <hr className="full-width-line" />
            <main className="width-570">
                <h2 className="board-title">게시글 작성</h2>
                <TitleSection title={title} setTitle={setTitle} />
                <ContentSection content={content} setContent={setContent} />
                <ImageUploadSection />
                <SubmitButton onSubmit={handleSubmit}/>
            </main>
        </div>
    );
}

export default BoardAddPage;