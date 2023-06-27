import styled from 'styled-components'
import { RxCross2, RxCheck } from "react-icons/rx"
import { HashRouter, Link, Routes, Route } from "react-router-dom";

const Container = styled(Link)`
width: 70px;
height: 70px;
background-color: #dddddd;
position: fixed;
bottom: 20px;
right: 20px;
color: #FFF;
font-size: 60px;
display: flex;
justify-content: center;
align-items: center;
border-radius: 50%;
z-index: 2;
${props=>props.text === 'cancel' && `
right: 100px;
`}
${props=>props.x === '1' && `
right: 20px;
`}
cursor: pointer;
`
function Button(props) {
    const {text, next, x} = props
    return (
        <Container to={next} text={text} x={x}>
            {text === 'ok' ?
            <RxCheck/>:
            <RxCross2/>
            }
        </Container>
    );
}

export default Button;
