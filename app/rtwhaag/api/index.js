import * as React from 'react'
import CarAPI from './CarApi'

const config = {
    protocol: 'http',
    host: '192.168.1.174',
    port: 5000
}

const connectAPI = (Component) => class HoC extends React.Component {
    constructor(props) {
        super(props)
        this.API = new CarAPI({
            protocol: config.protocol,
            host: props.route.params ? props.route.params.host : config.host,
            port: props.route.params ? props.route.params.port : config.port
        })
    }

    componentDidUpdate() {
        console.log(this.props.route)
        this.API = new CarAPI({
            protocol: config.protocol,
            host: this.props.route.params ? this.props.route.params.host : config.host,
            port: this.props.route.params ? this.props.route.params.port : config.port
        })
        this.render()
    }

    render() {
        return <Component API={this.API} {...this.props} />
    }
}


export default connectAPI
