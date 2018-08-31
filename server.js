const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const axios = require('axios')
const app = express();
const port = process.env.PORT || 5000;
//custom imports
const config = require('./server_files/config');

var location='';
const DEFAULT_LOCATION='Delhi';

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(cookieParser());

app.post('/get_user_location',(req,res)=>{
  console.log('POST form:sucess with '+req.body.location);
  location = req.body.location;
  res.redirect('/get_weather')
})
app.get('/get_weather',(req,res)=>{
  let cookieValue = req.cookies.user_location;

  if(location==='' && cookieValue===undefined){       //If neither location is provided nor it exists in cookies
    location=DEFAULT_LOCATION;
    console.log('USING DEFAULT LOCATION:'+location);  
  }
  else if(location==='' && cookieValue!== undefined){ //Cookie is present
    location = cookieValue;
    console.log('USING COOKIES LOCATION:'+cookieValue);
  }
  //res.clearCookie('user_location');
  res.cookie('user_location',location);
  console.log('NEW COOKIE:'+req.cookies.user_location)
  getCords(location)
            .then((response)=>{
               res.send(response);
            })
            .catch((error)=>{
              console.log('ERROR IN GET:'+error)
            });
})

var getCords = async function(location){
  //let url = config.bing_url+location+'&key'+config.geocode_secret;
  let url = 'https://dev.virtualearth.net/REST/v1/Locations?locality='+location+'&key=AlIvxPnSWcxaa89nT5EL7HCDgoo7lrN8ax7PwVBEJBJdL2HYzj_cCVc0uujbINGu';
  let wurl = 'https://api.darksky.net/forecast/514a740933648faa7bc0b035ca65d0d7/';
  let coords = await axios.get(url)
    .then((response)=>{
      var data = {
        lat:'',
        long:'',
        place:''
      }
      data.lat=response.data.resourceSets[0].resources[0].geocodePoints[0].coordinates[0];
      data.long=response.data.resourceSets[0].resources[0].geocodePoints[0].coordinates[1];
      data.place=response.data.resourceSets[0].resources[0].name;
      return data;
    })
    .catch((error)=>{
      console.log('ERROR IN GETCORDS:'+error.response.status)
    })
    
    let weatherArray =   axios.get(wurl+coords.lat+','+coords.long+'?units=si')
                      .then((response)=>{
                        
                        return [response.data.currently,coords.place];
                      })
                      .catch((error)=>{
                        console.log('ERROR IN DARKSKY:'+error.response.status)
                      })
    return weatherArray;
}


app.listen(port, () => console.log(`Listening on port ${port}`));
