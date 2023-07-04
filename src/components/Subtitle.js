import styled from 'styled-components'
import { useEffect, useState } from "react";
import { getAudioCombine, getItemById, createItem, updateItem } from "../API/Api";
import { useAlert } from 'react-alert';
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
const Input = styled.input`
  border: 1px solid #dcdcdc;
  font-weight: 600;
  font-size: 22px;
  border-radius: 5px;
  padding: 0 10px;
  width: calc(100% - 142px);
  height: 45px;
  ::placeholder {
    color: #dddddd;
  }
  @media screen and (max-width: 380px) {
  width: 100%;
  }
`;

const Select = styled.select`
  border: 1px solid #dcdcdc;
  font-weight: 600;
  font-size: 22px;
  border-radius: 5px;
  margin-right: 20px;
  width: auto;
  height: 45px;
  padding: 0 5px;
`;
const SectionContainer = styled.div`
max-width: 950px;
margin: auto;
display: flex;
position: relative;
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
p {
  width: 120px;
}
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
z-index: 1;
cursor: pointer;
position: absolute;
right: 0;
bottom: -42px;
box-shadow: 0px 0px 0px 0px rgba(25, 118, 210, 0.16);
transition: box-shadow .1s;
&:hover {
  box-shadow: 0px 0px 0px 8px rgba(25, 118, 210, 0.16);
}
@media screen and (max-width: 380px) {
  position: static;
  margin: 0;
}
`
class voiceActor{
  constructor(id) {
    this.id = id||0 ;
  }
}
class SubtitleData {
  constructor(textTw,textMinnan,voiceActor_id) {
    this.textTw = textTw || '';
    this.textMinnan = textMinnan || '';
    this.voiceActor = voiceActor_id||0;
  }
}

function Subtitle(props) {
  const { type, states, order,currentProject, setCurrentProject} = props
  const [subid, setsubid] = useState(null);  
  const [selectedVoiceActor, setSelectedVoiceActor] = useState(0);
  const [minText, setminText] = useState("");
  const [twText, settwText] = useState("");
  const now = order + Number(type);
  const [voiceActorsObjs, setVoiceActorsObjs] = useState([]);
  const alert = useAlert();
let audio;
  useEffect(() => {
    if (states&&now==0) {
      setsubid(states[now].id)
      setminText(states[now].textMinnan);
      settwText(states[now].textTw);
      setSelectedVoiceActor(states[now].voiceActor);
      //audio = document.getElementById("audioPlayer");
      //audio.src="http://localhost:8081/"+states[now].subtitleVoiceLink+'/test';
    //  let audio_data=  getItemById("subtitle/audio",states[now].id)
    //  .then((response) => {


    //  })
    //  .catch((error) => {
    //    console.error("Error:", error);
    //    // Handle any errors
    //  });
    }
  }, [states]);
  useEffect(() => {


    // if(!states){
  // if(currentProject&&currentProject){


  // }

      console.log('type:'+JSON.stringify(type))
      console.log('states:'+JSON.stringify(states))
      console.log('order:'+JSON.stringify(order))
      console.log('now:'+JSON.stringify(now))
      //   setminText(states[order].textMinnan);
    //   settwText(states[order].textTw);
     //}

  },[]);
  useEffect(() => {
    if(states){
  
      setsubid(states[now].id)
      setminText(states[now].textMinnan);
      settwText(states[now].textTw);
      setSelectedVoiceActor(states[now].voiceActor);
      //audio = document.getElementById("audioPlayer");
      //audio.src="http://https://7acd-61-222-207-205.ngrok-free.app:8081/"+states[now].subtitleVoiceLink+'/test';
    }
    },[order]);
    const handleSave = ()=>{
      let update_v=new voiceActor(selectedVoiceActor);
      let s=new SubtitleData(twText,minText,update_v);

      //s.addVoiceActor(update_v);
      let proj = updateItem("subtitle/Text", subid,s)
      .then((response) => {
        console.log('after update subtext=>'+JSON.stringify(response))
        alert.success('更新字幕成功!');
        states[now].textMinnan=minText;
        states[now].textTw=twText;
        states[now].voiceActor=response.voiceActor;
      })
      .catch((error) => {
        console.error("Error:", error);
        // Handle any errors
      });


    };
    const handleVoiceActorSelectChange = (event) => {
      const selectedValue = event.target.value;
      setSelectedVoiceActor(selectedValue);
      // 執行其他相應的操作，例如更新狀態或觸發其他函數
    };
    const handleCombine = ()=>{

      if(window.localStorage.getItem("currentProject")){
        let p=JSON.parse( window.localStorage.getItem("currentProject"));
      let proj = getAudioCombine(p.id)
      .then((response) => {
        alert.success(response);
      })
      .catch((error) => {
        alert.error(error);
        console.error("Error:", error);
        // Handle any errors
      });

    }else{
      alert.error('系統有誤，請重新進入此專案');
    }
    };
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
          <Section type={type}><p>台語按呢講</p><Input  type={type} value={minText} onChange={(e) => setminText(e.target.value)}></Input></Section>
          <Section type={type}><p>華語這樣說</p><Input  type={type} value={twText} onChange={(e) => settwText(e.target.value)}></Input></Section>
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
            <Character type={type}>
            <Select
              value={selectedVoiceActor}
              onChange={handleVoiceActorSelectChange}
            >
              {((!currentProject)&&(!currentProject.voiceActors))||currentProject.voiceActors.map((single) => (

<option id={single.id} key={single.id} value={single.id}>

{single.voiceCharacter}-{single.voiceActor}
</option>
                     ))}
                   </Select>
            </Character>
          </Section>
          <Section type={type}><p>台語按呢講</p><Input  type={type} value={minText} onChange={(e) => setminText(e.target.value)}></Input></Section>
          <Section type={type}><p>華語這樣說</p><Input  type={type} value={twText} onChange={(e) => settwText(e.target.value)}></Input></Section>
          {type === 0 && <SaveButton onClick={handleSave}>儲存修改</SaveButton>}

        </SectionContainer>
      </Container>
    );
  }
}

export default Subtitle;
