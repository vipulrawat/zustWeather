import React, { Component } from 'react'

class Error extends Component {
    constructor(props){
        super(props);
        this.state={
            errorInfo:{}
        }
    }
    componentDidMount(){
        let err = this.props.error;
        this.setState({errorInfo:err});
    }
  render() {
    return (
      <div>
          <span>{this.state.errorInfo.code}</span>
          <p>{this.state.errorInfo.data}</p>
      </div>
    )
  }
}

export default Error;