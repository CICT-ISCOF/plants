import React, { Component } from 'react'
import { Text, View, Image, TouchableOpacity, FlatList} from 'react-native'
import { Actions } from 'react-native-router-flux'
import globalStyles from '../../constants/style'
import { Entypo } from '@expo/vector-icons'; 
import { MaterialCommunityIcons } from '@expo/vector-icons'; 
import { ScrollView } from 'react-native-gesture-handler'
import { Ionicons } from '@expo/vector-icons'; 
import styles from './tip.style'

export default class Tips extends Component {
    render() {
        return (
            <View style={globalStyles.mainContainer}>
            <View  style={globalStyles.header}>
                <TouchableOpacity style={globalStyles.backIcon} onPress={()=>{Actions.pop()}}>
                    <Ionicons  style={globalStyles.backIcon}  name="ios-arrow-back" size={24} color="black" />
                </TouchableOpacity>
                <Text style={globalStyles.headerText}> {this.props.tipName.title} </Text>
            </View>

            <ScrollView >
                <Image  style={styles.Image} source={{uri:this.props.tipName.photo_url}}/>
                <Text style={styles.title}>{this.props.tipName.title}</Text>
                <Text style={styles.why}>Why?</Text>
                <Text style={styles.description}>{this.props.tipName.description}.</Text>
            </ScrollView>
            </View>
        )
    }
}