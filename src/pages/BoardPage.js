import React, { useState, useEffect } from 'react';
import '../resources/styles/Common.css';
import '../resources/styles/Board.css';

import HeaderPage from './HeaderPage.js';


// NOTE : 게시글 작성 버튼
const AddBoardButton = ({ onClick }) => (
    <div className="button-container">
        <button className="write-board-button" onClick={onClick}>
            게시글 작성
        </button>
    </div>
);

// NOTE : 게시글 목록
const BoardList = ({ boardList, onBoardClick }) => (
    <section className="board-list">
        {boardList.map((board) => (
            <BoardItem key={board.boardNo} board={board} onClick={() => onBoardClick(board.boardNo)} />
        ))}
    </section>
);

const WelcomeMessage = () => (
    <p className="welcome-text">
        안녕하세요,<br />아무 말 대잔치 <strong>게시판</strong> 입니다.
    </p>
);

// NOTE : 개별 게시글
const BoardItem = ({ board, onClick }) => (
    <article className="board" data-board-no={board.boardNo} onClick={onClick}>
        <h2 className="board-title">{board.title}</h2>
        <div className="board-meta">
            <span>좋아요 {board.likeCnt}</span>
            <span>댓글 {board.commentCnt}</span>
            <span>조회수 {board.viewCnt}</span>
            <span className="board-date">{new Date(board.date).toLocaleDateString()}</span>
        </div>
        <hr className="full-width-line" />
        <div className="board-author">
            <div className="author-icon">
                <img className="board-profile-image" src={board.profileUrl} alt="프로필 이미지" />
            </div>
            <span>{board.nickname}</span>
        </div>
    </article>
);

// NOTE : 게시판
const Board = () => {
    // NOTE : 게시글 목록 상태
    const [boardList, setBoardList] = useState([]);

    // NOTE : 게시글 목록 불러오기 함수
    const loadBoardList = async () => {
        try {
            const response = await fetch('http://localhost:4444/boards/list');
            const result = await response.json();

            if (result.message === 'success' && result.data) {
                setBoardList(result.data); // NOTE : 데이터가 성공적으로 로드되면 상태 업데이트
            } else {
                alert('게시글 목록을 불러오는 데 실패했습니다.');
            }
        } catch (error) {
            console.error('Error loading board list:', error);
            alert('서버 오류가 발생했습니다.');
        }
    };

    // NOTE : 컴포넌트가 처음 렌더링될 때 게시글 목록 불러오기
    useEffect(() => {
        loadBoardList();
    }, []);

    // NOTE : 게시글 추가 버튼 클릭 핸들러
    const handleAddBoardClick = () => {
        window.location.href = '/boardAdd';
    };

    // NOTE : 개별 게시글 클릭 시 상세 페이지 이동 함수
    const handleBoardClick = (boardNo) => {
        window.location.href = `/boardInfo?boardNo=${boardNo}`;
    };

    return (
        <div className="board-container">
            <HeaderPage />
            <div className="main">
                <WelcomeMessage />
                {/* NOTE :  게시물 추가 섹션 */}
                <AddBoardButton onClick={handleAddBoardClick} />
                <BoardList boardList={boardList} onBoardClick={handleBoardClick} />
            </div>
        </div>
    );
};

export default Board;