const express = require('express');
const axios = require('axios');
const bodyParser = require('body-parser');
const app = express();
const port = process.env.PORT || 5000;

const DarkSkySecret = "514a740933648faa7bc0b035ca65d0d7";
const GeocodeSecret = "AlIvxPnSWcxaa89nT5EL7HCDgoo7lrN8ax7PwVBEJBJdL2HYzj_cCVc0uujbINGu";

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

var location='';
app.get('/api/hello', (req, res) => {
 // let sample = JSON.parse(data);
    let url = 'https://dev.virtualearth.net/REST/v1/Locations?locality='+location+'&key='+GeocodeSecret;
    let wurl = 'https://api.darksky.net/forecast/'+DarkSkySecret+'/';
    axios.get(url)
      .then(function (response) {
      var data = {
        lat:'',
        long:''
      }
      data.lat=response.data.resourceSets[0].resources[0].geocodePoints[0].coordinates[0];
      data.long=response.data.resourceSets[0].resources[0].geocodePoints[0].coordinates[1];
      return data;
      })
      .then((data)=>{
        wurl+=data.lat+','+data.long+'?units=si';
        axios.get(wurl)
          .then(function(response){
            res.send([response.data.currently.temperature,response.data.currently.summary,location]);
          })
      })
      .catch(function (error) {
      console.log(error);
      });

});

app.post('/api/postLocation',(req,res)=>{
  location = req.body.location;
  console.log(location+' is successfully grabed by the server');
})

app.listen(port, () => console.log(`Listening on port ${port}`));
