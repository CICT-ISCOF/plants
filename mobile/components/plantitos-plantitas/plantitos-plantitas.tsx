import React, { Component } from 'react'
import { Text, View, Image, TouchableOpacity, FlatList, ScrollView} from 'react-native'
import { Actions } from 'react-native-router-flux'
import globalStyles from '../../constants/style'
import { Entypo } from '@expo/vector-icons'; 
import { MaterialCommunityIcons } from '@expo/vector-icons'; 
import styles from './plantitos-plantitas.style';
import { Ionicons } from '@expo/vector-icons'; 
import { AntDesign } from '@expo/vector-icons'; 
import { Fontisto } from '@expo/vector-icons'; 
import Grid from 'react-native-grid-component';
import firebase from 'firebase'

export default class Plantitos extends Component {

    state = {
        items:this.props.plantitas.items
    }

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

    renderInfo = (data, i) => (

		<View style={[styles.item]} key={i}  >
			<Image style={styles.images} source={{uri:data.photo_url}} />		
            <Text style={styles.textDescription}>{data.body}</Text>
		</View>
	);
	 
	renderPlaceholder = i => <View style={styles.item} key={i} />;


    render() {
        return (
            <View style={globalStyles.mainContainer}>
                <View  style={globalStyles.header}>
                        <TouchableOpacity style={globalStyles.backIcon} onPress={()=>{Actions.pop()}}>
                            <Ionicons  style={globalStyles.backIcon}  name="ios-arrow-back" size={24} color="black" />
                        </TouchableOpacity>
                        <Text style={globalStyles.headerText}>About {this.props.plantName} </Text>
                </View>

                <View style={styles.secondHeader}>
                    <View style={styles.button}>
                        <Text style={[styles.buttonText,styles.active]}>About</Text>
                    </View>

                    <TouchableOpacity onPress={()=>{this.guide()}} style={styles.button}>
                        <Text style={styles.buttonText}>Guide</Text>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={()=>{this.varieties()}} style={styles.button}>
                        <Text style={styles.buttonText}>Varieties</Text>
                    </TouchableOpacity>
                </View>



                <ScrollView>

                <Image style={styles.image} source={{uri:this.props.plantitas.photo_url}}/>
                    <Text style={styles.title}> {this.props.plantName}  </Text>                   
                    <Text style={styles.titleIntroduction}> Introduction </Text>
                    <Text style={styles.description}> {this.props.plantitas.description} </Text>

                    <Grid
						style={styles.list}
						renderItem={this.renderInfo}
						renderPlaceholder={this.renderPlaceholder}
						data={this.state.items}
						numColumns={1}
					/>


                    <View style={{height:150}}></View>


                </ScrollView>
            </View>
        )
    }
}