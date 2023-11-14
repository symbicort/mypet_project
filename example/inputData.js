function inputPetData(){
    const request = indexedDB.open("myPetDB", 1);

    request.onsuccess = function (event) {
        const db = event.target.result;

        // 트랜잭션 시작 (읽기/쓰기 권한 필요)
        const transaction = db.transaction(["petCategory"], "readwrite");

        // 객체 저장소(테이블) 열기
        const objectStore = transaction.objectStore("petCategory");

        const  = {
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

    }
}