// Function to handle the city search
function searchCity(event) {
    event.preventDefault();
  
    // Get the city the user searched
    var city = document.getElementById("q").value;
  
    // Call the Geocoding API to get the coordinates
    fetch(
      `https://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=9b8a406e04a7c1156242da5d9838d553`
    )
      .then((response) => response.json())
      .then((data) => {
        // get latitude and longitude from the response
        var latitude = data[0].lat;
        var longitude = data[0].lon;
  
        // Call the Current Weather API
        fetch(
          `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=9b8a406e04a7c1156242da5d9838d553`
        )
          .then((response) => response.json())
          .then((data) => {
            // get the desired weather information
            var cityName = data.name;
            var date = new Date(data.dt * 1000).toLocaleDateString();
            var temperature = data.main.temp;
            var windSpeed = data.wind.speed;
            var humidity = data.main.humidity;
  
            // Create HTML elements for current day data
            var currentDayElement = document.getElementById("current-day");
            currentDayElement.innerHTML = ""; // Clear previous data
  
            var cityNameElement = document.createElement("h2");
            cityNameElement.textContent = cityName;
  
            var dateElement = document.createElement("p");
            dateElement.textContent = "Date: " + date;
  
            var temperatureElement = document.createElement("p");
            temperatureElement.textContent = "Temperature: " + temperature;
  
            var windElement = document.createElement("p");
            windElement.textContent = "Wind: " + windSpeed;
  
            var humidityElement = document.createElement("p");
            humidityElement.textContent = "Humidity: " + humidity;
  
            // Append the elements to the current day container
            currentDayElement.appendChild(cityNameElement);
            currentDayElement.appendChild(dateElement);
            currentDayElement.appendChild(temperatureElement);
            currentDayElement.appendChild(windElement);
            currentDayElement.appendChild(humidityElement);
          })
          .catch((error) => {
            console.log("Error fetching current weather:", error);
          });
  
        // Call the 5-Day Forecast API and populate the forecast
        // ... (code for fetching and populating the forecast data)
        // Call the 5-Day Forecast API and populate the forecast
        fetch(
            `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=9b8a406e04a7c1156242da5d9838d553&units=imperial`
          )
            .then((response) => response.json())
            .then((data) => {
              // Get the forecast list from the response
              var forecastList = data.list;
          
              // Select the forecast container element
              var forecastContainer = document.getElementById("five-day");
          
              // Clear the previous forecast data
              forecastContainer.innerHTML = "";
          
              // Check if forecast data is available
              if (forecastList && forecastList.length > 0) {
                // Loop through the forecast list
                for (var i = 0; i < forecastList.length; i++) {
                  // Get the forecast data for each day
                  var forecastData = forecastList[i];
                  var date = forecastData.dt_txt;
                  var temperature = forecastData.main.temp;
                  var humidity = forecastData.main.humidity;
          
                  // Create HTML elements for the forecast data
                  var forecastItem = document.createElement("div");
                  forecastItem.classList.add("col-2");
                  forecastItem.innerHTML = `
                    <p>Date: ${date}</p>
                    <p>Temperature: ${temperature}°C</p>
                    <p>Humidity: ${humidity}%</p>
                  `;
          
                  // Append the forecast item to the forecast container
                  forecastContainer.appendChild(forecastItem);
                }
              } else {
                // No forecast data available
                forecastContainer.innerHTML = "<p>No forecast data available</p>";
              }
            })
            .catch((error) => {
              console.log("Error fetching forecast:", error);
            });
          
  
      })
      .catch((error) => {
        console.log("Error fetching coordinates:", error);
      });
  }
  
  // Add event listener to the submit button
  var submitBtn = document.getElementById("search-form");
  submitBtn.addEventListener("submit", searchCity);
  
  
  