function defineDB() {
    const dbName = "myPetDB";
        // 데이터베이스 리스트를 가져와서 존재 여부 확인
        indexedDB.databases().then(function (databaseList) {
        const dbExists = databaseList.some(db => db.name === dbName);
    
        // 데이터베이스가 존재하지 않으면 생성
        if (!dbExists) {
            const request = indexedDB.open(dbName, 1);
    
            // 데이터베이스 생성 및 스키마 정의
            request.onupgradeneeded = function (event) {
            const db = event.target.result;
    
            const userStore = db.createObjectStore("user", { keyPath: "id", autoIncrement: true });
            userStore.createIndex("nickname", "nickname", { unique: true });
            userStore.createIndex("email", "email", { unique: true });
            userStore.createIndex("phNum", "phNum", { unique: false });
            userStore.createIndex("pw", "pw", { unique: false });
            userStore.createIndex("isLogin", "isLogin", { unique: false });

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
                
            console.log("Database created successfully");
            };
    
            // 데이터베이스 열기 또는 생성 완료 시 실행되는 이벤트 핸들러
            request.onsuccess = function (event) {
            const db = event.target.result;
            console.log("Database opened successfully");
            };
    
            // 데이터베이스 열기 또는 생성 실패 시 실행되는 이벤트 핸들러
            request.onerror = function (event) {
            console.error("Error opening database:", event.target.error);
            };
        } else {
            console.log("Database already exists");
        }
        }).catch(function (error) {
        console.error("Error checking databases:", error);
        });
    }