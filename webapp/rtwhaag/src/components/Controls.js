import React from 'react';
import Pedal from './Pedal'
import Steering from './Steering'
import API from '../api'

function Controls() {
    return (
        <div style={parent}  onContextMenu={(e)=> e.preventDefault()} >
            <Steering style={steering} action={(target) => API.steer(target)}/>
            <div style={pedals} onContextMenu={(e)=> e.preventDefault()} >
                <Pedal label='Break' type='break' action={() => API.break()} onContextMenu={(e)=> e.preventDefault()}/>
                <Pedal label='Accelerate' type='gas' action={() => API.accelerate()} onContextMenu={(e)=> e.preventDefault()}/>
            </div>
        </div>
    );
}

const parent ={
    display: 'flex'
}
const pedals = {
    display: 'flex',
    justifyContent: 'space-between',
    width: '40%'
}
const steering = {
    marginTop: '60%'
}
export default Controls;
  