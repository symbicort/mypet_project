// 회원가입 function
function signIn() {
    const nickName = document.querySelector('#nickname');
    const email = document.querySelector('#email');
    const phNum = document.querySelector('#phNum');
    const pw = document.querySelector('#pw');
    const pwcheck = document.querySelector('#pwcheck');

    var pattern = /\s/;
    var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (pattern.test(nickName.value) || nickName.value == "" || (nickName.value).length < 5 || (nickName.value).length > 20) {
        alert('닉네임을 5자 이상 20자 이하로 입력해주세요.\n(공백 입력 불가)');
    } else if (!emailRegex.test(email.value)) {
        alert('올바른 이메일 형식을 입력해주세요.\n(공백 사용 불가)');
    } else if (pattern.test(phNum.value) || phNum.value == "" || phNum.value.toString().length != 11) {
        alert('올바른 전화번호 형식을 입력해주세요.\n(공백, "-" 입력 X)');
    } else if (pattern.test(pw.value) || pw.value == "" || (pw.value).length < 8) {
        alert('비밀번호 입력 칸에 공백이 기입되어 있진 않은지 확인해주세요\n(공백 입력 불가)');
    } else if ((pw.value) != (pwcheck.value)) {
        alert('비밀번호가 일치하지 않습니다.');
    } else {
        alert('회원 가입이 완료 되었습니다!');
        localStorage.setItem(`userInfo(${nickName.value})`, JSON.stringify({
            nickName: nickName.value,
            email: email.value,
            phNum: phNum.value,
            pw: btoa(pw.value)
        }));
        // 페이지 이동 코드는 여기에 위치
        window.location.href = 'index.html'; // 대상 URL로 변경
    }
}

// signInButton에 대한 이벤트 리스너를 바인딩
document.getElementById('signInButton').addEventListener('click', signIn);
