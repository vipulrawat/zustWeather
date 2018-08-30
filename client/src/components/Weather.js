import React, { Component } from 'react'
import axios from 'axios'

class Weather extends Component {
    constructor(props){
        super(props)
        this.state={
            haveData:false,
            weatherData:{}
        }
    }
    componentDidMount(){
        var self = this; //brother of this :P
        axios.get('/get_weather')
          .then(function (response) {
            return response.data;
          })
          .then(function(data){
              self.setState({haveData:true,weatherData:data});
          })
          .catch(function (error) {
            console.log(error);
          });
    }
  render() {
    if(this.state.haveData===false){
        return(
            <div>
                <h3>No Location is set</h3>
            </div>
        );
    }else{
        return(
            <div>
                <h3>Got something</h3>
                <p>LOCATION:{this.state.weatherData.loc}</p>
                <p>LATITUDE:{this.state.weatherData.lat}</p>
                <p>LONGITUDE:{this.state.weatherData.long}</p>
            </div>
        );
    }
  }
}

export default Weather;