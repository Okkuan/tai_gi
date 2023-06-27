import React from 'react';
import styled from 'styled-components';

const StyledSwitchButton = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  position: relative;
  button {
    width: ${props => props.wd ? props.wd+'px' : '64px'};
    height: 26px;
    background-color: ${props => props.active ? '#80c24e' : '#ea9a98'};
    ${props=>props.color && `
    background-color: ${props.color};
    `}
    border-radius: 32px;
    border: 1px solid ${props => props.active ? '#80c24e' : '#ea9a98'};
    ${props=>props.color && `
    border-color: ${props.color};
    `}
    box-sizing: border-box;
    padding: 0;
    transition: all 300ms ease-in-out;
    cursor: pointer;
    outline: none;
    &::after {
        position: absolute;
        z-index: 3;
      content: '';
      top: 3px;
      width: 20px;
      height: 20px;
      background-color: #FFFFFF;
      border-radius: 50%;
      box-shadow: 0px 1px 3px rgba(30, 30, 30, 0.3);
      transition: all 300ms ease-in-out;
      transform: ${props => props.active ? props.wd ? 'translate(' + (props.wd - 24)  + 'px)': 'translate(40px)' : 'translate(2px)'};
      display: block;
    };
  }
`;
const Before = styled.span`
font-size: 14px;
pointer-events:none;
position: absolute;
transition: all 300ms ease-in-out;
color: ${props => props.active ? '#FFF' : '#ea9a98'};
top: 4px;
left: 10px;
z-index: ${props => props.active ? 2 : 0};
display: ${props => props.text && `none`}
`
const After = styled.span`
font-size: 14px;
pointer-events:none;
position: absolute;
transition: all 300ms ease-in-out;
color: ${props => props.active ? '#80c24e' : '#FFF'};
z-index: ${props => props.active ? 0 : 2};
top: 4px;
right: 8px;
display: ${props => props.text && `none`}
`

function SwitchButton (props) {
const {active, clicked, width, text, color} = props
return (
  <StyledSwitchButton active={active} wd={width} color={color}>
    <Before active={active} text={text}>ON</Before>
    <button onClick={clicked}></button>
    <After active={active} text={text}>OFF</After>
  </StyledSwitchButton>
)
}

export default SwitchButton;