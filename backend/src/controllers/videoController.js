const { registerVideo, uploadToCloudflare, listVideos } = require('../services/videoService');

async function createVideoController(req, res, next) {
  try {
    if (req.file) {
      const uploaded = await uploadToCloudflare(req.file.path);
      const video = await registerVideo({ ...req.body, url: uploaded.url, thumbnail: uploaded.thumbnail, provider: 'CLOUDFLARE' });
      return res.status(201).json(video);
    }
    const video = await registerVideo({ ...req.body, provider: req.body.provider || 'LOCAL' });
    return res.status(201).json(video);
  } catch (error) {
    return next(error);
  }
}

async function listVideosController(req, res, next) {
  try {
    const videos = await listVideos();
    return res.json(videos);
  } catch (error) {
    return next(error);
  }
}

module.exports = { createVideo: createVideoController, listVideos: listVideosController };
