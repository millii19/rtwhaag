import * as React from 'react'
import Api from '../api'
import { Image } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler';

class Pedal extends React.Component {
    constructor() {
        super()
        this.timer = null
        this.footDown = this.footDown.bind(this)
        this.stopTimer = this.footUp.bind(this)
    }
    
    footDown() {
        if (this.props.type === 'gas') Api.accelerate()
        else Api.break()
        this.timer = setTimeout(this.footDown, 200)
    }

    footUp() {
        clearTimeout(this.timer);
    }

    render() {
        return <TouchableOpacity>
            {this.props.type === 'gas'
            ? <Image style={this.props.style} source={require(`../assets/images/pedal-gas.png`)} />
            : <Image style={this.props.style} source={require(`../assets/images/pedal-break.png`)} />
            }
        </TouchableOpacity>
    }

}

export default Pedal