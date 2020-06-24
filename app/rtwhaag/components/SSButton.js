import * as React from 'react'
import ControlButton from "./ControlButton";
import Api from '../api'

export default function SSButton(props) {
    return (
        <ControlButton 
            image_on={require('../assets/images/button_on.png')}
            image_off={require('../assets/images/button_off.png')}
            toggle={() => Api.toggleSS()}
            {...props}
        />
    )
}