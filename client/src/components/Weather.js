import React, { Component } from 'react'
import axios from 'axios'

class Weather extends Component {
    constructor(props){
        super(props)
        this.state={
            haveData:false,
            weatherData:[]
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
              console.log(self.state.weatherData)
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
                <p>LOCATION:{this.state.weatherData[1]}</p>
                <h2>{this.state.weatherData[0].temperature} &#x2103;</h2>
                <p>{this.state.weatherData[0].summary}</p>
            </div>
        );
    }
  }
}

export default Weather;