import React, { Component } from 'react'
import rain from './rain.png';

export default class Icon extends Component {
    constructor(props){
        super(props);
        this.state={
            icon:''
        }
    }
    componentDidMount(){
        this.setState({icon:this.props.icon});
    }
  render() {
    if(this.state.icon==="rain"){
        return(
            <div>
                <img src={rain}/>
            </div>
        );

    }
  }
}
