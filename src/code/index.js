import './style.scss';


const RESOURCE = {
  url: 'https://api.giphy.com/v1/gifs/trending',
  apiKey: 'D4EUK5TYyx5bYrrOo6wYGFV91OvXIH4J',
  limit: '10',
};

const GIF_TYPE = 'original';

const GIF_CONTAINER_TAG = document.querySelector('.gif-container');


function setMinHeight(gifObjs, gifContainerTag) {
  const minHeight = Math.min(...gifObjs.map((gifObj) => gifObj.height));

  document.styleSheets[0].insertRule(
    `.${gifContainerTag.classList[0]} img { height: ${minHeight}px }`,
    0,
  );
}

function showGifs(gifObjs, gifContainerTag = {}) {
  setMinHeight(gifObjs, gifContainerTag);

  gifObjs.forEach(({ url }) => {
    const gifTag = document.createElement('IMG');
    gifTag.src = url;
    gifContainerTag.append(gifTag);
  });
}

function fetchGifs(resource = {}, gifType, gifContainerTag) {
  fetch(
    `${resource.url}?api_key=${resource.apiKey}&limit=${resource.limit}`,
  ).then((res) => {
    res.json().then(({ data }) => {
      const gifObjs = data.map((gifObj) => gifObj.images[gifType]);

      showGifs(gifObjs, gifContainerTag);

      console.log(gifObjs);
    });
  });
}


fetchGifs(RESOURCE, GIF_TYPE, GIF_CONTAINER_TAG);
