const express = require("express");
const https = require("https");
const app = express();
app.use(express.static("public"));

const bodyParser = require("body-parser");
const { error } = require("console");
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  console.log("get method called");
  res.sendFile(__dirname + "/index.html");
});

app.post("/", (req, res) => {
  console.log("post method called");

  const CitySearched = req.body.cityName;
  const url_api =
    "https://api.openweathermap.org/data/2.5/weather?q=" +
    CitySearched +
    "&appid=bbde3cc20f37d6c576ef76bf7ae7539b";

  https.get(url_api, (response) => {
    response.on("data", (data) => {
      const weatherData = JSON.parse(data);
      const temp = (weatherData.main.temp - 273.15).toFixed(2);
      const weatherDescription = weatherData.weather[0].description;
      const Humidity = weatherData.main.humidity;
      const windSpeed = weatherData.wind.speed;
      const countryName = weatherData.sys.country;
      //       var weatherImg= weatherData.weather[0].description;

      //       const bodyElement = document.getElementById("body");

      //       if(weatherImg.includes('clouds')){
      //        res.write( 'bodyElement.style.backgroundColor="linear-gradient(135deg, #808080 0%, #363636 100%)";');
      // }else if(weatherImg.includes('rain')){
      //         weatherImg = 'rainy';

      //         res.write('bodyElement.style.backgroundColor = "linear-gradient(135deg, #808080 0%, #363636 100%)";')
      //       }
      //       else if(weatherImg.includes('clear')){
      //         res.write('bodyElement.style.backgroundColor = "linear-gradient(135deg, #FFA500 0%, #FF4500 100%);";')
      //       }
      //       else if(weatherImg.includes('snow')){
      //         res.write('bodyElement.style.backgroundColor = "linear-gradient(135deg, #808080 0%, #363636 100%)";')
      //       }

      // Check weather City name exist or not

      // if(url_api.statusCode >= 230){
      //   res.write('<h1>City not found</h1>');
      //   res.send();
      // }

      // Handle error or city not found case

      res.write(
        `  
      <head><meta charset="utf-8"><title>Weather App</title>
      <link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Headland+One&family=Josefin+Slab:ital,wght@1,600&family=Merriweather:ital,wght@0,300;0,400;0,700;1,300;1,400;1,700;1,900&family=Montserrat:ital,wght@0,300;0,400;0,500;0,600;1,300&family=Open+Sans:ital,wght@0,300;0,400;0,700;1,300;1,600;1,700&family=Sacramento&display=swap" rel="stylesheet">
      <style> 
      *{
        margin: 0;
        padding: 0;
    }
    
    body {

         font-family: 'Headland One', serif;
        display: flex;
        justify-content: center;
        align-items: center;
        height: 100vh;
       margin 0;
   
        background: linear-gradient(135deg, #87CEEB 0%, #1E90FF 100%);
        /* set width to 300px of background image and no repeat */
       
        }
        /* to make header top of screen */
header{
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    padding: 0em;
    text-align: center;
    z-index: -1;
}
header>h1{
 font-family: 'Headland One', 'Sacramento', 'cursive';
  font-size: 3.2em;
  font-weight: 800;
  color: rgb(243, 217, 217);
}
    .card{
      margin-top: 2em;
       
        background-color: #000000b0 !important;
        color: #fff !important;
        box-shadow
    : 
    0
     
    2px
     
    4px
     
    rgba
    (
    0
    , 
    0
    , 
    0
    , 
    0.1
    );
    
        padding: 2em;
        border: 1px solid white;
        border-radius: 28px;
        width: 100%;
        max-width: 420px;
        margin: 1em;
    }
    h1
     {
      
    margin-bottom
    : 
    10px
    ;
      
    color
    : 
    #ffffff
    ;
    }
    
    form
     {
      
    margin-bottom
    : 
    20px
    ;
    }
    .search {
        display: flex;
        justify-content: center;
        align-items: center;
        margin: 0.5em;
        
    }
    h4{
      padding: 0.5em;
    }
    button{
        border: none;
        margin: 0.3em;
        /* padding: 0.1em; */
         background:#7c7c7c2b;
        color: #fff;
        height: 2.6em;
        width: 2.6em;
        border-radius: 50%;
        font-size: 1.2em;
        cursor: pointer;
        transition: 0.22s ease-in-out;
    }
    #country{
      font-size: 1.2em;
      font-weight: 700;
      color: #fff;
      // position: absolute;
      padding: 0 0 0 0.5em;
    }

    button:hover{
       
        background: #595757;
    }
    input.citySearched{
       border: none;
        outline: none;
        border-radius: 11px;
        padding: 0.45em;
        color: #fff;
        /* greyish */
        background:#494444a9;
        width: calc(100%-100px);
        font-size: 120%;
    
    }
              .weather-result {
                color: #fff;
              }
              
              .weather-description {
                color: #fff;
              }
              
              .humidity {
                color: #fff;
              }
              
              .windSpeed {
                color: #fff;
              }
            `
      );
      res.write("</style>");
      //   res.write(
      // '<style>*{margin:0;padding:0}body{font-family:\'Open Sans\',sans-serif;display:flex;justify-content:center;align-items:center;height:100vh;margin:0;background:#302f2f;position:relative;background-image:url(./images/pexels-johannes-plenio-1119974.jpg);background-size:1300px 630px;background-position:center;background-repeat:no-repeat}.card{background-color:#000000b0!important;color:#fff!important;padding:2em;border:1px solid white;border-radius:28px;width:100%;max-width:420px;margin:1em}.search{display:flex;justify-content:center;align-items:center;margin:.5em}button{border:none;margin:.3em;background:#7c7c7c2b;color:#fff;height:2.6em;width:2.6em;border-radius:50%;font-size:1.2em;cursor:pointer;transition:.22s ease-in-out}button:hover{background:#595757}input.citySearched{border:none;outline:none;border-radius:11px;padding:.45em;color:#fff;background:#494444a9;width:calc(100%-100px);font-size:120%}</style>'
      //   );
      res.write("</head>");
      res.write('<body id="body">');
      res.write("<header><h1>Weather App</h1></header> ");
      res.write('<div class="card">');
      res.write('<form action="/" method="POST">');
      res.write('<div class="search">');
      // res.write('<img src="./images/" alt="search icon">')
      res.write(
        '<input type="text" name="cityName" placeholder="Weather for city" class="citySearched">'
      );
      res.write(
        '<button type="submit" > <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 512 512">! Font Awesome Free 6.4.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc.<style>svg{fill:#ffffff}</style><path d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM288 176c0-44.2-35.8-80-80-80s-80 35.8-80 80c0 48.8 46.5 111.6 68.6 138.6c6 7.3 16.8 7.3 22.7 0c22.1-27 68.6-89.8 68.6-138.6zm-112 0a32 32 0 1 1 64 0 32 32 0 1 1 -64 0z"/></svg></button>'
      );
      res.write("</div>");
      res.write(' <div class="weather-at">');
      res.write(
        '<h2 h2 class="city"> Weather in ' +
          CitySearched +
          "<span id=country>" +
          countryName +
          "</span>" +
          "</h2><div><h1 >" +
          temp +
          " &deg;C </h1>"
      );
      res.write("</div>");
      res.write('<div class="gap">  ');
      // res.write('<i class="fa-regular fa-clouds"></i>');
      res.write(
        '<div class="weather-description description"><h4>The weather is currently ' +
          weatherDescription +
          "</h4></div>"
      );
      res.write(
        '<div class="humidity"><h4>Humidity: ' + Humidity + "%</h4></div>"
      );
      res.write(
        '<div class="windSpeed"><h4>Wind Speed: ' +
          windSpeed +
          "Km/Hour</h4></div>"
      );

      res.write("</form>");
      res.write("</div></body>");

      res.send();
    });
  });
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
