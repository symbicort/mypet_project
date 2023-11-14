    //반응형(모바일 환경에서 레이아웃 변경) 고려해서 만들것
    let dpTemp = [['말티즈', 'https://images.mypetlife.co.kr/content/uploads/2022/12/07161728/AdobeStock_212879665-1024x670.jpeg', '오래된 견종이라 유전병에 대한 걱정이 상대적으로 적어요', '가족 구성원 중 한사람만 좋아하는 편애가 심한 편이에요'], ['비글', 'https://mblogthumb-phinf.pstatic.net/MjAxOTA4MjlfNCAg/MDAxNTY3MDc5NzkxNzc5.KY9AtMKkpn4TheXmkdR2RPfjkYx_XahBlv3ZdAnl4y8g.u8pjzBsBYLRcy6tqrNEHxxJlAeQrSKQIT1CwhULHDfAg.PNG.vet6390/%EB%B9%84%EA%B8%80%EC%9D%98_%ED%8A%B9%EC%A7%95.PNG?type=w800', '활기차고 에너지가 넘쳐요 호기심이 많고 친화력이 좋아요', '사냥개 출신이라 하울링이 많고 에너지가 많아 산책과 놀이활동으로 해소해주어야 해요'], ['시츄', 'https://img1.daumcdn.net/thumb/R800x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FmekUd%2FbtrSDFbbA8R%2Fq3a2LlPKIsEPlZOPsirK31%2Fimg.png', '일명 천사견, 느긋하고 주인에 대한 집착이 적은 편이에요', '게으르고 고집이 센 편이라 비만이 되지 않도록 신경써주어야해요'], ['치와와', 'https://img.famtimes.co.kr/resources/2019/02/15/yE5YxHsTC4HAblpe.jpg', '체구에 맞지 않는 용맹함이 특징이에요 충성심이 높고 자신감이 넘쳐요', '털이 많이 빠지고 화가 많아 스트레스 관리가 필요해요'], ['요크셔 테리어', 'https://thumb.photo-ac.com/50/508b85e6e79d8b8dafd12ea40b1af733_t.jpeg', '혈기왕성하고 권위적인 귀족이에요', '쥐 사냥을 목적으로 길러진 견종이기 때문에 소동물과 키우면 공격성이 커질 수 있어요'], ['푸들', 'https://img.freepik.com/free-photo/view-of-cute-dog-enjoying-time-in-nature-at-the-park_23-2150407400.jpg?size=626&ext=jpg&ga=GA1.1.1826414947.1699315200&semt=sph', '활동적이고 지능적이며 우아해요', '똑똑하고 활발한 편이니 에너지를 산책과 놀이로 해소해주어야해요']]; //임시로 db(?)용 이중배열 선언

    function showExplain(e) {
        //배열에서 이미지 견종명 성격설명 습관설명 받아오기 나중에 DB에서 받아오는 것으로 수정
        //이미지를 클릭하면 상세설명 출력
        let dogp = $(e.currentTarget).children('div');
        for (i = 0; i < dpTemp.length; i++) {
            if (dogp[0].innerHTML == dpTemp[i][0]) {
                $(".explainName").text(dpTemp[i][0]);
                $(".mainImg").attr("src", dpTemp[i][1]);
                $(".explainCharacter").text(dpTemp[i][2]);
                $(".explainTrait").text(dpTemp[i][3]);
            }
        }

    }
    function findExplian(e) {
        //배열에서 이미지 견종명 성격설명 습관설명 받아오기 나중에 DB에서 받아오는 것으로 수정
        //검색창에서 인풋받아 상세설명 출력
        let keyWord = ""
        keyWord = $("input.secrch").val();
        for (i = 0; i < dpTemp.length; i++) {
            if (keyWord == dpTemp[i][0]) {
                $(".explainName").text(dpTemp[i][0]);
                $(".mainImg").attr("src", dpTemp[i][1]);
                $(".explainCharacter").text(dpTemp[i][2]);
                $(".explainTrait").text(dpTemp[i][3]);
            }
        }

    }