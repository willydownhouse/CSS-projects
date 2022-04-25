'use strict';

//261

const box = document.querySelector('.box');
const url =
  'https://images.pexels.com/photos/8210512/pexels-photo-8210512.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500';

const url2 =
  'https://images.pexels.com/photos/7363341/pexels-photo-7363341.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500';

const createImage = url => {
  const img = document.createElement('img');

  img.src = url;

  img.addEventListener('load', () => {
    console.log('image loaded');
    img.style.opacity = 1;
    box.appendChild(img);
  });

  return new Promise((resolve, reject) => {
    resolve(img);
  });
};

createImage(url)
  .then(img => {
    console.log(img);
    setTimeout(() => {
      img.style.opacity = 0;
      console.log('img go away');
    }, 2000);
  })
  //.then(img => console.log('second img', img))
  .catch(err => console.log(err));
