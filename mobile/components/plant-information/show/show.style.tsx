import { StyleSheet } from 'react-native'
import theme from '../../../constants/color'
const themeState = theme.themState

export default StyleSheet.create({ 
    image:{
        width:'100%',    
        height:300
    },
    imageSmall:{
        width:50,   
        height:50,    
        resizeMode:"stretch",
        alignSelf:"center",
        borderRadius:50
    },
    title:{     
        fontSize:20,
        fontWeight:'700',
        color:theme[themeState].titleColor,      
        textAlign:"center",
        margin:20
    },
    descriptionTitle:{
        padding: 20,
        textAlign:"left",
        fontSize:16,
        fontWeight:'500',
        color:theme[themeState].titleColor,      
    },
    description:{
        padding: 13,
        textAlign:"left",
        marginTop:-20,
        color:theme[themeState].subTitle,   
    },
    Estimate:{
        color:theme[themeState].subTitle,      
        fontSize:20,
        fontWeight:'700',
        padding:10
    },
    item: {
        flex: .7,
    
        margin: 10,
    },
    itemContainer:{      
        borderRadius:50,
        width:100,   
        height:100,  
        padding:20,
        alignSelf:"center"
    },
    list: {
        flex: .3
    },
})