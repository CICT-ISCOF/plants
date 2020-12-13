import { StyleSheet } from 'react-native';
import theme from '../../../constants/color';

export default (themeState) =>
	StyleSheet.create({
		secondHeader: {
			flexDirection: 'row',
			backgroundColor: theme[themeState].headerBg,
			padding: 20,
			opacity: 0.8,
			paddingTop: 35,
			position: 'absolute',
			top: 80,
			zIndex: 2,
		},
		button: {
			flex: 1,
		},
		buttonText: {
			fontSize: 16,
			textAlign: 'center',
			fontWeight: '500',
			color: theme[themeState].subTitle,
		},
		active: {
			color: theme[themeState].footerActiveColor,
		},
		arrayContainer: {
			width: '100%',
			padding: 15,
			flexDirection: 'row',
			borderColor: 'rgba(150,150,150,.2)',
			borderBottomWidth: 1,
		},
		image: {
			width: 50,
			height: 50,
			resizeMode: 'stretch',
		},
		name: {
			width: '100%',
			color: theme[themeState].color,
			alignSelf: 'center',
			marginLeft: 10,
		},
	});
