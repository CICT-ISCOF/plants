import { StyleSheet } from 'react-native';
import theme from '../../../../constants/color';

export default (themeState) =>
	StyleSheet.create({
		image: {
			width: '100%',
			height: 200,
			margin: 20,
			resizeMode: 'stretch',
			alignSelf: 'center',
		},
		container: {
			width: '100%',
			position: 'absolute',
			bottom: 95,
			zIndex: 9,
			backgroundColor: theme[themeState].overlay,
			borderTopLeftRadius: 25,
			borderTopRightRadius: 25,
			padding: 10,
		},
		companions: {
			marginBottom: 10,
			height: 150,
			width: '100%',
		},
		title: {
			color: theme[themeState].color,
			fontSize: 16,
			margin: 20,
			borderBottomColor: 'yellow',
			borderBottomWidth: 3,
		},
		Good: {},
		Bad: {},

		plant: {
			height: 80,
			width: 80,
			flex: 1,
			margin: 15,
		},
		plantimg: {
			height: 80,
			width: 80,
			borderWidth: 2,
			borderColor: '#E75281',
			resizeMode: 'stretch',
			borderRadius: 50,
			marginBottom: -50,
		},
		plantname: {
			textAlign: 'center',
			color: theme[themeState].color,
			fontSize: 13,
			transform: [{ translateY: -25 }],
		},
	});
