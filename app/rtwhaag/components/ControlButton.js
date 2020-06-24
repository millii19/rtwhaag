import * as React from 'react'
import { Image, View } from 'react-native'

class ControlButton extends React.Component {
    constructor() {
        super()
        this.state = {
            enabled: false
        }
        this.toggle = this.toggle.bind(this)
    }
    
    toggle() {
        this.setState({
            enabled: ! this.state.enabled
        })
        this.props.toggle()
    }
    

    render() {
        return <View onTouchStart={this.toggle} >
            { this.state.enabled
            ? <Image style={this.props.style} source={this.props.image_on} />
            : <Image style={this.props.style} source={this.props.image_off} />
            }
        </View>
    }

}

export default ControlButton