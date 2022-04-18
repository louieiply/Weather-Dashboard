window.onload = function() {


    var city_row = document.querySelector("#city-row");
    var search_city = document.querySelector("#search");
    var search_input = document.querySelector("#city-search");
    var cityNdate = document.querySelector("#cityNdate");
    var weatherImg = document.querySelector("#penal_icon");
    var temp = document.querySelector("#temp");
    var wind = document.querySelector("#wind");
    var humidity = document.querySelector("#humidity");
    var uv = document.querySelector("#uv");
    var cards_row = document.querySelector("#cards-row");
    var sample_city;
    var search;
    var current_city = "";
    var counter = 0;
    let localStorageLength = 0;
    var current_lon = null;
    var current_lat = null;
    baseURL = "https://api.openweathermap.org/geo/1.0/direct?q=";
    query = "&limit=1&appid=2abfa3b21cf857688674d3c35b5dc15a";


    var CheckLocalStorage = async function(){
      if(localStorage.getItem("history") == null || localStorage.getItem("history") == ""){
          return;
        }
      else{
        sample_city = JSON.parse(localStorage.getItem("history"));
        localStorageLength = sample_city.length;
        for (let index = 0; index < sample_city.length; index++) {
          const element = sample_city[index];
          var finalURL = baseURL + element + query;
          await getFirstData(finalURL);
        }
      }
    }

      async function getFirstData(url){
       await fetch(url)
        .then((response) => { 
          console.log(response);
          return(response.json());})
        .then((data) =>  {
          console.log(data);
          if(data.length == ""){
            debugger;
            current_lon = null;
            current_lat = null;
            alert("Please check your input!!!"); 
          }
          else{
            debugger;
            var button = document.createElement("button");
            city_row.append(button);
            button.setAttribute("type","button");
            button.classList.add("btn");
            button.classList.add("btn-dark");
            button.classList.add("col-12");
            button.dataset.lon = data[0].lon;
            button.dataset.lat = data[0].lat;
            button.setAttribute("value",data[0].name);
            button.textContent = data[0].name;
            current_city =  data[0].name;
            current_lon = data[0].lon;
            current_lat = data[0].lat;
            button.addEventListener("click",function(e){
              e.stopPropagation();
              e.preventDefault();
              getDetailedData(e.target.dataset.lon,e.target.dataset.lat);
              current_city = e.target.value;
            });
            counter++;
            if(counter > localStorageLength){
              if(localStorage.getItem("history") == null || localStorage.getItem("history") == ""){
                var list = [data[0].name];
                localStorage.setItem("history",JSON.stringify(list));
              }
              else{
                var list = JSON.parse(localStorage.getItem("history"));
                list.push(data[0].name);
                console.log(list);
                localStorage.setItem("history",JSON.stringify(list));
              }
            }
          }
        })
        .catch(err => {
          console.log(err);
          
        });
        
      }


    async function getDetailedData(lon,lat){
      url = "https://api.openweathermap.org/data/2.5/onecall?lat="+ lat +"&lon="+ lon +"&units=metric&exclude=hourly,minutely&appid=2abfa3b21cf857688674d3c35b5dc15a"
      await fetch(url)
      .then((response) =>  (response.json()))
      .then((data) =>  {
        debugger;
        console.log(data);
        cityNdate.textContent = current_city;
        weatherImg.src = "http://openweathermap.org/img/wn/" + data.current.weather[0].icon + "@2x.png"; 
        temp.textContent = "Temp: " + data.current.temp +"°C";
        wind.textContent = "Wind: " + data.current.wind_speed;
        humidity.textContent = "Humidity: " + data.current.humidity + " %";
        uv.textContent = "UV Index: " + data.current.uvi;
        cardsCreate(data);
      })
      .catch(err => console.log(err));
    }



    function cardsCreate(data) {
      if(document.querySelectorAll(".card").length == ""){
        for (let index = 0; index < 5; index++) {
          debugger;
          var card = document.createElement("div");
          var card_body = document.createElement("div");
          var card_date = document.createElement("h5");
          var card_icon = document.createElement("img");
          var card_temp = document.createElement("h6");
          var card_wind = document.createElement("h6");
          var card_humidity = document.createElement("h6");
          card.classList.add("card");
          card.classList.add("col-2");
          card.classList.add("mx-1");
          card.classList.add("px-0");
          card.style.width = "10rem";
          cards_row.append(card);
          card_body.classList.add("card-body");
          card.append(card_body);
          card_date.id = "card"+"date"+index;
          let fullDate = new Date(data.daily[index].dt*1000);          
          card_date.textContent = fullDate.getDay()+"/"+fullDate.getMonth()+"/"+fullDate.getFullYear();
          card_date.classList.add("card-title");
          card_body.append(card_date);
          card_icon.id = "cardicon"+index;
          card_icon.src = "http://openweathermap.org/img/wn/" + data.daily[index].weather[0].icon + "@2x.png"; 
          card_body.append(card_icon);
          card_temp.id = "card"+"temp"+index;
          card_temp.textContent = "Temp: " + data.daily[index].temp.day +" °C";
          card_temp.classList.add("card-subtitle");
          card_temp.classList.add("my-3");
          card_temp.classList.add("text-muted");
          card_body.append(card_temp);
          card_wind.id = "card"+"wind"+index;
          card_wind.textContent = "Wind: " + data.daily[index].wind_speed + " MPH";
          card_wind.classList.add("card-subtitle");
          card_wind.classList.add("my-3");
          card_wind.classList.add("text-muted");
          card_body.append(card_wind);
          card_humidity.id = "card"+"humidity"+index;
          card_humidity.textContent ="UV Index: " + data.daily[index].humidity + " %";
          card_humidity.classList.add("card-subtitle");
          card_humidity.classList.add("my-3");
          card_humidity.classList.add("text-muted");
          card_body.append(card_humidity);
        }
      }
      else{
        for (let index = 0; index < 5; index++) {
          var carddate = document.querySelector("#carddate"+index);
          var cardtemp = document.querySelector("#cardtemp"+index);
          var cardwind = document.querySelector("#cardwind"+index);
          var cardicon = document.querySelector("#cardicon"+index);
          var cardhumidity = document.querySelector("#cardhumidity"+index);
          let fullDate = new Date(data.daily[index].dt*1000);      
          carddate.textContent = fullDate.getDay()+"/"+fullDate.getMonth()+"/"+fullDate.getFullYear();
          cardicon.src = "http://openweathermap.org/img/wn/" + data.daily[index].weather[0].icon + "@2x.png"; 
          cardtemp.textContent = "Temp: " + data.daily[index].temp.day +" °C";
          cardwind.textContent = "Wind: " + data.daily[index].wind_speed + " MPH";
          cardhumidity.textContent = "UV Index: " + data.daily[index].humidity + " %";
        }
      }
    }




      //constructor
     CheckLocalStorage();




     search_city.addEventListener("click", async function(e){
      debugger;
      e.preventDefault();
      e.stopPropagation();
      // console.log(JSON.stringify(search_input.value));
      if(search_input.value.replace(" ","") == ""){
        return;
      }
      else{
        search = search_input.value; 
        search_input.value = null;
        var finalUrl = baseURL+search+query;
        await getFirstData(finalUrl);
        debugger;
        if(current_lon !== null && current_lat !== null){
          debugger;
        await getDetailedData(current_lon,current_lat);
        }
      }

     });
     

}




  