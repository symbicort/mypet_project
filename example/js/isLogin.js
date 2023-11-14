document.addEventListener("DOMContentLoaded", function () {
    const signupBtn = document.getElementById("signupBtn");
    const loginBtn = document.getElementById("loginBtn");

    // 세션 스토리지에서 isLogin이 true이면 회원가입과 로그인 버튼 비활성화
    const isLoginUser = JSON.parse(sessionStorage.getItem("isLoginUser"));
    console.log(isLoginUser);
    if (isLoginUser && isLoginUser.isLogin) {
        signupBtn.style.display = "none";
        loginBtn.style.display = "none";

        const userName = isLoginUser.userName;
        console.log(userName);

        const nicknameDisplay = document.getElementById("nicknameDisplay");
        nicknameDisplay.textContent = `${userName} 님`;
        
    }
});
