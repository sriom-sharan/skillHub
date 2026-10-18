const axios = require("axios");
require("dotenv").config();

const YOUTUBE_API_KEY = process.env.YOUTUBE_API_KEY;

async function getPlaylistDetail(playlistId) {
  if (!playlistId || typeof playlistId !== "string") {
    throw new Error("A valid YouTube playlist ID is required");
  }

  playlistId = playlistId.split("&")[0].trim();


  if (!YOUTUBE_API_KEY) {
    throw new Error("YOUTUBE_API_KEY is missing from environment variables");
  }

  try {
    const response = await axios.get(
      "https://www.googleapis.com/youtube/v3/playlistItems",
      {
        params: {
          part: "snippet",
          playlistId: playlistId.trim(),
          maxResults: 50,
          key: YOUTUBE_API_KEY,
        },
      }
    );

    return response.data.items;
  } catch (error) {
    console.error(
      "YouTube API Error:",
      JSON.stringify(error.response?.data ?? error.message, null, 2)
    );

    throw new Error("Failed to fetch playlist items");
  }
}

module.exports = { getPlaylistDetail };