class EachClassLearnProject {
  constructor(data) {
    this.id=data.id||0;
    this.learnProjectTitle = data.learnProjectTitle || '';
    this.learnProjectName = data.learnProjectName || '';
    this.learnProjectDescription = data.learnProjectDescription || '';
    this.learnResourceLink = data.learnResourceLink || '';
    this.grade = data.grade || null;
    this.eduStage = data.eduStage || null;
    this.subtitles = data.subtitles || [];
    this.voiceActors = data.voiceActors || [];
  }
}

class EduStage {
  constructor(data) {
    this.id=data.id||0;
    this.eduStagesName = data.eduStagesName || '';
    this.eachClassLearnProjects = data.eachClassLearnProjects || [];
  }

  addEachClassLearnProject(single) {
    this.eachClassLearnProjects.push(single);
  }
}

class Grade {
  constructor(data) {
    this.id=data.id||0;
    this.gradeName = data.gradeName || '';
    this.eachClassLearnProjects = data.eachClassLearnProjects || [];
  }

  addEachClassLearnProject(single) {
    this.eachClassLearnProjects.push(single);
  }
}

class VoiceActor {
  constructor(data) {
    this.id=data.id||0;
    this.voiceCharacter = data.voiceCharacter || '';
    this.voiceActor = data.voiceActor || '';
    this.subtitles = data.subtitles || [];
    this.eachClassLearnProject = data.eachClassLearnProject || null;
  }

  addSubtitle(subtitle) {
    this.subtitles.push(subtitle);
  }
}

class Subtitle {
  constructor(data) {
    this.startTime = data.startTime || null;
    this.endTime = data.endTime || null;
    this.textTw = data.textTw || '';
    this.textMinnan = data.textMinnan || '';
    this.sort = data.sort || 0;
    this.voiceActor = data.voiceActor || null;
    this.eachClassLearnProject =  null;
    this.subtitleVoiceLink = '';
  }
}

export {
  EachClassLearnProject,
  EduStage,
  Grade,
  VoiceActor,
  Subtitle
};
