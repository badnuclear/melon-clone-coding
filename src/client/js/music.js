import "./musicController";

//뮤직 플레이어 컨트롤러
const btn = document.querySelector(".btn");
const chartPlay = document.querySelector(".play");
const preBtn = document.getElementById("preBtn");
const playBtn = document.getElementById("playBtn");
const playIcon = document.querySelector(".playIcon");
const nextBtn = document.getElementById("nextBtn");

//뮤직 플레이어 속성
const title = document.querySelector(".title");
const coverImg = document.querySelector(".coverImg");

//유튜브 ifreme api 셋팅
//ifame 태그를 지정할 id 요소 지정
let player;
let firstMusicInfo = {};
//테스트용 videoId

//음악 넣기

const randomFirstMusic = () => {
  const randomMusic =
    window.musics[Math.floor(Math.random() * window.musics.length)];
  firstMusicInfo = randomMusic;
};
const youtubeApi = () => {
  window.onYouTubeIframeAPIReady = onYouTubeIframeAPIReady;
  const tag = document.createElement("script");
  tag.src = "https://www.youtube.com/iframe_api";
  const firstScriptTag = document.getElementsByTagName("script")[0];
  firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
};

function onYouTubeIframeAPIReady() {
  sessionStorage.setItem("willChangeMusicID", firstMusicInfo.videoId);
  player = new YT.Player("player", {
    width: "300",
    height: "300",
    videoId: firstMusicInfo.videoId,
    events: {
      onReady: onPlayerReady,
      onStateChange: onPlayerStateChange,
    },
    playerVars: {
      controls: 0,
      enablejsapi: 1,
      disablekb: 1,
      iv_load_policy: 3,
    },
  });
  randomFirstMusic();
}

function onPlayerReady(event) {}
function onPlayerStateChange() {}
//뮤직 컨트롤러

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
  const isMusicPaused = btn.classList.contains("paused");
  if (isMusicPaused) {
    playMusic();
  } else {
    pauseMusic();
  }
  playIcon.classList = isMusicPaused ? "fas fa-pause" : "fas fa-play";
}

///next,prev 버튼

///타임바

//add Event 리스너
playBtn.addEventListener("click", clickHandler);

///플레이 리스트

//api 실행
youtubeApi();
