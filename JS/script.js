let place = document.querySelector('input[type = "text"]');
let btn = document.querySelector('.btn');
let container = document.querySelector('.down');
let name = document.getElementById('country');
let time = document.getElementById('time');
let date = document.getElementById('date');
let temperature = document.getElementById('temperature');
let icon = document.getElementById('icon');
let description = document.getElementById('description');
let info = document.querySelectorAll('.one span');
let p = document.querySelector('.up p');


place.addEventListener("keyup", function(event) {
  if (event.keyCode === 13) {
      event.preventDefault();
      btn.click();
  }
});

btn.addEventListener('click', show);

async function show() {
    let value = place.value;
    let params = new URLSearchParams({
        access_key: 'ad45641f14bf3cba5a35ef934961aa65',
        query: value,
        units: 'm'
    });
    
    let response =  await fetch(`https://api.weatherstack.com/current?${params}`);
    console.log(response);
    let result = await response.json();
    console.log(result);
    if(!result.error){
        p.style.display = 'none';
        let localtime = result.location.localtime.split(' ');
        let info_ = [
            `${result.current.wind_speed} Kmph`,
            `${result.current.precip} mm`,
            `${result.current.pressure} mb`,
            `${result.current.humidity}%`
        ]
        name.innerHTML = result.request.query;
        time.innerHTML = localtime[1].slice(0,2) > 12 ? 
            `${localtime[1]}<span>pm</span>`
            : `${localtime[1]}<span>am</span>`;
        date.innerHTML = localtime[0];
        temperature.innerHTML = `${result.current.temperature}<span>&#8451</span>`;
        icon.src = result.current.weather_icons[0];
        description.innerHTML = result.current.weather_descriptions[0];
        for(let i = 0 ; i < info.length ; i++){
            info[i].innerHTML = info_[i];
        }

        container.style.display = 'block';
    }else{
        container.style.display = 'none';
        p.style.display = 'block';
    }
}
