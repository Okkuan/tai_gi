import styled from 'styled-components'
import Header from './components/Header';
import Body from './components/NewProjectBody';
import { useState, useEffect } from "react";
const Container = styled.div`
`
const Footer = styled.div`
width: 100%;
height: 300px;
background: #f2efec;
`

function NewProjectPage(props) {
  const { currentProject, setCurrentProject } = props
  return (
    <Container>
      <Header content='建立新專案' type='NewProject' />
      <Body currentProject={currentProject} setCurrentProject={setCurrentProject}/>
            <Footer />
    </Container>
  );
}

export default NewProjectPage;
