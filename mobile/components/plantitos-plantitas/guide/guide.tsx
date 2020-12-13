import React, { Component } from 'react'
import { Text, View, Image, TouchableOpacity, FlatList, ScrollView} from 'react-native'
import { Actions } from 'react-native-router-flux'
import globalStyles from '../../../constants/style'
import { Entypo } from '@expo/vector-icons'; 
import { MaterialCommunityIcons } from '@expo/vector-icons'; 
import styles from './guide.style';
import { Ionicons } from '@expo/vector-icons'; 
import { AntDesign } from '@expo/vector-icons'; 
import { Fontisto } from '@expo/vector-icons'; 


export default class PlantitosGuide extends Component {

    componentDidMount(){
      
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


    render() {
        return (
            <View style={globalStyles.mainContainer}>
            <View  style={globalStyles.header}>
                    <TouchableOpacity style={globalStyles.backIcon} onPress={()=>{Actions.pop()}}>
                        <Ionicons  style={globalStyles.backIcon}  name="ios-arrow-back" size={24} color="black" />
                    </TouchableOpacity>
                    <Text style={globalStyles.headerText}>Guide for {this.props.plantitas.name} </Text>
            </View>

            <View style={styles.secondHeader}>
                <TouchableOpacity onPress={()=>{Actions.pop()}}  style={styles.button}>
                    <Text style={styles.buttonText}>About</Text>
                </TouchableOpacity>

                <View style={styles.button}>
                    <Text style={[styles.buttonText,styles.active]} >Guide</Text>
                </View>

                <TouchableOpacity onPress={()=>{this.varieties()}} style={styles.button}>
                    <Text style={styles.buttonText}>Varieties</Text>
                </TouchableOpacity>
            </View>



            <ScrollView style={{paddingTop:80}}>
            
            {
                this.props.plantitas.guides.map((guide, index) => {
                    return(
                            <View key={index}>
                                <Text style={styles.title}>{guide.title}</Text>
                                <View style={styles.container}>
                                    <Text style={styles.textInContainer}>{guide.description}</Text>
                                </View>     
                                {
                                    guide.items.map((guideItem, guideIndex) => {
                                        return (
                                                <View key={guideIndex} style={styles.nextContainer}>
                                                    <Text style={styles.nextContainerTitle}>{guideItem.title}</Text>
                                                    <View style={styles.container}>
                                                        <Text style={styles.textInContainer}>{guideItem.description}</Text>
                                                    </View>     
                                                </View>
                                        )
                                    })
                                }
                            </View>
                        )
                    })
                }


                <View style={{height:150}}></View>

            </ScrollView>
        </View>
        )
    }
}