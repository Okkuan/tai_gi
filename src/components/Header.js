import styled from 'styled-components'
import logo from '../images/Logo.png'
import { BsGearFill, BsPlusCircleFill } from "react-icons/bs"
import { Link, useNavigate  } from "react-router-dom";
import { useState, useEffect } from "react";
const Container = styled.div`
width: 100%;
background: rgb(255,135,115);
`
const Logo = styled.img`
cursor: pointer;
@media screen and (max-width:380px) {
    width: 40%;
}
`
const ButtonNew = styled(Link)`
position: absolute; 
text-decoration: none;
right: 90px;
top: 32px;
width: 140px;
height: 50px;
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
@media screen and (max-width:380px) {
    transform: scale(0.8);
    top: 12px;
    right: 60px;
}
`
const ButtonControl = styled(ButtonNew)`
right: 20px;
width: 50px;
background: linear-gradient( #c8c8c8, #9d9d9d);
@media screen and (max-width:380px) {
    right: 10px;
}
`
const Title = styled.div`
color: #FFF;
font-weight: 600;
font-size: 35px;
position: absolute;
z-index: 2;
top: 30px;
left: 0;
right: 0;
text-align: center;
pointer-events: none;
@media screen and (max-width:380px) {
    transform: scale(0.8);
    top: 0;
    left: 120px;
    font-size: 26px;
    text-align: left;
    ${props=>props.type==='NewProject' && `
    top: 20px;
    left: 180px;
    `}
}
`
function Header(props) {
    const { type, content, currentProject, setCurrentProject } = props
    const navigate = useNavigate()

    return (
        <Container>
            <Logo src={logo} onClick={()=>navigate('/Home')}/>
            <Title type={type}>{content}</Title>
            {type === 'New' &&
                <ButtonNew to='/NewProject' onClick={()=>{ window.localStorage.setItem("currentProject",null);setCurrentProject(null)}} type={type}><BsPlusCircleFill /><p>新專案</p></ButtonNew>
            }
            {type === 'New' &&
                <ButtonControl type={type}><BsGearFill /></ButtonControl>
            }
        </Container>
    );
}

export default Header;
