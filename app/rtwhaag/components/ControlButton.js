import * as React from 'react'
import { Image, View } from 'react-native'

class ControlButton extends React.Component {
    constructor() {
        super()
        this.state = {
            enabled: false,
            blink: false
        }
        this.toggle = this.toggle.bind(this)
        this.blink = this.blink.bind(this)
        this.blink_interval = null
    }
    
    toggle() {
        this.setState({
            enabled: ! this.state.enabled
        })
        if (! this.state.enabled) {
            this.blink_interval = setInterval(this.blink, 500)
        } else {
            clearInterval(this.blink_interval)
            this.setState({
                blink: false
            })
        }
        
        this.props.toggle()
    }

    blink() {
        this.setState({
            blink: ! this.state.blink
        })

        console.log(this.state.blink)
    }
    

    render() {
        return <View onTouchStart={this.toggle} style={this.state.blink ? {opacity: 0} : {}}>
            { this.state.enabled
            ? <Image style={this.props.style} source={this.props.image_on} />
            : <Image style={this.props.style} source={this.props.image_off} />
            }
        </View>
    }

}

export default ControlButton