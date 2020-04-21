window.onload = function () {
  var button = document.querySelector(".button");
  var inputValue = document.querySelector(".inputValue");
  var name = document.querySelector(".name");
  //name of class!
  var desc = document.querySelector(".desc");
  var temp = document.querySelector(".temp");
  var icon = document.querySelector(".icon");
  var today = document.querySelector(".today");
  var tomorrow = document.querySelector(".tomorrow");
  var afterTomorrow = document.querySelector(".afterTomorrow");

  /// define variables
  const iconElement = this.document.querySelector(".weather-icon1");
  const tempElement = this.document.querySelector(".temperature-value1 p");
  const descElement = this.document.querySelector(
    ".temperature-description1 p"
  );
  const locationElement = this.document.querySelector(".location1 p");
  const notificationElement = this.document.querySelector(".notification1");

  ///App data

  const weather = {};
  weather.temperature = { unit: "celsius" };
  const KELVIN = 273;

  //check if browser supports geolocation!

  if ("geolocation" in navigator) {
    navigator.geolocation.getCurrentPosition(setPosition, showError);
  } else {
    notificationElement.style.display = "block";
    notificationElement.innerHTML = "<p>Browser doesnt support Geolocation</p>";
  }

  /// Set user position!
  function setPosition(position) {
    let latitude = position.coords.latitude;
    let longitude = position.coords.longitude;

    getWeather(latitude, longitude);
  }
  // show error if there is any in geolocation service!!
  function showError(error) {
    notificationElement.style.display = "block";
    notificationElement.innerHTML = "<p>" + error.message + "</p>";
  }

  function getWeather(latitude, longitude) {
    let api =
      "https://api.openweathermap.org/data/2.5/weather?lat=" +
      latitude +
      "&lon=" +
      longitude +
      "&appid= !!!YOUR KEY!!!!";

    //console.log(api);

    fetch(api)
      .then(function (response) {
        let data = response.json();
        return data;
      })
      .then(function (data) {
        weather.temperature.value = Math.floor(data.main.temp - KELVIN);
        weather.description = data.weather[0].description;
        weather.iconId = data.weather[0].icon;
        weather.city = data.name;
        weather.country = data.sys.country;
      })
      .then(function () {
        displayWeather();
      });
  }
  //display weather geolocation!
  function displayWeather() {
    var iconurl1 = "http://openweathermap.org/img/w/" + weather.iconId + ".png";
    iconElement.innerHTML = "<img src='" + iconurl1 + "'/>";

    tempElement.innerHTML = weather.temperature.value + "°<span>C</span>";
    descElement.innerHTML = weather.description;
    locationElement.innerHTML = weather.city + "," + weather.country;
  }

  button.addEventListener("click", function () {
    fetch(
      "https://api.openweathermap.org/data/2.5/forecast?q=" +
        inputValue.value +
        "&appid=!!!YOUR KEY!!!!"
    )
      .then((response) => response.json())
      .then((data) => {
        var nameValue = data["city"]["name"] + "," + data.city["country"];
        var tempValue = data.list[0]["main"]["temp"];
        var descValue = data.list[0]["weather"][0]["description"];
        var iconcode = data.list[0]["weather"][0]["icon"];
        var iconurl = "http://openweathermap.org/img/w/" + iconcode + ".png";

        name.innerHTML = "Location:" + nameValue;
        temp.innerHTML =
          "<p> Today's temperature is:" +
          Math.round(300 - tempValue) +
          "°C</p>";
        desc.innerHTML = "Description:" + descValue;
        icon.innerHTML = "<img src='" + iconurl + "'/>";

        today.innerHTML =
          "<img src='" +
          iconurl +
          "'/>" +
          "\n" +
          "Description:" +
          descValue +
          "\n" +
          "<p> Today's temperature is:" +
          Math.round(300 - tempValue) +
          "°C</p>\n";

        var tempValue = data.list[1]["main"]["temp"];
        var descValue = data.list[1]["weather"][0]["description"];
        var iconcode = data.list[1]["weather"][0]["icon"];
        var iconurl = "http://openweathermap.org/img/w/" + iconcode + ".png";
        tomorrow.innerHTML =
          "<img src='" +
          iconurl +
          "'/>" +
          "\n" +
          "Description:" +
          descValue +
          "\n\n\n" +
          "<p> Tomorrow's temperature is:" +
          Math.round(300 - tempValue) +
          "°C</p>";
        var tempValue = data.list[2]["main"]["temp"];
        var descValue = data.list[2]["weather"][0]["description"];
        var iconcode = data.list[2]["weather"][0]["icon"];
        var iconurl = "http://openweathermap.org/img/w/" + iconcode + ".png";
        afterTomorrow.innerHTML =
          "<img src='" +
          iconurl +
          "'/>" +
          "\n" +
          "Description:" +
          descValue +
          "\n" +
          "<p> The day after tomorrow's temperature is:" +
          Math.round(300 - tempValue) +
          "°C</p>";
      })

      .catch((err) => alert("wrong city name!"));
  });
};

// console.log(data)
