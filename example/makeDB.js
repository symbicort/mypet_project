function makeDB(){
    const request = indexedDB.open("myPetDB", 1);

    request.onupgradeneeded = function(event) {
    const db = event.target.result;

      // 카테고리 테이블 생성
    const categoryStore = db.createObjectStore("categories", { keyPath: "id", autoIncrement: true });

      // 글 테이블 생성
    const postStore = db.createObjectStore("posts", { keyPath: "id", autoIncrement: true });

      // 댓글 테이블 생성
    const commentStore = db.createObjectStore("comments", { keyPath: "id", autoIncrement: true });

      // 카테고리 테이블에 인덱스 추가
    categoryStore.createIndex("name", "name", { unique: true });
    };
}

// 모든 데이터베이스를 삭제하는 함수
function deleteAllDatabases() {
    // 데이터베이스 이름을 저장할 변수
    let databaseNames;

    // 모든 데이터베이스의 이름을 가져오는 함수
    function getAllDatabaseNames() {
        // 현재 페이지에서 사용 가능한 데이터베이스 이름들을 비동기적으로 가져오는 요청
        const request = indexedDB.databases();

        // 요청이 성공했을 때 실행되는 이벤트 핸들러
        request.onsuccess = (event) => {
            // 가져온 데이터베이스 이름들을 변수에 저장
            databaseNames = event.target.result;
            // 만약 데이터베이스가 하나도 없을 경우
            if (!databaseNames || databaseNames.length === 0) {
                console.log('No databases found.');
            } else {
                // 데이터베이스가 존재하면 각각의 데이터베이스를 삭제하는 함수 호출
                databaseNames.forEach(deleteDatabase);
            }
        };

        // 요청이 실패했을 때 실행되는 이벤트 핸들러
        request.onerror = (event) => {
            console.error('Error getting database names:', event.target.error);
        };
    }

    // 데이터베이스를 삭제하는 함수
    function deleteDatabase(databaseName) {
        // 삭제 요청을 보내는 객체
        const deleteRequest = indexedDB.deleteDatabase(databaseName.name);

        // 삭제 요청이 성공했을 때 실행되는 이벤트 핸들러
        deleteRequest.onsuccess = () => {
            console.log('Database deleted successfully:', databaseName.name);
        };

        // 삭제 요청이 실패했을 때 실행되는 이벤트 핸들러
        deleteRequest.onerror = (event) => {
            console.error('Error deleting database:', event.target.error);
        };
    }

    // 데이터베이스 이름을 가져오고 모든 데이터베이스 삭제
    getAllDatabaseNames();
}
