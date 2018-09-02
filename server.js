const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const app = express();
const port = process.env.PORT || 5000;
//custom imports
var {getWeather} = require('./server_files/getWeather')   //Don't know much about this, but it just works.

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
  let cookieValue = req.cookies.user_location;    //Saving the current cookie's value

  if(location==='' && cookieValue===undefined){       //If neither location provided nor it exists in cookies
    location=DEFAULT_LOCATION;
    console.log('USING DEFAULT LOCATION:'+location);  
  }
  else if(location==='' && cookieValue!== undefined){ //Cookie is present
    location = cookieValue;
    console.log('USING COOKIES LOCATION:'+cookieValue);
  }
  //res.clearCookie('user_location');             //If want to clear the cookie
  res.cookie('user_location',location);
  getWeather(location)
            .then((response)=>{
               res.send(response);
            })
            .catch((error)=>{
              res.sendStatus(404);
              console.log('ERROR IN GET:'+error)
            });
})


app.listen(port, () => console.log(`Listening on port ${port}`));
