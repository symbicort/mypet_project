function defineDB() {
  const request = indexedDB.open("myPetDB", 1);

  // 데이터베이스 열기 또는 생성 성공 시 실행되는 이벤트 핸들러
  request.onupgradeneeded = function (event) {
    const db = event.target.result;

    // 회원 테이블 생성
    const userStore = db.createObjectStore("user", {
      keyPath: "id",
      autoIncrement: true,
    });
    userStore.createIndex("nickname", "nickname", { unique: true });
    userStore.createIndex("email", "email", { unique: true });
    userStore.createIndex("phNum", "phNum", { unique: false });
    userStore.createIndex("pw", "pw", { unique: false });
    userStore.createIndex("isLogin", "isLogin", { unique: false });

    // 연락처와 비밀번호는 추가적인 필드로 저장할 수 있습니다.

    // 게시글 테이블 생성
    const postsStore = db.createObjectStore("posts", {
      keyPath: "postId",
      autoIncrement: true,
    });
    postsStore.createIndex("author", "author", { unique: false });
    postsStore.createIndex("title", "title", { unique: false });
    postsStore.createIndex("content", "content", { unique: false });
    postsStore.createIndex("timestamp", "timestamp", { unique: false });

    // 댓글 테이블 생성 (게시글 테이블과의 관계는 추가로 정의 가능)
    const commentStore = db.createObjectStore("comments", {
      keyPath: "commentId",
      autoIncrement: true,
    });
    commentStore.createIndex("postId", "postId", { unique: false }); // 외래 키
    commentStore.createIndex("content", "content", { unique: false });
    commentStore.createIndex("author", "author", { unique: false });
    commentStore.createIndex("timestamp", "timestamp", { unique: false });

    // 견종 카테고리 테이블 생성(추가 정의 X)
    const petCategoryStore = db.createObjectStore("petCategory", {
      keyPath: "id",
      autoIncrement: true,
    });
    petCategoryStore.createIndex("petBreed", "petBreed", { unique: false });
    petCategoryStore.createIndex("history", "history", { unique: false });
    petCategoryStore.createIndex("feature", "feature", { unique: false });
    petCategoryStore.createIndex("character", "character", { unique: false });
    petCategoryStore.createIndex("caution", "caution", { unique: false });
    petCategoryStore.createIndex("image", "image", { unique: false });
  };

  // 데이터베이스 열기 또는 생성 완료 시 실행되는 이벤트 핸들러
  request.onsuccess = function (event) {
    const db = event.target.result;
    console.log("Database opened successfully");
  };

  // 데이터베이스 열기 또는 생성 실패 시 실행되는 이벤트 핸들러
  request.onerror = function (event) {
    console.error("Error opening database");
  };
}

function moveToDogType(dogtype) {
  sessionStorage.setItem("selectDogType", String(dogtype));
  window.location.href = "dogtype.html";
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
          petBreed: "말티즈",
          history:
            "말티즈는 지중해 섬 ‘몰타’에서 유래한 견종이라고 알려져 있어요. ‘몰타’에서 이름을 따와 ‘말티즈’라는 이름을 갖게 되었다고 합니다.\n 말티즈는 과거부터 현재까지 많은 사랑을 받은 견종이에요. \n 그리스 로마 시대부터 르네상스 시대까지 다양한 곳에 등장하는 역사가 깊은 견종입니다.",
          feature:
            "말티즈 성견의 이상적인 체중은 2.5kg 전후로 크기는 25cm 정도입니다. 3~4kg의 말티즈도 많이 있지만, 비만은 슬개골 탈구등의 질병의 원인이 되므로 운동과 식사의 균형에 각별히 신경을 써줘야 해요. \n 말티즈의 가장 큰 특징은 바닥까지 늘어지는 긴 순백의 ​​실크 같은 털이에요. 그리고 말티즈는 속털이 없는 단일모를 가진 것이 특징인데요. 그래서 계절에 따라 털갈이를 하지 않으며 털빠짐도 거의 없습니다.",
          character:
            "사람을 좋아하고 애정표현에 능숙하며 사회성이 뛰어나요. 지능이 높아서 훈련을 빠르게 이해하고 습득할 수 있으며, 밝고 활발한 성격을 가지고 있어서 함께 놀이를 하는 것으로 좋아합니다. \n 좁은 공간과 실내에서의 적응력이 높아서 도시 생활에 적합하고, 보호자 이외의 사람들 및 다양한 동물들과 잘 어울리며, 똑똑하고 적극적인 성격으로 즐거운 훈련이 가능해요.",
          caution:
            "말티즈는 건강한 편이며 평균 수명은 12~15년 정도입니다. \n 단, 몇 가지 조심해야하는 질병이 있습니다. 대표적으로는 안과 질환, 기관지 질환, 관절 질환 등이 있습니다. 특히, 눈물이 흐르는 관인 눈물관이 막혀 눈물이 밖으로 넘치게 되는 유루증이 자주 나타납니다. 그래서 눈곱이 잘 끼고 눈 주위 털이 뭉치며, 붉은색 눈물 자국도 생기기 쉬워 눈 주변을 자주 닦아주는 게 좋습니다. \n 또한, 소형견에게 발병률이 매우 높은 슬개골 탈구에 주의가 필요해요.",
          image:
            "https://i.namu.wiki/i/105ONbNHw-U5ORSbWzgoFPX4hvuEWTIAAVsHKzoaRqu0u3nJyEbjVooGNAqL8WahfvBWyYIvJpVZsR21CiGcYb-09arUEikE4eJZYIl5oYyG1pZC7B_Wy0tcCs8WKeufzUUIPVeIo0zVmm5jTs6XYg.webp",
        };
        const inputDataBeagle = {
          petBreed: "비글",
          history:
            "비글은 영국의 잉글랜드 지역에서 교배가 이루어졌고 이름은 요란하게 짖는다 또는 작다를 나타내는 프랑스어에서 유래되었습니다. \n 비글은 본래 사냥개로 만들어진 견종으로 영국 귀족들이 토끼를 사냥하기 위해 만들어진 견종입니다.",
          feature:
            "비글은 키(체고) 33~40cm, 몸무게 9~11kg 정도의 중형견이에요. 비글은 커다란 귀가 얼굴을 덮고 있는 것이 특징이에요.\n 너무 활발해 자주 사고를 쳐서 악마견이라는 별명이 있는데, 과거 수렵견 출신으로 활동량이 매우 많기 때문이랍니다. \n 비글은 후각이 매우 뛰어나 냄새를 잘 맡는 후각 하운드 견종인데요. 주로 토끼를 추적하고 사냥했다고 알려져 있어요",
          character:
            "비글은 워낙 활발하고 다른 동물이나 어른, 아이 상관없이 다 잘 어울리는 견종이에요. 모르는 사람에게도 경계심이 없고, 침착하고, 친화력이 매우 좋아요. \n 활발한 성격 때문에 산책을 안 시키고 집에서만 있게 할 경우 왕성함 호기심과 뛰어난 후각 그리고 땅 파는 습성으로 집안을 어지럽히는 상황이 발생될 수 있습니다. \n 또한 자기주장이 확고하고 센 성격을 가지고 있어요.",
          caution:
            '비글의 수명은 15년 정도에요. 비글이 장수할 수 있는 이유는 다른 개에 비해 질병에 강하고 튼튼하고, 발병률이 낮기 때문입니다. \n 튼튼한 비글이지만, 당연히 질병에 걸리게 될 수 있습니다. 비글은 "허리 디스크"와 "백내장" "망막 위축"등의 눈 질환에 걸리기 쉬우니 주의해야 해요.',
          image:
            "https://mblogthumb-phinf.pstatic.net/MjAxOTA4MjlfNCAg/MDAxNTY3MDc5NzkxNzc5.KY9AtMKkpn4TheXmkdR2RPfjkYx_XahBlv3ZdAnl4y8g.u8pjzBsBYLRcy6tqrNEHxxJlAeQrSKQIT1CwhULHDfAg.PNG.vet6390/%EB%B9%84%EA%B8%80%EC%9D%98_%ED%8A%B9%EC%A7%95.PNG?type=w800",
        };
        const inputDataShihTzu = {
          petBreed: "시츄",
          history:
            " 시츄의 역사는 중국에서 시작되었습니다. 중국 황실을 위해서 티베트의 라사압소를 들여와 교배시켜 탄생했습니다. 페키니즈와 관련된 문서를 찾아보면 황실 전용견으로 키우고 있었다는 것을 알 수 있는데, 시츄의 경우 황실을 높이기 위해 사자와 외모적으로 흡사하게 생긴 견종을 키우고 싶어서 만들었다는 설이 유력합니다. \n 시츄는 시쭈나 시츄라고 부르기도 합니다. 이름의 유래는 사자입니다.",
          feature:
            "시츄는 키(체고)는 약 22~27cm, 몸무게는 약 4~7kg의 소형견입니다. 평균 수명은 약 10~18년으로 알려져 있어요. 시츄는 이중모에 장모종이에요. 보통 이중모에 장모종이라고 하면 털이 굉장히 많이 빠지는 경우가 많은데요. \n 시츄는 털 빠짐이 꽤 있긴 하지만, 다른 이중모 및 장모종 견종보다 털 빠짐이 현저히 적답니다. 털 빠짐은 적은 편이지만 장모종이기 때문에 털을 주 3~4회 정도는 빗어주는 게 좋답니다.",
          character:
            "모든 견종 중 가장 온순한 편이에요. 공격성도 낮고 온순한 성격으로 요구성 짖음도 거의 없는 편입니다. \n 분리불안 증상 또한 거의 없는 것으로 알려져 있으며 쾌활하고 사랑스러운 성격으로 알려져 있어 견주의 가족들과 함께하는 것을 좋아하며 충성스럽고 애정 어린 행동을 보여주기도 합니다. \n호기심이 많아 자신의 주변을 탐험하고 놀이하는 것을 즐기기도 합니다. 매우 사교적이기도 하여 낯선 사람이나 다른 개들과도 잘 지내는 경향이 있어요.",
          caution:
            "시츄는 단두종으로 머리와 코가 납작해요. 콧구멍과 기관지도 매우 좁아서 호흡하는 걸 힘들어합니다. 그래서 호흡이 격해질 정도의 격한 운동은 피해야 합니다. \n 시츄는 유전적으로 안구 관련 질환에 취약해요. 특히, 백내장 및 진행성 망막 위축증이라는 질병으로 인해 실명이 될 가능성이 높습니다. \n 또한, 눈이 크고 튀어나와 있는 편이라 눈이 건조해지기 쉬우며, 눈에 상처나 염증이 생길 가능성도 높아서 주의가 필요해요.",
          image:
            "https://img1.daumcdn.net/thumb/R800x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FmekUd%2FbtrSDFbbA8R%2Fq3a2LlPKIsEPlZOPsirK31%2Fimg.png",
        };
        const inputDataChihuahua = {
          petBreed: "치와와",
          history:
            "정확한 치와와의 기원은 기록으로 남은 부분이 없지만 민속학, 고고학적 근거로 지금의 멕시코 지역에서 유래 되었을 확률이 높다고 합니다. \n 간혹 치와와를 유럽이나 중국에서 유래된 견종이라 보는 의견들도 있었지만 현대 DNA 연구 결과 치와와는 유럽이나 중국 강아지와는 관련이 없다는 것이 밝혀졌다고 합니다.\n 20세기까지도 치와와는 많이 알려지지 않은 견종이었는데 19세기 말 제임스 왓슨 이란 미국인이 멕시코 치와와 주에서 치와와들을 미국으로 데려왔고 그 이후 여러가지 이슈의 주인공이 되면서 추 후 미국 애견 협회에도 등록이 되면서 많은 사람들의 사랑을 받기 시작했습니다.",
          feature:
            "체중은 일반적으로 체고는 18cm정도로 작은 편이며, 몸무게는 3kg이하의 초소형견 입니다. \n 단모치와와의 털은 대체로 털이 두껍고 매끄러우며 광택이 나고, 장모치와와는 털이 얇고 부드러우며 약간 곱슬거립니다.털의 색깔은 초코, 브라운, 레드, 블랙탄, 화이트색, 얼루무늬색을 띄고 있고 머리는 사과모양을 하고 있으며 몸집에 비해 머리가 큰 편입니다. \n 초소형견답게 아주 작고 둥근 얼굴을 갖고 있으며, 귀는 하늘을 향해 솟아있습니다. 눈은 짙은갈색 또는 검정색이고 약간 돌출되어 있습니다.",
          character:
            "치와와는 작은 체구에도 불구하고 겁이 없고 용감하며 대담한 성격을 가지고 있어요. 보호자에게는 충성심이 높지만 다른 사람 및 동물 그리고 어린아이에게는 강한 경계심과 공격성을 보일 수 있으므로 사회성 훈련과 복종 훈련에 신경을 써야 하는 품종입니다. \n 훈련의 난이도가 다른 견종에 비해 높다는 평가를 받는데 고집이 세고, 짜증을 쉽게 내며, 불안하면 공격성을 보이기 때문이에요. 이런 성격과 함께 작은 체구를 갖고 있어서 부상의 위험도 높은 편이므로 많은 시간을 투자하고, 강압적인 훈련보다는 칭찬을 통한 방법을 사용해야 효과를 높일 수 있습니다.",
          caution:
            "가장 작은 체구를 가진 강아지의 탓에 추위를 많이 타고 치아 문제, 안구 문제, 호흡기계 질환, 슬개골 탈구, 저혈당증, 기관 허탈증 등 여러 가지 질병에 취약해요. 때문에 어느 견종보다도 식단 관리, 규칙적인 운동 및 예방관리를 통해 건강을 유지할 수 있도록 신경을 써야 합니다. \n 작은 체구를 가진 치와와는 턱이 작아서 치아가 좁은 공간에 밀집하게 돼 잇몸 질환, 충치, 부정교합 등 각종 치주 질환에 취약해요. 이외에도 큰 눈이 튀어나온 신체 구조로 인해 안구 건조, 백내장, 각막 궤양 등 눈 관련 질병과 심장병, 저혈당 문제에도 주의를 기울여야 합니다.",
          image:
            "https://img.famtimes.co.kr/resources/2019/02/15/yE5YxHsTC4HAblpe.jpg",
        };
        const inputDataYorkshireTerrier = {
          petBreed: "요크셔테리어",
          history:
            "19세기 중엽에 잉글랜드 북부의 요크셔 지역에서 처음 탄생한 것으로 알려져 있고 사냥견이었기에 테리어라는 이름이 붙어 요크셔테리어가 탄생했답니다. 오랜 기간 걸친 품종 교배로 점점 작아졌을 것으로 추정이 되고 외모에 걸 맞는 움직이는 보석이라는 별명으로 유명합니다. \n 서구권이든 어디든 상관없이 애칭으로 요키라고 불리고 있으며 20세기 중후반부터 전세계적으로 큰 사랑을 받은 견종입니다.",
          feature:
            "요크셔테리어의 크기는 숫컷, 암컷 모두 몸 길이가 18cm ~ 23cm 정도의 크기이며, 몸무게는 5kg 이하의 소형견이에요. 외모적인 부분에서의 특징은 단연 아름답고 긴 피고를 꼽을 수 있습니다. \n 피모의 길이는 적당히 길고 곧으며, 광택이 있습니다. 털의 색깔은 머리와 가슴, 다리부분의 탄(tan)부분을 제외하고는 대게 다크블루 스틸 색상을 띄고 있으며 황갈색을 띄기도 합니다. \n 머리는 비교적 작고 둥근 편 입이며, 코는 곧으며 입은 짧은 편 입니다. 목은 튼튼하고 길며 또한 등은 짧고 곧습니다.",
          character:
            "요크셔테리어는 다정하고 쾌활하며, 충성심이 높고 영리해요. 관심받는 것을 즐기며 애정 표현에 솔직한 성격으로 사람과 함께 어울리는 것을 좋아합니다. \n 호기심이 많고 장난기가 많은 쾌활함 성격으로 장난감을 가지고 노는 것도 매우 좋아해요. 또 주인에 대한 충성심이 높아서 위험을 사전에 감지하고 가족을 보호자는 역할도 잘 수행하는 데, 지능이 높아서 훈련을 잘 소화하고 빠르게 습득하는 능력이 이를 가능하게 만들어요. \n 경계심이 강해서 훈련이 되지 않으면 공격성을 보이거나 과도하게 짖을 수 있고, 심리적인 불안에 따른 분리불안 증상을 보일 수 있어요. 때문에 요키에게는 충분한 사회성 훈련과 함께 운동과 놀이를 통해 규칙을 알려주고 적응을 도와서 사람과 함께 공존할 수 있도록 하는 것이 중요합니다.",
          caution:
            "요크셔테리어의 수명은 12~15년으로 비교적 건강한 품종이지만 슬개골 탈구, 저혈당증, 치아 문제, 안구 질환 등 몇 가지 사항에 취약할 수 있고 일부에서는 대퇴부 무혈성 괴사증과 간질환 등의 질병에 쉽게 걸리는 경우도 있어요. \n 때문에 건강을 유지하기 위해서는 정기적인 병원 검진과 함께 영양이 고른 식단과 적절한 운동이 병행되어야 하며 양치질과 귀 청소 및 목욕과 털 관리가 필수적입니다.",
          image:
            "https://thumb.photo-ac.com/50/508b85e6e79d8b8dafd12ea40b1af733_t.jpeg",
        };
        const inputDataPoodle = {
          petBreed: "푸들",
          history:
            "과거에 푸들은 거위나 오리 같은 물새 사냥을 돕는 조렵견이었습니다. 물가에 있는 오리를 향해 돌진하여 오리가 하늘로 날아가게 만들고, 사냥꾼의 총에 맞은 오리를 회수해 오는 역할을 했습니다.그래서 독일어로 ‘물에 뛰어들어 첨벙첨벙 수영하다’라는 의미의 단어인 ‘푸덜(Pudel)’에서 유래되어 ‘푸들(Poodle)’이라고 불리게 되었습니다.",
          feature:
            "푸들은 흰색, 갈색, 검은색, 오렌지색, 회색, 살구색 등 매우 곱슬거리는 단색 털을 가진 견종으로 유명해요. 길고 넓은 귀와 어두운 색의 타원형 눈을 가지고 있으며, 입은 길고 강한 턱과 날카로운 이빨을 가지고 있습니다. 우아한 외모와는 달리 근육질의 몸매를 가지고 있는 것도 특징입니다.푸들은 털 빠짐이 적으며, 지능이 높고, 크기가 다양하고, 성격이 좋아서 반려견으로 매우 선호되는 품종이에요. 우리나라에서도 말티즈 다음으로 많이 키우고 있는 것으로 알려져 있습니다. 푸들의 가장 큰 특징은 털 빠짐이 거의 없는 것으로, 털 날림이 없어 알레르기를 유발할 가능성이 매우 낮아요. 물새를 사냥하기 위한 목적으로 키워졌던 만큼 수영과 운동을 좋아합니다.",
          character:
            "푸들은 사람과 가장 오랫동안 함께한 견종 중 하나로써 사람과의 상호작용이 뛰어나며 주인에 한 충성도가 높습니다. 지능이 매우 높고 똑똑하며 사람과의 상호작용이 높기 때문에 훈련의 정도와 보호자의 성향 그리고 생활환경에 따라 성격이 다양하게 형성되는 특징을 보여요. \n 또한 푸들은 다양한 품종과의 교배가 많이 진행되었기 푸들이 공격성과 같은 문제 행동을 보이는 경우는 많지 않은 것이 일반적인데, 운동을 좋아하며 보호자에 대한 애정이 뛰어난 성격 때문에 혼자 있는 시간이 길거나 스트레스를 받는 경우에는 큰 사고를 치거나 강한 공격성을 보이기도 합니다. \n 그럼에도 불구하고 다른 견종들에 비해 성격이 좋고 공격성이 적어서 천사견으로 묘사돼요. 푸들은 보호자들의 감정을 가장 잘 이해하는 견종이며 애교도 많아서 정신적으로 힘든 일을 겪고 있는 사람들에게는 가장 큰 위로를 받을 수 있는 품종입니다.",
          caution:
            "푸들의 기대 수명은 12 ~ 14년으로 다른 견종에 비해 유전적인 질병은 크게 없을 만큼 건강한 편이에요. 특히 소형견에 비해 수명이 짧다고 알려진 대형견 스탠더드 푸들도 평균 수명이 13년 정도로 다른 대형견에 비해 오랫동안 사는 것으로 알려져 있습니다.  푸들의 긴 몸은 뒷다리에 통증을 유발하고 척추 질환 문제를 일으킬 수 있으며, 고관절이 제대로 발달하지 않아 관절염과 고관절 이형성증에 대한 위험도를 높일 수 있어요. 특히 허리에 염증이 생기면 하반신이 마비되는 등 심각한 문제를 일으킬 수 있으므로 병원에서 주기적으로 검사를 받는 것이 좋습니다. 또한 백내장과 녹내장 및 알레르기나 이물질이 원인으로 발생하는 안구 감염이 발생하지 않도록 주의를 기울여야 합니다. 푸들의 길게 늘어진 귀는 염증을 유발해서 가려움과 냄새가 나게 할 수 있으므로 외이도 주변의 털을 정리해 주고 통풍이 잘 되도록 신경을 써야 해요",
          image:
            "https://img.freepik.com/free-photo/view-of-cute-dog-enjoying-time-in-nature-at-the-park_23-2150407400.jpg?size=626&ext=jpg&ga=GA1.1.1826414947.1699315200&semt=sph",
        };
        const inputDataDachshund = {
          petBreed: "닥스훈트",
          history:
            "닥스훈트는 바셋 하운드와 같이 스위스의 쥬라 산악지방의 쥬라하운드라고 전해지고 있어요. \n 닥스훈트는 고대 이집트왕의 부조에 그려진 다리가 짧고 몸통이 긴 개라는 설이 있으며, 멕시코, 중국, 그리스, 페루 등의 국가에서 돌로 된 모형이나 세공품으로 닥스훈트가 보일 정도로 역사가 오래 된 견종입니다. \n 12세기 ~ 13세기경 프랑스에서는 장시간의 사냥을 목적으로 바셋하운드를 개량하였고 그때, 독일에서는 굴에 숨은 오소리나 토끼, 여우 등을 사냥할 목적으로 다리가 짧은 견종을 쇼트 레그드 테리어를 개량 하여 탄생한 견종이 닥스훈트 입니다.",
          feature:
            "닥스훈트는 크기에 따라 4가지로 분류됩니다. 작은 순서대로 카닌헨, 미니어처, 트위니, 스탠더드 순입니다. 한국에서는 미니어처, 트위니가 보편적이에요. 스탠더드 크기는 웰시코기와 비슷한 크기이며, 스탠더드의 경우에는 15kg까지도 클 수 있습니다. \n 체고는 13~25cm 정도로 보고 있습니다. 닥스훈트는 모질에 따라서 또 분류가 3가지로 나뉘게 됩니다. 단모, 장모, 강모 입니다. 단모는 짧고 두꺼운 털이며, 장모는 길고 부드러운 털, 강모는 빗자루처럼 뻣뻣한 털을 지니고 있어요. \n 닥스훈트는 근육질의 다부진 몸을 가지고 있어요. 짧은 다리가 온몸을  지탱해야 하는 만큼 강한 다리근육을 가지고 있습니다. 그렇기에 근육이 빠지지 않도록 규칙적인 산책과 운동이 함께 병행되어야 합니다. ",
          character:
            "닥스훈트는 여전히 과거 사냥하던 시절의 기질이 남아있어요. 그래서 작은 동물이나 다른 강아지에게 달려들고 쫓아가는 모습을 보일 수 있어요. 다른 사람, 강아지에게 달려들지 않도록 훈련하는 게 좋습니다. 닥스훈트는 집사에게 붙어있는 걸 좋아하는 애교쟁이 강아지입니다. 다만, 조금 내성적이고 경계심도 있어서 낯선 사람과 친해지는 데에는 시간이 조금 걸린다고 알려져 있어요. 닥스훈트는 명랑하고 장난기가 많은 견종이에요. 비글과 견줄만큼 홀발하다고 알려져 있습니다. 에너지가 발산되지 않으면 물건을 파괴하는 등의 문제행동을 할 수 있으니 충분한 산책이 필요하답니다.",
          caution:
            "긴 허리와 짧은 다리를 가진 견종인 닥스훈트는 체형 특성상 긴 허리로 인해 척추가 약합니다. 그렇기에 체중 조절을 해 주지 않아 살이 찌게 되면, 척추 디스크, 추간판 헤르니와 같은 척추 질환에 걸릴 수 있으며, 심한 경우 하반신 마비까지도 올 수 있다고 해요. \n 그렇기 때문에 체중 조절이 필수적입니다. 또한, 외형적인 특성상 목디스크에 걸릴 수도 있으니 유의해야 합니다. \n 그 외 조심해야 할 질병으로는 비만, 운동 부족, 스트레스 등으로 인한 당뇨병이 있습니다. 그렇기에 적당한 산책은 건강을 위해 필수적이라고 할 수 있습니다.",
          image:
            "https://post-phinf.pstatic.net/MjAyMDA4MjlfNSAg/MDAxNTk4NjYwNzk5Mjk4.YALfjBqJ4ONxspvfSwE9i7Sz-u3VRvcijQNWS8gVFlEg.ABCsePzZ2pBvTwJ02TtkvI_bRzjJJO3bVvC3tSiuok4g.JPEG/IMG_3393.JPG?type=w800_q75",
        };

        const inputDatahusky = {
          petBreed: "시베리안 허스키",
          history:
            "시베리안 허스키는 동부 시베리아 유목 생활을 하던 이뉴잇 사람들 중의 하나인 척치(Chukchi)족에 의해 썰매를 끌고 순록을 이끄는 역할을 했으며, 번견으로도 이용되었어요. \n 시베리아 Siberia의 혹독한 환경 속에서도 완벽한 사역견으로서의 역할을 수행해 왔는데,  허스키는 몇 백 년 동안 시베리아에서 살아왔지만, 20세기 초에는 모피 상인들에 의해 북아메리카에 반입되었어요. ",
          feature:
            "체고 50~60CM 정도의 크기,체중은 16~27KG 정도의 무게를 가지고 있습니다.늑대를 닮은 특유의 외모를 가지고 있는 견종이죠.흰색과 검정색 또는 레몬색 레드색 등의 모색이 섞여예쁜 얼굴을 가지고 있는 견종이랍니다. \n 눈도 땡글땡글 아주 크고, 귀는 쫑긋해요. 꼬리는아주 풍성하고 큰 털을 가지고 있습니다.털은 이중모의 풍성하고 촘촘한 털을 가지고 있어요.그래서 털빠짐이 꽤나 심한 견종 중에 하나입니다.",
          character:
            "시베리안 허스키의 경우에 썰매견 이다보니 힘과 체력이 정말 좋습니다. 지구상에 있는 모든 포유류중 가장 오래 뛸 수 있는게 썰매견 라인인 말라뮤트나 시베리안 허스키 라고 하는데요. \n 그만큼 파워풀 한 강아지 품종이며, 힘이 넘치는 만큼 쾌활합니다. 허스키는 관심을 받는 것을 즐기고 훈련을 받는것도 좋아하며 그렇지 않을 경우 금방 싫증을 낼 수 있어요. \n 사람을 매우 좋아하고 주인과 잘 놀며 주인의 감정까지 잘 파악해서 애교도 잘 부리는 마음이 넓고 감수성이 풍부한 개입니다.친화성이 매우 좋기 때문에 사람들과도, 다른 개들과도 잘 어룰리고 사교성이 우수하여 인싸의 성격을 가졌습니다. ",
          caution:
            "시베리안 허스키는 자연 발생 견종으로 기본적으로 건강한 편으로 알려져 있어요. 다만, 안구 및 관절 건강이 약한 경우가 종종 있어 주의가 필요합니다. \n 고관절이 비정상적으로 발달되는 질환으로 움직이는 데 불편함을 유발하는 고관절 이형성증이 발병 할 수 있어요. 평소 관절 영양제 및 운동으로 관리를 해줄 필요가 있으며, 수술을 통해 교정해 주는 방법도 있습니다. \n 백내장 발병률이 높으니 1년에 한 번씩 주기적으로 안과 검진을 할 필요가 있습니다. 초기에는 시력이 떨어졌다는 표시가 잘 나지 않기 때문에, 조금이라도 눈이 뿌옇게 보인다면 빠르게 진찰을 받아보는 게 좋답니다.",
          image:
            "https://videohive.img.customer.envatousercontent.com/files/189439562/preview.jpg?auto=compress%2Cformat&fit=crop&crop=top&max-h=8000&max-w=590&s=8294e49ad1f9af148a043c170e9dbd38",
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

function inputuserData() {
  const request = indexedDB.open("myPetDB", 1);

  request.onsuccess = function (event) {
    const db = event.target.result;

    // 트랜잭션 시작 (읽기 권한 필요)
    const transaction = db.transaction(["user"], "readwrite");

    // 객체 저장소(테이블) 열기
    const objectStore = transaction.objectStore("user");

    // user 테이블의 데이터 수 조회
    const countRequest = objectStore.count();

    countRequest.onsuccess = function () {
      const count = countRequest.result;

      // user 테이블에 데이터가 없을 경우에만 데이터 추가
      if (count === 0) {
        const signInAdminUserData = {
          nickname: "admin",
          email: "admin@gmail.com",
          phNum: "01012345678",
          pw: btoa("admin1234"), // base64로 1차 암호화
          isLogin: false,
        };

        const signInTestUserData = {
          nickname: "test",
          email: "test@gmail.com",
          phNum: "01012345678",
          pw: btoa("test1234"), // base64로 1차 암호화
          isLogin: false,
        };

        // 데이터 추가 (add() 메서드 사용)
        objectStore.add(signInAdminUserData);
        objectStore.add(signInTestUserData);

        transaction.oncomplete = function () {
          console.log("userData upload completed");
        };
      }
    };
  };
}

function inputuserData() {
  const request = indexedDB.open("myPetDB", 1);

  request.onsuccess = function (event) {
    const db = event.target.result;

    // 트랜잭션 시작 (읽기 권한 필요)
    const transaction = db.transaction(["user"], "readwrite");

    // 객체 저장소(테이블) 열기
    const objectStore = transaction.objectStore("user");

    // user 테이블의 데이터 수 조회
    const countRequest = objectStore.count();

    countRequest.onsuccess = function () {
      const count = countRequest.result;

      // user 테이블에 데이터가 없을 경우에만 데이터 추가
      if (count === 0) {
        const signInAdminUserData = {
          nickname: "admin",
          email: "admin@gmail.com",
          phNum: "01012345678",
          pw: btoa("admin1234"), // base64로 1차 암호화
          isLogin: false,
        };

        const signInTestUserData = {
          nickname: "test",
          email: "test@gmail.com",
          phNum: "01012345678",
          pw: btoa("test1234"), // base64로 1차 암호화
          isLogin: false,
        };

        // 데이터 추가 (add() 메서드 사용)
        objectStore.add(signInAdminUserData);
        objectStore.add(signInTestUserData);

        transaction.oncomplete = function () {
          console.log("userData upload completed");
        };
      }
    };
  };
}

function getPostToIndex() {
  const request = indexedDB.open("myPetDB", 1);

  request.onsuccess = function (event) {
    const db = event.target.result;

    // 트랜잭션 시작 (읽기 전용)
    const transaction = db.transaction(["posts"], "readonly");

    // 객체 스토어에 접근
    const objectStore = transaction.objectStore("posts");

    // index를 이용하여 timestamp를 기준으로 내림차순으로 정렬된 cursor를 가져옴
    // autoincrement 이므로 최근 글에는 최근 키값이 들어가게 되어 최신 데이터를 가져옴
    const index = objectStore.index("timestamp");
    const request1 = index.openCursor(null, "prev");

    // 최근 3개의 데이터를 저장할 배열
    const recentPosts = [];

    request1.onsuccess = function (event) {
      const cursor = event.target.result;

      if (cursor && recentPosts.length < 3) {
        recentPosts.push(cursor.value);
        cursor.continue();
      } else {
        const postContainer = document.getElementById("postContainer");

        for (let i = 0; i < recentPosts.length; i++) {
          const post2 = document.createElement("post-item");
          post2.setAttribute("data-title", String(recentPosts[i].title));
          post2.setAttribute("data-content", recentPosts[i].content);
          post2.setAttribute("data-author", recentPosts[i].author);
          post2.setAttribute("data-timestamp", recentPosts[i].timestamp);

          // 속성값 가져오기
          const title = post2.getAttribute("data-title");
          const content = post2.getAttribute("data-content");
          const author = post2.getAttribute("data-author");
          const timestamp = post2.getAttribute("data-timestamp");

          const titleElement = post2.shadowRoot.querySelector("h2");
          const contentElement = post2.shadowRoot.querySelector(".contents");
          const authorElement = post2.shadowRoot.querySelector(".author");
          const timestampElement = post2.shadowRoot.querySelector(".timestamp");

          // 정보 넣기
          titleElement.textContent = title;
          contentElement.textContent = content;
          authorElement.textContent = author;
          timestampElement.textContent = timestamp;

          // post2를 postContainer에 추가
          postContainer.appendChild(post2);
        }
        postContainer.addEventListener("click", (event) => {
          const clickedPost = event.target.closest("post-item");
          if (clickedPost) {
            const title = clickedPost.getAttribute("data-title");
            // 원하는 페이지로 이동
            window.location.href = `community.html`;
          }
        });
      }
    };

    request1.onerror = function (event) {
      console.error("Error fetching recent posts:", event.target.error);
    };
  };

  request.onerror = function (event) {
    console.error("Error opening database:", event.target.error);
  };
}

gsap.registerPlugin(ScrollTrigger);

const dog = document.querySelector("#mainImageDog");
const mainImg = document.querySelector("#mainImage");
const titleText = document.querySelector(".hero__title");





//# GSAP  
class App {
  constructor() {
    this._initialize();
    this._render();
  }

  _initialize() {
    this._setInitialStates();
    this._createLenis();
    this._createPinSection();
    this._videoSection();
    // this._section2();
  }

  _setInitialStates() {
    gsap.set(".fullwidth-image__text h1", {
      y: 32,
      opacity: 0,
    });
  }

  _createLenis() {
    this.lenis = new Lenis({
      lerp: 0.1,
    });
  }


  _createSection() {
    gsap.utils.toArray(".section").forEach((panel, i) => {
      ScrollTrigger.create({
        trigger: panel,
        start: "top top",
        pin: true,
      })
    })
  }

  _createPinSection() {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: ".fullwidth-image",
        start: "top top",
        end: "bottom+=100% bottom",
        scrub: true,
        pin: true,
        // markers: true,
      },
    });

    tl.to(".fullwidth-image__overlay", {
      opacity: 0.5,
    })
      .to(
        ".fullwidth-image__text1",
        {
          opacity: 1,
          y: -10,
        },
        0
      )
      .to(
        ".fullwidth-image__text1",
        {
          opacity: 0,
          y: -10,
        },
        1
      )
      .to(
        ".fullwidth-image__text2",
        {
          opacity: 1,
          y: -140,
        },
        2
      )
      .to(
        ".fullwidth-image__text h1",
        {
          opacity: 0,
          y: -140,
        },
        3
      )
      .to(
        ".fullwidth-image",
        {
          scale: 1.2,
        },
        0
      )
      .to(
        ".fullwidth-image",
        {
          scale: 1.1,
        },
        4
      )
      .to(
        ".fullwidth-image__overlay",
        {
          opacity: 0,
        },
        3
      );
  }


  // _section2() {
  //   gsap.utils.toArray(".step").forEach((panel, i) => {
  //     ScrollTrigger.create({
  //       trigger: panel,
  //       start: "top top",
  //       pin: true,
  //     })
  //   })
  // }

  _videoSection() {
    const coolVideo = document.querySelector("video");


    let tl = gsap.timeline({
      scrollTrigger: {
        trigger: "video",
        start: "top top",
        end: "bottom+=350% bottom",
        pin: true,
        scrub: true,
        // markers: {
        //   startColor: "blue",
        //   endColor: "darkblue",
        //   fontSize: "18px",
        //   fontWeight: "bold",
        //   indent: 20
        // }
      }
    });
    


    const texts = gsap.utils.toArray(".step");
    texts.forEach((text, index) => {
      tl.from(text, { scale: 1, autoAlpha: 1, duration: 1 }).to(
        text,
        { scale: 1.2, autoAlpha: 1, duration: 1 },
        0
      );
    });


    coolVideo.onloadedmetadata = function () {
        tl.to(coolVideo, {
          currentTime: coolVideo.duration,
          duration: () => tl.duration()+100
        })

      };

      
      function isTouchDevice() {
        return (
          "ontouchstart" in window ||
          navigator.maxTouchPoints > 0 ||
          navigator.msMaxTouchPoints > 0
        );
      }
      if (isTouchDevice()) {
        coolVideo.play();
        coolVideo.pause();
      }



      // let tl = gsap.timeline({
      //   scrollTrigger: {
      //     trigger: ".section2",
      //     // start: "top 80px",
      //     end: "bottom bottom",
      //     scrub: true,
      //     markers: true,
      //     pin: true,
      //   },
      // });
  
      
  }

  _render(time) {
    this.lenis.raf(time);

    requestAnimationFrame(this._render.bind(this));
  }
}

new App();
