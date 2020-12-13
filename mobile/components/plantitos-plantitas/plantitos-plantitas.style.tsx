import { StyleSheet } from 'react-native'
import theme from '../../constants/color'
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
        fontSize:25,
        fontWeight:'700',
        color:theme[themeState].titleColor,      
        textAlign:"center",
        margin:20
    },
    titleIntroduction:{
        fontSize:16,
        fontWeight:'700', 
        margin:20,
        color:theme[themeState].color,
        marginBottom:10
    }
    ,image:{
        width:'100%',
        resizeMode:"stretch",
        height:200,
        marginTop:80
    },
    description:{
        padding:20,
        lineHeight:30,      
        fontSize:13,
        color:'gray'
    },
    item: {
        flex: .7,      
        margin: 10,
        flexDirection:'row',
        padding:10,
        borderColor: 'rgba(150,150,150,.2)',
        borderTopWidth:1
    },
    list: {
        flex: 1
    },
    images:{
        resizeMode:'stretch',
        width:50,
        height:50,
        borderRadius:50
    },
    textDescription:{
        paddingLeft:10,
        width:'70%',
        color:'gray',
        alignSelf:'center',
        color:theme[themeState].color,
    }
})