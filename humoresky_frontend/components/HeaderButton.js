import React from 'react'
import { Image, TouchableOpacity } from 'react-native'
import { withNavigation } from 'react-navigation'

class HeaderButton extends React.Component {
    render() {
        return(
            <TouchableOpacity onPress={() => {this.props.navigation.toggleDrawer()}}>
                <Image style={{marginLeft: 10}} source={require('../assets/images/menu-24.png')} />
            </TouchableOpacity>
        )
    }
}

export default withNavigation(HeaderButton)