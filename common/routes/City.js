import React from 'react';
import { connect } from 'dva';
import { Layout, Menu, Icon } from 'antd';

class City extends React.Component{
	constructor(props){
    super(props);
  	this.state={
  		
  	}
  	
	}
  componentDidMount(){
  	
  }
	render(){
	  return (
	    <div>城市ming sssssss</div>
	  )
  }
}

function mapStateToProps(state) {
  return {
    city:state.city
  };
}

export default connect(mapStateToProps)(City);
