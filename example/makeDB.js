function makeDB(){
// 데이터베이스 열기 또는 생성
const request = indexedDB.open("myPetDB", 1);

    // 데이터베이스 열기 또는 생성 성공 시 실행되는 이벤트 핸들러
    request.onupgradeneeded = function(event) {
    const db = event.target.result;

    // 회원 테이블 생성
    const userStore = db.createObjectStore("user", { keyPath: "id", autoIncrement: true });
    userStore.createIndex("nickname", "nickname", { unique: true });
    userStore.createIndex("email", "email", { unique: true });
    userStore.createIndex("phNum", "phNum", { unique: false });
    userStore.createIndex("pw", "pw", { unique: false });
    userStore.createIndex("isLogin", "isLogin", { unique: false });

    // 연락처와 비밀번호는 추가적인 필드로 저장할 수 있습니다.

    // 게시글 테이블 생성
    const postsStore = db.createObjectStore("posts", { keyPath: "postId", autoIncrement: true });
    postsStore.createIndex("author", "author", { unique: false });
    postsStore.createIndex("title", "title", { unique: false });
    postsStore.createIndex("content", "content", { unique: false });
    postsStore.createIndex("timestamp", "timestamp", { unique: false });

    // 댓글 테이블 생성 (게시글 테이블과의 관계는 추가로 정의 가능)
    const commentStore = db.createObjectStore("comments", { keyPath: "commentId", autoIncrement: true });
    commentStore.createIndex("postId", "postId", { unique: false }); // 외래 키
    commentStore.createIndex("content", "content", { unique: false });
    commentStore.createIndex("author", "author", { unique: false });
    commentStore.createIndex("timestamp", "timestamp", { unique: false });
    

    // 견종 카테고리 테이블 생성(추가 정의 X)
    const petCategoryStore = db.createObjectStore("petCategory", { keyPath: "id", autoIncrement: true });
    petCategoryStore.createIndex("petBreed", "petBreed", { unique: false });
    petCategoryStore.createIndex("content1", "content1", { unique: false });
    petCategoryStore.createIndex("content2", "content2", { unique: false });
    petCategoryStore.createIndex("image", "image", { unique: false });
};

// 데이터베이스 열기 또는 생성 완료 시 실행되는 이벤트 핸들러
    request.onsuccess = function(event) {
    const db = event.target.result;
    console.log("Database opened successfully");

    // 이제 여기에서 데이터베이스를 사용할 수 있습니다.
    };

    // 데이터베이스 열기 또는 생성 실패 시 실행되는 이벤트 핸들러
    request.onerror = function(event) {
    console.error("Error opening database");
    };
}



// 데이터베이스를 삭제하는 함수
function deleteDatabase() {
    const dbName = "myPetDB";
    const request = indexedDB.deleteDatabase(dbName);

    // 삭제 요청이 성공적으로 완료된 경우
    request.onsuccess = function () {
    console.log(`Database '${dbName}' deleted successfully.`);
    };

    // 삭제 요청 중 오류가 발생한 경우
    request.onerror = function (event) {
    console.error("Error deleting database:", event.target.error);
    };

    // 삭제 요청이 진행 중인 경우
    request.onblocked = function () {
        console.warn("Deletion blocked; please close all connections to the database.");
    };
}

