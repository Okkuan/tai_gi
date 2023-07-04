import styled from "styled-components";
import HomePage from "./HomePage";
import RecordingPage from "./RecordingPage";
import AchievementPage from "./AchievementPage";
import NewProjectPage from "./NewProjectPage";
import LoginPage from "./LoginPage";
import { HashRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";

const Container = styled.div``;

function App() {
  const [currentProject, setCurrentProject] = useState([]);
  return (
    <Container>
      <HashRouter>
        <Routes>
          <Route
            exact
            path="Login"
            element={
              <LoginPage
              />
            }
          />
          <Route
            exact
            path="*"
            element={
              <HomePage
                currentProject={currentProject}
                setCurrentProject={setCurrentProject}
              />
            }
          />
          <Route
            exact
            path="NewProject"
            element={
              <NewProjectPage
                currentProject={currentProject}
                setCurrentProject={setCurrentProject}
              />
            }
          />
          <Route
            exact
            path="Recording"
            element={
              <RecordingPage
                currentProject={currentProject}
                setCurrentProject={setCurrentProject}
              />
            }
          />
          <Route
            exact
            path="Achievement"
            element={
              <AchievementPage
                currentProject={currentProject}
                setCurrentProject={setCurrentProject}
              />
            }
          />
        </Routes>
      </HashRouter>
    </Container>
  );
}

export default App;
