import * as React from 'react'
import ControlButton from "./ControlButton"

export default function SSButton(props) {
    return (
        <ControlButton 
            image_on={require('../assets/images/SS_logo_blau.png')}
            image_off={require('../assets/images/SS_logo_gruen.png')}
            toggle={() => props.API.toggleSS()}
            {...props}
        />
    )
}