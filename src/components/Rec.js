import Recorder from '../js/recorder';
import { updateAudio, getItemById, createItem, updateItem } from "../API/Api";
let recorder;
let timeoutId;
let audioContext;
const audio = new Audio();
let AudioContext = window.AudioContext || window.webkitAudioContext;
class SubtitleAudioData {
  constructor(id,subtitleVoiceLink) {
    this.id = id || '';
    this.subtitleVoiceLink = subtitleVoiceLink || '';
  }
}

function startRecordingWithTimeLimit(limitTime) {
    return new Promise((resolve, reject) => {
      navigator.mediaDevices.getUserMedia({ audio: true, video: false })
        .then((stream) => {
            console.log('start')
            console.log('limitTime:'+limitTime)
          audioContext= new AudioContext();

          recorder = new Recorder(audioContext.createMediaStreamSource(stream), { numChannels: 1 });
          // 開始錄音
          recorder.record();
          timeoutId = setTimeout(() => {
            recorder.stop();

            recorder.exportWAV((blob) => {
                audio.src = URL.createObjectURL(blob);
                console.log('stop')
                resolve(blob);
                recorder .clear();
              });
              stream.getTracks().forEach(track => track.stop());
          }, limitTime);
        })
        .catch((error) => {
          reject(error);
        });
    });
  }
  //播放錄音
  function playRecording() {
    if(!audio.src&&document.getElementById('audioPlayer').src){

    document.getElementById('audioPlayer').play()
    }else{

      audio.play();
    }
  }
  //開始錄音
  function startRecording (limitTime) {
    startRecordingWithTimeLimit(limitTime).then((blob)=>blobToBase64(blob)).then((data)=>{

      let currentOrder_=window.localStorage.getItem("currentOrder");
      let current_states_=JSON.parse( window.localStorage.getItem("states"));
      if(currentOrder_&&current_states_){

        let sub=current_states_[currentOrder_];

        // let updateSub=new SubtitleAudioData(sub.id,data.replace("data:audio/wav;base64,"));
        
        let audio =updateAudio(sub.id,data.replace("data:audio/wav;base64,",""))
        .then((response) => {
        

          console.log(JSON.stringify(response))
        })
        .catch((error) => {
          console.error("Error:", error);
          // Handle any errors
        });



        
      }
      console.log(data)

    }) 
  }
  //停止錄音
  function stopRecording () {
    recorder.stop();
    recorder.exportWAV((blob) => {
        audio.src = URL.createObjectURL(blob);
        blobToBase64(blob).then(blob=>{
          let currentOrder_=window.localStorage.getItem("currentOrder");
          let current_states_=JSON.parse( window.localStorage.getItem("states"));
          if(currentOrder_&&current_states_){
    
            let sub=current_states_[currentOrder_];
            console.log('sub:'+JSON.stringify(sub))
          }
          //console.log(data)
        })
    })
    clearTimeout(timeoutId);
  }
  //blob轉base64
  function blobToBase64(blob) {
    return new Promise((resolve, reject) => {
        const fileReader = new FileReader();
        fileReader.onload = (e) => {
            resolve(e.target.result);
        };
        // readAsDataURL
        fileReader.readAsDataURL(blob);
        fileReader.onerror = () => {
            reject(new Error('blobToBase64 error'));
        };
    });
}
//base64轉blob
function base64ToBlob(base64Data) {
    let arr = base64Data.split(','),
        fileType = arr[0].match(/:(.*?);/)[1],
        bstr = arr[1],
        l = bstr.length,
        u8Arr = new Uint8Array(l);

    while (l--) {
        u8Arr[l] = bstr.charCodeAt(l);
    }
    return new Blob([u8Arr], {
        type: fileType
    });
}
  export {playRecording, startRecording, stopRecording,}