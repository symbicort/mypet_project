const petData = [];

function showExplain(e) {
    //배열에서 이미지 견종명 성격설명 습관설명 받아오기 나중에 DB에서 받아오는 것으로 수정
    //이미지를 클릭하면 상세설명 출력
    let dogp = $(e.currentTarget).children('div');
    for (i = 0; i < petData.length; i++) {
        if (dogp[0].innerHTML == petData[i][0]) {
            $(".explainName").text(petData[i][0]);
            $("#mainImg").attr("src", petData[i][1]);
            $("#explainCharacter").text(petData[i][2]);
            $("#explainTrait").text(petData[i][3]);
        }
    }

}
function findExplian(e) {
    //배열에서 이미지 견종명 성격설명 습관설명 받아오기 나중에 DB에서 받아오는 것으로 수정
    //검색창에서 인풋받아 상세설명 출력
    const keyWord = String(document.querySelector('#search').value);
    for(i = 0; i<petData.length; i++){
        if (keyWord == petData[i][0]) {
            $(".explainName").text(petData[i][0]);
            $("#mainImg").attr("src", petData[i][1]);
            $("#explainCharacter").text(petData[i][2]);
            $("#explainTrait").text(petData[i][3]);
        }
    }
}

function temp(){
    // IndexedDB 열기
    const request = indexedDB.open("myPetDB", 1);

    // 열기 성공 시
    request.onsuccess = function(event) {
    const db = event.target.result;

    // 트랜잭션 시작 (readonly 모드로)
    const transaction = db.transaction(["petCategory"], "readonly");
    const objectStore = transaction.objectStore("petCategory");

    // 모든 데이터 가져오기
    const getAllRequest = objectStore.getAll();

    // 가져오기 성공 시
    getAllRequest.onsuccess = function(event) {
    const petCategories = event.target.result;

    // 가져온 데이터를 배열로 변환
    const petCategoriesArray = Array.isArray(petCategories) ? petCategories : [petCategories];

    // petCategoriesArray에 대한 추가 로직
    petData.push(...petCategoriesArray.map(item => [item.petBreed, item.image, item.content1, item.content2]));
    };

    // 트랜잭션 종료
    transaction.oncomplete = function(event) {
    db.close();
    };
};

}