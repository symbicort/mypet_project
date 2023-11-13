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
                    // 위코드 정상 작동 시 isLogin 필요 없을 가능성 O
                    result.isLogin = true;
                    const userName = result.nickname;
                    const isLogin = result.isLogin;
                    // 객체 스토어에 업데이트된 데이터 저장
                    objectStore.put(result);
                    // updateRequest.onsuccess = function () {
                    // console.log("isLogin 값이 업데이트되었습니다.");
                    // };
                    const user = {userName , isLogin};
                    sessionStorage.setItem('isLoginUser', JSON.stringify(user));
                    alert(result.isLogin);
                    
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

// // 로그인 버튼 클릭 시 호출되는 함수
// function login() {
//     const inputEmail = document.querySelector('#email').value;
//     const inputPw = document.querySelector('#pw').value;

//     // 데이터베이스 열기
//     const request = indexedDB.open("myDatabase", 1);

//     request.onsuccess = function(event) {
//       // 열린 데이터베이스에서 유저 정보 조회
//     const db = event.target.result;
//     const transaction = db.transaction(["user"], "readonly");
//     const objectStore = transaction.objectStore("user");
//     const index = objectStore.index("email");
    
//       // 특정 email 값에 대한 데이터 조회
//     const request = index.get(inputEmail);

//     request.onsuccess = function (event) {
//         const result = event.target.result;

//         if (result && inputPw === result.pw) {
//           // 로그인 성공
//           // 여기에서 메인 페이지에 로그인한 유저 정보를 표시하는 로직을 추가
//             displayUserInfo(result);
//         } else {
//             console.log("로그인 실패");
//         }
//     };
//     request.onerror = function (event) {
//         console.error("Error retrieving data:", event.target.error);
//         };
//     };
// }
//   // 메인 페이지에 로그인한 유저 정보를 표시하는 함수
// function displayUserInfo(user) {
//     // 예시: 닉네임을 표시하는 div에 유저의 닉네임을 설정
//     const nicknameDiv = document.getElementById("userNickname");
//     nicknameDiv.textContent = user.nickname;

//     // 예시: 회원가입, 로그인 버튼을 숨기거나 제거
//     const signUpButton = document.getElementById("signUpButton");
//     const loginButton = document.getElementById("loginButton");

//     if (signUpButton) {
//       signUpButton.style.display = "none"; // 숨기기
//     }
//     if (loginButton) {
//       loginButton.remove(); // 제거
//     }
    
//     // 추가: 이메일을 기반으로 닉네임을 불러와 표시
//     displayNicknameByEmail(user.email);
//     }

// // 이메일을 기반으로 닉네임을 불러와 표시하는 함수
// function displayNicknameByEmail(email) {
//     const db = event.target.result;
//     const transaction = db.transaction(["user"], "readonly");
//     const objectStore = transaction.objectStore("user");
//     const index = objectStore.index("email");

//     // 특정 email 값에 대한 데이터 조회
//     const request = index.get(email);

//     request.onsuccess = function (event) {
//     const result = event.target.result;

//     if (result) {
//         // 예시: 닉네임을 표시하는 div에 유저의 닉네임을 설정
//         const nicknameDiv = document.getElementById("userNickname");
//         nicknameDiv.textContent = result.nickname;
//     } else {
//         console.log("존재하지 않는 이메일입니다.");
//     }
//     };

//     request.onerror = function (event) {
//         console.error("Error retrieving data:", event.target.error);
//     };
// }
