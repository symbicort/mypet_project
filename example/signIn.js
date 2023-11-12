// 회원가입 function
function signIn() {
    const user = document.querySelector('#user').value;
    const email = document.querySelector('#email').value;
    const phNum = document.querySelector('#phNum').value;
    const pw = document.querySelector('#pw').value;
    const pwcheck = document.querySelector('#pwcheck').value;

    let pattern = /\s/;
    let emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!user || pattern.test(user) || user.length < 5 || user.length > 20) {
        alert('닉네임을 5자 이상 20자 이하로 입력해주세요.\n(공백 입력 불가)');
    } else if (!emailRegex.test(email)) {
        alert('올바른 이메일 형식을 입력해주세요.\n(공백 사용 불가)');
    } else if (pattern.test(phNum) || phNum == "" || phNum.length != 11) {
        alert('올바른 전화번호 형식을 입력해주세요.\n(공백, "-" 입력 X)');
    } else if (pattern.test(pw) || pw == "" || pw.length < 8) {
        alert('비밀번호 입력 칸에 공백이 기입되어 있진 않은지 확인해주세요\n(공백 입력 불가)');
    } else if (pw !== pwcheck) {
        alert('비밀번호가 일치하지 않습니다.');
    } else {
        alert('회원 가입이 완료되었습니다!');  
    const dbName = "myPetDB";
    const dbVersion = 1;
    
    // 데이터베이스 열기 또는 생성
    const request = indexedDB.open(dbName, dbVersion);
    
    // 열기 또는 생성 성공 시
    request.onsuccess = function (event) {
        const db = event.target.result;
    
        // 트랜잭션 시작 (읽기/쓰기 권한 필요)
        const transaction = db.transaction(["myObjectStore"], "readwrite");
        
        // 객체 저장소(테이블) 열기
        const objectStore = transaction.objectStore("myObjectStore");
        
        // 추가할 데이터
        const newData = {
        id: "someKey",
        name: "Fluffy",
        type: "Cat",
        age: 3
        };

        // 데이터 추가 (add() 메서드 사용)
        const addRequest = objectStore.add(newData);

        addRequest.onsuccess = function (event) {
        console.log("Data added successfully");
        };

        addRequest.onerror = function (event) {
        console.error("Error adding data:", event.target.error);
        };

        // 트랜잭션 완료 시
        transaction.oncomplete = function () {
        console.log("Transaction completed");
        };
        };

        // 열기 또는 생성 실패 시
        request.onerror = function (event) {
        console.error("Error opening database:", event.target.error);
        };
        // 페이지 이동
        window.location.href = 'index.html';
}}




function dupCheck(){
    const user = document.querySelector('#user').value;
    
    // // 로컬 스토리지에서 데이터 가져오기
    // let userInfoString = localStorage.getItem('userInfo(12345)');

    // // JSON 문자열을 JavaScript 객체로 파싱
    // let userInfoObject = JSON.parse(userInfoString);

    // // user 값을 가져오기
    // let userValue = userInfoObject.user;

    // // 결과 확인
    // console.log("user 값:", userValue);

    // 로컬 스토리지의 모든 키를 가져오기
    for (let i = 0; i < localStorage.length; i++) {
        let key = localStorage.key(i);

        // 괄호 안의 문자열 추출
        let extractedString = key.match(/\((.*?)\)/);

        if(user === extractedString){
            console.alert()
        }

        // 결과 확인
        console.log("키:", key, "괄호 안의 문자열:", extractedString);
}
}