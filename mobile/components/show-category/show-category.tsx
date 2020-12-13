import React, { Component } from 'react'
import { Text, View, Image, TouchableOpacity, FlatList, ScrollView} from 'react-native'
import { Actions } from 'react-native-router-flux'
import globalStyles from '../../constants/style'
import { Entypo } from '@expo/vector-icons'; 
import { MaterialCommunityIcons } from '@expo/vector-icons'; 
import styles from './showcategory.style';
import { Ionicons } from '@expo/vector-icons'; 
import Grid from 'react-native-grid-component';
import firebase from 'firebase'

export default class Categories extends Component {

    state = {
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
	}

	async changeListener(){
		let list = []
		const plants = await this.plants.where('category_id', '==', this.props.category_id).get();
		plants.forEach(doc => {
			list.push(doc.data())
			this.setState({plants:list})
		});		  
	}
	
	viewPlantInfo(id,plantName){
		Actions.ShowSpeciifcPlantInformation({
			id:id,
			plantName:plantName
		})
	} 

    renderPlant = (data, i) => (
		<TouchableOpacity style={[styles.item]} key={data.id} onPress={()=>{this.viewPlantInfo(data.id,data.name)}} >
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
						<Text style={globalStyles.headerText}>Category of {this.props.categoryName} </Text>
				</View>
                <ScrollView>
					
					<Grid
						style={styles.list}
						renderItem={this.renderPlant}
						renderPlaceholder={this._renderPlaceholder}
						data={this.state.plants}
						numColumns={2}
					/>
					<View style={{height:150}}></View>
				</ScrollView>
            </View>

        )
  }
}