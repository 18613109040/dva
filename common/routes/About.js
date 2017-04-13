import React from 'react';
import { Switch } from 'antd';
import "./App.css";
const About=({}) => {
  
  function onChange(checked){
  	console.log(`switch to ${checked}`);
	}
  return (
    <div> <Switch defaultChecked={false} onChange={onChange}/> </div>
  );
}



export default About;
