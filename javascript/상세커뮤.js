window.onload = function () {
    var image = document.getElementById('iimage1');
    var content = document.getElementsByClassName(content);

    content.style.height = img.clientHeight + 'px';
}

function hot() {
    window.location.href = 'community.html'
}
function listbutton() {
    window.location.href = 'community.html'
}

// JavaScript로 댓글 추가 및 목록 업데이트
function addComment() {
var authorInput = document.getElementById('authorInput');
var passwordInput = document.getElementById('passwordInput');
var commentInput = document.getElementById('commentInput');
var commentList = document.getElementById('commentList');

// 입력된 댓글, 이름, 비밀번호 가져오기
var newCommentText = commentInput.value.trim();
var authorName = authorInput.value.trim();
var password = passwordInput.value.trim();

// 댓글이 비어있지 않은 경우에만 추가
if (newCommentText !== '' && authorName !== '' && password !== '') {
    // 현재 날짜와 시간 가져오기
    var currentDate = new Date();
    var timestamp = currentDate.toLocaleString();

    // 새로운 댓글 요소 생성
    var newComment = document.createElement('div');
    newComment.className = 'comment';
    newComment.innerHTML = `
        <p class="comment-info">
            <span class="author">${authorName}</span><span class="timestamp">${timestamp}</span><button class="delete-button" onclick="deleteComment(this)">삭제</button></p>
        <p>${newCommentText}</p>
    `;

    // 댓글 목록에 추가
    commentList.appendChild(newComment);

    // 입력창 비우기
    commentInput.value = '';
    authorInput.value = '';
    passwordInput.value = '';

    // 댓글을 로컬 스토리지에 저장
    saveCommentsToLocalStorage();
} else {
    alert('댓글, 이름, 비밀번호를 모두 입력하세요.');
}
}

// 댓글 삭제
function deleteComment(button) {
var commentElement = button.closest('.comment');
commentElement.remove();

// 댓글을 로컬 스토리지에 저장
saveCommentsToLocalStorage();
}

// 로컬 스토리지에 저장된 댓글 불러오기
function loadCommentsFromLocalStorage() {
var savedComments = localStorage.getItem('comments');
if (savedComments) {
    document.getElementById('commentList').innerHTML = savedComments;
}
}

// 로컬 스토리지에 댓글 저장
function saveCommentsToLocalStorage() {
var commentListHtml = document.getElementById('commentList').innerHTML;
localStorage.setItem('comments', commentListHtml);
}

// 페이지 로드 시 로컬 스토리지에서 댓글 불러오기
loadCommentsFromLocalStorage();