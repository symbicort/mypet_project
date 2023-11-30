const url =
  "https://7u2pewyqfamnj67yy7dqg6z7li0pwqmg.lambda-url.ap-northeast-2.on.aws/";

const imgUrl =
  "https://zyj6almxtnnyfucg7mpesibneq0yospu.lambda-url.ap-northeast-2.on.aws/";

let petData = JSON.parse(localStorage.getItem("petData")) || [];
let petImage = JSON.parse(localStorage.getItem("petImage")) || [];

fetch(url)
  .then((response) => {
    if (!response.ok) {
      throw new Error("API 요청 실패: " + response.status);
    }
    return response.json();
  })
  .then((data) => {
    petData = data.TbAdpWaitAnimalView.row;
    localStorage.setItem("petData", JSON.stringify(petData));
  })
  .catch((error) => {
    console.error(error);
  });

fetch(imgUrl)
  .then((response) => {
    if (!response.ok) {
      throw new Error("API 요청 실패: " + response.status);
    }
    return response.json();
  })
  .then((data) => {
    petImage = data.TbAdpWaitAnimalPhotoView.row;
    localStorage.setItem("petImage", JSON.stringify(petImage));
  })
  .catch((error) => {
    console.error(error);
  });

// console.log(petData);
// console.log(petImage);

function groupImg(data) {
  return data.reduce((grouped, item) => {
    const { ANIMAL_NO, PHOTO_KND, ...rest } = item;

    if (PHOTO_KND === "THUMB") {
      if (!grouped[ANIMAL_NO]) {
        grouped[ANIMAL_NO] = [];
      }

      grouped[ANIMAL_NO].push(rest);
    }

    return grouped;
  }, {});
}

const imgGroup = groupImg(petImage);

// console.log(imgGroup);

const swiperWrapper = document.querySelector(".swiper-wrapper");

// petImage.forEach(item => {
//   swiper.appendSlide(`<div class="swiper-slide"><img src="https://${item.PHOTO_URL}" alt="" width="200" loading="lazy"></div>`);
// });

const firstObjects = {};
for (const animalNo in imgGroup) {
  const photos = imgGroup[animalNo];
  if (photos.length > 0) {
    const firstObject = photos[0];
    firstObjects[animalNo] = [firstObject];
  }
}

// console.log(firstObjects);

for (const item in firstObjects) {
  for (i = 0; i < firstObjects[item].length; i++) {
    const currentPet = petData.find((pet) => pet.ANIMAL_NO == item);
    const currentPhoto = firstObjects[item][i];

    const match = currentPet ? currentPet.NM.match(/\(([^)]+)\)/) : null;
    const extraInfo = match ? match[1] : "";

    // const location = document.querySelector('.location')
    // location.textContent = extraInfo.replace(/-.*/, "")

    swiper.appendSlide(`
    <div class="swiper-slide">
        <img loading="lazy" src="https://${currentPhoto.PHOTO_URL}" alt="">
        <div class="contents">
          <div class="text">
            <h3 class="name">${
              currentPet ? currentPet.NM.replace(/\([^)]+\)/, "") : ""
            }</h3>
            <p class="breed">${currentPet ? currentPet.BREEDS : ""}</p>
            </div>
            
          <custom-button data-type="ghost" data-label="자세히"></custom-button>
        </div>
    <p class="location">${extraInfo.replace(/-.*/, "")}</p>
      </div>
    `);
  }
}

swiper.update();



// function openModal(animalName, animalBreed, location) {
//   document.getElementById('modalTitle').textContent = animalName;
//   document.getElementById('modalBreed').textContent = `견종 : ${animalBreed}`;
//   document.getElementById('modalLocation').textContent = `보호 장소 : ${location}`;
  
//   document.getElementById('Modal').style.display = 'flex';
//   document.getElementById('Modal').style.opacity = '1';

//   swiper.autoplay.stop();


// }


// console.log(petData[0].BREEDS);

function openModal(animalName, animalBreed, location) {
  const currentPet = petData.find((pet) => pet.NM.includes(animalName) && pet.BREEDS === animalBreed);
  // console.log(animalName, animalBreed);
  // console.log(currentPet);

  if (!currentPet) {
    console.error("Cannot find matching petData");
    return;
  }

  const currentImg = petImage.find((img) => img.ANIMAL_NO === currentPet.ANIMAL_NO);

  if (!currentImg) {
    console.error("Cannot find matching petImage");
    return;
  }

  document.getElementById('modalTitle').textContent = animalName;
  document.getElementById('modalBreed').innerHTML = `견종 <strong>${currentPet.BREEDS}</strong>`;
  document.getElementById('modalLocation').innerHTML = `보호 장소 <strong>${location}</strong>`;
  document.getElementById('modalEnterDate').innerHTML = `입소일 <strong>${currentPet.ENTRNC_DATE}</strong>`;
  document.getElementById('modalGender').innerHTML = `성별 <strong>${(currentPet.SEXDSTN == 'M') ? "남" : "여"}</strong>`;
  document.getElementById('modalAge').innerHTML = `나이 <strong>${currentPet.AGE.replace(/(\d+)\(세\) (\d+)\(개월\)/, '$1살 ')}</strong>`;
  document.getElementById('modalVideo').setAttribute('src', `https://youtube.com/embed/${currentPet.INTRCN_MVP_URL.slice(-11)}?controls=1&modestbranding=1&rel=0&showinfo=0&muted=1`)

  document.getElementById('Modal').style.display = 'flex';

  swiper.autoplay.stop();
}







  function closeModal() {
    const event = new KeyboardEvent('keydown', {
      key: 'k',    
      code: 'KeyK',
      which: 75,
      keyCode: 75,
      bubbles: true,
      cancelable: true,
    });
    
    document.dispatchEvent(event);

    document.getElementById('Modal').style.display = 'none';

    $('#modalVideo')[0].contentWindow.postMessage('{"event":"command","func":"' + 'stopVideo' + '","args":""}', '*');

    swiper.autoplay.start();

  }

  document.addEventListener("click", function (event) {
    if (event.target && event.target.getAttribute("data-type") === "ghost") {
      const animalName = event.target.getAttribute("data-animal-name");
      const animalBreed = event.target.getAttribute("data-animal-breed");
      const location = event.target.getAttribute("data-animal-location");

      openModal(animalName, animalBreed, location);
    }

    if (event.target && event.target.classList.contains('closeModal')) {
      closeModal();
    }
  });

document.addEventListener("click", function (event) {
  if (event.target && event.target.getAttribute("data-type") === "ghost") {
    const dogName = event.target.closest(".swiper-slide").querySelector(".name").textContent;
    const dogBreed = event.target.closest(".swiper-slide").querySelector(".breed").textContent;
    const location = event.target.closest(".swiper-slide").querySelector(".location").textContent;

    openModal(dogName, dogBreed, location);
  }
});







var love = setInterval(function () {
  var r_num = Math.floor(Math.random() * 6000) ;
  var r_size = Math.floor(Math.random() * 45) + 10; // default 65 + 10
  var r_left = Math.floor(Math.random() * 100) + 1;
  var r_bg = Math.floor(Math.random() * 25) + 100;
  var r_time = Math.floor(Math.random() * 20) + 15; // default 5 + 5

  $(".bg_heart").append(
    "<div class='heart' style='width:" +
      r_size +
      "px;height:" +
      r_size +
      "px;left:" +
      r_left +
      // "%;background:rgba(255," + (r_bg - 25) + "," + r_bg + ",1);-webkit-animation:love " +
      "%;background:rgba(" + (r_bg)+ "," + (r_bg + 100) + ",255,1);-webkit-animation:love " +
      r_time +
      "s ease;-moz-animation:love " +
      r_time +
      "s ease;-ms-animation:love " +
      r_time +
      "s ease;animation:love " +
      r_time +
      "s ease'></div>"
  );

  $(".bg_heart").append(
    "<div class='heart' style='width:" +
      (r_size - 10) +
      "px;height:" +
      (r_size - 10) +
      "px;left:" +
      // (r_left + r_num) +"%;background:rgba(255," +(r_bg - 25) +"," +(r_bg + 25) +",1);-webkit-animation:love " +
      (r_left + r_num) +"%;background:rgba(" +(r_bg - 100) +"," +(r_bg) +",230,1);-webkit-animation:love " +
      (r_time + 5) +
      "s ease;-moz-animation:love " +
      (r_time + 5) +
      "s ease;-ms-animation:love " +
      (r_time + 5) +
      "s ease;animation:love " +
      (r_time + 5) +
      "s ease'></div>"
  );

  $(".heart").each(function () {
    var top = $(this)
      .css("top")
      .replace(/[^-\d\.]/g, "");
    var width = $(this)
      .css("width")
      .replace(/[^-\d\.]/g, "");
    if (top <= -100 || width >= 150) {
      $(this).detach();
    }
  });
}, 500);
