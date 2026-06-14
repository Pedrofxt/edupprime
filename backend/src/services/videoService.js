const prisma = require('../database/prismaClient');
const { getConfig } = require('../config');
const CloudflareStream = require('cloudflare-stream');

async function registerVideo({ titulo, descricao, duracao, url, thumbnail, provider }) {
  // provider: YOUTUBE | VIMEO | CLOUDFLARE | LOCAL
  const video = await prisma.video.create({
    data: { titulo, descricao, duracao: Number(duracao || 0), url, thumbnail, provider },
  });
  return video;
}

async function uploadToCloudflare(filePath) {
  // Placeholder: integration should upload file to Cloudflare Stream and return playback url
  // Using environment config if needed
  const cfg = getConfig();
  // Real implementation omitted here — return simulated response
  return { url: `https://watch.example.com/${Date.now()}`, thumbnail: '' };
}

async function findVideo(id) {
  return prisma.video.findUnique({ where: { id } });
}

async function listVideos() {
  return prisma.video.findMany();
}

module.exports = { registerVideo, uploadToCloudflare, findVideo, listVideos };
