import * as React from 'react'
import { Image, View } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler';

class Pedal extends React.Component {
    constructor(props) {
        super(props)
        this.timer = null
        this.footDown = this.footDown.bind(this)
        this.footUp = this.footUp.bind(this)
    }
    
    footDown() {
        if (this.props.type === 'gas') this.props.API.accelerate()
        else this.props.API.break()
        this.timer = setTimeout(this.footDown, 200)
    }

    footUp() {
        clearTimeout(this.timer);
    }

    render() {
        return <View onTouchStart={this.footDown} onTouchCancel={this.footUp} onTouchEnd={this.footUp}>
            {this.props.type === 'gas'
            ? <Image style={this.props.style} source={require(`../assets/images/pedal-gas.png`)} />
            : <Image style={this.props.style} source={require(`../assets/images/pedal-break.png`)} />
            }
        </View>
        /*return <TouchableOpacity onPressIn={this.footDown} onPressOut={this.footUp}>
            {this.props.type === 'gas'
            ? <Image style={this.props.style} source={require(`../assets/images/pedal-gas.png`)} />
            : <Image style={this.props.style} source={require(`../assets/images/pedal-break.png`)} />
            }
        </TouchableOpacity>*/
    }

}

export default Pedal