import styled from 'styled-components'
import Header from './components/Header';
import Body from './components/AchievementBody';

const Container = styled.div`
`

function RecordingPage() {
  return (
    <Container>
      <Header content='生活對話：我們一起去看展覽好嗎?' />
      <Body />
    </Container>
  );
}

export default RecordingPage;
