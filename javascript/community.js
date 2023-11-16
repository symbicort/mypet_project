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
  
  





function inputPetData(){
  const request = indexedDB.open("myPetDB", 1);

  request.onsuccess = function (event) {
      const db = event.target.result;

      // 트랜잭션 시작 (읽기/쓰기 권한 필요)
      const transaction = db.transaction(["petCategory"], "readwrite");

      // 객체 저장소(테이블) 열기
      const objectStore = transaction.objectStore("petCategory");

      const inputDataMaltese = {
          petBreed: '말티즈',
          content1: '오래된 견종이라 유전병에 대한 걱정이 상대적으로 적어요',
          content2: '가족 구성원 중 한사람만 좋아하는 편애가 심한 편이에요',
          image: 'https://images.mypetlife.co.kr/content/uploads/2022/12/07161728/AdobeStock_212879665-1024x670.jpeg', 
      };

      const inputDataBeagle = {
          petBreed: '비글',
          content1: '활기차고 에너지가 넘쳐요 호기심이 많고 친화력이 좋아요',
          content2: '사냥개 출신이라 하울링이 많고 에너지가 많아 산책과 놀이활동으로 해소해주어야 해요',
          image: 'https://mblogthumb-phinf.pstatic.net/MjAxOTA4MjlfNCAg/MDAxNTY3MDc5NzkxNzc5.KY9AtMKkpn4TheXmkdR2RPfjkYx_XahBlv3ZdAnl4y8g.u8pjzBsBYLRcy6tqrNEHxxJlAeQrSKQIT1CwhULHDfAg.PNG.vet6390/%EB%B9%84%EA%B8%80%EC%9D%98_%ED%8A%B9%EC%A7%95.PNG?type=w800', 
      };

      const inputDataShihTzu = {
          petBreed: '시츄',
          content1: '일명 천사견, 느긋하고 주인에 대한 집착이 적은 편이에요',
          content2: '게으르고 고집이 센 편이라 비만이 되지 않도록 신경써주어야해요',
          image: 'https://img1.daumcdn.net/thumb/R800x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FmekUd%2FbtrSDFbbA8R%2Fq3a2LlPKIsEPlZOPsirK31%2Fimg.png', 
      };

      const inputDataChihuahua = {
          petBreed: '치와와',
          content1: '체구에 맞지 않는 용맹함이 특징이에요 충성심이 높고 자신감이 넘쳐요',
          content2: '털이 많이 빠지고 화가 많아 스트레스 관리가 필요해요',
          image: 'https://img.famtimes.co.kr/resources/2019/02/15/yE5YxHsTC4HAblpe.jpg', 
      };

      const inputDataYorkshireTerrier = {
          petBreed: '요크셔테리어',
          content1: '혈기왕성하고 권위적인 귀족이에요',
          content2: '쥐 사냥을 목적으로 길러진 견종이기 때문에 소동물과 키우면 공격성이 커질 수 있어요',
          image: 'https://thumb.photo-ac.com/50/508b85e6e79d8b8dafd12ea40b1af733_t.jpeg', 
      };

      const inputDataPoodle = {
          petBreed: '푸들',
          content1: '활동적이고 지능적이며 우아해요',
          content2: '똑똑하고 활발한 편이니 에너지를 산책과 놀이로 해소해주어야해요',
          image: 'https://img.freepik.com/free-photo/view-of-cute-dog-enjoying-time-in-nature-at-the-park_23-2150407400.jpg?size=626&ext=jpg&ga=GA1.1.1826414947.1699315200&semt=sph', 
      };

      // 데이터 추가 (add() 메서드 사용)
      objectStore.add(inputDataMaltese);
      objectStore.add(inputDataBeagle);
      objectStore.add(inputDataShihTzu);
      objectStore.add(inputDataChihuahua);
      objectStore.add(inputDataYorkshireTerrier);
      objectStore.add(inputDataPoodle);
      
      transaction.oncomplete = function () {
          console.log("petData upload completed");
      };
  }
}