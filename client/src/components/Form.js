import React, { Component } from 'react'
import axios from 'axios'

class Form extends Component {
    constructor(props){
        super(props);
        this.state={
            location:''
        }
    }
    handleChange=(e)=>{
        this.setState({location:e.target.value})
    }
    handleSubmit=(e)=>{
       // e.preventDefault();
        //console.log(this.state.location+' is to be posted');

        axios.post('/get_user_location',{
            location: this.state.location
        })
          .then(function (response) {
            console.log('Form:Posted');
          })
          .catch(function (error) {
            console.log(error);
          });
    }
  render() {
    return (
      <div>
          <form onSubmit={this.handleSubmit}>
              <input type='text' placeholder='Enter Location' onChange={this.handleChange}/>
              <button type='submit'>Submit</button>
          </form>
      </div>
    )
  }
}

export default Form;