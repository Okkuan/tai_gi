import styled from "styled-components";
import { useEffect, useState } from "react";
import axios from "axios";
import { BsFillCheckCircleFill } from "react-icons/bs";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { getAll, getItemById, createItem, updateItem } from "../API/Api";
import { useAlert } from "react-alert";
const Container = styled.div`
  position: relative;
  width: 100%;
  font-weight: 600;
  font-size: 22px;
  background: #faf8f6;
  display: flex;
  justify-content: center;
  align-items: top;
  padding: 80px 0 40px 0;
  @media screen and (max-width: 380px) {
    padding: 0;
    height: 630px;
    display: block;
  }
`;
const Buttons = styled.div`
  width: 300px;
  position: absolute;
  display: flex;
  justify-content: space-between;
  align-items: center;
  bottom: -25px;
  @media screen and (max-width: 380px) {
    bottom: -40px;
    width: 100%;
    justify-content: space-around;
  }
`;
const Button = styled(Link)`
  text-decoration: none;
  width: 140px;
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #fff;
  border-radius: 5px;
  cursor: pointer;
  background: #529e28;
  box-shadow: 0px 0px 0px 0px rgba(25, 118, 210, 0.16);
  transition: box-shadow 0.1s;
  ${(props) =>
    props.color === "blue" &&
    `
background: #4e8cc6;
`}
  &:hover {
    box-shadow: 0px 0px 0px 8px rgba(25, 118, 210, 0.16);
  }
`;
const Button1 = styled(Link)`
  text-decoration: none;
  width: 140px;
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #fff;
  border-radius: 5px;
  cursor: pointer;
  background: #529e28;
  box-shadow: 0px 0px 0px 0px rgba(25, 118, 210, 0.16);
  transition: box-shadow 0.1s;
  ${(props) =>
    props.add === "add" &&
    `
display:none ;
`}
  ${(props) =>
    props.color === "blue" &&
    `
background: #4e8cc6;
`}
  &:hover {
    box-shadow: 0px 0px 0px 8px rgba(25, 118, 210, 0.16);
  }
`;
const Section = styled.div`
  display: flex;
  justify-content: left;
  align-items: right;
  padding: 0 10px;
  width: 100%;
  :nth-of-type(1) {
    margin-top: 5px;
  }
  :nth-of-type(2) {
    margin-top: 19px;
  }
  :nth-of-type(3) {
    margin-top: 10px;
  }
  :nth-of-type(4) {
    margin-top: 10px;
  }
  :nth-of-type(5) {
    margin-top: 10px;
  }
  @media screen and (max-width: 380px) {
    :nth-of-type(1) {
      margin-top: 50px;
    }
    :nth-of-type(2) {
      margin-top: 60px;
    }
    :nth-of-type(3) {
      margin-top: 55px;
    }
    :nth-of-type(4) {
      margin-top: 55px;
    }
    :nth-of-type(5) {
      margin-top: 55px;
    }
  }
`;
const LeftContainer = styled.div`
  color: #cb4832;
  & p {
    box-shadow: 10px 0 7px -7px #cccccc;
    padding: 5px 10px;
    margin: 16px;
    margin-top: 0;
  }
  @media screen and (max-width: 380px) {
    width: 100%;
    position: absolute;
    text-align: left;
    p {
      box-shadow: none;
      margin-bottom: 60px;
      margin-top: 0;
    }
  }
`;
const RightContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: flex-start;
  flex-direction: column;
  width: 450px;
  @media screen and (max-width: 380px) {
    position: absolute;
    width: 350px;
  }
`;
const Select = styled.select`
  border: 1px solid #dcdcdc;
  font-weight: 600;
  font-size: 22px;
  border-radius: 5px;
  margin-right: 20px;
  width: 120px;
  height: 45px;
  padding: 0 5px;
`;
const Input = styled.input`
  border: 1px solid #dcdcdc;
  font-weight: 600;
  font-size: 22px;
  border-radius: 5px;
  padding: 0 10px;
  width: 100%;
  height: 45px;
  ::placeholder {
    color: #dddddd;
  }
`;
const CharacterContainer = styled.div`
  display: flex;
  justify-content: top;
  align-items: flex-end;
  flex-direction: column;
  margin: 10px;
  & p {
    margin-bottom: 34px;
    margin-top: 18px;
  }
`;
class voiceActorObj {
  constructor(
    voiceCharacter,voiceActor){
      this.voiceCharacter = voiceCharacter || "";
      this.voiceActor = voiceActor || "";
    }
}
class eduStage{
  constructor(
    id){
      this.id = id || 1;
    }
}
class grade{
  constructor(
    id){
      this.id = id || 1;
    }
}
class eachClassLearnProject {
  constructor(
    id,
    learnProjectTitle,
    learnProjectName,
    learnProjectDescription,
    learnResourceLink,
    grade,
    eduStage
  ) {
    this.id = id || 0;
    this.learnProjectTitle = learnProjectTitle || "";
    this.learnProjectName = learnProjectName || "";
    this.learnProjectDescription = learnProjectDescription || "";
    this.learnResourceLink = learnResourceLink || "";
    this.grade = grade || 1;
    this.eduStage = eduStage || 1;
    this.voiceActors = [];
  }
  addVoiceActor(voiceActor) {
    this.voiceActors.push(voiceActor);
  }
}

const CharacterInputContainer = styled.div`
  width: 100px;
  & * {
    margin-bottom: 18px;
    margin-top: 18px;
  }
`;
function NewProjectBody(props) {
  const alert = useAlert();
  const apiUrl = process.env.REACT_APP_API_URL;
  const { currentProject, setCurrentProject } = props;
  const [ btn_add, setbtn_add ] = useState("add");
  const navigate = useNavigate();

  const [grades, setGrade] = useState([]);
  const [edustages, setEduStage] = useState([]);
  const [voiceActorObjs, setVpoiceAcorObjs] = useState([]);

  const [selectedGrade, setSelectedGrade] = useState(1);
  const [selectedEduStage, setSelectedEduStage] = useState(1);
  const [learnProjectName, setLearnProjectName] = useState("");
  const [learnProjectDescription, setLearnProjectDescription] = useState("");
  const [learnProjectLink, setLearnProjectLink] = useState("");
  const [learnProjectTitle, setLearnProjectTitle] =
    useState("B11L4:布偶劇(來去公園)");

  const [voiceActor1, setvoiceActor1] = useState("");
  const [voiceActor2, setvoiceActor2] = useState("");
  const [voiceActor3, setvoiceActor3] = useState("");
  useEffect(() => {
    //   fetchGetPorject(currentProject);
    console.log("1-useEffect:有執行");
    if (window.localStorage.getItem("currentProject")) {
      
      setCurrentProject(JSON.parse(window.localStorage.getItem("currentProject")));
    }

    //有資料則為update
    if (currentProject) {
      console.log("更新 id :" + currentProject.id);
      setbtn_add("");
      let proj = getItemById("eachClassLearnProject", currentProject.id)
        .then((response) => {
          console.log(
            "eachClassLearnProject:" + JSON.stringify(response.content)
          );


          setCurrentProject(response);
          setLearnProjectName(response.learnProjectName);
          setLearnProjectDescription(response.learnProjectDescription);
          setLearnProjectLink(response.learnResourceLink);
          if (response.voiceActors) {
            var _voiceActors = response.voiceActors;
            setVpoiceAcorObjs(_voiceActors);
            const _VoiceActor1 = _voiceActors.find(
              (actor) => actor.voiceCharacter === "丸仔"
            );
            const _VoiceActor2 = _voiceActors.find(
              (actor) => actor.voiceCharacter === "紅圓仔"
            );
            const _VoiceActor3 = _voiceActors.find(
              (actor) => actor.voiceCharacter === "旁白"
            );
            setvoiceActor1(_VoiceActor1.voiceActor);
            setvoiceActor2(_VoiceActor2.voiceActor);
            setvoiceActor3(_VoiceActor3.voiceActor);
          }
          // Process the created item
        })
        .catch((error) => {
          alert.error("系統有誤:" + error);
          console.error("Error:", error);
          // Handle any errors
        });
    }
  }, []);

  //select list handler
  const handleGradeSelectChange = (event) => {
    const selectedValue = event.target.value;
    setSelectedGrade(selectedValue);
    // 執行其他相應的操作，例如更新狀態或觸發其他函數
  };
  const handleEduStageSelectChange = (event) => {
    const selectedValue = event.target.value;
    setSelectedEduStage(selectedValue);
    // 執行其他相應的操作，例如更新狀態或觸發其他函數
  };
  const handleSubmit = () => {
    // 執行其他相應的操作，例如更新狀態或觸發其他函數
  };
  const saveData = () => {
    var el_project = new eachClassLearnProject(
  0,
      learnProjectTitle,
      learnProjectName,
      learnProjectDescription,
      learnProjectLink,
      selectedGrade,
      selectedEduStage,
      selectedGrade,
      selectedEduStage
    );




    
    //更新
    if (
      currentProject &&
      currentProject.id !== null &&
      currentProject.id != 0
    ) {

      el_project.eduStage=new eduStage(selectedEduStage);
      el_project.grade=new grade(selectedGrade);
      el_project.id=currentProject.id;
      const _VoiceActor1 = voiceActorObjs.find(
        (actor) => actor.voiceCharacter === "丸仔"
      );
      const _VoiceActor2 = voiceActorObjs.find(
        (actor) => actor.voiceCharacter === "紅圓仔"
      );
      const _VoiceActor3 = voiceActorObjs.find(
        (actor) => actor.voiceCharacter === "旁白"
      );
      _VoiceActor1.voiceActor = voiceActor1;
      el_project.addVoiceActor(_VoiceActor1);
      _VoiceActor2.voiceActor = voiceActor2;
      el_project.addVoiceActor(_VoiceActor2);
      _VoiceActor3.voiceActor = voiceActor3;
      el_project.addVoiceActor(_VoiceActor3);
      let proj = updateItem(
        "eachClassLearnProject",
        currentProject.id,
        el_project
      )
        .then((response) => {
          alert.success("更新成功!");
        })
        .catch((error) => {
          alert.error("更新系統有誤:" + error);
          console.error("Error:", error);
          // Handle any errors
        });
    } else {
      //新增
      // const _VoiceActor1 = voiceActorObjs.find(
      //   (actor) => actor.voiceCharacter === "丸仔"
      // );
      // const _VoiceActor2 = voiceActorObjs.find(
      //   (actor) => actor.voiceCharacter === "紅圓仔"
      // );
      // const _VoiceActor3 = voiceActorObjs.find(
      //   (actor) => actor.voiceCharacter === "旁白"
      // );
      // _VoiceActor1.voiceActor = voiceActor1;
      const _VoiceActor1 =new voiceActorObj("丸仔",voiceActor1);
      el_project.addVoiceActor(_VoiceActor1);
      const _VoiceActor2 =new voiceActorObj("紅圓仔",voiceActor2);
      el_project.addVoiceActor(_VoiceActor2);

      const _VoiceActor3 =new voiceActorObj("旁白",voiceActor3);
      el_project.addVoiceActor(_VoiceActor3);
      // el_project.addEachClassLearnProject
      el_project.eduStage=new eduStage(selectedEduStage);
      el_project.grade=new grade(selectedGrade);
      let proj = createItem("eachClassLearnProject", el_project)
        .then((response) => {
          alert.success("新增成功!");
          console.log("data:" + JSON.stringify(response));
          setCurrentProject(response);
          window.localStorage.setItem("currentProject",JSON.stringify( response));
          setbtn_add("");
        })
        .catch((error) => {
          console.error("Error:", error);
          // Handle any errors
        });
    }
    // 執行其他相應的操作，例如更新狀態或觸發其他函數
  };

  const toRecord = (e) => {
    const i = Number(e.target.id);
    window.localStorage.setItem("currentProject",JSON.stringify( currentProject));
    navigate("/Recording");
  };

  return (
    <Container>
      <LeftContainer>
        <p>影片主題</p>
        <p>教育階段</p>
        <p>專案名稱</p>
        <p>影片說明</p>
        <p>影片連結</p>
        <p>配音人員</p>
      </LeftContainer>
      <RightContainer>
        <form onSubmit={handleSubmit}>
          <Section>
            {
              learnProjectTitle
                ? learnProjectTitle
                : "B11L4:布偶劇(來去公園)" /* <Input
              placeholder="B11L4:布偶劇(來去公園)"
              value={learnProjectTitle}
              onChange={(e) => setLearnProjectTitle(e.target.value)}
            /> */
            }
          </Section>
          <Section>
            <Select
              value={selectedEduStage}
              onChange={handleEduStageSelectChange}
            >
              <option id={1} key={1} value={1}>
                高中
              </option>
              <option id={2} key={2} value={2}>
                國中
              </option>
              <option id={3} key={3} value={3}>
                國小
              </option>
            </Select>
            <Select value={selectedGrade} onChange={handleGradeSelectChange}>
              <option id={1} key={1} value={1}>
                一年級
              </option>
              <option id={2} key={2} value={2}>
                二年級
              </option>
              <option id={3} key={3} value={3}>
                三年級
              </option>
            </Select>
          </Section>
          <Section>
            <Input
              placeholder="3年2班:A小組-期末分組-第二次錄音"
              value={learnProjectName}
              required="required"
              onChange={(e) => setLearnProjectName(e.target.value)}
            />
          </Section>
          <Section>
            <Input
              placeholder="期末分組作業-A小組補錄(第1次)"
              value={learnProjectDescription}
              required="required"
              onChange={(e) => setLearnProjectDescription(e.target.value)}
            />
          </Section>
          <Section>
            <Input
              placeholder=""
              value={learnProjectLink}
              required="required"
              onChange={(e) => setLearnProjectLink(e.target.value)}
            />
          </Section>
          <Section>
            <CharacterContainer>
              <p>丸仔</p>
              <p>紅圓仔</p>
              <p>旁白角色</p>
            </CharacterContainer>
            <CharacterInputContainer>
              <Input
                placeholder="林小雯"
                value={voiceActor1}
                required="required"
                onChange={(e) => setvoiceActor1(e.target.value)}
              />
              <Input
                placeholder="張小明"
                value={voiceActor2}
                required="required"
                onChange={(e) => setvoiceActor2(e.target.value)}
              />

              <Input
                placeholder="指導老師"
                value={voiceActor3}
                required="required"
                onChange={(e) => setvoiceActor3(e.target.value)}
              />
            </CharacterInputContainer>
          </Section>
          <Buttons>
            <Button onClick={saveData}>儲存資料</Button>
            <Button1 add={btn_add} color="blue" to="/Recording">
              來去配音
            </Button1>
          </Buttons>
        </form>
      </RightContainer>
    </Container>
  );
}

export default NewProjectBody;
