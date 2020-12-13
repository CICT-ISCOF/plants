import React, { Component } from 'react'
import { Text, View, Image, TouchableOpacity, FlatList, ScrollView} from 'react-native'
import { Actions } from 'react-native-router-flux'
import globalStyles from '../../../constants/style'
import { Entypo } from '@expo/vector-icons'; 
import { MaterialCommunityIcons } from '@expo/vector-icons'; 
import styles from './show.style';
import { Ionicons } from '@expo/vector-icons'; 
import { AntDesign } from '@expo/vector-icons'; 
import { Fontisto } from '@expo/vector-icons'; 
import Grid from 'react-native-grid-component';
import theme from '../../../constants/color'
const themeState = theme.themState


export default class ShowSpeciifcPlantInformation extends Component {


    state= {
		scheduling:this.props.plant.images

    }

    componentDidMount(){
      
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

    renderSchedule = (data, i) => (
		<View style={[styles.item]} key={i} onPress={()=>{this.viewPlantInfo(1,'Potato')}} >
			<View style={[styles.itemContainer]} >
                <Image style={styles.imageSmall} source={{uri:data}} />	
            </View>		
		</View>
	);
	 
	renderPlaceholder = i => <View style={styles.item} key={i} />

      

    render() {
        return (
            <View style={globalStyles.mainContainer}>
                <View  style={globalStyles.header}>
                        <TouchableOpacity style={globalStyles.backIcon} onPress={()=>{Actions.pop()}}>
                            <Ionicons  style={globalStyles.backIcon}  name="ios-arrow-back" size={24} color="black" />
                        </TouchableOpacity>
                        <Text style={globalStyles.headerText}> {this.props.plant.name} </Text>
                </View>

                <ScrollView>
                    <Image style={styles.image}source={{uri:this.props.plant.photo_url}} />
                 

                    <Text style={styles.descriptionTitle}>Description</Text>
                    <Text style={styles.description}>{this.props.plant.description}</Text>
                    <Text style={styles.Estimate}>Scheduling Estimates</Text>
                    <Image  style={[styles.image,{resizeMode:"stretch",maxHeight:150}]} source={{uri:this.props.plant.schedule_image_url}} />

                    <Grid
						style={styles.list}
						renderItem={this.renderSchedule}
						renderPlaceholder={this.renderPlaceholder}
						data={this.state.scheduling}
						numColumns={5}
					/>
					

                    <View style={{height:150}} />
                </ScrollView>

              

    




                <View  style={globalStyles.footer}>
                    <View      style={[globalStyles.footerButtons,globalStyles.active]}>
                    <AntDesign name="infocirlce" size={26} color={theme[themeState].footerActiveColor} />
                            <Text style={[globalStyles.footerButtonTexts,{color:theme[themeState].footerActiveColor}]}> About </Text>
                    </View>

                    <TouchableOpacity onPress={()=>{this.guide()}} style={globalStyles.footerButtons}>                   
                            <Ionicons name="ios-list-box" size={26} color={theme[themeState].subTitle} />
                            <Text style={globalStyles.footerButtonTexts}> Guide </Text>
                    </TouchableOpacity>

                    <TouchableOpacity   onPress={()=>{this.layoutIdeas()}} style={globalStyles.footerButtons}>
                            <Fontisto name="nav-icon-grid" size={26} color={theme[themeState].subTitle} />
                            <Text style={globalStyles.footerButtonTexts}> Layout Ideas </Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
}