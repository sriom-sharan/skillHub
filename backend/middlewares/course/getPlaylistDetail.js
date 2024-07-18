const axios = require('axios');
require("dotenv").config();

const YOUTUBE_API_KEY = process.env.YOUTUBE_API_KEY ;

async function getPlaylistDetail(playlistId) {
  try {
    const response = await axios.get(
      `https://www.googleapis.com/youtube/v3/playlistItems`,
      {
        params: {
          part: 'snippet',
          playlistId: playlistId,
          maxResults: 50,
          key: YOUTUBE_API_KEY,
        },
      }
    );
    return response.data.items;
  } catch (error) {
    console.error('Error fetching playlist items:', error);
    throw new Error('Failed to fetch playlist items');
  }
}

module.exports = { getPlaylistDetail };
