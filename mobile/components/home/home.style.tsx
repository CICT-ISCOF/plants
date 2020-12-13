import { StyleSheet } from 'react-native'
import theme from '../../constants/color'

const themeState = theme.themState


export default StyleSheet.create({ 
    title:{
        margin:0,
        fontSize:16,        
        color:theme[themeState].titleColor,
        marginTop:30,
        marginLeft:15,
        marginBottom:0
    },
    bigImage:{
        width:'100%',
        height:160,
        resizeMode:"stretch",   
        marginBottom:-10    
    },

    plantitas:{
        height:90,
        width:100,      
        flex: 1,
        margin: 15,       
    },
    plantitasName:{
        textAlign:"left",
        color:theme[themeState].titleColor,
        marginLeft:15,
        marginTop:-5,
        fontWeight:'700'
    },
    plantitasSubtitle:{
        textAlign:"left",
        marginLeft:15,
        color:theme[themeState].subTitle,
    },
    
    plantitasImage:{
        width:'100%',
        height:'100%',
        resizeMode:"stretch",       
        borderColor: 'rgba(150,150,150,.2)',
        borderWidth: 1,
    },


    categoryScrollView:{
        marginTop:30,
        borderBottomColor: 'rgba(150,150,150,.2)',
        borderBottomWidth: 1,
        borderTopColor:'rgba(150,150,150,.2)',
        borderTopWidth:1,
        marginBottom:-20
    },
    categroyContainer:{
        flex: 1,
        margin: 15, 
        marginRight:0,      
        width:200,
        height:100,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,      
        borderRadius:10
    },
    categoryImage:{
        resizeMode:"stretch",
        width:'100%',
        height:'100%',
       
        borderRadius:10
    },
    categoryName:{
        textAlign:"left",
        color:'white',
        textShadowColor: 'rgba(0, 0, 0, 0.75)',
        textShadowOffset: {width: 3, height: 2},
        textShadowRadius: 10,
        marginLeft:25,
        marginTop:-17,
        fontWeight:'700',
        fontSize:20,
        transform:[{translateY:-65}]
    }



    
})