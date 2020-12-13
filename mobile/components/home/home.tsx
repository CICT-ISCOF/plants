import React, { Component } from 'react';
import myStyles from './home.style';
import { Text, View, Image, TouchableOpacity, FlatList } from 'react-native';
import { Actions } from 'react-native-router-flux';
import globalStylesWrap from '../../constants/style';
import { Entypo } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { ScrollView } from 'react-native-gesture-handler';
import firebase from 'firebase';
import theme from '../../constants/color';
import state from '../../services/state';

const themeState = theme.themState;

export default class Home extends Component {
	state = {
		plantitas: <View></View>,
		categories: <View></View>,
		commonPlantPests: <View></View>,
		plantDiseaseAndDisorders: <View></View>,
		styles: myStyles(state.get('theme', 'dark')),
		globalStyles: globalStylesWrap(state.get('theme', 'dark')),
	};

	categories: any = '';
	pests: any = '';
	diseases: any = '';
	plantitos: any = '';

	key = 0;

	componentDidMount() {
		this.key = state.listen('theme', (mode) => {
			this.setState({
				styles: myStyles(mode),
				globalStyles: globalStylesWrap(mode),
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
		this.categories = firebase.firestore().collection('categories');
		this.pests = firebase.firestore().collection('pests');
		this.diseases = firebase.firestore().collection('diseases');
		this.plantitos = firebase.firestore().collection('plantitos');

		this.renderPlantitas();
		this.renderCategories();
		this.renderCommonPlantPests();
		this.renderPlantDiseaseAndDisorders();
	}

	componentWillUnmount() {
		state.unlisten('theme', this.key);
	}

	viewHelpfulTips() {
		Actions.HelpfulTips();
	}

	viewPlantInformation() {
		Actions.PlantInformation();
	}

	viewPlantitas(plantName, plantitas) {
		Actions.Plantitos({
			plantitas: plantitas,
			plantName: plantName,
		});
	}

	viewCategories(id, categoryName) {
		Actions.Categories({
			category_id: id,
			categoryName: categoryName,
		});
	}

	viewCommonPlantPests(id, pestName) {
		Actions.CommonPlantPests({
			id: id,
			pestName: pestName,
		});
	}

	viewPlantDiseaseAndDisorders(id, diseaseName) {
		Actions.PlantDiseaseandDisorders({
			id: id,
			diseaseName: diseaseName,
		});
	}

	async renderPlantitas() {
		const styles = this.state.styles;
		let categoryArray = [];
		const categories = await this.plantitos;
		categories.onSnapshot((categories) => {
			categories.forEach((doc) => {
				categoryArray.push(doc.data());
			});
			renderCategory();
		});

		const renderCategory = () => {
			let plantitas = categoryArray.map((category) => {
				return (
					<TouchableOpacity
						onPress={() => {
							this.viewPlantitas(category.name, category);
						}}
					>
						<View style={styles.plantitas}>
							<Image
								style={styles.plantitasImage}
								source={{ uri: category.photo_url }}
							/>
						</View>
						<Text style={styles.plantitasName}>
							{category.name}
						</Text>
						<Text style={styles.plantitasSubtitle}>
							for {category.type}s
						</Text>
					</TouchableOpacity>
				);
			});
			this.setState({ plantitas: plantitas });
		};
	}

	async renderCategories() {
		const styles = this.state.styles;
		let categoryArray = [];
		const categories1 = await this.categories;

		categories1.onSnapshot((categories) => {
			categories.forEach((doc) => {
				categoryArray.push(doc.data());
			});
			renderCategory();
		});

		const renderCategory = () => {
			let categories = categoryArray.map((category) => {
				return (
					<TouchableOpacity
						key={category.id}
						onPress={() => {
							this.viewCategories(category.id, category.title);
						}}
					>
						<View style={styles.categroyContainer}>
							<Image
								blurRadius={15}
								style={styles.categoryImage}
								source={{ uri: category.photo_url }}
							/>
						</View>
						<Text style={styles.categoryName}>
							{category.title}
						</Text>
					</TouchableOpacity>
				);
			});
			this.setState({ categories: categories });
			categoryArray = [];
		};
	}

	async renderCommonPlantPests() {
		const styles = this.state.styles;
		let categoryArray = [];
		const categories = await this.pests;
		categories.onSnapshot((categories) => {
			categories.forEach((doc) => {
				categoryArray.push(doc.data());
			});
			renderCategory();
		});
		const renderCategory = () => {
			let commonPlantPests = categoryArray.map((category) => {
				return (
					<TouchableOpacity
						key={category.id}
						onPress={() => {
							this.viewCommonPlantPests(category.id, category);
						}}
					>
						<View style={styles.plantitas}>
							<Image
								style={styles.plantitasImage}
								source={{ uri: category.photo_url }}
							/>
						</View>
						<Text
							style={[
								styles.plantitasName,
								{ textAlign: 'center' },
							]}
						>
							{category.name}
						</Text>
					</TouchableOpacity>
				);
			});
			this.setState({ commonPlantPests: commonPlantPests });
			categoryArray = [];
		};
	}

	async renderPlantDiseaseAndDisorders() {
		const styles = this.state.styles;
		let categoryArray = [];
		const categories = await this.diseases;
		categories.onSnapshot((categories) => {
			categories.forEach((doc) => {
				categoryArray.push(doc.data());
			});
			renderCategory();
		});
		const renderCategory = () => {
			let plantDiseaseAndDisorders = categoryArray.map((category) => {
				return (
					<TouchableOpacity
						key={category.id}
						onPress={() => {
							this.viewPlantDiseaseAndDisorders(
								category.id,
								category
							);
						}}
					>
						<View style={styles.categroyContainer}>
							<Image
								style={styles.categoryImage}
								source={{ uri: category.photo_url }}
							/>
						</View>
						<Text style={[styles.categoryName]}>
							{category.title}
						</Text>
					</TouchableOpacity>
				);
			});
			this.setState({
				plantDiseaseAndDisorders: plantDiseaseAndDisorders,
			});
			categoryArray = [];
		};
	}

	render() {
		const styles = this.state.styles;
		const globalStyles = this.state.globalStyles;
		return (
			<View style={globalStyles.mainContainer}>
				<View style={globalStyles.header}>
					<Text style={globalStyles.headerText}> Home </Text>
				</View>

				<ScrollView>
					<Image
						style={styles.bigImage}
						source={require('../../assets/home.jpg')}
					/>

					<Text style={styles.title}>Plantitas and Plantitos</Text>
					<ScrollView
						horizontal={true}
						showsVerticalScrollIndicator={false}
						showsHorizontalScrollIndicator={false}
					>
						{this.state.plantitas}
					</ScrollView>

					<ScrollView
						horizontal={true}
						style={styles.categoryScrollView}
						showsVerticalScrollIndicator={false}
						showsHorizontalScrollIndicator={false}
					>
						{this.state.categories}
					</ScrollView>

					<Text style={styles.title}>Common Plant Pests</Text>
					<ScrollView
						horizontal={true}
						showsVerticalScrollIndicator={false}
						style={[
							styles.categoryScrollView,
							{
								borderTopWidth: 0,
								paddingBottom: 30,
								marginBottom: 30,
							},
						]}
						showsHorizontalScrollIndicator={false}
					>
						{this.state.commonPlantPests}
					</ScrollView>

					<Text style={styles.title}>
						Plant Disease and Disorders
					</Text>
					<ScrollView
						horizontal={true}
						showsVerticalScrollIndicator={false}
						showsHorizontalScrollIndicator={false}
					>
						{this.state.plantDiseaseAndDisorders}
					</ScrollView>

					<View style={{ height: 150 }} />
				</ScrollView>

				<View style={globalStyles.footer}>
					<View
						style={[
							globalStyles.footerButtons,
							globalStyles.active,
						]}
					>
						<Entypo
							name='home'
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
							Home{' '}
						</Text>
					</View>

					<TouchableOpacity
						onPress={() => {
							this.viewPlantInformation();
						}}
						style={globalStyles.footerButtons}
					>
						<MaterialCommunityIcons
							name='calendar-range'
							size={26}
							color={theme[themeState].subTitle}
						/>
						<Text style={globalStyles.footerButtonTexts}>
							{' '}
							Plant Information{' '}
						</Text>
					</TouchableOpacity>

					<TouchableOpacity
						onPress={() => {
							this.viewHelpfulTips();
						}}
						style={globalStyles.footerButtons}
					>
						<MaterialCommunityIcons
							name='lightbulb-on'
							size={26}
							color={theme[themeState].subTitle}
						/>
						<Text style={globalStyles.footerButtonTexts}>
							{' '}
							Helpful Tips{' '}
						</Text>
					</TouchableOpacity>
				</View>
			</View>
		);
	}
}
