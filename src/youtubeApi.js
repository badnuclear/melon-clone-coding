import { google } from "googleapis";
import Song from "./models/Song";
import express from "express";

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const youtube = google.youtube({
  version: "v3",
  auth: process.env.YOUTUBE_API,
});

export const musiChart = (req, res) => {
  const apiKey = process.env.YOUTUBE_API;

  youtube.playlistItems.list(
    {
      key: apiKey,
      part: "snippet",
      p: "HomeComeBear",
      maxResults: 50,
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
            artist: item.snippet.artist,
            thumbnails: item.snippet.thumbnails.default.url,
            views: 0,
          });
          playlistItem.save();
          console.log(playlistItem);
        });
        res.send("playlist save DB!");
      }
    }
  );
};
