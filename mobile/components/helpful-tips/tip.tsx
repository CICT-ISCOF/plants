import React, { Component } from 'react';
import { Text, View, Image, TouchableOpacity, FlatList } from 'react-native';
import { Actions } from 'react-native-router-flux';
import globalStylesWrap from '../../constants/style';
import { Entypo } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { ScrollView } from 'react-native-gesture-handler';
import { Ionicons } from '@expo/vector-icons';
import stylesWrap from './tip.style';
import state from '../../services/state';

export default class Tips extends Component {
	state = {
		globalStyles: globalStylesWrap(state.get('theme', 'dark')),
		styles: stylesWrap(state.get('theme', 'dark')),
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
					<Text style={globalStyles.headerText}>
						{' '}
						{this.props.tipName.title}{' '}
					</Text>
				</View>

				<ScrollView>
					<Image
						style={styles.Image}
						source={{ uri: this.props.tipName.photo_url }}
					/>
					<Text style={styles.title}>{this.props.tipName.title}</Text>
					<Text style={styles.why}>Why?</Text>
					<Text style={styles.description}>
						{this.props.tipName.description}.
					</Text>
				</ScrollView>
			</View>
		);
	}
}
