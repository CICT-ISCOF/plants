import React, { Component } from 'react';
import state from 'src/services/state';

export default class Theme extends Component {
	key = 0;

	componentDidMount() {
		this.key = state.listen<string>('theme', (theme) => {
			console.log(theme);
		});
	}

	componentWillUnmount() {
		state.unlisten('theme', this.key);
	}

	render() {
		// trigger
		state.set('theme', 'dark');
		return <div></div>;
	}
}
