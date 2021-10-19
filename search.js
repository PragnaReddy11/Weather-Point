let loc = document.getElementById("location");
let tempicon = document.getElementById("temp-icon");
let tempvalue = document.getElementById("temp-value");
let climate = document.getElementById("climate");
let iconfile;
const searchInput=document.getElementById("search-input");
const searchButton=document.getElementById("search-button");

const timeEl = document.getElementById('time');
const dateEl = document.getElementById('date');
const currentWeatherItemsEl = document.getElementById('current-weather-items');
const timezone = document.getElementById('time-zone');
const countryEl = document.getElementById('country');
const weatherForecastEl = document.getElementById('weather-forecast');
const currentTempEl = document.getElementById('current-temp');


const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

const API_KEY ='9d663059f5eff133fa6ea208c7bb6023';

setInterval(() => 
{
    const time = new Date();
    const month = time.getMonth();
    const date = time.getDate();
    const day = time.getDay();
    const hour = time.getHours();
    const hoursIn12HrFormat = hour >= 13 ? hour %12: hour
    const minutes = time.getMinutes();
    const ampm = hour >=12 ? 'PM' : 'AM'

    timeEl.innerHTML = (hoursIn12HrFormat < 10? '0'+hoursIn12HrFormat : hoursIn12HrFormat) + ':' + (minutes < 10? '0'+minutes: minutes)+ ' ' + `<span id="am-pm">${ampm}</span>`

    dateEl.innerHTML = days[day] + ', ' + date+ ' ' + months[month]

}, 1000);

searchButton.addEventListener('click', (e)=>
{
    e.preventDefault();
    getWeather(searchInput.value);
    searchInput.value='';
});

const getWeather = async (city)=>
{
    try
    {

        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=9d663059f5eff133fa6ea208c7bb6023`,
        );

        const weatherData = await response.json();
        console.log(weatherData);
        const{name}=weatherData;
        const{feels_like}=weatherData.main;
        const{id,main}=weatherData.weather[0];
        loc.textContent = name;
        climate.textContent = main;
        tempvalue.textContent=Math.round(feels_like-273);

        if(id<300 && id>200)
        {
            tempicon.src="images/thunderstorm.png"
        }
        else  if(id<400 && id>300)
        {
            tempicon.src="images/drizzle.png"
        }
        else if(id<600&& id>500)
        {
            tempicon.src="images/rainy.png"
        }
        else  if(id<700 && id>600)
        {
            tempicon.src="images/snow-flake.png"
        }
        else  if(id<800 && id>700)
        {
            tempicon.src="images/atmospheric-pollution.png"
        }
        else if(id==800)
        {
            tempicon.src="images/clear.png"
        }             
    }

    catch(error)
    {
        alert('city not found');
    }
};

window.addEventListener("load" ,()=>{

    let long;
    let lat;
    
    if(navigator.geolocation)
    {
    
        navigator.geolocation.getCurrentPosition((position)=>
        {
        
                long=position.coords.longitude;
                lat=position.coords.latitude;
        
                const api=`http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=9d663059f5eff133fa6ea208c7bb6023`
        
                fetch(api).then((response)=>{
        
                    return response.json();
        
                })
        
                .then (data =>
                {
        
                            const{name}=data;
                            const{feels_like}=data.main;
                            const{id,main}=data.weather[0];
        
        
                            loc.textContent=name;
                            climate.textContent=main;
                            tempvalue.textContent=Math.round(feels_like-273);
                            if(id<300 && id>200)
                            {
                                tempicon.src="images/thunderstorm.png"
                            }
                            else  if(id<400 && id>300)
                            {
                                tempicon.src="images/drizzle.png"
                            }
                            else if(id<600 && id>500)
                            {
                                tempicon.src="images/rainy.png"
                            }
                            else  if(id<700 && id>600)
                            {
                                tempicon.src="images/snow-flake.png"
                            }
                            else  if(id<800 && id>700)
                            {
                                tempicon.src="images/atmospheric-pollution.png"
                            }
                            else if(id==800)
                            {
                                tempicon.src="images/clear.png"
                            }
                            console.log(data);
                })
        }
    )}
    
})