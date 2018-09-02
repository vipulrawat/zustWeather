import React, { Component } from 'react';

import Form from './components/Form';
import Weather from './components/Weather';

class App extends Component {
  render() {
    return (
      <div className="container">
        <div className="main"> 
          <Weather/>
        </div>
        <div className="form">
          <Form/>
        </div>
      </div>
    );
  }
}

export default App;
