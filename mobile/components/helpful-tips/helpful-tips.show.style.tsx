import { StyleSheet } from 'react-native'
import theme from '../../constants/color'

const themeState = theme.themState

export default StyleSheet.create({ 

    tips:{
        padding:20,
        borderBottomColor: 'rgba(150,150,150,.2)',
        borderBottomWidth: 1,
        flexDirection:'row',
        alignItems:"center",
        marginTop:20
    },
    image:{
        height:50,
        width:50,
        borderRadius:50,
        marginRight:20
    },
    text:{
        color:theme[themeState].color,
    }
})