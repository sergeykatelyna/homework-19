import './style.scss';

fetch(
  'https://api.giphy.com/v1/gifs/trending?api_key=D4EUK5TYyx5bYrrOo6wYGFV91OvXIH4J&limit=10',
).then((res) => {
  res.json().then(({ data }) => {
    const gifContainerTag = document.querySelector('.gif-container');

    const originalGifArr = data.map((gifObj) => gifObj.images.original);

    const minHeight = Math.min(...originalGifArr.map((originalGif) => originalGif.height));
    document.styleSheets[0].insertRule(`.gif-container img { height: ${minHeight}px }`, 0);

    originalGifArr.forEach(({ url }) => {
      const gifTag = document.createElement('IMG');
      gifTag.src = url;
      gifContainerTag.append(gifTag);
    });

    console.log(originalGifArr);
  });
});
