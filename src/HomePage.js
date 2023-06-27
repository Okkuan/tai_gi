import styled from 'styled-components'
import Header from './components/Header';
import Body from './components/HomePageBody';

const Container = styled.div`
`

function HomePage(props) {
  const { currentProject, setCurrentProject } = props
  return (
    <Container>
      <Header currentProject={currentProject} setCurrentProject={setCurrentProject} type='New'/>
      <Body currentProject={currentProject} setCurrentProject={setCurrentProject} />
    </Container>
  );
}

export default HomePage;
