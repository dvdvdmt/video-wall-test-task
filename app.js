const VIDEO_MAX_WIDTH = 480;
const VIDEO_MAX_HEIGHT = 270;

const getVideoIds = () => {
  const url = new URL(location.href);
  const ids = url.searchParams.get('id');
  // Parse 'id' param, filter empty elements and left only unique ones 
  return ids ? Array.from(new Set(ids.split(',')
    .filter(id => id))) : [];
};

const stopAndHideAllActiveVideos = () => {
  const iframes = document.querySelectorAll('iframe');
  for (const i of iframes) {
    i.contentWindow.postMessage('{"event":"command","func":"stopVideo","args":""}', '*');
  }

  const activeTiles = document.querySelectorAll('.video--active');
  for (const t of activeTiles) {
    t.classList.remove('video--active');
  }
};

const handlePreviewImageClick = videoId => e => {
  stopAndHideAllActiveVideos();

  const tile = e.target.closest('.video');
  tile.classList.add('video--active');
  const iframe = tile.querySelector('iframe');
  if (!iframe.src) {
    iframe.src = `//www.youtube.com/embed/${videoId}?autoplay=1&enablejsapi=1&version=3`;
  }
};

const createPreviewImage = videoId => {
  const img = document.createElement('div');
  img.classList.add('video__preview');
  img.style.backgroundImage = `url('//i.ytimg.com/vi/${videoId}/hqdefault.jpg')`;
  img.addEventListener('click', handlePreviewImageClick(videoId));
  return img;
};

const createVideoPlayer = () => {
  const iframe = document.createElement('iframe');
  iframe.width = VIDEO_MAX_WIDTH;
  iframe.height = VIDEO_MAX_HEIGHT;
  iframe.frameBorder = 0;
  iframe.allowFullscreen = true;

  return iframe;
};

const setVideoTitle = async (videoId, videoEl) => {
  const videoUrl = new URL(`http://www.youtube.com/watch?v=${videoId}`);
  const videoPreview = videoEl.querySelector('.video__preview');
  const defaultTitle = 'Cool video';
  try {
    const res = await fetch(`//noembed.com/embed?url=${videoUrl}`);
    const data = await res.json();
    videoPreview.title = data.title || defaultTitle;
    videoPreview.alt = videoPreview.title;
  } catch (e) {
    videoEl.title = defaultTitle;
  }
};

const createVideo = videoId => {
  const div = document.createElement('div');
  div.classList.add('video');

  div.appendChild(createPreviewImage(videoId));
  div.appendChild(createVideoPlayer());

  setVideoTitle(videoId, div);

  return div;
};

const renderVideos = rootSelector => {
  const root = document.querySelector(rootSelector);

  const videoIds = getVideoIds();

  for (const videoId of videoIds) {
    root.appendChild(createVideo(videoId));
  }
};

document.addEventListener('DOMContentLoaded', () => {
  renderVideos('.container');
});