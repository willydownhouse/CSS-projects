'use strict';

//261

const box = document.querySelector('.box');
const url =
  'https://images.pexels.com/photos/8210512/pexels-photo-8210512.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500';

const url2 =
  'https://images.pexels.com/photos/7363341/pexels-photo-7363341.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500';

const createImage = url => {
  return new Promise((resolve, reject) => {
    console.log('creating image');
    const img = document.createElement('img');

    img.src = url;

    img.addEventListener('load', () => {
      console.log('image loaded');
      box.appendChild(img);
      resolve(img);
    });

    img.addEventListener('error', () => {
      reject(new Error('Error loading image'));
    });
  });
};

// createImage(url)
//   .then(() => wait(2))
//   .then(() => {
//     box.innerHTML = '';
//     return wait(2);
//   })
//   .then(() => createImage('ddsadsad'))
//   .then(() => wait(2))
//   .then(() => (box.innerHTML = ''))
//   .catch(err => console.log(err));

const renderImages = async () => {
  try {
    await createImage(url);
    await wait(2);
    box.innerHTML = '';
    await wait(2);
    await createImage(url2);
    await wait(2);
    box.innerHTML = '';
  } catch (err) {
    console.log(err, `💥💥💥`);
  }
};

//renderImages();

function wait(seconds) {
  return new Promise(resolve => {
    setTimeout(resolve, seconds * 1000);
  });
}

const Bike = function (name, price) {
  this.name = name;
  this.price = price;
};

const jopo = new Bike('jopo', 299);

Bike.prototype.ride = function () {
  console.log(`I am riding my ${this.name} bike`);
};

jopo.ride();
console.log(jopo.__proto__.hasOwnProperty('ride'));

console.log(jopo);
