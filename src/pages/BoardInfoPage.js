// App.js
import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import '../resources/styles/Common.css';
import '../resources/styles/BoardInfo.css';
import HeaderPage from './HeaderPage.js';
import CommentPage from './CommentPage';

// NOTE : 제목 부분
function BoardTitle({toggleDeletePopup, boardInfo}) {
    const handleBoardEditClick = (boardInfo) => {
        window.location.href = `/boardEdit?boardNo=${boardInfo.id}`;
    };

    return (
        <section className="board-header section-center" id="section_board">
            <div className="title-section">
                <h2 className="board-title" id="h2_section_title">{boardInfo.title}</h2>
            </div>
            <div className="meta-actions">
                <img className="img_profile" id="img_profile_url" alt="프로필" />
                <div className="board-meta">
                    <span id="span_board_author">{boardInfo.nickname}</span>
                    <span className="board-date" id="span_board_dt">{boardInfo.date}</span>
                </div>
                <div className="board-actions" id="div_board_button" >
                    <button className="board-button" id="btn_edit"onClick={() => handleBoardEditClick(boardInfo)}>수정</button>
                    <button className="board-button" id="btn_delete" onClick={toggleDeletePopup}>삭제</button>
                </div>
            </div>
        </section>
    );

}
// NOTE : 내용 부분
function BoardContent({boardInfo}){
    return(
        <section className="board-content section-center">
            <img id="img_url" alt="게시물 이미지" />
            <p id="p_board_content">{boardInfo.content}</p>
        </section>
    );
}

// NOTE : 게시글 상태 (좋아요수, 조회수, 댓글수)
function BoardStats() {
    return(
        <section className="board-stats section-center">
            <div className="stat-item" id="div_like_cnt">
                <span className="item-cnt" id="span_like_cnt">10</span>
                <span className="item-text">좋아요수</span>
            </div>
            <div className="stat-item">
                <span className="item-cnt" id="span_view_cnt">100</span>
                <span className="item-text">조회수</span>
            </div>
            <div className="stat-item">
                <span className="item-cnt" id="span_comment_cnt">5</span>
                <span className="item-text">댓글수</span>
            </div>
        </section>
    );
}
function BoardDeletePopup({showDeletePopup, toggleDeletePopup}) {
    return(
        showDeletePopup && (
            <div className="popup" id="div_board_popup">
                <p>게시글을 삭제하시겠습니까?</p>
                <span>삭제된 내용은 복구할 수 없습니다.</span>
                <button className="popup-cancel-button" onClick={toggleDeletePopup}>취소</button>
                <button className="popup-confirm-button" onClick={toggleDeletePopup}>확인</button>
            </div>
        )
    );
}
function BoardInfo() {
    const location = useLocation();
    const navigate = useNavigate();
    const [showDeletePopup, setShowDeletePopup] = useState(false);
    const [boardInfo, setBoardInfo] = useState([]);
    // const [showCommentDeletePopup, setShowCommentDeletePopup] = useState(false);

    const toggleDeletePopup = () => setShowDeletePopup(!showDeletePopup);
    // const toggleCommentDeletePopup = () => setShowCommentDeletePopup(!showCommentDeletePopup);

    const loadBoardInfo = async () => {
        const queryParams = new URLSearchParams(location.search);
        const board_no = queryParams.get('boardNo');
        if (board_no == '' || !board_no) {
            console.error('Invalid board number');
            navigate("/board");
            return;
        }
        try {
            const response = await fetch(`http://localhost:4444/boards/${board_no}`);
            const result = await response.json();


            if (result.message === 'success' && result.data) {
                setBoardInfo(result.data); // NOTE : 데이터가 성공적으로 로드되면 상태 업데이트
            } else {
                alert('게시글 정보를 불러오는 데 실패했습니다.');
            }
        } catch (error) {
            console.error('Error loading board list:', error);
            alert('서버 오류가 발생했습니다.');
        }
    };
    useEffect(() => {
        loadBoardInfo();
    }, []);

    return (
        <div>
            <HeaderPage/>
            <hr className="full-width-line" />
            <main>
                {/* NOTE :  게시물 제목 섹션 */}
                <BoardTitle toggleDeletePopup={toggleDeletePopup} boardInfo={boardInfo}/>
                <hr className="hr-line-middle" />

                {/* NOTE :  게시물 내용 섹션 */}
                <BoardContent boardInfo={boardInfo}/>

                {/* NOTE :  게시물 통계 섹션 */}
                <BoardStats/>
                <hr className="hr-line-middle" id="hr_board_comment" />
                {/* NOTE :  댓글 작성 섹션 */}
                <CommentPage/>
            </main>
            {/* NOTE :  게시물 삭제 팝업 */}
            <BoardDeletePopup showDeletePopup={showDeletePopup} toggleDeletePopup={toggleDeletePopup}/>
            
        </div>
    );
}

export default BoardInfo;
