import "./musicController";

//뮤직 플레이어 컨트롤러
const btn = document.querySelector(".btn");
const preBtn = document.getElementById("preBtn");
const playBtn = document.getElementById("playBtn");
const playIcon = document.querySelector(".playIcon");
const nextBtn = document.getElementById("nextBtn");

//뮤직 플레이어 속성
const title = document.querySelector(".title");
const coverImg = document.querySelector(".coverImg");
const currentTime = document.querySelector(".current-time");
const fullTime = document.querySelector(".full-time");
const timeBar = document.querySelector(".time-bar");
//유튜브 ifreme api 셋팅
//ifame 태그를 지정할 id 요소 지정
let player;
//테스트용 DB videoId
const dbList = [
  { title: "走馬灯", videoId: "cn2hSXelQ0M" },
  { title: "Revolver", videoId: "PGWXbXvwAgw" },
  { title: "夏の魔法", videoId: "wZAQvJmf1ps" },
  { title: "打上げ星", videoId: "V_gMTu3n4Mc" },
  { title: "Twilight", videoId: "M6EzdryDBdM" },
  { title: "IDOL", videoId: "x13D_e46yhs" },
  { title: "Calling", videoId: "88JxCif5a34" },
  { title: "Friend", videoId: "jGNb318jBu4" },
  { title: "Colorful", videoId: "7tqi-MVRtI0" },
  { title: "リメンバー", videoId: "aa6CsEcZfUg" },
];

//음악 넣기
const currentMusic = dbList;

const youtubeApi = () => {
  window.onYouTubeIframeAPIReady = onYouTubeIframeAPIReady;
  const tag = document.createElement("script");
  tag.src = "https://www.youtube.com/iframe_api";
  const firstScriptTag = document.getElementsByTagName("script")[0];
  firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
};

function onYouTubeIframeAPIReady() {
  player = new YT.Player("player", {
    width: "0",
    height: "0",
    events: {
      onReady: onPlayerReady,
      onStateChange: onPlayerStateChange,
    },
    playerVars: {
      controls: 1,
      enablejsapi: 1,
    },
  });
}
// 맨 첫번째 뮤직

function onPlayerReady(event) {}
//뮤직 컨트롤러
let currentIndex = -1;
let nextShuffled = false;
let playing = "none";
let currentVideoId = "none";

///재생/일시정지

const playMusic = () => {
  btn.classList.remove("paused");
  player.playVideo();
};
const pauseMusic = () => {
  btn.classList.add("paused");
  player.pauseVideo();
};
function clickHandler() {
  let isMusicPaused = btn.classList.contains("paused");
  if (isMusicPaused) {
    playMusic();
  } else {
    pauseMusic();
  }
  playIcon.classList = isMusicPaused ? "fas fa-pause" : "fas fa-play";
}

let preiousIndex = 0;
///next,prev 버튼

function playPlayer() {
  playing = currentMusic[currentIndex];
  currentVideoId = playing.videoId;
  player.loadVideoById(currentVideoId);
  coverImg.style.backgroundImage = `url(https://i.ytimg.com/vi/${playing.videoId}/default.jpg)`;
  console.log(playing.thumbnails);
  updateCoverImg();
  title.textContent = playing.title;
}
function nextHander() {
  preiousIndex = currentIndex;
  if (!nextShuffled) {
    if (currentIndex == currentMusic.length - 1) {
      if (repeatMode === "playlistRepeat") {
        currentIndex = 0;
      } else {
        currentIndex = 0;
      }
    } else {
      currentIndex = currentIndex + 1;
    }
  } else {
    do {
      currentIndex = Math.floor(Math.random() * (currentMusic.length - 1));
    } while (currentIndex === preiousIndex);
  }
  playPlayer();
}
function preHander() {
  if (!nextShuffled) {
    if (currentIndex != 0) {
      currentIndex = currentIndex - 1;
    }
  } else {
    currentIndex = preiousIndex;
  }
  playPlayer();
}
///타임바
function onPlayerStateChange() {}

//이미지 업데이트
let currentCoverUrl = "";
function updateCoverImg() {
  playing = currentMusic[currentIndex];
  currentCoverUrl = playing.videoId;
  const covers = document.querySelectorAll(".player .coverImg");
  covers.forEach((cover) => {
    cover.style.backgroundImage = `url(https://i.ytimg.com/vi/${currentCoverUrl}/default.jpg)`;
  });
}

//add Event 리스너
preBtn.addEventListener("click", preHander);
playBtn.addEventListener("click", clickHandler);
nextBtn.addEventListener("click", nextHander);

///플레이 리스트

//api 실행
youtubeApi();
