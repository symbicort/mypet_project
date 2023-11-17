function addPost(){
    const item = JSON.parse(sessionStorage.getItem("isLoginUser"));
    const title = String(document.querySelector('#title').value); 
    const content = String(document.querySelector('#content').value);

    if (!item.isLogin) {
        alert('로그인 후 페이지를 확인해주세요.');    
        window.location.href = 'index.html';
    }
    const request = indexedDB.open("myPetDB", 1);

    // 데이터베이스 열기 성공 시 호출되는 콜백
    request.onsuccess = function (event) {

    const db = event.target.result;

    // 트랜잭션 시작 (읽기/쓰기 권한 필요)
    const transaction = db.transaction(['posts'], 'readwrite');

    // 데이터베이스 객체 저장소(테이블) 열기
    const postsStore = transaction.objectStore('posts');
      
    const nowDate = new Date();        
    const year = nowDate.getFullYear();
    const month = String(nowDate.getMonth() + 1).padStart(2, '0');
    const day = String(nowDate.getDate()).padStart(2, '0');
    const hours = String(nowDate.getHours()).padStart(2, '0');
    const minutes = String(nowDate.getMinutes()).padStart(2, '0');
    const seconds = String(nowDate.getSeconds()).padStart(2, '0');

    const timestamp = `${year}.${month}.${day} ${hours}:${minutes}:${seconds}`;

    const pattern = /\s/;

    if(title.length < 3){
        alert('제목에 공백이 기입되어 있거나 3자 이하인지 확인해주세요.')
    } else if(content.length < 5){
        alert('내용에 공백이 기입되어 있거나 5자 이하인지 확인해주세요.')
    } else {
        // 추가할 데이터
        const postData = {
            author: item.userName,
            title: title,
            content: content,
            timestamp: timestamp,
        };
        // 데이터 추가 (add() 메서드 사용)
        const addRequest = postsStore.add(postData);

        addRequest.onsuccess = function (event) {
            console.log('데이터가 성공적으로 추가되었습니다.');
        };
        addRequest.onerror = function (event) {
            console.error('데이터 추가 중 오류 발생:', event.target.error);
        };
        // 트랜잭션 완료 시
        transaction.oncomplete = function () {
            console.log('트랜잭션이 완료되었습니다.');
        };
    };
}};