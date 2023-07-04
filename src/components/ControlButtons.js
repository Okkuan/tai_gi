import styled from "styled-components";

const Container = styled.div`
width: 640px;
height: 128px;
display: flex;
justify-content: center;
align-items: center;
`
const Button = styled.div`
width: 100px;
height: 50px;
background: rgb(256, 256, 256);
display: flex;
justify-content: center;
align-items: center;
border: 1px solid black;
border-right: none;
cursor: pointer;
transition: all .2s;
box-shadow: 2px 2px 0 gray;
&:first-of-type {
    border-radius: 5px 0 0 5px;
}
&:last-of-type {
    border-radius: 0 5px 5px 0;
    border-right: 1px solid black;
    box-shadow: 2px 2px 0 gray;
}
&:hover {
    background: rgb(50, 50, 50);
    color: rgb(256, 256, 256);
    box-shadow: 4px 4px 0 gray;
    transform: translateX(-2px) translateY(-2px);
}
&:active {
    box-shadow: none;
    transform: translateX(0) translateY(0);
}
`

function ControlButtons (props) {
    const{ player } = props

    return <Container>
        <Button onClick={()=>player.playVideo()}>播放</Button>
        <Button onClick={()=>player.pauseVideo()}>暫停</Button>
        <Button onClick={()=>player.stopVideo()}>停止</Button>
        <Button onClick={()=>player.seekTo(player.getCurrentTime()-10)}>後退10秒</Button>
        <Button onClick={()=>player.seekTo(player.getCurrentTime()+10)}>前進10秒</Button>
    </Container>
}

export default ControlButtons