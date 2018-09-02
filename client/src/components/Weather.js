import React, { Component } from 'react'
import axios from 'axios'

//import Icon from './Icon';
import Loading from './Loading';
import Error from './Error';
import rain from './rain.png';
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
               <Loading/>
            </div>
        );
    }
    else{
        console.log(this.state.weatherData[0])
        return(
            <div className="weather">
                <div id="icon"><img src={rain}/></div>
                <div id="temperature">{this.state.weatherData[0].temperature}
                    <span>{this.state.weatherData[0].summary}</span>
                </div>
                <div id="location">{this.state.weatherData[1]}</div>
            </div>
        );
    }
  }
}

export default Weather;