const https = require('https');
var data='';
function getDetails(){
    
https.get('https://dev.virtualearth.net/REST/v1/Locations?locality=rishikesh&key=AlIvxPnSWcxaa89nT5EL7HCDgoo7lrN8ax7PwVBEJBJdL2HYzj_cCVc0uujbINGu', (resp) => {
      
    resp.on('data', (chunk) => {
      data += chunk;
    });
  
    // The whole response has been received. Print out the result.
    resp.on('end', () => {
      console.log(JSON.parse(data));
    });
  
  }).on("error", (err) => {
    console.log("Error: " + err.message);
  });
}
getDetails();
exports.data=data;