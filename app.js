const getVideoIds = () => {
  const idsString = 'sw-l5SW5hik,2jSWMme12ik,p8npDG2ulKQ,pl-DjiO8das,CJRw18MtRPg,Wpm07-BGJnE,xf4iv4ic70M,6Q0AazVu1Tc,Xyb1fsPG-Xk,kG41zm8HGSE,RxvcH25WThg,df7PZIVe1lw,sYvH7Y16iUM,juTa0fPI22M,2KuqjW0WtZg,dKccvk36atQ,Duc3F700lgE,TI5bEf-BULU,sxyotaytAS0,UZ47aQFp2TQ,qD2yyikDcDw,O4_JNAFClFk,iJz5jURaEBc,RBbkCEHBw_I,CX11yw6YL1w';
  return idsString.split(',')
    .filter(id => id);
};

const createPreviewEl = videoId => {
  const WIDTH = 480;
  const HEIGHT = 270;
  const img = document.createElement('img');
  img.width = WIDTH;
  img.height = HEIGHT;
  img.src = `//i.ytimg.com/vi/${videoId}/hqdefault.jpg`
  return img;
};

const renderVideos = rootSelector => {
  const root = document.querySelector(rootSelector);
  const videoIds = getVideoIds();
  
  for(const videoId of videoIds){
    root.appendChild(createPreviewEl(videoId))
  }
};

document.addEventListener('DOMContentLoaded', e => {
  renderVideos('.videos');
});