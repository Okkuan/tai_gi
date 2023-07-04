import styled from 'styled-components'
import YoutubeIframe from './components/YoutubeIframe'
import ControlButtons from './components/ControlButtons'
import { useState } from 'react'
const Container = styled.div`
`
function YoutubePage() {
    const [player, setPlayer] = useState(null)
    return (
        <Container>
            <YoutubeIframe
                videoId="Ga22mpTDS6A"
                startTime={1005}
                player={player}
                setPlayer={setPlayer}
            />
            <ControlButtons player={player} />
        </Container>
    );
}

export default YoutubePage;
