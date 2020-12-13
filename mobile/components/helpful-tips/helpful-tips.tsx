import React, { Component } from 'react';
import { Text, View, Image, TouchableOpacity, FlatList } from 'react-native';
import { Actions } from 'react-native-router-flux';
import globalStylesWrap from '../../constants/style';
import { Entypo } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { ScrollView } from 'react-native-gesture-handler';
import { Ionicons } from '@expo/vector-icons';
import stylesWrap from './helpful-tips.style';
import firebase from 'firebase';
import theme from '../../constants/color';
import state from '../../services/state';

const themeState = theme.themState;

export default class HelpfulTips extends Component {
	state = {
		helpFulTips: <View></View>,
		globalStyles: globalStylesWrap(state.get('theme', 'dark')),
		styles: stylesWrap(state.get('theme', 'dark')),
	};

	tips: any;
	key = 0;

	componentDidMount() {
		this.key = state.listen('theme', (mode) => {
			this.setState({
				globalStyles: globalStylesWrap(mode),
				styles: stylesWrap(mode),
			});
		});
		const firebaseConfig = {
			apiKey: 'AIzaSyBerHExagMFPqVaCKJKBkcyGb9I2Oufn7A',
			authDomain: 'plants-564d0.firebaseapp.com',
			databaseURL: 'https://plants-564d0.firebaseio.com',
			projectId: 'plants-564d0',
			storageBucket: 'plants-564d0.appspot.com',
			messagingSenderId: '720876541922',
			appId: '1:720876541922:web:1af53c5360ccaedadf4bbb',
			measurementId: 'G-7V9LPDCYTB',
		};
		if (!firebase.apps.length) {
			firebase.initializeApp(firebaseConfig);
		}
		this.tips = firebase.firestore().collection('tips');
		this.renderHelpfulTips();
	}
	componentWillUnmount() {
		state.unlisten('theme', this.key);
	}

	async renderHelpfulTips() {
		const styles = this.state.styles;
		let tipsArray = [];
		const tips = await this.tips;

		tips.onSnapshot((tip) => {
			tip.forEach((doc) => {
				tipsArray.push(doc.data());
			});
			renderTip();
		});
		const renderTip = () => {
			let helpFulTips = tipsArray.map((tip) => {
				return (
					<TouchableOpacity
						style={styles.helpFulTips}
						onPress={() => {
							this.viewTips(tip.items);
						}}
					>
						<Text style={styles.helpFulTipsText}>{tip.title}</Text>
					</TouchableOpacity>
				);
			});
			this.setState({ helpFulTips: helpFulTips });
			tipsArray = [];
		};
	}

	viewPlantInformation() {
		Actions.PlantInformation();
	}

	Home() {
		Actions.Home();
	}

	viewTips(items) {
		Actions.ShowHelpfulTips({
			items: items,
		});
	}

	render() {
		const globalStyles = this.state.globalStyles;
		const styles = this.state.styles;
		return (
			<View style={globalStyles.mainContainer}>
				<View style={globalStyles.header}>
					<TouchableOpacity
						style={globalStyles.backIcon}
						onPress={() => {
							Actions.pop();
						}}
					>
						<Ionicons
							style={globalStyles.backIcon}
							name='ios-arrow-back'
							size={24}
							color='black'
						/>
					</TouchableOpacity>
					<Text style={globalStyles.headerText}> Helpful Tips </Text>
				</View>

				<ScrollView style={styles.ScrollView}>
					{this.state.helpFulTips}
					<View style={{ height: 200 }}></View>
				</ScrollView>

				<View style={globalStyles.footer}>
					<TouchableOpacity
						style={globalStyles.footerButtons}
						onPress={() => {
							this.Home();
						}}
					>
						<Entypo name='home' size={26} color='white' />
						<Text style={globalStyles.footerButtonTexts}>
							{' '}
							Home{' '}
						</Text>
					</TouchableOpacity>

					<TouchableOpacity
						onPress={() => {
							this.viewPlantInformation();
						}}
						style={globalStyles.footerButtons}
					>
						<MaterialCommunityIcons
							name='calendar-range'
							size={26}
							color='white'
						/>
						<Text style={globalStyles.footerButtonTexts}>
							{' '}
							Plant Information{' '}
						</Text>
					</TouchableOpacity>

					<View
						style={[
							globalStyles.footerButtons,
							globalStyles.active,
						]}
					>
						<MaterialCommunityIcons
							name='lightbulb-on'
							size={26}
							color={theme[themeState].footerActiveColor}
						/>
						<Text
							style={[
								globalStyles.footerButtonTexts,
								{ color: theme[themeState].footerActiveColor },
							]}
						>
							{' '}
							Helpful Tips{' '}
						</Text>
					</View>
				</View>
			</View>
		);
	}
}
