import React, { Component } from 'react'
import axios from 'axios';

class form extends Component {
    constructor(props){
        super(props);
        this.state={
            location:''
        }
        this.handleChange=this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleChange(e){
        this.setState({location:e.target.value});
    }
    handleSubmit(e){
        //e.preventDefault();
        axios.post('/api/postLocation', {
            location: this.state.location
          })
          .then(function (response) {
            console.log(response);
          })
          .catch(function (error) {
            console.log(error);
          });
    }
  render() {
    return (
      <div className="container">
        <form name="location-form" className="form-inline" onSubmit={this.handleSubmit}>
            <div className="form-group mb-2">
                <input type="text" className="form-control" id="location" placeholder="Enter location" onChange={this.handleChange}/>
            </div>
            <button type="submit" className="btn btn-primary mb-2">Confirm</button>
        </form>
      </div>
    )
  }
}

export default form;