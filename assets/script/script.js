window.onload = function() {


    var city_row = document.querySelector("#city-row");
    
    sample_city = ["Hong Kong", "Adelaide","Sydney","Seattle","Londan","Perth","melbourne","gold coast","brisbane","canberra"];
    baseURL = "http://api.openweathermap.org/geo/1.0/direct?q=";
    query = "&limit=1&appid=2abfa3b21cf857688674d3c35b5dc15a";

  // function getLocalStorage(){
  //   if
  // }

 var getFirstData = function(url){
    fetch(url)
    .then((response) => response.json())
    .then((data) => {
      var button = document.createElement("a");
      city_row.append(button);
      button.setAttribute("type","button");
      button.classList.add("btn");
      button.classList.add("btn-dark");
      button.classList.add("col-12");
      button.textContent = data[0].name;
      console.log(data);
      
    })
    .catch(err => console.error(err));
    
 }

 for (let index = 0; index < sample_city.length; index++) {
  const element = sample_city[index];
  var finalURL = baseURL + element + query;
  getFirstData(finalURL);
}

  }