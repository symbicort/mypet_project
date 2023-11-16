document.addEventListener("DOMContentLoaded", function () {
    const loginButton = document.querySelector(".loginButton");
    const signupButton = document.querySelector(".signupButton");

    // 세션 스토리지에서 isLogin이 true이면 회원가입과 로그인 버튼 비활성화
    const isLoginUser = JSON.parse(sessionStorage.getItem("isLoginUser"));
    console.log(isLoginUser);

    if (isLoginUser && isLoginUser.isLogin) {
        // 버튼 요소들을 가져오기
        const buttons = document.querySelectorAll('.btn-group custom-button');

        // 각 버튼을 순회하면서 비활성화
        buttons.forEach(button => {
            button.disabled = true;
        });

        const userName = isLoginUser.userName;
        console.log(userName);

        const nicknameDisplay = document.querySelector(".btn-group");
        nicknameDisplay.innerHTML = `<a> ${userName} </a>`;
    }
});
