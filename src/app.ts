import axios from "axios";

const searchField = document.querySelector("input") as HTMLInputElement;
const searchButton = document.querySelector("button") as HTMLButtonElement;
const cityName = document.querySelector(".city-container") as HTMLDivElement;
const mainContainer = document.querySelector(".container") as HTMLDivElement;
const errorMessage = document.querySelector('.alert') as HTMLElement

let days: string[] = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday",];

interface weatherInt<T> {
  weather: string;
  src: T;
}

enum keyCodes {
  enter = 13,
}

let weatherImg: weatherInt<string>[] = [
  { weather: "clear sky", src: "/assets/clear-sky.png" },
  { weather: "few clouds", src: "/assets/few-clouds.png" },
  { weather: "scattered clouds", src: "/assets/scattered-clouds.png" },
  { weather: "broken clouds", src: "/assets/broken-clouds.png" },
  { weather: "shower rain", src: "/assets/shower-rain.png" },
  { weather: "rain", src: "/assets/rain.png" },
  { weather: "thunderstorm", src: "/assets/thunderstorm.png" },
  { weather: "snow", src: "/assets/snow.png" },
  { weather: "mist", src: "/assets/mist.png" },
  {weather: "overcast clouds", src: "/assets/few-clouds.png"},
  {weather: "light rain", src: "/assets/shower-rain.png"}
];

class Weather {cityName: string;
  weather: string;
  tempDegree: number;
  windSpeed: number;
  seaLevel: number;
  humidity: number;
  day: string;

  constructor(day: string, cityName: string,weather: string,tempDegree: number,windSpeed: number,seaLevel: number,humidity: number
  ) {
    this.cityName = cityName;
    this.weather = weather;
    this.tempDegree = tempDegree;
    this.windSpeed = windSpeed;
    this.seaLevel = seaLevel;
    this.humidity = humidity;
    this.day = day;
  }
  dispayData() {
    cityName.innerHTML = `<h1>${this.cityName}</h1>`;
    const main = document.createElement("main");

    window.addEventListener('keyup', (e)=> {
      if(e.keyCode === keyCodes.enter) main.remove()    
    }) 
    searchButton.addEventListener('click', ()=> {
      main.remove()
    })
    mainContainer.appendChild(main);
    main.innerHTML = `
      <div class="card">
            <div class="Date">${this.day}</div>
            <div class="img-container">
              <img src="" class="weatherImage">
              <p class="weatherText">${this.weather}</p>
              <h1>${String(~~(this.tempDegree - 273.15))}C°</h1>
            </div>
            <div class="grid-content">
              <div class="value-content">
                <p>Wind Now</p>
                <h1>${String(~~(this.windSpeed * 3.6))}kph</h1>
              </div>
              <div class="value-content">
                <p>Sea Level</p>
                <h1>${String(this.seaLevel)}hPA</h1>
              </div>
              <div class="value-content">
                <p>Humidity</p>
                <h1>${String(this.humidity)}%</h1>
              </div>
            </div>
          </div>
      `;
  }
}

const weatherAPI = async (city: string|null) => {
  return await axios
    .get(
      `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=e882a2abbf0750c5de17295ecb4b9c3d`
    )
    .then((response) => {
      let filteredWeatherData: any[] = [];

      for (let i = 0; i <= 32; i += 8) {
        errorMessage.innerHTML = ''
        const dateFormatAPI = response.data.list[i].dt_txt.split(/[\s,]+/)[0].split("-");
        const alignedDate: string = String([dateFormatAPI[1],dateFormatAPI[2],dateFormatAPI[0],])
          .replace(",", "-")
          .replace(",", "-");

        const date = new Date(alignedDate);

        const weather = new Weather(
          days[date.getDay()],
          response.data.city.name,
          response.data.list[i].weather[0].description,
          response.data.list[i].main.temp_max,
          response.data.list[i].wind.speed,
          response.data.list[i].main.sea_level,
          response.data.list[i].main.humidity
        );
        weather.dispayData();
        const currentWeather: any[] = weatherImg.filter(element => element.weather === response.data.list[i].weather[0].description)
        filteredWeatherData.push(currentWeather[0])
      }
      const weatherImage = document.querySelectorAll<HTMLImageElement>(".weatherImage");
      weatherImage.forEach((item, i) => {
        item.src = filteredWeatherData[i].src
      })
      filteredWeatherData = []
    })
    .catch(err => {
      cityName.innerHTML = ''
      errorMessage.innerHTML = 'Make sure, your inputed city is spelled correctly'
      console.log(err)
    });
};

const displayData = () => {
  if(searchField.value === '') return
  else weatherAPI(searchField.value);
  localStorage.setItem('city', searchField.value)
  searchField.value = ''
} 


window.addEventListener('keyup', (e)=> {
  if(e.keyCode === keyCodes.enter) displayData()    
}) 

searchButton.addEventListener('click', displayData)

window.addEventListener('load', () => {
  weatherAPI(localStorage.getItem('city'))
})