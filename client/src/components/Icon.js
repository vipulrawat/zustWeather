import React, { Component } from 'react'
import rain from './images/rain.png';
import clearday from './images/clear-day.png';
import clearnight from './images/clear-night.png';
import snow from './images/snow.png';
import sleet from './images/sleet.png';
import wind from './images/wind.png';
import fog from './images/fog.png';
import cloudy from './images/cloudy.png';
import partlycloudyday from './images/partlycloudyday.png';
import partlycloudynight from './images/partlycloudynight.png';
import alertIcon from './images/alert.png';

export default class Icon extends Component {
 
  render() {
    const url=this.props.ic;
    if(url === 'rain'){
        return(<div>
            <img src={rain} alt='rain'/>
        </div>);
    }else if(url === 'clearday'){
        return(<div>
            <img src={clearday} alt='clearday'/>
        </div>);
    }else if(url === 'clearnight'){
        return(<div>
            <img src={clearnight} alt='clearnight'/>
        </div>);
    }else if(url === 'snow'){
        return(<div>
            <img src={snow} alt='snow'/>
        </div>);
    }else if(url === 'sleet'){
         return(<div>
            <img src={sleet} alt='sleet'/>
        </div>);       
    }else if(url === 'wind'){
        return(<div>
            <img src={wind} alt='wind'/>
        </div>);
    }else if(url === 'fog'){
        return(<div>
            <img src={fog} alt='fog'/>
        </div>);
    }else if(url === 'cloudy'){
        return(<div>
            <img src={cloudy} alt='cloudy'/>
        </div>);
    }else if(url === 'partlycloudyday'){
        return(<div>
            <img src={partlycloudyday} alt='partlycloudyday'/>
        </div>);
    }else if(url === 'partlycloudynight'){
        return(<div>
            <img src={partlycloudynight} alt='partlycloudynight'/>
        </div>);
    }else{
        return(<div>
            <img src={alertIcon} alt='Something fishy!'/>
        </div>);
    }
  }
}
