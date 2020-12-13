import { StyleSheet } from 'react-native';
import theme from '../../constants/color';
import state from '../../services/state';

export default (themeState) =>
	StyleSheet.create({
		Image: {
			width: '100%',
			minHeight: 400,
			resizeMode: 'stretch',
		},
		title: {
			fontSize: 20,
			fontWeight: '700',
			color: theme[themeState].color,
			textAlign: 'center',
			margin: 20,
		},
		why: {
			fontSize: 20,
			fontWeight: '700',
			padding: 20,
			color: theme[themeState].color,
		},
		description: {
			padding: 20,
			color: theme[themeState].subTitle,
			lineHeight: 30,
		},
	});
