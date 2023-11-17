const url =
  "http://openapi.seoul.go.kr:8088/78664b614370646a38324950724644/json/TbAdpWaitAnimalView/1/999/";

const imgUrl =
  "http://openapi.seoul.go.kr:8088/78664b614370646a38324950724644/json/TbAdpWaitAnimalPhotoView/1/999/";

async function assignData() {
  const petData = await getData();
  const petImgData = await getImgData();

  // console.log(petData.TbAdpWaitAnimalView.row);
  // const petCleandata = petData.TbAdpWaitAnimalView.row;
  // console.log(petCleandata);
  // console.log("이미지", petImgData.TbAdpWaitAnimalPhotoView.row);

  const listContainer = document.querySelector(".list");

  for (i = 0; i < petData.TbAdpWaitAnimalView.row.length; i++) {
    const listbox = document.createElement("div");
    listbox.classList.add("listbox");

    const moreButton = document.createElement("button");
    // moreButton.setAttribute("data-label", "더보기");
    // moreButton.setAttribute("data-type", "primary");
    moreButton.classList.add("more-button");
    moreButton.setAttribute("onclick", "openCard()");
    moreButton.innerHTML = "더보기";

    const petName = document.createElement("h2");
    petName.innerText = `${petData.TbAdpWaitAnimalView.row[i].NM}`;

    const petBadge = document.createElement("div");
    petBadge.classList.add("pet-badge");

    const petAge = document.createElement("p");
    petAge.innerText = `${petData.TbAdpWaitAnimalView.row[i].AGE}`;
    petAge.classList.add("pet-age");

    const petBreed = document.createElement("p");
    petBreed.innerText = `${petData.TbAdpWaitAnimalView.row[i].BREEDS}`;
    petBreed.classList.add("pet-breed");

    const petInfo = document.createElement("p");
    petInfo.innerHTML = `${petData.TbAdpWaitAnimalView.row[i].INTRCN_CN}`;
    petInfo.classList.add("petInfo");
    petInfo.classList.add("hidden");

    const petDate = document.createElement("p");

    const petVideoContainer = document.createElement("div");
    petVideoContainer.classList.add("video-container");

    const petVideo = document.createElement("iframe");
    petVideo.setAttribute(
      "src",
      `https://www.youtube.com/embed/${petData.TbAdpWaitAnimalView.row[
        i
      ].INTRCN_MVP_URL.slice(-11)}`
    );
    petVideo.setAttribute("loading", "lazy");
    petVideo.setAttribute("width", "100%");
    petVideo.setAttribute("height", "100%");

    petVideoContainer.append(petVideo);

    const petImage = document.createElement("img");
    petImage.setAttribute(
      "src",
      `https://${petImgData.TbAdpWaitAnimalPhotoView.row[i].PHOTO_URL}`
    );
    petImage.setAttribute("loading", "lazy");
    petImage.setAttribute("width", "100%");
    petImage.setAttribute("height", "100%");

    petBadge.append(petBreed, petAge);

    listbox.append(
      petBadge,
      petName,
      petImage,
      moreButton,
      petInfo,
      petVideoContainer
    );
    listContainer.append(listbox);
  }
}

function getData() {
  return new Promise((resolve, reject) => {
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        resolve(data);
      });
  });
}

function getImgData() {
  return new Promise((resolve, reject) => {
    fetch(imgUrl)
      .then((response) => response.json())
      .then((data) => {
        resolve(data);
      });
  });
}

assignData();

// window.onload = function () {
//   fetch(
//     "http://openapi.seoul.go.kr:8088/78664b614370646a38324950724644/json/TbAdpWaitAnimalView/1/999/"
//   ).then((response) => response.json())
//   .then((data) => console.log(data.TbAdpWaitAnimalView.row))
// };

// console.log('petInfo', petInfo)

function openCard(event) {
  const petInfo = document.querySelector(".hidden");
  petInfo.classList.toggle("show");

  const moreButton = document.querySelector(".more-button");
  moreButton.innerHTML === "더보기"
    ? (moreButton.innerHTML = "숨기기")
    : (moreButton.innerHTML = "더보기");
}

let currentPage = 0;
let itemsPerPage = 5;

function showPage(page) {
  const startIndex = page * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  petCleandata.forEach((item, index) => {
    console.log(item);
    petCleandata.classList.toggle(
      "hidden",
      index < startIndex || index >= endIndex
    );
  });
  updateActiveButtonStates();
}


showPage()