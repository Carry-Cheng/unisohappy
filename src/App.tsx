
import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
// components
import Index from './views/Index/Index';
import Canvas from './views/Canvas/Canvas';
import Demo from './views/Demo/Demo';

export default class App extends Component {
	render() {
		return (
			<Router>
				<Route exact path="/" component={ Index }></Route>
				<Route exact path="/canvas" component={ Canvas }></Route>
				<Route exact path="/demo" component={ Demo }></Route>
			</Router>
		);
	}
}
