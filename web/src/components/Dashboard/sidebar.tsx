import React, { Component } from 'react';
import { Link, RouteComponentProps } from 'react-router-dom';
import routes from '../../routes';

export default class Sidebar extends Component<RouteComponentProps> {
	path(url: string) {
		return `${this.props.match.path}${url}`;
	}

	render() {
		return (
			<div
				className='sidebar'
				data-color='white'
				data-active-color='danger'
			>
				<div className='logo'>
					<Link
						to={routes.DASHBOARD}
						className='simple-text logo-normal'
					>
						Plants
					</Link>
				</div>
				<div className='sidebar-wrapper'>
					<ul className='nav'>
						<li>
							<Link to={this.path(routes.CATEGORIES)}>
								<i className='nc-icon nc-bookmark-2'></i>
								<p>Categories</p>
							</Link>
						</li>
						<li>
							<Link to={this.path(routes.PLANTS)}>
								<i className='nc-icon nc-tag-content'></i>
								<p>Plants</p>
							</Link>
						</li>
						<li>
							<Link to={this.path(routes.PESTS)}>
								<i className='nc-icon nc-planet'></i>
								<p>Pests</p>
							</Link>
						</li>
						<li>
							<Link to={this.path(routes.DISEASES)}>
								<i className='nc-icon nc-ambulance'></i>
								<p>Diseases</p>
							</Link>
						</li>
						<li>
							<Link to={this.path(routes.TIPS)}>
								<i className='nc-icon nc-alert-circle-i'></i>
								<p>Tips</p>
							</Link>
						</li>
						<li>
							<Link to={this.path(routes.PREPARATIONS)}>
								<i className='nc-icon nc-basket'></i>
								<p>Preparations</p>
							</Link>
						</li>
					</ul>
				</div>
			</div>
		);
	}
}
