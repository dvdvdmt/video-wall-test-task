const VIDEO_MAX_WIDTH = 480;
const VIDEO_MAX_HEIGHT = 270;

const getVideoIds = () => {
  const idsString = 'sw-l5SW5hik,2jSWMme12ik,p8npDG2ulKQ,pl-DjiO8das,CJRw18MtRPg,Wpm07-BGJnE,xf4iv4ic70M,6Q0AazVu1Tc,Xyb1fsPG-Xk,kG41zm8HGSE,RxvcH25WThg,df7PZIVe1lw,sYvH7Y16iUM,juTa0fPI22M,2KuqjW0WtZg,dKccvk36atQ,Duc3F700lgE,TI5bEf-BULU,sxyotaytAS0,UZ47aQFp2TQ,qD2yyikDcDw,O4_JNAFClFk,iJz5jURaEBc,RBbkCEHBw_I,CX11yw6YL1w';
  // Parse 'id' param, filter empty elements and left only unique ones 
  return Array.from(new Set(idsString.split(',')
    .filter(id => id)));
};

const stopAndHideAllActiveVideos = () => {
  const iframes = document.querySelectorAll('iframe');
  for(const i of iframes){
    i.contentWindow.postMessage('{"event":"command","func":"stopVideo","args":""}', '*');
  }
  
  const activeTiles = document.querySelectorAll('.video--active');
  for(const t of activeTiles){
    t.classList.remove('video--active');
  }
};

const handlePreviewImageClick = videoId => e => {
  stopAndHideAllActiveVideos();
  
  const tile = e.target.closest('.video');
  tile.classList.add('video--active');
  const iframe = tile.querySelector('iframe');
  if(!iframe.src) {
    iframe.src = `//www.youtube.com/embed/${videoId}?autoplay=1&enablejsapi=1&version=3`;
  }
};

const createPreviewImage = videoId => {
  const img = document.createElement('img');
  img.width = VIDEO_MAX_WIDTH;
  img.height = VIDEO_MAX_HEIGHT;
  img.src = `//i.ytimg.com/vi/${videoId}/hqdefault.jpg`;
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

const createTile = videoId => {
  const div = document.createElement('div');
  div.classList.add('video');

  div.appendChild(createPreviewImage(videoId));
  div.appendChild(createVideoPlayer());

  return div;
};

const renderVideos = rootSelector => {
  const root = document.querySelector(rootSelector);

  const videoIds = getVideoIds();

  for (const videoId of videoIds) {
    root.appendChild(createTile(videoId));
  }
};

document.addEventListener('DOMContentLoaded', e => {
  renderVideos('.container');
});