function login(){
    const inputEmail = String(document.querySelector('#email').value);
    const inputPw = String(document.querySelector('#pw').value);

    const pattern = /\s/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    // 데이터베이스 열기
    const request = indexedDB.open("myPetDB", 1);

    request.onsuccess = function(event) {
    const db = event.target.result;

    // 트랜잭션 시작 (읽기 전용)
    const transaction = db.transaction(["user"], "readwrite");

    // 객체 스토어에 접근
    const objectStore = transaction.objectStore("user");

    // email에 대한 데이터 조회를 위한 인덱스
    const index = objectStore.index("email");

    // 특정 email 값에 대한 데이터 조회
    const getRequest = index.get(inputEmail);

    getRequest.onsuccess = function(event) {
        const result = event.target.result;

        if (emailRegex.test(inputEmail)) {
            if (result) {
                if (inputPw === atob(result.pw)) {
                    result.isLogin = true;
                    const userName = result.nickname;
                    const isLogin = result.isLogin;
                    // 객체 스토어에 업데이트된 데이터 저장
                    objectStore.put(result);

                    const user = {userName , isLogin};
                    sessionStorage.setItem('isLoginUser', JSON.stringify(user));
                    
                    alert("로그인 성공");
                    window.location.href = 'index.html';
                } else {
                    alert("비밀번호가 일치하지 않습니다.");
                }
            } else {
                alert("존재하지 않는 이메일입니다.");
            }
        } else {
            alert('올바르지 않은 이메일 형식입니다.');
        }
    };

    getRequest.onerror = function(event) {
        console.error("Error retrieving data:", event.target.error);
    };
};

    request.onerror = function(event) {
        console.error("Error opening database:", event.target.error);
    };
}

