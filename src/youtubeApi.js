//유튜브 API
const { google } = require("googleapis");

const youtube = google.youtube({
  version: "v3",
  auth: process.env.YOUTUBE_API,
});

export const apiVideo = async () => {
  const response = await youtube.videos.list({
    q: "HoneyComeBear",
    videoCategoryId: 10,
    part: "snippt",
    maxResults: 50,
  });
  console.log(response);
  if (response.statusText === "OK") {
    return response.data.items;
  }
  return [];
};

export default { apiVideo };
