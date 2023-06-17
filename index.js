const response = require('express');
const express = require('express');
const https = require('https');
// const { url } = require('inspector');
const app = express();
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: true}));
app.get('/', (req, res) => {

    res.sendFile(__dirname+'/index.html')
    
});
// const apikeys  =
app.post('/', (req, res) => {
    const CitySearched = req.body.cityName;
    const url_api = 'https://api.openweathermap.org/data/2.5/weather?q='+CitySearched+'&appid=bbde3cc20f37d6c576ef76bf7ae7539b';
    https.get(url_api, (response) => {
        // console.log(response.statusCode);
        response.on('data', (data) => {
            // console.log(data);
            const weatherData = JSON.parse(data);
            // console.log(weatherData);
            const temp = (weatherData.main.temp-273.15).toFixed(2);
                 // console.log(temp);
            const weatherDescription = weatherData.weather[0].description;
            // console.log(weatherDescription);

            // Sending to our local server

            // res.send('<h1>The temperature in London is ' + temp + ' degree celcius</h1>'
            //     + '<h2>The weather is currently ' + weatherDescription + '</h2>');
            // we can write more than one line if we use res.write

            res.write('<h1>The temperature in ' + CitySearched+ ' is ' + temp + ' degree celcius</h1>');
            res.write('<h2>The weather is currently ' + weatherDescription + '</h2>');
            // res.write('<img src=' + weatherData.weather[0].icon + '>');

        });
    
    });
    // res.send('Welcome to my API \n Checking for server restart');

});
    





// app.post('/', (req, res) => {
//     console.log('Post request received');
//     console.log(req.body.cityName);

// });



app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
