import React from 'react';
import Repeatable from 'react-repeatable'

import gaspedal from './pedal-gas.png'
import breakpedal from './pedal-break.png'

function Pedal({ action, label, type }) {
    return (
        <Repeatable
        repeatDelay={10}
        repeatInterval={50}
        onHold={action}
        >
          <img src={type === 'gas' ? gaspedal : breakpedal} width='80%' alt={label} />

      </Repeatable>
    )
}

export default Pedal