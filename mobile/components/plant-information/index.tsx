import React, { Component } from 'react'
import { Text, View, Image, TouchableOpacity, FlatList, ScrollView} from 'react-native'
import { Actions } from 'react-native-router-flux'
import globalStyles from '../../constants/style'
import { Entypo } from '@expo/vector-icons'; 
import { MaterialCommunityIcons } from '@expo/vector-icons'; 
import styles from './index.style';
import { Ionicons } from '@expo/vector-icons'; 
import Grid from 'react-native-grid-component';
import firebase from 'firebase'
import theme from '../../constants/color'
const themeState = theme.themState

export default class PlantInformation extends Component {

	state = {
		calendar:[
			'January',
			'February',
			'March',
			'April',
			'May',
			'June',
			'July',
			'August',
			'September',
			'October',
			'November',
			'December',		
		],
		selectedMonth:'January',
		plants:[]
	}

	plants:any
	componentDidMount(){
		const firebaseConfig = {
			apiKey: "AIzaSyBerHExagMFPqVaCKJKBkcyGb9I2Oufn7A",
			authDomain: "plants-564d0.firebaseapp.com",
			databaseURL: "https://plants-564d0.firebaseio.com",
			projectId: "plants-564d0",
			storageBucket: "plants-564d0.appspot.com",
			messagingSenderId: "720876541922",
			appId: "1:720876541922:web:1af53c5360ccaedadf4bbb",
			measurementId: "G-7V9LPDCYTB"
		}		
		if(!firebase.apps.length){
			firebase.initializeApp(firebaseConfig)
		}	
		this.plants = firebase.firestore().collection('plants')			
		this.changeListener()	
		this.selectMonth('January')
	}

	async changeListener(){
		let list = []
		const plants = await this.plants
		plants.onSnapshot(categories => {
			categories.forEach(doc => {				
				list.push(doc.data())			
			})
			this.setState({plants:list})
		})
	}
	
	viewHelpfulTips(){
		Actions.HelpfulTips()
	}


	Home(){
		Actions.Home()
	}

	async selectMonth(month){
		this.setState({plants:[]})
		this.setState({ selectedMonth: month })
		let list = []
		const plants = await this.plants.where('months', 'array-contains', month).get();
		plants.forEach(doc => {
			list.push(doc.data())
			this.setState({plants:list})
		})		
	}

	viewPlantInfo(id,plant){
		Actions.ShowSpeciifcPlantInformation({
			id:id,
			plant:plant
		})
	}

	renderPlant = (data, i) => (
		<TouchableOpacity style={[styles.item]} key={i} onPress={()=>{this.viewPlantInfo(data.id,data)}} >
			<Image style={styles.image} source={{uri:data.photo_url}} />
			<Text style={styles.imageText}  >{data.name}</Text>
		</TouchableOpacity>
	);
	 
	renderPlaceholder = i => <View style={styles.item} key={i} />;


	render() {
		return (
			<View style={globalStyles.mainContainer}>
				<View  style={globalStyles.header}>
						<TouchableOpacity style={globalStyles.backIcon} onPress={()=>{Actions.pop()}}>
							<Ionicons  style={globalStyles.backIcon}  name="ios-arrow-back" size={24} color="black" />
						</TouchableOpacity>
						<Text style={globalStyles.headerText}> Plant Information </Text>
				</View>
				<View 	style={[globalStyles.header,{opacity:.8,marginTop:90,padding:20,paddingTop:20}]}>
				<ScrollView horizontal={true}
					showsHorizontalScrollIndicator={false}>
					{
						this.state.calendar.map((month, index) =>{
							return(
								<TouchableOpacity key={index} onPress={()=>{this.selectMonth(month)}} style={styles.month}>
									<Text style={[styles.monthText,this.state.selectedMonth == month ? {color:theme[themeState].footerActiveColor} :{} ]}>{month}</Text>
								</TouchableOpacity>
							)
						})
					}
					
					</ScrollView>
				</View>
				{/* <Text style={styles.title}>{this.state.selectedMonth}</Text> */}
				<ScrollView style={{paddingTop:90}}>
					
					<Grid
						style={styles.list}
						renderItem={this.renderPlant}
						renderPlaceholder={this.renderPlaceholder}
						data={this.state.plants}
						numColumns={3}
					/>
					<View style={{height:150}}></View>
				</ScrollView>



				<View  style={globalStyles.footer}>
                  <TouchableOpacity    onPress={()=>{this.Home()}}  style={globalStyles.footerButtons}>
						<Entypo name="home" size={26} color={theme[themeState].subTitle} />
						<Text style={globalStyles.footerButtonTexts}> Home </Text>
                  </TouchableOpacity>

                  <View style={globalStyles.footerButtons} style={[globalStyles.footerButtons,globalStyles.active]}>                   
						<MaterialCommunityIcons name="calendar-range" size={26} color={theme[themeState].footerActiveColor} />
						<Text style={[globalStyles.footerButtonTexts,{color:theme[themeState].footerActiveColor}]}> Plant Information </Text>
                  </View>

                  <TouchableOpacity  onPress={()=>{this.viewHelpfulTips()}}  style={globalStyles.footerButtons}>
						<MaterialCommunityIcons name="lightbulb-on" size={26} color={theme[themeState].subTitle} />
						<Text style={globalStyles.footerButtonTexts}> Helpful Tips </Text>
                  </TouchableOpacity>
              </View>
            </View>
		)
	}
}