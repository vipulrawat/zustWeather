const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios')
const app = express();
const port = process.env.PORT || 5000;
//custom imports
const config = require('./server_files/config');
//
var location='';

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

app.post('/get_user_location',(req,res)=>{
  console.log('POST form:sucess with '+req.body.location);
  location = req.body.location;
  res.redirect('/get_weather')
})
app.get('/get_weather',(req,res)=>{
  getCords(location)
            .then((response)=>{
               console.log('res:'+response.lat+':'+response.long);
               let obj={
                 lat:response.lat,
                 long:response.long,
                 loc:location
               }
               res.send(obj);
            });
})

var getCords = async function(location){
  //let url = config.bing_url+location+'&key'+config.geocode_secret;
  let url = 'https://dev.virtualearth.net/REST/v1/Locations?locality='+location+'&key=AlIvxPnSWcxaa89nT5EL7HCDgoo7lrN8ax7PwVBEJBJdL2HYzj_cCVc0uujbINGu';
  let data = await axios.get(url)
    .then((response)=>{
      var data = {
        lat:'',
        long:''
      }
      data.lat=response.data.resourceSets[0].resources[0].geocodePoints[0].coordinates[0];
      data.long=response.data.resourceSets[0].resources[0].geocodePoints[0].coordinates[1];
      return data;
    })
    .catch((error)=>{
      console.log(`error on getCords`)
    })
    return data;
}


app.listen(port, () => console.log(`Listening on port ${port}`));
