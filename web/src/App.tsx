import React, { Component } from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import 'toastr/build/toastr.css';
import './firebase';
import routes from './routes';
import Auth from './components/Auth';
import Dashboard from './components/Dashboard';

export default class App extends Component {
	render() {
		return (
			<Router>
				<Switch>
					<Route path={routes.HOME} exact component={Auth} />
					<Route path={routes.DASHBOARD} component={Dashboard} />
				</Switch>
			</Router>
		);
	}
}
