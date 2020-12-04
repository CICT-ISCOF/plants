import React, { Component } from 'react';
import { Route, RouteComponentProps, Switch } from 'react-router-dom';
import Form from './form';
import List from './list';

export default class Diseases extends Component<RouteComponentProps> {
	path(url: string) {
		return `${this.props.match.path}${url}`;
	}

	render() {
		return (
			<Switch>
				<Route path={this.path('/')} component={List} exact />
				<Route path={this.path('/add')} component={Form} />
				<Route path={this.path('/:id/edit')} component={Form} />
			</Switch>
		);
	}
}
