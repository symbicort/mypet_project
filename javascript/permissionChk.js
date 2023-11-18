function loginChk(){
    const isLoginUser = JSON.parse(sessionStorage.getItem("isLoginUser"));
    if (!isLoginUser || !isLoginUser.isLogin) {
        window.location.href = 'login.html';
        alert('로그인 후 페이지를 확인해주세요.');
    }
}