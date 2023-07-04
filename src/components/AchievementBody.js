import styled from "styled-components";
import Slider from "@mui/material/Slider";
import SwitchButton from "./SwitchButton";
import { useState } from "react";
import Button from "./Button";
import YoutubeIframe from "./YoutubeIframeMute";
import { useEffect, useRef } from "react";
import CallApi from "../API/CallApi";
import {
  getAudioCombine,
  getItemById,
  createItem,
  updateItem,
} from "../API/Api";
const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: -30px 0 0 0;
  font-weight: 600;
  @media screen and (max-width: 780px) {
    margin: 0;
  }
`;
const Video = styled.div`
  position: relative;
  width: 750px;
  aspect-ratio: 750/563;
  box-shadow: 0 0 5px gray;
  @media screen and (max-width: 780px) {
    width: 500px;
  }
  @media screen and (max-width: 520px) {
    width: 365px;
  }
`;
const TestSlider = styled(Slider)`
  color: #52af77;
  height: 8px;
  width: 250px;
  & .MuiSlider-thumb {
    height: 20px;
    width: 20px;
    background: #fff;
  }
  &:nth-of-type(2) {
    margin-right: 25px;
  }
`;
const Control = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 10px 0;
  & p {
    margin: 0 15px 0 20px;
  }
  @media screen and (max-width: 750px) {
    width: 365px;
    flex-wrap: wrap;
    justify-content: left;
    p {
      margin: 0 10px 0 10px;
    }
  }
`;
const ControlBk = styled.div`
  position: relative;
  z-index: -1;
  background: #e1ddda;
  width: 100%;
  height: 100px;
  margin: -100px 0;
`;
const InfoContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: start;
  width: 100%;
  height: 180px;
  background: #f2efec;
  margin: 100px auto 0 auto;
  @media screen and (max-width: 750px) {
    flex-direction: column;
    height: 300px;
  }
`;
const Info = styled.div`
  display: flex;
  justify-content: center;
  align-items: start;
  flex-direction: column;
  width: 375px;
  height: 100%;
  margin-left: 50px;
  @media screen and (max-width: 750px) {
    margin: auto;
  }
  @media screen and (max-width: 380px) {
    width: 100%;
  }
`;
const InfoText = styled.div`
  display: flex;
  justify-content: center;
  align-items: start;
  margin: 5px 0;
  font-size: 15px;
  p:last-of-type {
    width: calc(100% - 80px);
  }
  p:first-of-type {
    width: 80px;
  }
`;
const InfoText2 = styled(InfoText)`
  color: #bb6051;
  & p {
    font-weight: 400;
  }
`;
const SubtitleContainer = styled.div`
  display: ${(props) => (props.show ? "flex" : "none")};
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 100%;
  position: absolute;
  bottom: 60px;
`;
const Subtitle = styled.div`
  display: ${(props) => (props.show ? "block" : "none")};
  color: #fff;
  background: rgba(0, 0, 0, 0.5);
`;
function TextBlock(props) {
  if (props && props.proj && props.proj.voiceActors) {
    return (
      <Info>
        <InfoText>配音人員：{props.proj.voiceActors.map((single) => (single.voiceActor)).join('、')}

        </InfoText>


        {props.proj.voiceActors.map((single) =>

        (
          <InfoText2 key={single.id}>
            {single.voiceCharacter}&nbsp;/&nbsp;
            <p>{single.voiceActor}</p>
          </InfoText2>
        ))}
      </Info>
    );
  }
  return (
    <Info>
      <InfoText>配音人員：A小組-林OO、張OO、吳OO</InfoText>

      <InfoText2>
        女孩角色&nbsp;/&nbsp;
        <p>林小雯</p>
      </InfoText2>
      <InfoText2>
        男孩角色&nbsp;/&nbsp;
        <p>張小明</p>
      </InfoText2>
      <InfoText2>
        售票員角色&nbsp;/&nbsp;
        <p>指導老師</p>
      </InfoText2>
    </Info>
  );
}

function Body(props) {
  const [currentProject, setCurrentProject] = useState(null);

  const [soundValue, setSoundValue] = useState(30);
  const [voiceValue, setVoiceValue] = useState(30);
  const [switchOne, setSwitchOne] = useState(true);
  const [switchTwo, setSwitchTwo] = useState(false);
  const [switchThree, setSwitchThree] = useState(true);
  const [data, setData] = useState("");
  const [player, setPlayer] = useState("");
  const [states, setStates] = useState("");
  const [showSubtitle, setShowSubtitle] = useState(false);
  const videoState = useRef(0);
  const timer = useRef("");
  let audio 
  let videoId;
  if (currentProject) {
    videoId = currentProject.learnResourceLink.match(
      /\w+:\/\/[^/:]+[^# ]*v=([\w\-]+)/
    )[1];
  } else {
    videoId = JSON.parse(
      window.localStorage.getItem("currentProject")
    ).learnResourceLink.match(/\w+:\/\/[^/:]+[^# ]*v=([\w\-]+)/)[1];
  }
  //拿字幕資料
  useEffect(() => {
    if (window.localStorage.getItem("currentProject")) {
      let p = JSON.parse(window.localStorage.getItem("currentProject"));
      setCurrentProject(p);
      // let proj = getAudioCombine(p.id)
      //   .then((response) => {

      //   })
      //   .catch((error) => {
      //     console.error("Error:", error);
      //     // Handle any errors
      //   });


    } else {
    }

    CallApi(
      "subtitle/eachClassLearnProject/",
      setStates,
      "",
      JSON.parse(window.localStorage.getItem("currentProject")).id
    );
    if (window.localStorage.getItem("states")) {
      setStates(JSON.parse(window.localStorage.getItem("states")));
    }
  }, []);


  //監聽影片撥放狀態
  useEffect(() => {
    if (player && states) {
      const videoStates = (e) => {
        if (e.data === 1) {
          console.log("影片開始撥放，目前時間:" + player.getCurrentTime());
          audio = document.getElementById("audioPlayer")
          audio.src = "https://7acd-61-222-207-205.ngrok-free.app/subtitle/audio/Result";
          audio.currentTime = player.getCurrentTime()
          audio.load();
          audio.play();
          subtitleSearch(0, states);
        } else if (e.data === 2) {
          console.log(
            "影片暫停撥放, videoState.current =" + videoState.current
          );
          audio.pause();
          clearTimeout(timer.current);
        }
      };
      if (videoState.current === 0) {
        player.addEventListener("onStateChange", videoStates, true);
        videoState.current = 1;
      }
      return () => {
        // player.removeEventListener("onStateChange", videoStates,true);
      };
    }
  }, [player, states]);
  // 字幕時間轉換秒數
  const time = (t) => {
    return (
      Number(t.slice(3, 5)) * 60 +
      Number(t.slice(6, 8)) +
      Number(t.slice(9, 11)) * 0.001
    );
  };
  //判斷顯示字幕
  let state;
  const subtitleSearch = (e, sss) => {
    const crttentTime = player.getCurrentTime();
    if (e) {
      state = sss.filter((s) => time(s.startTime) > crttentTime)[0];
    } else if (
      sss.filter(
        (s) => time(s.startTime) < crttentTime && time(s.endTime) > crttentTime
      ).length === 0
    ) {
      state = sss.filter((s) => time(s.startTime) > crttentTime)[0];
    } else {
      state = sss.filter(
        (s) => time(s.startTime) < crttentTime && time(s.endTime) > crttentTime
      )[0];
    }
    if (state) {
      setData(state);
      if (time(state.startTime) > player.getCurrentTime() && !showSubtitle) {
        timer.current = setTimeout(() => {
          setShowSubtitle(true);
        }, (time(state.startTime) - player.getCurrentTime()) * 1000);
      } else if (
        time(state.startTime) < player.getCurrentTime() &&
        !showSubtitle
      ) {
        setShowSubtitle(true);
        timer.current = setTimeout(() => {
          setShowSubtitle(false);
        }, (time(state.endTime) - player.getCurrentTime()) * 1000);
      } else if (showSubtitle) {
        timer.current = setTimeout(() => {
          setShowSubtitle(false);
        }, (time(state.endTime) - player.getCurrentTime()) * 1000);
      } else {
        subtitleSearch(1, sss);
      }
    }
  };
  //重覆更新字幕
  useEffect(() => {
    if (states) {
      subtitleSearch(0, states);
    }
  }, [showSubtitle]);

  return (
    <Container>
      <Video>
        <YoutubeIframe
          videoId={videoId}
          startTime={0}
          player={player}
          setPlayer={setPlayer}
        />
        <SubtitleContainer show={showSubtitle}>
          <Subtitle show={switchOne}>{data ? data.textTw : ""}</Subtitle>
          <Subtitle show={switchTwo}>{data ? data.textMinnan : ""}</Subtitle>
        </SubtitleContainer>
      </Video>
      <Control>
        <p>背景音</p>
        <TestSlider
          value={soundValue}
          sx={{ width: 90, color: "#80c24e", height: 7 }}
          onChange={(e) => setSoundValue(Number(e.target.value))}
        />
        <p>配音</p>
        <TestSlider
          value={voiceValue}
          sx={{ width: 90, color: "#80c24e", height: 7 }}
          onChange={(e) => setVoiceValue(Number(e.target.value))}
        />
        <p>台文</p>
        <SwitchButton
          clicked={() => setSwitchOne(!switchOne)}
          active={switchOne}
        />
        <p>華文</p>
        <SwitchButton
          clicked={() => setSwitchTwo(!switchTwo)}
          active={switchTwo}
        />
        <p>字幕位置</p>
        <SwitchButton
          clicked={() => setSwitchThree(!switchThree)}
          active={switchThree}
          width={43}
          text={1}
          color="#90a3b1"
        />
      </Control>
      <ControlBk />
      <InfoContainer>
        <Info>
          <InfoText>
            <p>配音時間：</p>
            <p>2023&nbsp;/&nbsp;03&nbsp;/&nbsp;23&nbsp;&nbsp;15:47</p>
          </InfoText>
          <InfoText>
            <p>配音長度：</p>
            <p>05:12:09</p>
          </InfoText>
          <InfoText>
            <p>專案名稱：</p>
            <p>
              {currentProject
                ? currentProject.learnProjectName
                : "本土語言-台語-期末分組作業-A小組"}
            </p>
          </InfoText>
          <InfoText>
            <p>影片說明：</p>
            <p>
              {currentProject
                ? currentProject.learnProjectDescription
                : "A小組補交作業(第一次)"}
            </p>
          </InfoText>
        </Info>
        <TextBlock proj={currentProject}></TextBlock>
      </InfoContainer>
      <Button next="/Home" text="cancel" x="1" />
      <audio id="audioPlayer" style={{ "display": "none" }} controls={true}></audio>
    </Container>
  );
}

export default Body;
