import React, { Component } from 'react'
import { Text, View, Image, TouchableOpacity, FlatList, ScrollView} from 'react-native'
import { Actions } from 'react-native-router-flux'
import globalStyles from '../../../../constants/style'
import { Entypo } from '@expo/vector-icons'; 
import { MaterialCommunityIcons } from '@expo/vector-icons'; 
import styles from './layout-ideas.style';
import { Ionicons } from '@expo/vector-icons'; 
import { AntDesign } from '@expo/vector-icons'; 
import { Fontisto } from '@expo/vector-icons'; 
import firebase, { firestore } from 'firebase'
import theme from '../../../../constants/color'
const themeState = theme.themState

export default class LayoutIdeas extends Component {

    state = {        
        images:this.props.plant.layouts,
        bad:[],
        good:[]
    }

    plants:any

    async componentDidMount(){
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
        this.getBadCompanions()
        this.getGoodCompanions()
    }

       

    guide(){
        Actions.Guide({
            plant:this.props.plant
        })
    }

    layoutIdeas(){
        Actions.LayoutIdeas({
            plant:this.props.plant
        })
    }

    about(){
        Actions.pop()
    }


    async getBadCompanions() {

        const pushBadList = async (companion) => {
            await this.plants.doc(companion.plant_id).get().then(doc => {   
                if(companion.type != 'Good'){
                    this.setState({ bad: [...this.state.bad,doc.data()] })    
                }                                     
            })	
        }
        this.props.plant.companions.map((companion, index)=>{
            pushBadList(companion)
        })  
    }

    async getGoodCompanions() {

        const pusgGoodList = async (companion) => {
            await this.plants.doc(companion.plant_id).get().then(doc => {   
                if(companion.type == 'Good'){
                    this.setState({ good: [...this.state.good,doc.data()] })      
                }                           
            })	
        }
        this.props.plant.companions.map((companion, index)=>{
            pusgGoodList(companion)
        })  
    }

    viewPlantInfo(id,plant){
		Actions.ShowSpeciifcPlantInformation({
			id:id,
			plant:plant
		})
	}



    render() {
            return (
                <View style={globalStyles.mainContainer}>
                    <View  style={globalStyles.header}>
                            <TouchableOpacity style={globalStyles.backIcon} onPress={()=>{Actions.pop()}}>
                                <Ionicons  style={globalStyles.backIcon}  name="ios-arrow-back" size={24} color="black" />
                            </TouchableOpacity>
                            <Text style={globalStyles.headerText}>Layout Ideas of {this.props.plant.name} </Text>
                    </View>

                    <ScrollView>                        
                        {
                            this.state.images.map((layout)=>{
                                return(
                                    <View key={layout}>
                                        <Image style={styles.image} source={{uri:layout}} />                                
                                    </View>
                                )
                            })
                        }

                    
                        <View style={{height:500}} />
                    </ScrollView>
                

                    <View style={styles.container}>
                        <Text style={styles.title}>Good Companions</Text>
                        <ScrollView horizontal={true} style={[styles.companions,styles.Good]} showsHorizontalScrollIndicator={false}>
                            {
                                this.state.good.map((plant,index)=>{
                                    return(
                                        <TouchableOpacity key={index}  onPress={()=>{this.viewPlantInfo(plant.id,plant)}}>  
                                                <View  style={styles.plant}>
                                                    <Image style={[styles.plantimg,{  borderColor:'#78B56C',      }]} source={{uri:plant.photo_url}} />	
                                                </View>
                                                <Text style={styles.plantname} >{plant.name}</Text>  
                                        </TouchableOpacity>  
                                    )
                                })
                            }
                        
                        </ScrollView>

                        <Text style={styles.title}>Bad Companions</Text>
                        <ScrollView horizontal={true} style={[styles.companions,styles.Bad]} showsHorizontalScrollIndicator={false}>
                            {
                                 this.state.bad.map((plant,index)=>{
                                    return(
                                        <TouchableOpacity key={index} onPress={()=>{this.viewPlantInfo(plant.id,plant)}}>  
                                                <View  style={styles.plant}>
                                                    <Image style={styles.plantimg} source={{uri:plant.photo_url}} />	
                                                </View>
                                                <Text style={styles.plantname} >{plant.name}</Text>  
                                        </TouchableOpacity>  
                                    )
                                })
                            }
                        </ScrollView>
                </View>

                <View  style={globalStyles.footer}>
                    <TouchableOpacity     onPress={()=>{this.about()}}   style={globalStyles.footerButtons} >
                    <AntDesign name="infocirlce" size={26}color={theme[themeState].subTitle}/>
                            <Text style={globalStyles.footerButtonTexts}> About </Text>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={()=>{this.guide()}} style={globalStyles.footerButtons}>                   
                            <Ionicons name="ios-list-box" size={26} color={theme[themeState].subTitle} />
                            <Text style={globalStyles.footerButtonTexts}> Guide </Text>
                    </TouchableOpacity>

                    <View   style={[globalStyles.footerButtons,globalStyles.active]}>
                            <Fontisto name="nav-icon-grid" size={26} color={theme[themeState].footerActiveColor} />
                            <Text style={[globalStyles.footerButtonTexts,{color:theme[themeState].footerActiveColor}]}> Layout Ideas </Text>
                    </View>
                </View>
            </View>
        )
    }
}