import { google } from "googleapis";
import Song from "../models/Song";

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
            videoId: item.snippet.resourceId.videoId,
            title: item.snippet.title,
            description: item.snippet.description,
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

export const home = async (req, res) => {
  try {
    const songs = await Song.find({}).limit(10);
    return res.render("home", { pageTitle: "Home", data: songs });
  } catch (error) {
    return res.render("Server Error");
  }
};
