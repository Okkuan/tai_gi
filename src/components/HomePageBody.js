import styled from "styled-components";
import { useState, useEffect } from "react";
import banner from "../images/banner_01.png";
import { BsFillCheckCircleFill } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import { getAll, getProjectPage, createItem, updateItem } from "../API/Api";
const Container = styled.div`
  width: 100%;
  background-color: #faf8f6;
  padding-top: 50px;
  padding-bottom: 100px;
  font-weight: 600;
  @media screen and (max-width: 380px) {
    padding-top: 0;
  }
`;
const InfoContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  @media screen and (max-width: 380px) {
    flex-direction: column;
  }
`;
const LeftContainer = styled.div`
  display: flex;
  justify-content: top;
  align-items: flex-end;
  flex-direction: column;
  border-right: 2px solid #dcd7d2;
  height: 600px;
  @media screen and (max-width: 380px) {
    flex-direction: row;
    flex-wrap: wrap;
    height: auto;
    border-right: none;
    border-bottom: 2px solid #dcd7d2;
  }
`;
const Banner = styled.div`
  background: url(${banner});
  width: 240px;
  height: 65px;
  @media screen and (max-width: 380px) {
    margin-right: 50px;
  }
`;
const Nav = styled.div`
  margin: 5px 20px;
  font-size: 22px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  &:hover {
    color: #cb4832;
  }
  @media screen and (max-width: 380px) {
    font-size: 20px;
  }
`;
const Icon = styled.div`
  margin-top: 6px;
  margin-left: 20px;
  color: #faf8f6;
  ${(props) =>
    props.active &&
    `
    color: #dcd7d2;
`}
  @media screen and (max-width:380px) {
    margin-left: 5px;
  }
`;
const RightContainer = styled.div`
  position: relative;
  height: 600px;
  padding: 0 40px;
  text-align: center;
  @media screen and (max-width: 380px) {
    font-size: 20px;
    padding: 0;
  }
`;
const List = styled.div`
  padding: 13px 0;
  font-size: 22px;
  border-bottom: 2px dotted #dcd7d2;
  width: 444px;
  cursor: pointer;
  &:hover {
    color: #cb4832;
  }
  @media screen and (max-width: 380px) {
    width: 370px;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
  }
`;
const PageNumContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  width: 100%;
  bottom: -60px;
  right: 0;
  user-select: none;
`;
const PageNum = styled.div`
  cursor: pointer;
  margin: 10px;
  font-size: 22px;
  ${(props) =>
    props.active &&
    `
color: #cb4832;
`}
`;
function HomePageBody(props) {
  const { currentProject, setCurrentProject } = props
  const [selectedGrade, setSelectedGrade] = useState(1);
  const [projectLists, setProjectLists] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPageCount, setTotalPageCount] = useState(0);
  const pageSize = 10;
  const navigate = useNavigate()
  useEffect(() => {
    // fetchPorject(selectedGrade, currentPage);
    const grade_response = getProjectPage("eachClassLearnProject", selectedGrade, currentPage, pageSize,1)
      .then((response) => {
        console.log("grade:" + JSON.stringify(response));
        console.log(response.totalPages);
        setProjectLists(response.content);
        setTotalPageCount(response.totalPages);
        // Process the created item
      })
      .catch((error) => {
        console.error("Error:", error);
        // Handle any errors
      });
  }, [selectedGrade, currentPage]);


  const handleGradeClick = (grade) => {
    setSelectedGrade(grade);
    setCurrentPage(1);
  };

  const handlePageClick = (page) => {
    setCurrentPage(page);
  };
  const handleListClick = (e) => {
    const i = Number(e.target.id);
    setCurrentProject(projectLists.filter(s => s.id === i)[0]);
    
    window.localStorage.setItem("currentProject",JSON.stringify( projectLists.filter(s => s.id === i)[0]));
    navigate('/NewProject');
  };

  return (
    <Container>
      <InfoContainer>
        <LeftContainer>
          <Banner />
          <Nav onClick={() => handleGradeClick(1)}>
            一年級
            <Icon active={selectedGrade === 1}>
              <BsFillCheckCircleFill />
            </Icon>
          </Nav>
          <Nav onClick={() => handleGradeClick(2)}>
            二年級
            <Icon active={selectedGrade === 2}>
              <BsFillCheckCircleFill />
            </Icon>
          </Nav>
          <Nav onClick={() => handleGradeClick(3)}>
            三年級
            <Icon active={selectedGrade === 3}>
              <BsFillCheckCircleFill />
            </Icon>
          </Nav>
        </LeftContainer>
        <RightContainer>
          {projectLists.map((single) => (
            <List key={single.id} onClick={handleListClick} id={single.id}>
              {single.learnProjectName}
            </List>
          ))}

          {totalPageCount > 1 && (
            <PageNumContainer>
              {Array.from(
                { length: totalPageCount },
                (_, index) => index + 1
              ).map((page) => (
                <PageNum active={currentPage===page} key={page} onClick={() => handlePageClick(page)}>
                  {page}
                </PageNum>
              ))}
            </PageNumContainer>
          )}
        </RightContainer>
      </InfoContainer>
    </Container>
  );
}

export default HomePageBody;