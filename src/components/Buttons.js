import styled from "styled-components";
import icon00 from "../images/icon_00.png";
import icon01 from "../images/icon_01.png";
import icon02 from "../images/icon_02.png";
import icon03 from "../images/icon_03.png";
import icon04 from "../images/icon_04.png";
import icon05 from "../images/icon_05.png";
import icon06 from "../images/icon_06.png";
import { useEffect, useState } from "react";
import { playRecording, startRecording, stopRecording } from "./Rec";
const Container = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
  flex-direction: column;
  margin-bottom: 15px;
  @media screen and (max-width: 680px) {
    transform: scale(0.8);
  }
  @media screen and (max-width: 500px) {
    transform: scale(0.58);
  }
`;
const Section = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
`;
const ButtonContainer = styled.div`
  cursor: pointer;
`;
const Button = styled.div`
  width: 70px;
  height: 70px;
  margin: 20px 10px 0 10px;
  background: url(${(prop) => prop.bk});
  &:hover {
    filter: drop-shadow(0px 0px 4px rgba(25, 118, 210, 0.6));
  }
`;
const Text = styled.div`
  width: 70px;
  margin: 0 10px;
  text-align: center;
  font-size: 18px;
  font-weight: 600;
  color: ${(props) => props.color};
`;
const AudioPlayer = styled.audio`
  display: none;
`;

function Buttons(props) {
  const { player, setOrder, order, states } = props;
  const buttonIcon = [icon00, icon01, icon02, icon03, icon04, icon05, icon06];
  const buttonText = ["", "原音", "錄音", "停止", "試聽", "重錄", ""];
  const textColor = [
    "#FFF",
    "#9f8470",
    "#ed8898",
    "#ffce31",
    "#008c9d",
    "#77ad21",
    "#000",
  ];
  const [audioSRC, setaudioSRC] = useState("");
  let isRecording = 0; // 紀錄錄音狀態，0 表示未錄音，1 表示正在錄音，2 播放原音中
  let timer; // 計時器
  let voiceSave; // 音頻保存的陣列
  let audio; // 音頻元素

  // 設定錄音參數
  useEffect(() => {
    audio = document.getElementById("audioPlayer");
    audio.controls = true;
    if (!order) {
      setOrder(0);
    }
  }, []);
  useEffect(() => {
    voiceSave = Array(states.length); // 初始化音頻保存的陣列
    // if (states) {
    //   let audio = document.getElementById("audioPlayer");
    //   if (

    //     states[order].subtitleVoiceLink.includes("type")
    //   ) {
    //     setaudioSRC(
    //       "http://https://8e0a-2001-b400-e248-4114-f0b4-73b8-f56f-a835.ngrok-free.app:8081" + states[order].subtitleVoiceLink + ""
    //     );
    //   } else {
    //     setaudioSRC(
    //       "http://localhost:8081" +
    //         states[order].subtitleVoiceLink +
    //         "/type/test"
    //     );
    //   }
    //   //audio.src="http://localhost:8081"+      states[order].subtitleVoiceLink+"/type/test";
    //}
    // if (order) {
    //   console.log("states change order:" + order);
    // }
    // if (states) {
    //   if (states[0].subtitleVoiceLink.includes("type")) {
    //     setaudioSRC("http://localhost:8081" + states[0].subtitleVoiceLink + "");
    //   } else {
    //     setaudioSRC(
    //       "http://localhost:8081" + states[0].subtitleVoiceLink + "/type/test"
    //     );
    //   }
    //   console.log(
    //     "states change states:" +
    //       "http://localhost:8081" +
    //       states[order].subtitleVoiceLink
    //   );
    // }

    //  console.log("states change states:" + JSON.stringify(states));
  }, [states]);

  useEffect(() => {
    voiceSave = Array(states.length); // 初始化音頻保存的陣列
    // if (states) {
    //   if (order) {
    //     if (states[order].subtitleVoiceLink.includes("type")) {
    //       setaudioSRC(
    //         "http://localhost:8081" + states[order].subtitleVoiceLink + ""
    //       );
    //     } else {
    //       setaudioSRC(
    //         "http://localhost:8081" +
    //           states[order].subtitleVoiceLink +
    //           "/type/test"
    //       );
    //     }
    //   } else {
    //     if (states[0].subtitleVoiceLink.includes("type")) {
    //       setaudioSRC(
    //         "http://localhost:8081" + states[0].subtitleVoiceLink + ""
    //       );
    //     } else {
    //       setaudioSRC(
    //         "http://localhost:8081" + states[0].subtitleVoiceLink + "/type/test"
    //       );
    //     }
    //   }
    // }
    console.log("order change order:" + order);
    console.log("order change audioSRC:" + audioSRC);
  }, [order]);
  // 計算時間
  const time = (t) => {
    return (
      Number(t.slice(3, 5)) * 60 +
      Number(t.slice(6, 8)) +
      Number(t.slice(9, 11)) * 0.001
    );
  };

  // 影片計時停止
  const stopVideo = (time) => {
    setTimeout(() => {
      player.pauseVideo();
      isRecording = 0;
    }, time);
  };

  // 按鈕功能↓
  // 切換到下一個字幕
  const handleNextStage = () => {
    if (order < states.length - 1 || order == 0) {
      setOrder(order + 1);
      player.seekTo(time(states[order + 1].startTime));
      player.pauseVideo();
      clearInterval(timer);
    }
  };

  // 開始播放原音
  const handleVoicePlay = () => {
    let now = order;
    // 判斷是否正在錄音中
    if (isRecording === 0) {
      console.log("99999")
      // 判斷是否為最後一段字幕
      if (now !== states.length - 1) {
        player.seekTo(time(states[now].startTime));
      } else {
        player.seekTo(time(states[now].startTime));
      }
      // 影片播放
      player.unMute();
      player.playVideo();
      isRecording = 2;
      timer = setInterval(function () {
        const currentTime = player.getCurrentTime();
        // 判斷是否為最後一段字幕
        if (now === states.length - 1) {
          if (currentTime > time(states[now].endTime) || isRecording === 0) {
            player.pauseVideo();
            clearInterval(timer);
            isRecording = 0;
          }
        } else if (
          currentTime > time(states[now + 1].startTime) ||
          isRecording === 0
        ) {
          player.pauseVideo();
          clearInterval(timer);
          isRecording = 0;
        }
      }, 10);
    }
  };

  // 開始錄音
  const handleRecordingStart = () => {
    let now = order;
    // 判斷是否正在錄音中
    if (isRecording === 0) {
      // 判斷是否為最後一段字幕
      if (now !== states.length - 1) {
        player.seekTo(time(states[now].startTime));
      } else {
        player.seekTo(time(states[now].startTime));
      }
      // 影片播放
      player.mute(); // 靜音
      player.playVideo();
      isRecording = 1;
      // 判斷是否為最後一段字幕,開始錄音
      if (now === states.length - 1) {
        startRecording(
          Number(time(states[now].endTime) - time(states[now].startTime)) * 1000
        );
        stopVideo(
          Number(time(states[now].endTime) - time(states[now].startTime)) * 1000
        );
      } else {
        startRecording(
          Number(
            time(states[now + 1].startTime) - time(states[now].startTime)
          ) * 1000
        );
        stopVideo(
          Number(
            time(states[now + 1].startTime) - time(states[now].startTime)
          ) * 1000
        );
      }
    }
  };

  // 停止
  const handleRecordingStop = () => {
    console.log(isRecording)
    if (isRecording === 1) {
      stopRecording();
      player.pauseVideo();
      isRecording = 0;
    } else if (isRecording === 2) {
      player.pauseVideo();
      isRecording = 0;
    } else if (isRecording === 3) {
      player.pauseVideo();
      document.getElementById('audioPlayer').pause()
      isRecording = 0;
    }
  };

  // 試聽錄音
  const handleListen = () => {
    if (isRecording === 0) {
      playRecording();
      player.seekTo(time(states[order].startTime));
      player.mute();
      player.playVideo();
      isRecording = 3;
      stopVideo(
        Number(
          time(states[order + 1].startTime) - time(states[order].startTime)
        ) * 1000
      );
    }
  };

  // 重錄錄音
  const handleRecordingAgain = () => {
    let now = order;
    player.seekTo(time(states[now].startTime));
    // 影片播放
    player.mute();
    player.playVideo();
    // 開始錄音
    isRecording = 1;
    // 判斷是否為最後一段字幕,開始錄音
    if (now === states.length - 1) {
      startRecording(
        Number(time(states[now].endTime) - time(states[now].startTime)) * 1000
      );
      stopVideo(
        Number(time(states[now].endTime) - time(states[now].startTime)) * 1000
      );
    } else {
      startRecording(
        Number(time(states[now + 1].startTime) - time(states[now].startTime)) *
        1000
      );
      stopVideo(
        Number(time(states[now + 1].startTime) - time(states[now].startTime)) *
        1000
      );
    }
  };

  // 切換到上一個字幕
  const handlePreviousStage = () => {
    if (order > 0) {
      setOrder(order - 1);
      player.seekTo(time(states[order - 1].startTime));
      player.pauseVideo();
      clearInterval(timer);
    }
  };
  function checkLink(subtitleVoiceLink) {
    if (subtitleVoiceLink.includes("type")) {
      return "https://8e0a-2001-b400-e248-4114-f0b4-73b8-f56f-a835.ngrok-free.app" + subtitleVoiceLink + ""
    } else {
      return "https://8e0a-2001-b400-e248-4114-f0b4-73b8-f56f-a835.ngrok-free.app" + subtitleVoiceLink + "/type/test"
    }
  }
  // 定義按鈕對應的函式
  const func = [
    handlePreviousStage,
    handleVoicePlay,
    handleRecordingStart,
    handleRecordingStop,
    handleListen,
    handleRecordingAgain,
    handleNextStage,
  ];
  return (
    <Container>
      <Section>
        {buttonIcon.map((icon, i) => (
          <ButtonContainer key={textColor[i]} onClick={func[i]}>
            <Button bk={icon}></Button>
            <Text color={textColor[i]}>{buttonText[i]}</Text>
          </ButtonContainer>
        ))}
      </Section>
      <AudioPlayer
        id="audioPlayer"
        className="audioPlayer"
        src={states ? (order ? checkLink(states[order].subtitleVoiceLink) : checkLink(states[0].subtitleVoiceLink)) : ""}
        controls={true}
      />
    </Container>
  );
}

export default Buttons;
