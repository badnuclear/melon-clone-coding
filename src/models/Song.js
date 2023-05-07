import mongoose from "mongoose";

const songSchema = new mongoose.Schema({
  videoId: { type: String, required: true },
  title: { type: String, required: true },
  artist: { type: String, required: true },
  coverImg: { type: String, required: true },
  views: { type: Number, default: 0, required: true },
});

const Song = mongoose.model("Song", songSchema);

export default Song;
