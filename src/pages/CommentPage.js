// CommentPage.js
import React, { useState, useEffect } from 'react';
import '../resources/styles/BoardInfo.css';

function CommentPage() {
    const [commentList, setCommentList] = useState([]);
    const [showCommentDeletePopup, setShowCommentDeletePopup] = useState(false);
    const [content, setContent] = useState('');

    const urlParams = new URLSearchParams(window.location.search);
    const boardNo = urlParams.get('boardNo');
    
    const toggleCommentDeletePopup = () => setShowCommentDeletePopup(!showCommentDeletePopup);
    
    const loadCommentList = async () => {

        if (!boardNo) {
            alert('게시글 번호가 존재하지 않습니다.');
            window.history.back();
            return;
        }

        try {
            const response = await fetch(`http://localhost:4444/comments/${boardNo}`, {
                method: 'GET',
                credentials: 'include',
            });
            const result = await response.json();

            if (result.message === 'success' && result.data) {
                setCommentList(result.data); 
            } else {
                alert('게시글 목록을 불러오는 데 실패했습니다.');
            }
        } catch (error) {
            console.error('Error loading comments:', error);
            alert('서버 오류가 발생했습니다.');
        }
    };

    useEffect(() => {
        loadCommentList();
    }, []);

    const AddComment = async () => {
        try {
            const response = await fetch(`http://localhost:4444/comments`, {
                method: 'POST',
                credentials: 'include',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    boardNo : parseInt(boardNo, 10),
                    content
                }),
            });
            const result = await response.json();
    
            if (result.message === 'success') {
                setContent('');
                loadCommentList();
            } else {
                alert('댓글 추가에 실패했습니다.');
            }
        } catch (error) {
            console.error('Error adding comment:', error);
            alert('서버 오류가 발생했습니다.');
        }
    };
    return (
        <div>
            {/* NOET : 댓글 작성 섹션 */}
            <section className="comment-section">
                <textarea
                    className="comment-input"
                    placeholder="댓글을 남겨주세요!"
                    value={content} // 텍스트 영역의 값 설정
                    onChange={(e) => setContent(e.target.value)} // 텍스트 변경 시 상태 업데이트
                />
                <hr className="hr-line" />
                <button className="default-button radius-small-button right-sort" onClick={AddComment}>댓글 등록</button>
            </section>

            {/* NOET : 댓글 리스트 */}
            <section className="comment-list section-center">
                {commentList.length > 0 ? (
                    commentList.map(comment => (
                        <div className="comment" key={comment.id} data-comment-no={comment.id}>
                            {comment.isAuthor && (
                                <div className="comment-actions">
                                    <button 
                                        className="edit-comment"
                                        onClick={() => {/* NOTE : 수정 기능 추가 필요 */}}
                                    >수정</button>
                                    <button 
                                        className="delete-comment" 
                                        onClick={() => toggleCommentDeletePopup()}
                                    >삭제</button>
                                    <button 
                                        className="save-comment" 
                                        style={{ display: 'none' }}
                                    >저장</button>
                                </div>
                            )}
                            <div className="comment-info">
                                <img className="img_profile" src={comment.profileFile} alt="profile" />
                                <span className="comment-author">{comment.email}</span>
                                <span className="comment-date">{comment.date}</span>
                            </div>
                            <p className="comment-text">{comment.content}</p>
                        </div>
                    ))
                ) : (
                    <p>댓글이 없습니다.</p>
                )}
            </section>

            {/* NOTE : 댓글 삭제 팝업 */}
            {showCommentDeletePopup && (
                <div className="popup" id="div_comment_popup">
                    <p>댓글을 삭제하시겠습니까?</p>
                    <span>삭제된 내용은 복구할 수 없습니다.</span>
                    <button className="popup-cancel-button" onClick={toggleCommentDeletePopup}>취소</button>
                    <button className="popup-confirm-button" onClick={toggleCommentDeletePopup}>확인</button>
                </div>
            )}
        </div>
    );
}

export default CommentPage;
