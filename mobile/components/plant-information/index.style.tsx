import { StyleSheet } from 'react-native'
import theme from '../../constants/color'
const themeState = theme.themState

export default StyleSheet.create({ 
    month:{
        marginRight:20,
        zIndex:-1
    },   
    monthText:{
        color:theme[themeState].subTitle, 
    },
    title:{           
        fontSize:16,        
        color:theme[themeState].titleColor,
        margin:20,     
    },
    item: {
        flex: .7,
        height: 160,
        margin: 10
    },
    list: {
        flex: 1
    },
    image:{
        resizeMode:'stretch',
        width:'100%',
        height:'70%',
    },
    imageText:{
        fontSize:16,        
        color:theme[themeState].titleColor,
        textAlign:'center',
        marginTop:10
    },
    
   

})