import { StyleSheet } from 'react-native'
import theme from '../../../constants/color'
const themeState = theme.themState

export default StyleSheet.create({ 
    secondHeader:{
        flexDirection:"row",
        backgroundColor:theme[themeState].headerBg,
        padding: 20,
        opacity:.8,
        paddingTop:35,
        position:'absolute',
        top:80,
        zIndex:2        
    },
    button:{
        flex:1,        
    },
    buttonText:{
        fontSize:16,
        textAlign:"center",
        fontWeight:'500',
        color:theme[themeState].subTitle,      
    },
    active:{
        color:theme[themeState].footerActiveColor,  
    },
    title:{
        marginTop:10,
        fontSize:20,
        fontWeight:'700',
        color:theme[themeState].color,  
        padding: 10,
        marginBottom:-15
      
    },
    container:{
        borderRadius:10,
        padding: 10,
    },
    textInContainer:{
        color:theme[themeState].subTitle,
    },
    subTitle:{     
        fontSize:20,
        fontWeight:'700',
        color:theme[themeState].subTitle,
        margin:10,
        marginTop:20   
    },
    nextContainer:{
        padding: 10,
        borderColor: 'rgba(150,150,150,.2)',
        borderBottomWidth:1
    },
    nextContainerTitle:{
        fontSize:16,        
        fontWeight:'700',
        color:theme[themeState].subTitle,  
        padding: 9,
        marginBottom:-10
    }
})