const express = require('express');
const https = require('https');
const app = express();
app.use(express.static('public'));

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

app.post('/', (req, res) => {
  const CitySearched = req.body.cityName;
  const url_api =
    'https://api.openweathermap.org/data/2.5/weather?q=' +
    CitySearched +
    '&appid=bbde3cc20f37d6c576ef76bf7ae7539b';

  https.get(url_api, (response) => {
    response.on('data', (data) => {
      const weatherData = JSON.parse(data);
      const temp = (weatherData.main.temp - 273.15).toFixed(2);
      const weatherDescription = weatherData.weather[0].description;
      const Humidity = weatherData.main.humidity;
      const windSpeed = weatherData.wind.speed;

      res.write('<head><meta charset="utf-8"><title>Weather App</title>');
      res.
      write
      (
      '<style>'
      );
            res.
      write
      (
      `
              * {
                margin: 0;
                padding: 0;
              }
              
              body {
                font-family: 'Open Sans', sans-serif;
                display: flex;
                justify-content: center;
                align-items: center;
                height: 100vh;
                margin: 0;
                background: #302f2f;
                position: relative;
                background-image: url(./images/pexels-johannes-plenio-1119974.jpg);
                background-size: 1300px 630px;
                background-position: center;
                background-repeat: no-repeat;
              }
              
              .container {
                background-color: #000000b0;
                color: #fff;
                padding: 2em;
                border: 1px solid white;
                border-radius: 28px;
                width: 100%;
                max-width: 420px;
                margin: 1em;
              }
              
              .search {
                display: flex;
                justify-content: center;
                align-items: center;
                margin: 0.5em;
              }
              
              .submit-button {
                border: none;
                margin: 0.3em;
                background: #7c7c7c2b;
                color: #fff;
                height: 2.6em;
                width: 2.6em;
                border-radius: 50%;
                font-size: 1.2em;
                cursor: pointer;
                transition: 0.22s ease-in-out;
              }
              
              .submit-button:hover {
                background: #595757;
              }
              
              .city-input {
                border: none;
                outline: none;
                border-radius: 11px;
                padding: 0.45em;
                color: #fff;
                background: #494444a9;
                width: calc(100% - 100px);
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
            res.
      write
      (
      '</style>'
      );
    //   res.write(
        // '<style>*{margin:0;padding:0}body{font-family:\'Open Sans\',sans-serif;display:flex;justify-content:center;align-items:center;height:100vh;margin:0;background:#302f2f;position:relative;background-image:url(./images/pexels-johannes-plenio-1119974.jpg);background-size:1300px 630px;background-position:center;background-repeat:no-repeat}.card{background-color:#000000b0!important;color:#fff!important;padding:2em;border:1px solid white;border-radius:28px;width:100%;max-width:420px;margin:1em}.search{display:flex;justify-content:center;align-items:center;margin:.5em}button{border:none;margin:.3em;background:#7c7c7c2b;color:#fff;height:2.6em;width:2.6em;border-radius:50%;font-size:1.2em;cursor:pointer;transition:.22s ease-in-out}button:hover{background:#595757}input.citySearched{border:none;outline:none;border-radius:11px;padding:.45em;color:#fff;background:#494444a9;width:calc(100%-100px);font-size:120%}</style>'
    //   );
      res.write('</head>');
      res.write('<body><div class="container">');
      res.write('<h1>Weather App</h1>');
      res.write('<form action="/" method="POST">');
      res.write(
        '<input type="text" name="cityName" placeholder="Enter City Name" class="citySearched">'
      );
      res.write('<button type="submit" class="search">Get Weather</button>');
      res.write('</form>');
      res.write('</div></body>');

      res.write(
        '<h1 class="weather-result">The temperature in ' +
          CitySearched +
          ' is ' +
          temp +
          ' degree celcius</h1>'
      );
      res.write(
        '<h2 class="weather-description">The weather is currently ' + weatherDescription + '</h2>'
      );
      res.write('<div class="humidity">Humidity: ' + Humidity + '</div>');
      res.write('<div class="windSpeed">Wind Speed: ' + windSpeed + '</div>');
      res.send();
    });
  });
});

app.listen(3000, () => {

  console.log('Server is running on port 3000');
});
