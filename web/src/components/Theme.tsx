import React, { Component } from 'react';
import state from 'src/services/state';

type Theme = 'dark' | 'light';

interface State {
	theme: Theme;
}

export default class ThemeComponent extends Component<{}, State> {
	key = 0;

	constructor(props: {}) {
		super(props);
		this.state = {
			theme: state.get('theme'),
		};
	}

	componentDidMount() {
		this.key = state.listen<Theme>('theme', (theme) => {
			this.setState({ theme });
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
