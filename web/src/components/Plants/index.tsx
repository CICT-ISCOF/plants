import React, { Component } from 'react';
import { Link, Route, RouteComponentProps, Switch } from 'react-router-dom';
import routes from '../../routes';
import Form from './form';
import List from './list';

export default class Plants extends Component<RouteComponentProps> {
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
