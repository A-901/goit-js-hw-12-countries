import './styles.css';
import fetchCountries from './components/js/countryFetch';
import PNotify from '../node_modules/pnotify/dist/umd/PNotify';
import countryPanel from './components/templates/countryPanel.hbs';
import countryList from './components/templates/countryList.hbs';
const debounce = require('lodash.debounce');


const refs = {
  countrylistSearch: document.querySelector('.list'),
  countryInput: document.querySelector('.input'),
};

function findCountry(e) {
  const inputValue = e.target.value;
  if (inputValue) {
    fetchCountries(inputValue).then(data => {
      if (data.length === 1) {
        refs.countrylistSearch.innerHTML = countryPanel(data[0]);
        return;
      } else if (data.length > 1 && data.length < 11) {
        refs.countrylistSearch.innerHTML = countryList(data);
        return;
      } else if (data.length >= 11) {
        PNotify.error({
          text: 'Too many matches found, enter more specific query',
          delay: 500,
        });
      }
    });
  }
  refs.countrylistSearch.innerHTML = '';
};

refs.countryInput.addEventListener('input', debounce(findCountry, 500));
