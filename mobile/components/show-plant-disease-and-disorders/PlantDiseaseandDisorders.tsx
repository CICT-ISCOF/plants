import React, { Component } from 'react'
import { Text, View, Image, TouchableOpacity, FlatList, ScrollView} from 'react-native'
import { Actions } from 'react-native-router-flux'
import globalStyles from '../../constants/style'
import { Ionicons } from '@expo/vector-icons'; 
import  styles  from './PlantDiseaseandDisorders.style'


export default class PlantDiseaseandDisorders extends Component {
    render() {
        return (
            <View style={globalStyles.mainContainer}>
                <View  style={globalStyles.header}>
                    <TouchableOpacity style={globalStyles.backIcon} onPress={()=>{Actions.pop()}}>
                        <Ionicons  style={globalStyles.backIcon}  name="ios-arrow-back" size={24} color="black" />
                    </TouchableOpacity>
                    <Text style={globalStyles.headerText}> {this.props.diseaseName.title} </Text>
                </View>
                <ScrollView>
                    <Image style={styles.image} source={{uri:this.props.diseaseName.photo_url}}/>
                    <Text style={styles.title}> {this.props.diseaseName.name}  </Text>
                    <Text style={styles.description}> {this.props.diseaseName.description}  </Text>
                    <View style={{height:150}} />
                </ScrollView>
            </View>
        )
    }
}