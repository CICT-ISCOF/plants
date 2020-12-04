import React, { Component } from 'react';
import { Link, RouteComponentProps } from 'react-router-dom';
import routes from '../../routes';
import state from '../../services/state';
import firebase from 'firebase';

export default class Navbar extends Component<
	RouteComponentProps,
	{ email: string }
> {
	constructor(props: RouteComponentProps) {
		super(props);
		this.state = {
			email: state.has('user')
				? (state.get<firebase.auth.UserCredential>('user').user
						?.email as string)
				: '',
		};
	}

	logout() {
		firebase.auth().signOut();
		state.remove('user').remove('id');
		window.location.reload();
	}

	render() {
		return (
			<nav className='navbar navbar-expand-lg navbar-absolute fixed-top navbar-transparent'>
				<div className='container-fluid'>
					<div className='navbar-wrapper'>
						<div className='navbar-toggle'>
							<button type='button' className='navbar-toggler'>
								<span className='navbar-toggler-bar bar1'></span>
								<span className='navbar-toggler-bar bar2'></span>
								<span className='navbar-toggler-bar bar3'></span>
							</button>
						</div>
						<Link className='navbar-brand' to={routes.DASHBOARD}>
							Plants
						</Link>
					</div>
					<button
						className='navbar-toggler'
						type='button'
						data-toggle='collapse'
						data-target='#navigation'
						aria-controls='navigation-index'
						aria-expanded='false'
						aria-label='Toggle navigation'
					>
						<span className='navbar-toggler-bar navbar-kebab'></span>
						<span className='navbar-toggler-bar navbar-kebab'></span>
						<span className='navbar-toggler-bar navbar-kebab'></span>
					</button>
					<div
						className='collapse navbar-collapse justify-content-end'
						id='navigation'
					>
						<ul className='navbar-nav'>
							{state.has('user') ? (
								<li className='nav-item btn-rotate dropdown'>
									<a
										className='nav-link dropdown-toggle'
										href='/'
										id='navbarDropdownMenuLink'
										data-toggle='dropdown'
										aria-haspopup='true'
										aria-expanded='false'
									>
										<i className='nc-icon nc-circle-10'></i>
										<p>
											<span className='d-lg-none d-md-block'>
												{this.state.email}
											</span>
										</p>
									</a>
									<div
										className='dropdown-menu dropdown-menu-right'
										aria-labelledby='navbarDropdownMenuLink'
									>
										<a
											className='dropdown-item'
											href='/'
											onClick={(e) => {
												e.preventDefault();
												this.logout();
											}}
										>
											Logout
										</a>
									</div>
								</li>
							) : (
								<li className='nav-item btn-rotate dropdown'>
									<a
										className='nav-link dropdown-toggle'
										href='/'
										id='navbarDropdownMenuLink'
										data-toggle='dropdown'
										aria-haspopup='true'
										aria-expanded='false'
									>
										<i className='nc-icon nc-tile-56'></i>
										<p>
											<span className='d-lg-none d-md-block'>
												Menu
											</span>
										</p>
									</a>
									<div
										className='dropdown-menu dropdown-menu-right'
										aria-labelledby='navbarDropdownMenuLink'
									>
										<Link
											className='dropdown-item'
											to={routes.LOGIN}
										>
											Login
										</Link>
									</div>
								</li>
							)}
						</ul>
					</div>
				</div>
			</nav>
		);
	}
}
