import { StyleSheet } from 'react-native'
import theme from '../../../../constants/color'
const themeState = theme.themState

export default StyleSheet.create({ 
    
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