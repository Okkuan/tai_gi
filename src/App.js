import styled from "styled-components";
import HomePage from "./HomePage";
import RecordingPage from "./RecordingPage";
import AchievementPage from "./AchievementPage";
import NewProjectPage from "./NewProjectPage";
import { HashRouter, Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";

const Container = styled.div``;

function App() {
  const [currentProject, setCurrentProject] = useState([]);
  useEffect(() => {
//     console.log(
//       "window.history :" + JSON.stringify(window.history.scrollRestoration)
//     );
//     console.log(
//       "window.history.state :" + JSON.stringify(window.history.state)
//     );
//   //  if (document.URL.includes("Achievement")) {
//      alert("current page :" + document.URL);
//       if (document.getElementById("AchievementAudio")) {
//         console.log("has audio check" );
//       }
//    // }
  });
  return (
    <Container>
      <HashRouter>
        <Routes>
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
