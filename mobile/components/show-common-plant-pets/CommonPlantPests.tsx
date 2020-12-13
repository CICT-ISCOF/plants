import React, { Component } from 'react';
import {
	Text,
	View,
	Image,
	TouchableOpacity,
	FlatList,
	ScrollView,
} from 'react-native';
import { Actions } from 'react-native-router-flux';
import globalStylesWrap from '../../constants/style';
import { Ionicons } from '@expo/vector-icons';
import styles from './commonPlantPests.style';
import state from '../../services/state';

export default class CommonPlantPests extends Component {
	state = {
		globalStyles: globalStylesWrap(state.get('theme', 'dark')),
	};

	key = 0;

	componentDidMount() {
		this.key = state.listen('theme', (mode) => {
			this.setState({
				globalStyles: globalStylesWrap(mode),
				styles: stylesWrap(mode),
			});
		});
	}

	componentWillUnmount() {
		state.unlisten('theme', this.key);
	}

	render() {
		const globalStyles = this.state.globalStyles;
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
					<Text style={globalStyles.headerText}>
						{' '}
						{this.props.pestName.name}{' '}
					</Text>
				</View>
				<ScrollView>
					<Image
						style={styles.image}
						source={{ uri: this.props.pestName.photo_url }}
					/>
					<Text style={styles.title}>
						{' '}
						{this.props.pestName.name}{' '}
					</Text>
					<Text style={styles.description}>
						{' '}
						{this.props.pestName.description}{' '}
					</Text>
					<View style={{ height: 150 }}></View>
				</ScrollView>
			</View>
		);
	}
}
