import React, { Component } from 'react';
import axios from 'axios';

import Form from './components/form';
class App extends Component {
  state={
    weather:[]
    //msg:''
  }
  componentDidMount(){
    axios.get('/api/hello')
      .then(res=>{
        console.log(res.data);
        const data = res.data;
        this.setState({weather:data});
      })
      .catch(function (error) {
        console.log(error);
        });
  }
  render() {
    return (
      <div className="container">
        <Form/>
        <div className="container">
          <h3>{this.state.weather[2]}</h3>
          <hr/>
          <p>Temperature:{this.state.weather[0]}</p>
        </div>
      </div>
    );
  }
}

export default App;
