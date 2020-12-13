import { StyleSheet } from 'react-native'

export default StyleSheet.create({
    title:{     
        fontSize:20,
        fontWeight:'700',
        color:'#277A70',      
        textAlign:"center",
        margin:20
    }
    ,image:{
        width:'100%',
        minHeight:400,
        resizeMode:"stretch"
    },
    description:{
        padding:20,
        lineHeight:30,
        textAlign:"center",
        fontSize:16,
        color:'gray'
    }
})