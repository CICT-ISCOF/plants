import React, { Component } from 'react';

import {
	Appearance,
	AppearanceProvider,
	useColorScheme,
} from 'react-native-appearance';

import state from '../services/state';

setInterval(async () => {
	const mode = state.get<string>('theme');
	if (mode && mode === 'dark') {
		return await state.set('theme', 'light');
	}
	await state.set('theme', 'dark');
}, 5000);

export default {
	dark: {
		color: 'white',
		background: '#121212',
		headerBg: '#1B1B1B',
		footerBg: '#1B1B1B',
		footerActiveColor: '#78B56C',
		titleColor: 'white',
		subTitle: 'gray',
		overlay: 'rgba(50,50,50,.99)',
	},

	light: {
		color: 'black',
		background: 'white',
		headerBg: '#E2E2E9',
		footerBg: '#E2E2E9',
		footerActiveColor: '#E75281',
		titleColor: 'black',
		subTitle: 'gray',
		overlay: 'rgba(250,250,250,.8)',
	},

	themState: state.get('theme') || 'dark',
};

{
	/* <LinearGradient start={{x: 0, y: 0}} end={{x: 1, y: 0}} colors={['#4c669f', '#3b5998', '#192f6a']} style={styles.linearGradient}>
  <Text style={styles.buttonText}>
    Sign in with Facebook
  </Text>
</LinearGradient> */
}
