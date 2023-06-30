import styled from "styled-components";
import Buttons from "./Buttons";
import Subtitle from "./Subtitle";
import Subtitle_Next from "./Subtitle_Next";
import Button from "./Button";
import YoutubeIframe from "./YoutubeIframe";
import { useState, useEffect } from "react";
import CallApi from "../API/CallApi";
import { getAll, getItemById, createItem, updateItem } from "../API/Api";
const Container = styled.div`
  position: relative;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: -20px 0 0 0;
  font-weight: 600;
  @media screen and (max-width: 380px) {
    margin: 0;
  }
`;
const YTSize = styled.div`
  width: 100%;
  max-width: 400px;
  aspect-ratio: 4/3;
`;
const Video = styled.div`
  width: 100%;
  max-width: 400px;
  aspect-ratio: 4/3;
  background-size: cover;
  box-shadow: 0 0 5px gray;
  position: absolute;
  top: 0;
  cursor: not-allowed;
`;
const BBB = styled.button``;
function Body(props) {
  const { currentProject, setCurrentProject } = props;
  const [player, setPlayer] = useState(null);
  const [order, setOrder] = useState(0);

  const [states, setStates] = useState("");
  let videoId;

  if (currentProject) {
    videoId = currentProject.learnResourceLink.match(/\w+:\/\/[^/:]+[^# ]*v=([\w\-]+)/)[1];
  } else {
    videoId = JSON.parse(
      window.localStorage.getItem("currentProject")
    ).learnResourceLink.match(/\w+:\/\/[^/:]+[^# ]*v=([\w\-]+)/)[1];
  }

  useEffect(() => {
    if (currentProject) {

      CallApi('subtitle/eachClassLearnProject/',setStates,'',currentProject.id);
      
      let proj = getItemById("eachClassLearnProject", currentProject.id)
        .then((response) => {
          console.log(
            "eachClassLearnProject:" + JSON.stringify(response)
          );
          setCurrentProject(response);
          window.localStorage.setItem("currentProject",JSON.stringify(response));
        })
        .catch((error) => {
          console.error("Error:", error);
          // Handle any errors
        });
    }
    if (window.localStorage.getItem("states")) {
      setStates(JSON.parse(window.localStorage.getItem("states")));
    }
    if (currentProject) {
       CallApi('subtitle/eachClassLearnProject/',setStates,'',currentProject.id)
      
    }
  }, []);
  useEffect(() => {
    if (states) {
  window.localStorage.setItem("states", JSON.stringify(states));
      window.localStorage.setItem("currentOrder", order);
    }
  }, [states]);
  useEffect(() => {
    if (states) {
      window.localStorage.setItem("currentOrder", order);
    }
  }, [order]);
  useEffect(() => {
    if (currentProject) {
      window.localStorage.setItem("currentProject", JSON.stringify(currentProject));
    }
  }, [currentProject]);
  return (
    <Container>
      <YTSize>
        <YoutubeIframe
          videoId={videoId}
          startTime={0}
          player={player}
          setPlayer={setPlayer}
        />
      </YTSize>
      <Video />
      <Buttons
        player={player}
        setOrder={setOrder}
        order={order}
        states={states}
      />
      <Subtitle type={0} states={states} order={order} />
      <Subtitle_Next type={1} states={states} order={order} />
      <Button next="/Home" text="cancel" />
      <Button next="/Achievement" text="ok" />
    </Container>
  );
}

export default Body;
