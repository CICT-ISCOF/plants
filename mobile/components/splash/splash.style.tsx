import { StyleSheet } from 'react-native'

export default StyleSheet.create({ 
    image:{
        width:300,
        marginTop:'10%',
        height:300,
        resizeMode:"stretch",
        alignSelf:'center'
    },
    Headline:{
        position:'absolute',
        bottom:'40%',
        textAlign:"center",
        width:'100%',
        fontSize:40,
        color:'#016E24',
        fontWeight:'900'
    },
    Title:{
        position:'absolute',
        bottom:'35%',
        textAlign:"center",
        width:'100%',
        fontSize:40,
        color:'#229C98',
        fontWeight:'600'
    },
    tagLine:{
        position:'absolute',
        bottom:'10%',
        flexDirection:'row',
        alignItems:"center",
        justifyContent:"center",
        width:'100%',
        
    },
    blue:{
        fontSize:20,
        color:'#8799B3'
    },
    green:{
        fontSize:20,
        color:'#457742'

    },
    Violet:{
        fontSize:20,
        color:'#BA88BD'
    },
})