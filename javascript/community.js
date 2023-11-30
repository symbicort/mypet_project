function goToScreen() {
    window.location.href = '상세community.html'
}
function goToScreen2() {
    window.location.href = '상세community2.html'
}
function hot() {
    window.location.href = '상세community.html'
}
function all() {
    window.location.href = 'community.html'
}

function news() {
    var news = document.getElementById('newsSection');

    if (news) {
        newsSection.scrollIntoView({ behavior: 'smooth' });
    }
}
function talk() {
    var talk = document.getElementById('talkSection');

    if (talk) {
        newsSection.scrollIntoView({ behavior: 'smooth',});
    }
}


function writePost() {
    window.location.href = 'write.html'
}
function getPosts(currentPage){
    const request = indexedDB.open("myPetDB",1);

    // postData 에서 정보를 먼저 가져올 index 값
    const startIndex = (currentPage - 1) * 4;

    request.onsuccess = function(event){
        const db = event.target.result;

        // 트랜잭션 시작 (읽기 전용)
        const transaction = db.transaction(["posts"], "readonly");
    
        // 객체 스토어에 접근
        const objectStore = transaction.objectStore("posts");

        const request1 = objectStore.getAll();

        request1.onsuccess = function (event) {
            const result = event.target.result;
            const postData = [];

            postData.push(...result);

            for(let i = 1; i <= 4; i++){
                // 현재 데이터를 가져올 postData의 인덱스
                // ex: 2페이지의 3번째 값을 가져온다면, startindex는 4부터 시작이고,
                // postindex는 6 그러므로 postdata의 6번째 데이터를 가져온다.
                const postIndex = startIndex + i - 1; 

                // 최신 글부터 가져와야 하기에 아래 처럼 Index 역순으로 변경
                const latestIndex = postData.length - 1 - postIndex;
                const viewPost = postData[latestIndex];

                const postTitle = document.querySelector(`#post${i} .title`);
                const postContent = document.querySelector(`#post${i} .content`);
                const postWriter = document.querySelector(`#post${i} .writer`);
                const postDate = document.querySelector(`#post${i} .date`);

                postTitle.innerHTML = "";
                postContent.innerHTML = "";
                postWriter.innerHTML = "";
                postDate.innerHTML = "";

                if(postIndex < postData.length){
                    postTitle.innerHTML = viewPost.title;
                    postContent.innerHTML = viewPost.content;
                    postWriter.innerHTML = viewPost.author;
                    postDate.innerHTML = viewPost.timestamp;
                }
            }
        }

    }
}

function clickPost(i) {
    const postTitle = document.querySelector(`#post${i} .title`).innerHTML;
    const postContent = document.querySelector(`#post${i} .content`).innerHTML;
    const postWriter = document.querySelector(`#post${i} .writer`).innerHTML;
    const postDate = document.querySelector(`#post${i} .date`).innerHTML;

    const postData = {
        title : postTitle,
        content : postContent,
        writer : postWriter,
        date : postDate,
    }

    sessionStorage.setItem('viewPostData', JSON.stringify(postData));
    
    // 클릭 시 글 상세 페이지 이동
    // window.location.href = '' 
}

document.addEventListener("DOMContentLoaded", function (){
    const isLoginUser = JSON.parse(sessionStorage.getItem("isLoginUser"));
    if (!isLoginUser || !isLoginUser.isLogin) {
        window.location.href = 'login.html';
        alert('로그인 후 페이지를 확인해주세요.');
    }
});