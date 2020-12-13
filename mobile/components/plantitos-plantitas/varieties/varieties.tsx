import React, { Component } from 'react'
import { Text, View, Image, TouchableOpacity, FlatList, ScrollView} from 'react-native'
import { Actions } from 'react-native-router-flux'
import globalStyles from '../../../constants/style'
import { Entypo } from '@expo/vector-icons'; 
import { MaterialCommunityIcons } from '@expo/vector-icons'; 
import styles from './variety.style';
import { Ionicons } from '@expo/vector-icons'; 
import { AntDesign } from '@expo/vector-icons'; 
import { Fontisto } from '@expo/vector-icons'; 


export default class VarietiesPlantitos extends Component {

    state={
        variety:<View></View>
    }

    componentDidMount(){        
        this.renderVarieties()
    }

	
    guide(){
        Actions.PlantitosGuide({
            plantitas:this.props.plantitas
        })
    }

    varieties(){
        Actions.VarietiesPlantitos({
            plantitas:this.props.plantitas
        })
    }
	
    renderVarieties(){        
        let variety = this.props.plantitas.varieties.map((variety, index)=>{
            return(
                <View style={styles.arrayContainer} key={index}>
                    <Image style={styles.image} source={{uri:variety.photo_url}} />
                    <Text style={styles.name}>{variety.name}</Text>
                </View>
            )
        })
        this.setState({ variety : variety})
    }


    render() {
		return (
            <View style={globalStyles.mainContainer}>
            <View  style={globalStyles.header}>
                    <TouchableOpacity style={globalStyles.backIcon} onPress={()=>{Actions.pop()}}>
                        <Ionicons  style={globalStyles.backIcon}  name="ios-arrow-back" size={24} color="black" />
                    </TouchableOpacity>
                    <Text style={globalStyles.headerText}>Varieties of {this.props.plantitas.name} </Text>
            </View>

            <View style={styles.secondHeader}>
                <TouchableOpacity onPress={()=>{Actions.pop()}}  style={styles.button}>
                    <Text style={styles.buttonText}>About</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={()=>{this.guide()}} style={styles.button}>
                    <Text style={styles.buttonText}>Guide</Text>
                </TouchableOpacity>

                <View style={styles.button}>
                    <Text style={[styles.buttonText,styles.active]}>Varieties</Text>
                </View>
            </View>



            <ScrollView style={{paddingTop:80}}>
                {this.state.variety}
                <View style={{height:150}}></View>
            </ScrollView>
        </View>
        )
    }
}