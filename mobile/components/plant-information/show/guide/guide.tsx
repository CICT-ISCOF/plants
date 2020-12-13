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
import globalStylesWrap from '../../../../constants/style';
import { Entypo } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import stylesWrap from './guide.style';
import { Ionicons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { Fontisto } from '@expo/vector-icons';
import theme from '../../../../constants/color';
import state from '../../../../services/state';
const themeState = theme.themState;

export default class Guide extends Component {
	state = {
		globalStyles: globalStylesWrap(state.get('theme', 'dark')),
		styles: stylesWrap(state.get('theme', 'dark')),
	};

	key = 0;

	componentDidMount() {
		console.log(this.props.plant);
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

	guide() {
		Actions.Guide({
			plant: this.props.plant,
		});
	}

	layoutIdeas() {
		Actions.LayoutIdeas({
			plant: this.props.plant,
		});
	}

	about() {
		Actions.pop();
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
						Guide for {this.props.plant.name}{' '}
					</Text>
				</View>

				<ScrollView>
					{this.props.plant.preparations.map((preparation, index) => {
						return (
							<View key={index}>
								<Text style={styles.title}>
									{preparation.title}
								</Text>
								<View style={styles.container}>
									<Text style={styles.textInContainer}>
										{preparation.type}
									</Text>
								</View>
								{preparation.steps.map(
									(guideItem, guideIndex) => {
										return (
											<View
												key={guideIndex}
												style={styles.nextContainer}
											>
												<Text
													style={
														styles.nextContainerTitle
													}
												>
													{guideItem}
												</Text>
												<View style={styles.container}>
													{/* <Text style={styles.textInContainer}>{guideItem.description}</Text> */}
												</View>
											</View>
										);
									}
								)}
							</View>
						);
					})}

					<View style={{ height: 150 }} />
				</ScrollView>

				<View style={globalStyles.footer}>
					<TouchableOpacity
						onPress={() => {
							this.about();
						}}
						style={globalStyles.footerButtons}
					>
						<AntDesign
							name='infocirlce'
							size={26}
							color={theme[themeState].subTitle}
						/>
						<Text style={globalStyles.footerButtonTexts}>
							{' '}
							About{' '}
						</Text>
					</TouchableOpacity>

					<View
						style={[
							globalStyles.footerButtons,
							globalStyles.active,
						]}
					>
						<Ionicons
							name='ios-list-box'
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
							Guide{' '}
						</Text>
					</View>

					<TouchableOpacity
						onPress={() => {
							this.layoutIdeas();
						}}
						style={globalStyles.footerButtons}
					>
						<Fontisto
							name='nav-icon-grid'
							size={26}
							color={theme[themeState].subTitle}
						/>
						<Text style={globalStyles.footerButtonTexts}>
							{' '}
							Layout Ideas{' '}
						</Text>
					</TouchableOpacity>
				</View>
			</View>
		);
	}
}
