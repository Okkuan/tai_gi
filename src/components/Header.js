import styled from 'styled-components'
import logo from '../images/Logo.png'
import { BsGearFill, BsPlusCircleFill } from "react-icons/bs"
import { Link, useNavigate  } from "react-router-dom";
import { useState, useEffect } from "react";
const Container = styled.div`
width: 100%;
background: rgb(255,135,115);
display: flex;
`
const Logo = styled.img`
cursor: pointer;
@media screen and (max-width:580px) {
    width: 40%;
}
`
const Buttons = styled.div`
width: 100%;
display: flex;
justify-content: flex-end;
align-items: center;
@media screen and (max-width:380px) {
    transform: scale(0.8);
}
`
const ButtonNew = styled(Link)`
text-decoration: none;
width: 140px;
height: 50px;
margin: 10px;
background: linear-gradient( #29afd0, #008db0);
border-radius: 5px;
box-shadow: 0 2px 3px rgba(0, 0, 0, 0.5);
color: #FFF;
display: flex;
justify-content: center;
align-items: center;
font-size: 28px;
cursor: pointer;
box-shadow: 0px 0px 0px 0px rgba(25, 118, 210, 0.16);
transition: box-shadow .1s;
& p {
    font-size: 22px;
    font-weight: 600;
    margin-top: -1px;
    margin-left: 10px;
}
&:hover {
    box-shadow: 0px 0px 0px 8px rgba(25, 118, 210, 0.16);
}
`
const ButtonControl = styled(ButtonNew)`
right: 20px;
width: 50px;
background: linear-gradient( #c8c8c8, #9d9d9d);
`
const Title = styled.div`
width: 100%;
color: #FFF;
font-weight: 600;
font-size: 35px;
z-index: 2;
position: absolute;
right: 0;
left: 0;
top: 20px;
text-align: center;
pointer-events: none;
@media screen and (max-width:1060px) {
    display: flex;
    align-items: center;
    position: static;
    padding-bottom: 23px; 
}
@media screen and (max-width:860px) {
    font-size: 26px;
    text-align: left;
    ${props=>props.type==='NewProject' && `
    top: 20px;
    left: 180px;
    `}
}
@media screen and (max-width:560px) {
    font-size: 20px;
}
`
function Header(props) {
    const { type, content, currentProject, setCurrentProject } = props
    const navigate = useNavigate()

    return (
        <Container>
            <Logo src={logo} onClick={()=>navigate('/Home')}/>
            {type === 'New'? 
            <Buttons>
                <ButtonNew to='/NewProject' onClick={()=>{ window.localStorage.setItem("currentProject",null);setCurrentProject(null)}} type={type}><BsPlusCircleFill /><p>新專案</p></ButtonNew>
                <ButtonControl type={type}><BsGearFill /></ButtonControl>
            </Buttons>:
            <Title type={type}>{content}</Title>
                }
        </Container>
    );
}

export default Header;
