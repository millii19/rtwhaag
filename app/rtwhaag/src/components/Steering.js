import React from 'react'
import styled from 'styled-components';
import ReactSlider from 'react-slider'

const StyledSlider = styled(ReactSlider)`
    width: 100%;
    height: 100px;
`;

const StyledThumb = styled.div`
    height: 100px;
    line-height: 100px;
    width: 100px;
    text-align: center;
    background-color: #000;
    color: #fff;
    border-radius: 50%;
    cursor: grab;
`;



const StyledTrack = styled.div`
    top: 0;
    bottom: 0;
    background: #ddd;
    border-radius: 999px;
`;

const Track = (props, state) => <StyledTrack {...props} index={state.index} />;

function Steering({action}) {
    const Thumb = (props, state) => {
        action(state.valueNow)
    return <StyledThumb {...props}>{}</StyledThumb> 
    }

    return (
        <StyledSlider
            defaultValue={[50]}
            renderTrack={Track}
            renderThumb={Thumb}
        />
    )
}

export default Steering
