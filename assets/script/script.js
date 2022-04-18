window.onload = function() {


    var city_row = document.querySelector("#city-row");
    var search_city = document.querySelector("#search");
    var search_input = document.querySelector("#city-search");
    var cityNdate = document.querySelector("#cityNdate");
    var temp = document.querySelector("#temp");
    var wind = document.querySelector("#wind");
    var humidity = document.querySelector("#humidity");
    var uv = document.querySelector("#uv");

    var sample_city;
    var search;
    var history_Moreinfo = new Array();
    var current_city = "";
    var current_lon = 0;
    var current_lat = 0;
    var counter = 0;
    baseURL = "http://api.openweathermap.org/geo/1.0/direct?q=";
    query = "&limit=1&appid=2abfa3b21cf857688674d3c35b5dc15a";


    var CheckLocalStorage = function(){
      if(localStorage.getItem("history") == null || localStorage.getItem("history") == ""){
          return;
        }
      else{
        sample_city = JSON.parse(localStorage.getItem("history"));
        for (let index = 0; index < sample_city.length; index++) {
          const element = sample_city[index];
          var finalURL = baseURL + element + query;
          getFirstData(finalURL);
        }
      }
    }

      async function getFirstData(url){
       await fetch(url)
        .then((response) =>  {
          return(response.json())})
        .then((data) =>  {
          console.log(data);
          if(counter == 0){
            var button = document.createElement("button");
            city_row.append(button);
            button.setAttribute("type","button");
            button.classList.add("btn");
            button.classList.add("btn-dark");
            button.classList.add("col-12");
            button.setAttribute("value",data[0].name);
            button.textContent = data[0].name;
            current_city =  data[0].name;
            current_lon = data[0].lon;
            current_lat = data[0].lat;
 
            // var cell = {city:data[0].name, lat:data[0].lat,lon:data[0].lon};
            // history_Moreinfo.push(cell);
          }
        })
        .catch(err => {
          // console.log(err);
          
        });
        
      }


    async function getDetailedData(lon,lat){
      url = "https://api.openweathermap.org/data/2.5/onecall?lat="+ lat +"&lon="+ lon +"&units=metric&exclude=hourly,minutely&appid=2abfa3b21cf857688674d3c35b5dc15a"
      await fetch(url)
      .then((response) =>  (response.json()))
      .then((data) =>  {
        cityNdate.textContent = current_city;
        temp.textContent = "Temp: " + data.current.temp;
        wind.textContent = "Wind: " + data.current.wind_speed;
        humidity.textContent = "Humidity: " + data.current.humidity;
        uv.textContent = "UV Index: " + data.current.uvi;
        cardsCreate(data);
      })
      .catch(err => console.log(err));
    }


    function cardsCreate(data) {
      for (let index = 0; index < 5; index++) {
        const element = array[index];
        
      }
    }




      //constructor
     CheckLocalStorage();


     search_city.addEventListener("click",function(e){
      e.stopPropagation();
      console.log(JSON.stringify(search_input.value)); 
      if(search_input.value.replace(" ","") == ""){
        return;
      }
      else{
        search = search_input.value; 
        search_input.value = null;
        var finalUrl =baseURL+search+query;
        getFirstData(finalUrl);
        getDetailedData(current_lon,current_lat);
        
      }

     });
     

}




  