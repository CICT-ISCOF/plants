import React, { Component } from 'react'
import { Text, View, Image,Animated } from 'react-native'
import styles from './splash.style'
import { Actions } from 'react-native-router-flux'
import globalStyles from '../../constants/style'
import { SimpleAnimation } from 'react-native-simple-animations';

export default class Splash extends Component {

    componentDidMount(){
        setTimeout(() => {
            Actions.Home()
        }, 2000);
    }

    render() {
        return (
            <View style={globalStyles.mainContainer}>
                <SimpleAnimation style={styles.image} delay={500} duration={1000} fade staticType='zoom'>
                    <Image style={styles.image} source={require('../../assets/splashicon.png')}/>
                </SimpleAnimation>
                <SimpleAnimation  style={styles.Headline} delay={500} duration={1000} fade>
                    <Text style={styles.Headline}>GARDENSCAPES.</Text>
                </SimpleAnimation>
                <SimpleAnimation style={styles.Title} delay={500} duration={1000} fade>
                    <Text style={styles.Title}>ASSISTANCE.</Text>
                </SimpleAnimation>
                <View style={styles.tagLine}>
                    <Text style={styles.blue}>Clean.</Text>
                    <Text style={styles.green}>Green.</Text>
                    <Text style={styles.Violet}>Beautiful</Text>
                </View>
            </View>
        )
    }
}