// sessionTimeout.js

document.addEventListener("DOMContentLoaded", function () {
    // 사용자의 마지막 활동 시간을 기록하는 변수
    let lastActivityTime = new Date().getTime();

    // 세션 타임아웃 설정 (20분 후)
    const sessionTimeout = 1 * 60 * 1000; // 20분을 밀리초로 변환
    let timeoutId;

    // 사용자의 동작이 있을 때마다 호출되는 함수
    function resetTimeout() {
        // 새로운 동작이 있으면 이전 타임아웃을 제거하고 새로운 타임아웃 설정
        clearTimeout(timeoutId);
        lastActivityTime = new Date().getTime();
        timeoutId = setTimeout(logout, sessionTimeout);
    }

    // 사용자의 동작이 있을 때마다 호출되는 이벤트 리스너
    document.addEventListener("mousemove", resetTimeout);
    document.addEventListener("keypress", resetTimeout);

    // 로그아웃 함수
    function logout() {
        console.log("사용자 로그아웃");
        const isLoginUser = sessionStorage.getItem('isLoginUser');
        const data = JSON.parse(isLoginUser);
        data.isLogin = false;
        console.log(data.isLogin);
        sessionStorage.setItem('isLoginUser', JSON.stringify(data));
        // 세션 타임아웃 설정 초기화
        clearTimeout(timeoutId);
        alert(`동작이 없어 자동으로 로그아웃 되었습니다.`);
        window.location.href = 'index.html';
    }

    // 초기 세션 타임아웃 설정
    timeoutId = setTimeout(logout, sessionTimeout);
    // window.location.href = 'index.html';
    // alert(`동작이 없어 자동으로 로그아웃 되었습니다. ${JSON.stringify(data)} dd`);
});
