import mongoose from "mongoose";

const songSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  videoId: { type: String, required: true },
  thumbnails: { type: String, required: true },
  views: { type: Number, default: 0, required: true },
});

const Song = mongoose.model("Song", songSchema);

export default Song;
