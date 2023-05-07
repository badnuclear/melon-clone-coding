import { async } from "regenerator-runtime";
import Song from "../models/Song";
import { apiVideo } from "../youtubeApi";

//뮤직 리스트 db에 넣기
export const musicList = async (req, res) => {
  await Song.deleteMany({});
  const songs = await apiVideo();
  Song.insertMany(songs);
  console.log(songs);
  return res.send("<h1> Update </h1>");
};

export const home = async (req, res) => {
  try {
    const list = Song.find({}).sort({ views: -1 });
    return res.render("home", { pageTitle: "Home", list: list });
  } catch (error) {
    return res.render("Server Error");
  }
};
