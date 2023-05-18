import { google } from "googleapis";
import Song from "../models/Song";
import { async } from "regenerator-runtime";

//yutube API
const youtube = google.youtube({
  version: "v3",
  auth: process.env.YOUTUBE_API,
});
export const musiChart = (req, res) => {
  const apiKey = process.env.YOUTUBE_API;
  const playlistId = process.env.PLAYLIST_ID;
  youtube.playlistItems.list(
    {
      key: apiKey,
      part: "snippet",
      p: "HomeComeBear",
      playlistId,
      maxResults: 30,
    },
    (error, data) => {
      if (error) {
        console.log(error);
        res.status(500).send("Error is Youtube Api");
      } else {
        const playlistItems = data.data.items;

        playlistItems.forEach((item) => {
          const playlistItem = new Song({
            title: item.snippet.title,
            description: item.snippet.description,
            videoId: item.snippet.resourceId.videoId,
            thumbnails: item.snippet.thumbnails.default.url,
            views: 0,
          });
          playlistItem.save();
        });
      }
    }
  );
};
musiChart();
const getSong = async (req, res) => {
  try {
    const musics = await Song.find({}, { _id: 0 }).sort({ views: "desc" });
    return musics;
  } catch (error) {
    console.log(error);
    return res.render("Music Data not send");
  }
};

//home
export const home = async (req, res) => {
  try {
    const songs = await Song.find({ videoId: { $exists: true } }).limit(10);
    return res.render("home", {
      pageTitle: "Home",
      data: songs,
      musics: await getSong(),
    });
  } catch (error) {
    console.log(error);
    return res.render("Server Error");
  }
};
