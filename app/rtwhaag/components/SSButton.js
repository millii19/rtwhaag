import * as React from 'react'
import ControlButton from "./ControlButton"

export default function SSButton(props) {
    return (
        <ControlButton 
            image_on={require('../assets/images/SOSIgruen.jpg')}
            image_off={require('../assets/images/SOSIblau.jpg')}
            toggle={() => props.API.toggleSS()}
            {...props}
        />
    )
}