// 회원가입 function
function signIn() {
    const nickName = document.querySelector('#nickname').value;
    const email = document.querySelector('#email').value;
    const phNum = document.querySelector('#phNum').value;
    const pw = document.querySelector('#pw').value;
    const pwcheck = document.querySelector('#pwcheck').value;

    let pattern = /\s/;
    let emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!nickName || pattern.test(nickName) || nickName.length < 5 || nickName.length > 20) {
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
    }    
    // IndexedDB 열기 또는 생성
    const request = indexedDB.open("myPetDB", 1);

    // 데이터베이스가 업그레이드되면 실행되는 이벤트 핸들러
    request.onupgradeneeded = function (event) {
        const db = event.target.result;
        const objectStore = db.createObjectStore("users", { keyPath: "id", autoIncrement: true });
        objectStore.createIndex("nickName", "nickName", { unique: true });
        objectStore.createIndex("email", "email", { unique: true });
    };

    // 데이터베이스 열기가 성공하면 실행되는 이벤트 핸들러
    request.onsuccess = function (event) {
        const db = event.target.result;

        // 중복 체크
        const transaction = db.transaction(["users"], "readonly");
        const objectStore = transaction.objectStore("users");
        const nickNameIndex = objectStore.index("nickName");

        const request = nickNameIndex.get(nickName);

        request.onsuccess = function (event) {
            const existingUser = event.target.result;

            if (existingUser) {
                alert('이미 존재하는 닉네임입니다.');
            } else {
                // 사용자 정보 저장
                const transaction = db.transaction(["users"], "readwrite");
                const objectStore = transaction.objectStore("users");

                objectStore.add({
                    nickName: nickName,
                    email: email,
                    phNum: phNum,
                    pw: pw
                });

                alert('회원 가입이 완료되었습니다!');
            }
        }


    
        // // userInfo 키에 닉네임을 포함하여 로컬 스토리지에 저장
        // localStorage.setItem(`userInfo(${nickName})`, JSON.stringify({
        //     nickName: nickName,
        //     email: email,
        //     phNum: phNum,
        //     pw: btoa(pw),
        //     isLogin: false
        // }));

        // 페이지 이동
        window.location.href = 'index.html';
    }
}



function dupCheck(){
    const nickName = document.querySelector('#nickname').value;
    
    // // 로컬 스토리지에서 데이터 가져오기
    // let userInfoString = localStorage.getItem('userInfo(12345)');

    // // JSON 문자열을 JavaScript 객체로 파싱
    // let userInfoObject = JSON.parse(userInfoString);

    // // nickName 값을 가져오기
    // let nickNameValue = userInfoObject.nickName;

    // // 결과 확인
    // console.log("nickName 값:", nickNameValue);

    // 로컬 스토리지의 모든 키를 가져오기
    for (let i = 0; i < localStorage.length; i++) {
        let key = localStorage.key(i);

        // 괄호 안의 문자열 추출
        let extractedString = key.match(/\((.*?)\)/);

        if(nickName === extractedString){
            console.alert()
        }

        // 결과 확인
        console.log("키:", key, "괄호 안의 문자열:", extractedString);
}
}