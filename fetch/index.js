'use strict';

const section = document.querySelector('.section');
const form = document.querySelector('.form');
const nameInput = document.getElementById('name');
const errorText = document.querySelector('.error-text');
const render = document.querySelector('.render');

form.addEventListener('submit', e => {
  e.preventDefault();
  render.innerHTML = '';
  if (nameInput.value === '') {
    nameInput.classList.add('error');
    errorText.textContent = 'Required';
    return;
  }

  fetchCountries(nameInput.value);
  nameInput.value = '';
});

nameInput.addEventListener('input', e => {
  if (e.target.value.length > 0) {
    nameInput.classList.remove('error');
    errorText.textContent = '';
  }
});

section.addEventListener('click', e => {
  if (!e.target.closest('form')) {
    nameInput.classList.remove('error');
    errorText.textContent = '';
  }
});

function fetchCountries(country) {
  fetch(`https://restcountries.com/v3.1/name/${country}`)
    .then(res => res.json())
    .then(data => {
      console.log(data);
      renderCountry(data[0]);
    })
    .catch(err => {
      console.log(err);
    });
}

function renderCountry(country) {
  const html = ` <div>
    <h4 id="title">${country.name.common}</h4>
    <div>
        <img id="logo" width=200 src=${country.coatOfArms.png}/>
    </div>
</div>`;

  render.insertAdjacentHTML('beforeend', html);

  const logo = document.getElementById('logo');

  logo.classList.add('hide');

  logo.addEventListener('load', () => {
    logo.classList.remove('hide');
    logo.classList.add('show');
  });
}
