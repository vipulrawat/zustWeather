const config = require('./config');
const axios = require('axios');

var getWeather = async (location) => {
    let bingUrl = config.bing_url+location+'&key='+config.geocode_secret;
    let darkUrl = config.dark_sky_url+config.dark_sky_secret+'/';
    let coords = await axios.get(bingUrl)
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
        console.log('ERROR IN getWeather()>coords:'+error.response.status)
      })
      
      let weatherArray =   axios.get(darkUrl+coords.lat+','+coords.long+'?units=si')
                        .then((response)=>{
                          
                          return [response.data.currently,coords.place];
                        })
                        .catch((error)=>{
                          console.log('ERROR IN getWeather()>weatherArray:'+error.response.status)
                        })
      return weatherArray;
  }
  
module.exports.getWeather = getWeather;