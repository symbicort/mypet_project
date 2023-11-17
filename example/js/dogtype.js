const petData = [];
const petData2 = [[1]];

function indexClickPetData(){
    const clickdogtype = sessionStorage.getItem('selectDogType');
    const petBreed = Object.entries(petData);
        if(clickdogtype){
            console.log('clickdogtype',typeof(petData[petData]));
        } else{
            console.log('cdfssd');
        }    
        
}

function showExplain(e) {
    //배열에서 이미지 견종명 성격설명 습관설명 받아오기 나중에 DB에서 받아오는 것으로 수정
    //이미지를 클릭하면 상세설명 출력
    let dogp = $(e.currentTarget).children('div');
    console.log(petData);
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

function temp() {
    // IndexedDB 열기
    const request = indexedDB.open("myPetDB", 1);

    // 열기 성공 시
    request.onsuccess = function (event) {
        const db = event.target.result;

        // 트랜잭션 시작 (readonly 모드로)
        const transaction = db.transaction(["petCategory"], "readonly");
        const objectStore = transaction.objectStore("petCategory");

        // 모든 데이터 가져오기
        const getAllRequest = objectStore.getAll();

        // 가져오기 성공 시
        getAllRequest.onsuccess = function (event) {
            const petCategories = event.target.result;

            // 가져온 데이터를 배열로 변환
            const petCategoriesArray = Array.isArray(petCategories) ? petCategories : [petCategories];

            // petCategoriesArray에 대한 추가 로직
            petData.push(...petCategoriesArray.map(item => [item.petBreed, item.image, item.content1, item.content2]));

        };

        // 트랜잭션 종료
        transaction.oncomplete = function (event) {
            db.close();
        };
    };
}


function moveToDogType(dogtype){
    sessionStorage.setItem('selectDogType', String(dogtype));
    window.location.href = 'dogtype.html';
}

function inputPetData() {
    const request = indexedDB.open("myPetDB", 1);

    request.onsuccess = function (event) {
        const db = event.target.result;

        // 트랜잭션 시작 (읽기 권한 필요)
        const transaction = db.transaction(["petCategory"], "readwrite");

        // 객체 저장소(테이블) 열기
        const objectStore = transaction.objectStore("petCategory");

        // petCategory 테이블의 데이터 수 조회
        const countRequest = objectStore.count();

        countRequest.onsuccess = function () {
            const count = countRequest.result;

            // petCategory 테이블에 데이터가 없을 경우에만 데이터 추가
            if (count === 0) {
                const inputDataMaltese = {
                    petBreed: '말티즈',
                    content1: '오래된 견종이라 유전병에 대한 걱정이 상대적으로 적어요',
                    content2: '가족 구성원 중 한사람만 좋아하는 편애가 심한 편이에요',
                    image: 'https://i.namu.wiki/i/105ONbNHw-U5ORSbWzgoFPX4hvuEWTIAAVsHKzoaRqu0u3nJyEbjVooGNAqL8WahfvBWyYIvJpVZsR21CiGcYb-09arUEikE4eJZYIl5oYyG1pZC7B_Wy0tcCs8WKeufzUUIPVeIo0zVmm5jTs6XYg.webp', 
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

                const inputDataDachshund= {
                    petBreed: '닥스훈트',
                    content1: '천성이 우호적이며 침착하고 신경질적이거나 공격적이지 않으며 대담하고 영리해요',
                    content2: '짜리몽땅한 다리와 긴 허리가 특징이고, 사냥개의 기질이 남아 있어요',
                    image: 'https://previews.123rf.com/images/belchonock/belchonock1408/belchonock140802198/30596475-%EB%85%B9%EC%83%89-%EC%B9%B4%ED%8E%AB%EC%97%90-%EA%B7%80%EC%97%AC%EC%9A%B4-%EB%8B%A5%EC%8A%A4-%ED%9B%88%ED%8A%B8-%EA%B0%95%EC%95%84%EC%A7%80.jpg', 
                };

                const inputDatahusky= {
                    petBreed: '시베리안 허스키',
                    content1: '늑대와 닮은 모습에 공격적이고 사나울 것 같지만 외모와는 달리 아주 온순하고 사람을 잘 따르며 짖습니다.',
                    content2: '추운 지방 출신으로 더위에 약하며, 털이 빼곡하여 털을 잘 말려주지 않으면 피부 통풍이 되지 않아 피부병에 걸릴 수 있어요',
                    image: 'https://upload.wikimedia.org/wikipedia/commons/c/ca/Siberian-husky.jpg', 
                };

                // 데이터 추가 (add() 메서드 사용)
                objectStore.add(inputDataMaltese);
                objectStore.add(inputDataBeagle);
                objectStore.add(inputDataShihTzu);
                objectStore.add(inputDataChihuahua);
                objectStore.add(inputDataYorkshireTerrier);
                objectStore.add(inputDataPoodle);
                objectStore.add(inputDataDachshund);
                objectStore.add(inputDatahusky);

                transaction.oncomplete = function () {
                    console.log("petData upload completed");
                };
            } 
        };
    };
}


