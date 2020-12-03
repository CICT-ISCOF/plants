import React, { Component, FormEvent } from 'react';
import firebase from 'firebase';
import './index.css';

import toastr from 'toastr';

import BG from '../../assets/jan-sendereks.jpg';

import state from '../../services/state';
import { RouteComponentProps } from 'react-router-dom';
import routes from '../../routes';

type State = {
	email: string;
	password: string;
	processing: boolean;
};

export default class Auth extends Component<RouteComponentProps, State> {
	constructor(props: RouteComponentProps) {
		super(props);
		this.state = {
			email: '',
			password: '',
			processing: false,
		};
	}

	componentDidMount() {
		if (state.has('user')) {
			this.props.history.push(routes.DASHBOARD);
		}
	}

	async authenticate(e: FormEvent<HTMLFormElement>) {
		e.preventDefault();
		this.setState({ processing: true });
		const { email, password } = this.state;
		try {
			const response = await firebase
				.auth()
				.signInWithEmailAndPassword(email, password);
			state.set('id', response.user?.uid);
			state.set('user', response);
			toastr.success('Logged in successfully.');
			this.props.history.push(routes.DASHBOARD);
		} catch (error) {
			console.log(error.code, error.message);
			toastr.error(error.message);
		} finally {
			this.setState({ processing: false });
		}
	}

	render() {
		return (
			<div
				className='vh-100 d-flex'
				style={{ backgroundImage: `url(${BG})` }}
			>
				<div className='login-card align-self-center mx-auto text-white'>
					<h3 className='mt-4 text-center'>Welcome to Plants</h3>
					<div className='container pt-2'>
						<form onSubmit={(e) => this.authenticate(e)}>
							<div className='form-group'>
								<label htmlFor='email'>Email:</label>
								<input
									type='email'
									name='email'
									id='email'
									className={`form-control form-control-sm ${
										this.state.processing ? 'disabled' : ''
									}`}
									disabled={this.state.processing}
									placeholder='Email'
									onChange={(e) => {
										e.preventDefault();
										this.setState({
											email: e.target.value,
										});
									}}
									value={this.state.email}
								/>
							</div>
							<div className='form-group'>
								<label htmlFor='password'>Password:</label>
								<input
									type='password'
									name='password'
									id='password'
									className={`form-control form-control-sm ${
										this.state.processing ? 'disabled' : ''
									}`}
									disabled={this.state.processing}
									placeholder='Password'
									onChange={(e) => {
										e.preventDefault();
										this.setState({
											password: e.target.value,
										});
									}}
									value={this.state.password}
								/>
							</div>
							<div className='form-group'>
								<button
									type='submit'
									className={`btn btn-sm btn-primary ${
										this.state.processing ? 'disabled' : ''
									}`}
									disabled={this.state.processing}
								>
									{this.state.processing
										? 'Authenticating...'
										: 'Authenticate'}
								</button>
							</div>
						</form>
					</div>
				</div>
			</div>
		);
	}
}
