import React, { Component } from 'react';
import { Route, RouteComponentProps, Switch } from 'react-router-dom';
import routes from '../../routes';
import state from '../../services/state';
import Categories from '../Categories';
import Tips from '../Tips';
import Footer from './footer';
import Navbar from './navbar';
import Sidebar from './sidebar';

export default class Dashboard extends Component<RouteComponentProps> {
	async componentDidMount() {
		if (!state.has('user')) {
			this.props.history.goBack();
		}
	}

	path(url: string) {
		return `${this.props.match.path}${url}`;
	}

	render() {
		return (
			<div className='wrapper'>
				<Sidebar {...this.props} />
				<div className='main-panel' style={{ height: '100vh' }}>
					<Navbar />
					<div className='content'>
						<button
							className='btn btn-info btn-sm'
							onClick={(e) => {
								e.preventDefault();
								this.props.history.goBack();
							}}
						>
							Back
						</button>
						<hr className='my-3' />
						<Switch>
							<Route
								path={this.path(routes.CATEGORIES)}
								component={Categories}
							/>
							<Route
								path={this.path(routes.TIPS)}
								component={Tips}
							/>
						</Switch>
					</div>
					{/* <Footer /> */}
				</div>
			</div>
		);
	}
}
