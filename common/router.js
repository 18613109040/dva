import React from 'react';
import { Router, Route ,IndexRoute} from 'dva/router';
import App from './routes/App';
import About from './routes/About';
import City from './routes/City'
if (typeof require.ensure !== 'function') {
  require.ensure = function(dependencies, callback) {
    callback(require)
  }
}
export const routes = (
  <div>
    <Route path='/' component={App}>
    	<Route path='/city' component={City}/>
    	<Route path='/about' component={About}/>
      /*<IndexRoute getComponent={
	           (nextState, callback)=>{
	             require.ensure([], (require) => {          
	               callback(null, require('./routes/About'))
	             }, 'about')
	          }
	    }/>
		
		  <Route path='city' getComponent={
           (nextState, callback)=>{
             require.ensure([], (require) => {          
               callback(null, require('./routes/City'))
             }, 'city')
          }
      } />*/
	  </Route>
  </div>
);

export default function({ history,app }) {
  return (
    <Router history={history}>
      {routes}
    </Router>
  );
}
