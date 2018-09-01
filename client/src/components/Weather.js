import React, { Component } from 'react'
import axios from 'axios'

import Error from './Error';

class Weather extends Component {
    constructor(props){
        super(props)
        this.state={
            isLoading:true,
            haveData:false,
            haveError:false,
            weatherData:[],
            err:{}
        }
    }
    componentDidMount(){
        var self = this; //brother of this :P
        axios.get('/get_weather')
          .then(function (response) {
            return response.data;
          })
          .then(function(data){
              self.setState({haveData:true,isLoading:false,weatherData:data});
              console.log(self.state.weatherData)
          })
          .catch(function (error) {
              if(error.response){
                  let errorObj={
                      code:error.response.status,
                      data:error.response.data
                  }
                  self.setState({haveError:true,isLoading:false,err:errorObj});
              }
              else{
                  console.log("NEW ERROR:"+error)
              }     
          });
    }
  render() {
    if(this.state.haveError===true){
        return (
            <div>
                <Error error={this.state.err}/>
            </div>
        )
    }
    else if(this.state.haveData===false && this.state.isLoading===false){    
        return(
            <div>
                <h3>No Location is set</h3>
            </div>
        );
    } 
    else if(this.state.isLoading===true){
        return(
            <div>
                Loading...
            </div>
        );
    }
    else{
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