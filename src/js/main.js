import { key } from '../../docs/config.js';
const APIkey = key;

// AJAX import HTML file
fetch("../src/html/idea.html")
  .then(response => {
    return response.text()
  })
  .then(data => {
    document.querySelector('.idea').innerHTML = data;
  });

fetch("../src/html/trees.html")
  .then(response => {
    return response.text()
  })
  .then(data => {
    document.querySelector('.trees').innerHTML = data;
  });

fetch("../src/html/sunny.html")
  .then(response => {
    return response.text()
  })
  .then(data => {
    document.querySelector('.sunny').innerHTML = data;
  });


// MODELS
// MODELS - Search

class Search {
    constructor(query) {
        this.query = query;
    }

    async getWeather() {
        try{
            let url = null;

            if (location.protocol === 'http:') {
                url = `http://api.openweathermap.org/data/2.5/weather?q=${this.query}&APPID=${APIkey}`;
            } else {
                url = `https://api.openweathermap.org/data/2.5/weather?q=${this.query}&APPID=${APIkey}`;
            }

            let res = await fetch(url)
            let data = await res.json();

            this.name = data.name;
            this.temp = data.main.temp - 272.15;
            this.weatherInfo = data.weather[0].main;
            this.cod = data.cod;
        
        } catch (err) {
            console.log(err)
        }
    } 
} 

// VIEWS
// searchView

const input = document.querySelector('.input');
const weatherRes = document.querySelector('.results')
const result = document.querySelector('.results__temperature span');
const form = document.querySelector('.form');
const info = document.querySelector('.results__info p');
const infoTempHeight = document.querySelector('.temp-info');
const sectionResults = document.querySelector('.section-results');
const btn = document.querySelector('.check-weather');
const advice = document.querySelector('.advice');
const city = document.querySelector('.results__city p');

const getInput = () => input.value;
const clearInput = () => input.value = '';
const clearResult = () => result.innerHTML = '';
const renderResult = (data) => {
    const currentResult = Math.round(data * 10) /10
    result.textContent = currentResult + '°C'
}

const dateToday = () => {
    let today = document.querySelector('.date');
    let date = new Date();
    let day = date.getDate();

    let month = date.getMonth() + 1;
    let year = date.getFullYear();

    let d = day;
    let m = month;
    let y = year;

    if(d < 10) d = `0${d}`;
    if(m < 10) m = `0${m}`;
    if(y < 10) y = `0${y}`;

    today.textContent = `${d}.${m}.${y}`;
}

const showRes = () => {
    if(input.value === '') {
        input.placeholder = 'Musisz wpisać miasto';
        input.style.border = '4px solid red';
    } else {
        input.placeholder = 'Wpisz miasto';
        input.style.border = '4px solid transparent';
        weatherRes.classList.add('show-result');
        document.body.classList.add('change-bg');
        advice.classList.add('typingEffect');
        sectionResults.style.display = 'flex';
        input.style.width = '26rem';

        setTimeout(function(){
            weatherRes.classList.remove('show-result');
            document.body.classList.remove('change-bg');
            advice.classList.remove('typingEffect');
        }, 6500); 
    }
}

// SEARCH CONTROLLER

const state = {};

const controlSearch = async () => {
    // 1) Get query from view
    const query = getInput();

    if(query) {
        // 2) New search object and add to state
        state.search = new Search(query);
        // 3) Prepare UI for results
        clearInput();

        try{
            // 4) Search for results
            await state.search.getWeather();
            weatherRes.style.display = 'flex';
            // 5) Render results on UI
            city.textContent = query.toUpperCase();
            if(state.search.cod === 200) {
                renderResult(state.search.temp);
                let describe = state.search.weatherInfo;
                let weatherHeight = state.search.temp;
                switch(describe) {
                    case 'Thunderstorm' :
                        document.body.style.backgroundImage = "url('./img/thunderstorm.jpeg')";
                        info.textContent = 'Uważaj - burza'
                        break;
                    case 'Drizzle' :
                        document.body.style.backgroundImage = "url('./img/drizzle.jpeg')";
                        info.textContent = 'Może pojawić się mżawka'
                        break;
                    case 'Rain' :
                        document.body.style.backgroundImage = "url('./img/rain.jpeg')";
                        info.textContent = 'Nie zapomnij parasola'
                        break;
                    case 'Snow' :
                        document.body.style.backgroundImage = "url('./img/snow.jpeg')";
                        info.textContent = 'Na pewno pojawi się śnieg'
                        break;
                    case 'Mist' :
                        document.body.style.backgroundImage = "url('./img/mist.jpeg')";
                        info.textContent = 'Wystąpi lekkie zamglenie'
                        break;
                    case 'Smoke' :
                    document.body.style.backgroundImage = "url('./img/smoke.jpeg')";
                    info.textContent = 'Niebo może być zadymione'
                        break;
                    case 'Haze' :
                        document.body.style.backgroundImage = "url('./img/haze.jpeg')";
                        info.textContent = 'Uważaj na mgłę'
                        break;
                    case 'Dust' :
                        document.body.style.backgroundImage = "url('./img/dust.jpeg')";
                        info.textContent = 'Dzisiaj może wystąpić burza pyłu'
                        break;
                    case 'Fog' :
                        document.body.style.backgroundImage = "url('./img/fog.jpeg')";
                        info.textContent = 'Dzisiaj pojawi sie mgła'
                        break;
                    case 'Sand' :
                        document.body.style.backgroundImage = "url('./img/sand.jpeg')";
                        info.textContent = 'Uważaj na burzę piaskową'
                        break;
                    case 'Ash' :
                        document.body.style.backgroundImage = "url('./img/ash.jpeg')";
                        info.textContent = 'W powietrzu pojawi się popiół wulkaniczny'
                        break;
                    case 'Squall' :
                        document.body.style.backgroundImage = "url('./img/squall.jpeg')";
                        info.textContent = 'Dzisiaj pojawi się porywisty wiatr'
                        break;
                    case 'Tornado' :
                        document.body.style.backgroundImage = "url('./img/tornado.jpeg')";
                        info.textContent = 'Uważaj na tornado'
                        break;
                    case 'Clear' :
                        document.body.style.backgroundImage = "url('./img/clear.jpeg')";
                        info.textContent = 'Ciesz się przejrzystym niebem'
                        break;
                    case 'Clouds' :
                        document.body.style.backgroundImage = "url('./img/cloud.jpg')";
                        info.textContent = 'Mogą pojawić się chmury'
                        break;
                    default:
                        document.body.style.backgroundImage = "url('./img/start.jpeg')"; 
                }
                if(weatherHeight >= 20) {
                    infoTempHeight.textContent = 'temperatura będzie wysoka!'
                
                } else if (weatherHeight > 10 && weatherHeight < 20) {
                    infoTempHeight.textContent = ''
                } else {
                    infoTempHeight.textContent = 'temperatura będzie niska!'
                }
            } else {
                document.body.style.backgroundImage = "url('./img/start.jpeg')";
                result.textContent = 'Ups...';
                info.textContent = 'Niepoprawna nazwa miasta';
                infoTempHeight.textContent = 'Spróbuj jeszcze raz :)'
                advice.textContent = 'Znajdź swoje miasto :D :D :D'
            }

        } catch (err) {
            console.log('Something wrong...')
        }
    }
}

form.addEventListener('submit', e => {
    e.preventDefault();
    controlSearch();
});

btn.addEventListener('click', showRes)

window.addEventListener('load', dateToday)


