const search = document.querySelector('.input-search');
const body = document.querySelector('body');
const content = document.querySelector('#weather .content');

getWeatherAPI('tokyo');

search.addEventListener('keyup', (e) => {
    if (e.code === 'Enter') {
        let input = search.value.trim();
        getWeatherAPI(input);
    }
})

async function getWeatherAPI(input) {
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${input}&appid=e51172818216d96cace9a7dc78ea52dc
    `;
    let data = await fetch(url).then(res => res.json());
    changeWeatherUI(data);
}

function changeWeatherUI(data) {
    const city = document.querySelector('.name .city');
    const country = document.querySelector('.name .country');
    const dateTime = document.querySelector('.date-time');
    const value = document.querySelector('.value');
    const desc = document.querySelector('.desc');
    const visibility = document.querySelector('.more-desc .visibility span');
    const wind = document.querySelector('.more-desc .wind span');
    const sun = document.querySelector('.more-desc .sun span');

    if (data.cod === 200) {
        content.classList.remove('hide');

        data.name ? city.innerText = data.name : '';
        data.sys.country ? country.innerText = data.sys.country : '';
        dateTime.innerText = new Date().toLocaleString();
        let temp = Math.floor(data.main.temp - 273.15);
        data.main.temp ? value.innerText = temp : '';

        temp < 20 ? body.className = 'cold' : body.className = 'hot';
        
        data.getWeather ? desc.innerText = data.getWeather[0].main : '';
        data.visibility ? visibility.innerText = data.visibility + ' (m)' : '';
        data.wind ? wind.innerText = data.wind.speed + ' (m/s)' : '';
        data.main.humidity ? sun.innerText = data.main.humidity + ' (%)' : '';
    } else {
        content.classList.add('hide');
    }
}
