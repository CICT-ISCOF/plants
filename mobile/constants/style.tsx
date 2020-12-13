import { StyleSheet } from 'react-native'
import theme from '../constants/color'

const themeState = theme.themState

export default StyleSheet.create({ 
    mainContainer:{
        width:'100%',
        height:'100%',
        backgroundColor:theme[themeState].background,
        paddingTop:80,
    },
    header:{
        backgroundColor:theme[themeState].headerBg,
        width:'100%',   
        padding:10,
        paddingTop:60,
        flexDirection:'row',
        position: 'absolute',
        zIndex:2,
        borderBottomColor:'rgba(150,150,150,.1)',
        borderBottomWidth:1      
    },
    backIcon:{
        color:theme[themeState].color,
        marginLeft:5,
        backgroundColor:'transparent',
    },
    headerText:{
        color:theme[themeState].color,
        fontSize:20,
        textAlign:"center",
        alignSelf:"center",
        flex:1,
        marginRight:10,
        backgroundColor:'transparent',
        fontWeight:'600'
    },
    footer:{
        width:'100%',
        position:"absolute",
        bottom:0,
        backgroundColor:theme[themeState].footerBg,       
        flexDirection:'row',
        paddingBottom:40,
        
    },
    footerButtons:{
        textAlign:"center",
        width:'33.3%',
        alignItems:"center",
        justifyContent:"center",
        height:'100%',
        paddingTop:5
    },
    footerButtonTexts:{
        textAlign:"center",
        fontSize:12,
        color:theme[themeState].subTitle,
        marginTop:5
    },
    active:{
        borderTopColor:theme[themeState].footerActiveColor,
        borderTopWidth:1,    
    },
   
})
