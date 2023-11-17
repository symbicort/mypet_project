const url =
  "https://7u2pewyqfamnj67yy7dqg6z7li0pwqmg.lambda-url.ap-northeast-2.on.aws/";

const imgUrl =
  "https://zyj6almxtnnyfucg7mpesibneq0yospu.lambda-url.ap-northeast-2.on.aws/";

const itemsPerPage = 10;
let currentPage = 1;

async function assignData() {
  const listContainer = document.querySelector(".list");
  await loadItems(listContainer, currentPage);
  
  window.addEventListener("scroll", () => {
    if (isScrolledToBottom()) {
      currentPage++;
      loadItems(listContainer, currentPage);
    }
  });
}

async function loadItems(container, page) {
  const petData = await getData(page);

  // Check if petData is empty
  if (petData.length === 0) {
    // No more data, do not create additional listboxes
    return;
  }


  console.log(petData);

  const petImgData = await getImgData(page);

  for (let i = 0; i < petData.length; i++) {
    const listbox = document.createElement("div");
    listbox.classList.add("listbox");

    const moreButton = document.createElement("button");
    moreButton.classList.add("more-button");
    moreButton.setAttribute("onclick", "openCard()");
    moreButton.innerHTML = "더보기";

    const petName = document.createElement("h2");
    petName.innerText = `${petData[i].NM}`;

    const petBadge = document.createElement("div");
    petBadge.classList.add("pet-badge");

    const petAge = document.createElement("p");
    petAge.innerText = `${petData[i].AGE}`;
    petAge.classList.add("pet-age");

    const petBreed = document.createElement("p");
    petBreed.innerText = `${petData[i].BREEDS}`;
    petBreed.classList.add("pet-breed");

    const petInfo = document.createElement("p");
    petInfo.innerHTML = `${petData[i].INTRCN_CN}`;
    petInfo.classList.add("petInfo");
    petInfo.classList.add("hidden");

    const petDate = document.createElement("p");

    const petVideoContainer = document.createElement("div");
    petVideoContainer.classList.add("video-container");

    const petVideo = document.createElement("iframe");
    petVideo.setAttribute(
      "src",
      `https://www.youtube.com/embed/${petData[i].INTRCN_MVP_URL.slice(-11)}`
    );
    petVideo.setAttribute("loading", "lazy");
    petVideo.setAttribute("width", "100%");
    petVideo.setAttribute("height", "100%");

    petVideoContainer.append(petVideo);

    petBadge.append(petBreed, petAge);

    listbox.append(
      petBadge,
      petName,
      moreButton,
      petInfo,
      petVideoContainer
    );
    container.append(listbox);
  }
}

function getData(page) {
  const startIdx = (page - 1) * itemsPerPage + 1;
  const endIdx = startIdx + itemsPerPage - 1;

  return new Promise((resolve, reject) => {
    fetch(`${url}`)
      .then((response) => response.json())
      .then((data) => {
        resolve(data.TbAdpWaitAnimalView.row);
      });
  });
}

function getImgData(page) {
  const startIdx = (page - 1) * itemsPerPage + 1;
  const endIdx = startIdx + itemsPerPage - 1;

  return new Promise((resolve, reject) => {
    fetch(`${imgUrl}`)
      .then((response) => response.json())
      .then((data) => {
        resolve(data);
      });
  });
}

function isScrolledToBottom() {
  return (
    window.innerHeight + window.scrollY >=
    document.body.offsetHeight - 500
  );
}

assignData();
