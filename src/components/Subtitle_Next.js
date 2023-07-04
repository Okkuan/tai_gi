import styled from 'styled-components'
import { useEffect, useState } from "react";
const Container = styled.div`
position: relative;
align-items: center;
background: #f2efec;
width: 100%;
height: 185px;
padding-top: 20px; 
${prop => prop.type === 1 && `
background: white;
`}
@media screen and (max-width: 380px) {
  height: auto;
}
`
const SectionContainer = styled.div`
display: flex;
flex-direction: column;
justify-content: center;
align-items: center;
`
const Section = styled.div`
width: 100%;
max-width: 950px;
display: flex;
justify-content: flex-start;
align-items: center;
font-weight: 600;
font-size: 24px;
color: #6f1818;
margin: 5px auto;
${prop => prop.type === 1 && `
color: #aaaaaa;
`}
@media screen and (max-width: 380px) {
flex-wrap:wrap;
}
`
const Time = styled.div`
color: #e1476b;
font-weight: 400;
margin: 5px;
font-size: 15px;
margin: 0 7px;  
${prop => prop.type === 1 && `
color: #aaaaaa;
`}
`
const Img = styled.div`
background: #f00452;
color: white;
height: 35px;
width: 65px;
border-radius: 3px;
display: flex;
justify-content: center;
align-items: center;
margin: 0 10px;
font-size: 18px;
${prop => prop.type === 1 && `
background: #aaaaaa;
`}
`
const Character = styled.div`
display: flex;
font-size: 18px;
color: black;
& p {
  font-weight: 400;
}
${prop => prop.type === 1 && `
color: #aaaaaa;
`}
`
const Input1 = styled.div`
background: white;
color: black;
font-size: 18px;
border: 1px solid #cccccc;
border-radius: 5px;
height: 40px;
width: calc(100% - 200px);
margin: 0 12px;
display: flex;
justify-content: flex-start;
align-items: center;
padding: 0 10px;
${prop => prop.type === 1 && `
color: #aaaaaa;
border: none;
`}
@media screen and (max-width: 380px) {
  width: 370px;
}
`
const SaveButton = styled.div`
width: 98px;
height: 36px;
background: #ec8500;
color: #FFF;
border-radius: 5px; 
font-size: 18px;
display: flex;
justify-content: center;
align-items: center;
top: 167px;
z-index: 1;
margin-top: 18px; 
margin-left: 760px;
cursor: pointer;
box-shadow: 0px 0px 0px 0px rgba(25, 118, 210, 0.16);
transition: box-shadow .1s;
&:hover {
  box-shadow: 0px 0px 0px 8px rgba(25, 118, 210, 0.16);
}
@media screen and (max-width: 380px) {
  margin: 0;
  margin-top: 18px; 
}
`
function Subtitle_Next(props) {
  const { type, states, order } = props
  const now = order + Number(type)
  if (states) {
    if (now > (states.length - 1)) {
      return (
        <Container type={type}>
          <SectionContainer>
            <Section type={type}>
              <Time type={type}>&nbsp;-&nbsp;:&nbsp;-&nbsp;&nbsp;&nbsp;--{'>'}&nbsp;&nbsp;&nbsp;-&nbsp;:&nbsp;-&nbsp;</Time>
              <Img type={type}>{'預備'}</Img>
              <Character type={type}>---&nbsp;/<p>&nbsp;---</p></Character>
            </Section>
            <Section type={type}>台語按呢講<Input1 type={type}>-</Input1></Section>
            <Section type={type}>華語這樣說<Input1 type={type}>-</Input1></Section>
          </SectionContainer>
        </Container>
      )
    }
    return (
      <Container type={type}>
        <SectionContainer>
          <Section type={type}>
            <Time type={type}>
              {states[now].startTime.slice(3, 8)}&nbsp;--{'>'}&nbsp;{now === (states.length - 1) ? states[now].endTime.slice(3, 8) : states[now + 1].startTime.slice(3, 8)}
            </Time>
            <Img type={type}>{type === 0 ? '配音' : '預備'}</Img>
            <Character type={type}>{states[now].voiceActor.voiceCharacter}&nbsp;/<p>&nbsp;{states[now].voiceActor.voiceActor}</p></Character>
          </Section>
          <Section type={type}>台語按呢講<Input1 type={type}>{states[now].textMinnan}</Input1></Section>
          <Section type={type}>華語這樣說<Input1 type={type}>{states[now].textTw}</Input1></Section>
          {type === 0 && <SaveButton>儲存修改</SaveButton>}
        </SectionContainer>
      </Container>
    );
  }
}

export default Subtitle_Next;
