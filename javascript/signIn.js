function signIn() {
    const nickname = String(document.querySelector('#nickname').value);
    const email = String(document.querySelector('#email').value);
    const phNum = String(document.querySelector('#phNum').value);
    const pw = String(document.querySelector('#pw').value);
    console.log(pw)
    const pwcheck = String(document.querySelector('#pwcheck').value);
    console.log(pwcheck);
    const pattern = /\s/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const regex = /^010\d{7,8}$/;

    const request = indexedDB.open("myPetDB", 1);

    request.onsuccess = function (event) {
        const db = event.target.result;

        // 트랜잭션 시작 (읽기/쓰기 권한 필요)
        const transaction = db.transaction(["user"], "readwrite");

        // 객체 저장소(테이블) 열기
        const objectStore = transaction.objectStore("user");

        // 인덱스를 사용하여 특정 컬럼의 값을 모두 가져오기
        const index = objectStore.index("nickname");
        const request = index.openCursor();

        // 커서 이동 시 이벤트 핸들러
        request.onsuccess = function (event) {
            const cursor = event.target.result;

            if (cursor) {
                // 이미 존재하는 닉네임과 입력된 닉네임 비교
                if (cursor.value.nickname === nickname) {
                    // 중복된 닉네임이 존재할 경우 처리
                    alert("중복된 닉네임이 이미 존재합니다.");
                    document.getElementById('nickname').value = "";
                    return;
                }

                // 다음 레코드로 이동
                cursor.continue();
            } else {
                if (pattern.test(nickname) || nickname == "" || nickname.length < 5 || nickname.length > 20) {
                    alert('닉네임을 5자 이상 20자 이하로 입력해주세요.\n(공백 입력 불가)');
                } else if (!emailRegex.test(email)) {
                    alert('올바른 이메일 형식을 입력해주세요.\n(공백 사용 불가)');
                } else if (pattern.test(phNum) || phNum == "" || (phNum.length != 13 && phNum.length != 11)) {
                    alert('올바른 전화번호 형식을 입력해주세요.\n(공백, "-" 입력 X)');
                } else if (pattern.test(pw) || pw == "" || pw.length < 8) {
                    alert('비밀번호 입력 칸에 공백이 기입되어 있진 않은지 확인해주세요\n(공백 입력 불가)');
                } else if (pw !== pwcheck) {
                    alert('비밀번호가 일치하지 않습니다.');
                } else {
                    // 추가할 데이터
                    const signInUserData = {
                        nickname: nickname,
                        email: email,
                        phNum: phNum,
                        pw: btoa(pw), // 패스워드를 그대로 저장 (안전한 방법 사용 필요)
                        isLogin: false
                    };

                    // 데이터 추가 (add() 메서드 사용)
                    const addRequest = objectStore.add(signInUserData);

                    addRequest.onsuccess = function (event) {
                        console.log("Data added successfully");
                    };

                    addRequest.onerror = function (event) {
                        console.error("Error adding data:", event.target.error);
                    };

                    // 트랜잭션 완료 시
                    transaction.oncomplete = function () {
                        console.log("Transaction completed");
                        alert('회원 가입이 완료되었습니다! \n로그인 페이지로 이동하여 가입된 정보대로 로그인을 진행 해주세요');
                        // 페이지 이동
                        window.location.href = 'index.html';
                    };
                    
                    // 트랜잭션 실패 시
                    transaction.onerror = function (event) {
                        console.error("Transaction failed:", event.target.error);
                        alert('회원 가입 도중 오류가 발생했습니다. 다시 시도해주세요.');
                    };
                }
            }
        };
    };              
        // 데이터베이스 열기 또는 생성 실패 시
        request.onerror = function (event) {
            console.error("Error opening database:", event.target.error);
            alert('데이터베이스에 접근하는 도중 오류가 발생했습니다.');
        };
}        
