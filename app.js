window.onload = function () {
  var button = document.querySelector(".button");
  var inputValue = document.querySelector(".inputValue");
  var name = document.querySelector(".name");
  //bere jmeno tridy!
  var desc = document.querySelector(".desc");
  var temp = document.querySelector(".temp");
  var icon = document.querySelector(".icon");

  //url + promise

  button.addEventListener("click", function () {
    fetch(
      "https://api.openweathermap.org/data/2.5/forecast?q=" +
        inputValue.value +
        "&appid=YourKey!!"
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
      })

      .catch((err) => alert("wrong city name!"));
  });
};

// console.log(data)
