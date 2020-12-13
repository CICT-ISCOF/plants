import { StyleSheet } from 'react-native'

export default StyleSheet.create({ 
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
        height:'90%',
    },
    imageText:{
        fontSize:18,
        fontWeight:'700',
        color:'#277A70',
        textAlign:'center',
        marginTop:10
    },
})