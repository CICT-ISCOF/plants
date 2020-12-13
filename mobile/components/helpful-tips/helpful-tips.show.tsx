import React, { Component } from 'react'
import { Text, View, Image, TouchableOpacity, FlatList} from 'react-native'
import { Actions } from 'react-native-router-flux'
import globalStyles from '../../constants/style'
import { Entypo } from '@expo/vector-icons'; 
import { MaterialCommunityIcons } from '@expo/vector-icons'; 
import { ScrollView } from 'react-native-gesture-handler'
import { Ionicons } from '@expo/vector-icons'; 
import styles from './helpful-tips.show.style'

export default class ShowHelpfulTips extends Component {
    
    state = {
        tips:[]
    }

    componentDidMount(){
 
        this.setState({tips:this.props.items})
    }

    showTip(id,tipName){
        Actions.Tips({
            id:1,
            tipName:tipName
        })
    }

    render() {
        return (
            <View style={globalStyles.mainContainer}>
            <View  style={globalStyles.header}>
                <TouchableOpacity style={globalStyles.backIcon} onPress={()=>{Actions.pop()}}>
                    <Ionicons  style={globalStyles.backIcon}  name="ios-arrow-back" size={24} color="black" />
                </TouchableOpacity>
                <Text style={globalStyles.headerText}> Tip </Text>
            </View>

            <ScrollView >
                {
                    this.state.tips.map((tip , index)=>{
                       return(
                           <TouchableOpacity key={index}  onPress={()=>{this.showTip(tip.id,tip)}} style={styles.tips}>
                                <Image style={styles.image} source={{uri:tip.photo_url}} />
                                <Text style={styles.text}>{tip.title} </Text>
                           </TouchableOpacity>
                       )
                    })
                }
            </ScrollView>
            </View>
        )
    }
}