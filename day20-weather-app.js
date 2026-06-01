const cityInput = document.getElementById("cityInput");
const searchBtn = document.getElementById("searchBtn");
const loading = document.getElementById("loading");
const error = document.getElementById("error");
const cityName = document.getElementById("cityName");
const temperature = document.getElementById("temperature");
const condition = document.getElementById("condition");
const weatherCard = document.getElementById("weatherCard");

function clearUI() 
{
cityName.textContent = ""; 
temperature.textContent = ""; 
condition.textContent = ""; 
weatherCard.style.display = "none";
}

async function getWeather() 
{ 
const city = cityInput.value.trim(); 
if (city === "") 
  { 
    clearUI(); 
    error.textContent = "Please enter city name"; 
    return; 
  } 

loading.textContent = "Loading..."; 
error.textContent = ""; 
clearUI(); 
try { 
const url = `https://wttr.in/${city}?format=j1`; 
const response = await fetch(url); 
if (!response.ok) 
  { 
  throw new Error("API Error"); 

} 
const data = await response.json(); 
cityName.textContent = city; 
temperature.textContent = `${data.current_condition[0].temp_C} °C`; 
condition.textContent = data.current_condition[0].weatherDesc[0].value; 
weatherCard.style.display = "block"; 
} 
catch (err) { 
  error.textContent = "Unable to fetch weather data"; 
  weatherCard.style.display = "none"; 

} 
finally { 
  loading.textContent = ""; 
}
}
searchBtn.addEventListener("click",getWeather);