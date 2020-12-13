import { StyleSheet } from 'react-native';
import theme from '../../constants/color';
import state from '../../services/state';

export default (themeState) =>
	StyleSheet.create({
		helpFulTips: {
			marginTop: 10,
			width: '100%',

			justifyContent: 'center',
			alignItems: 'center',
			borderBottomColor: 'rgba(150,150,150,.2)',
			borderBottomWidth: 1,
			padding: 20,
			borderRadius: 3,
		},
		helpFulTipsText: {
			textAlign: 'center',
			fontWeight: '800',
			fontSize: 16,
			color: theme[themeState].color,
			alignSelf: 'center',
			textTransform: 'uppercase',
		},
		helpFulTips1: {},
		ScrollView: {
			padding: 10,
		},
	});
