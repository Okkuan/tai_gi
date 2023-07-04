import Recorder from '../js/recorder';
function Test(audio, currentVoice, order) {
    const recorder = {}
    //webkitURL is deprecated but nevertheless
    URL = window.URL || window.webkitURL;
    let gumStream; 						//stream from getUserMedia()
    let rec; 							//Recorder.js object
    let AudioContext = window.AudioContext || window.webkitAudioContext;
    let audioContext //audio context to help us record

    const startRecording = () => {
        const constraints = { audio: true, video: false }
        navigator.mediaDevices.getUserMedia(constraints).then(function (stream) {
            audioContext = new AudioContext();
            console.log("Format: 1 channel pcm @ " + audioContext.sampleRate / 1000 + "kHz")
            gumStream = stream;
            const input = audioContext.createMediaStreamSource(stream);
            rec = new Recorder(input, { numChannels: 1 })
            rec.record()
        }).catch(function (err) {
            //錯誤
            if(rec){
            rec.stop();
            }
            console.log(err)
        });
    }

    const pauseRecording = () => {
        console.log("pauseButton clicked rec.recording=", rec.recording);
        //錄音中暫停，反之重新開始
        if (rec.recording) {
            rec.stop();
        } else {
            rec.record();
        }
    }

    const stopRecording = () => {
        rec.stop()
        gumStream.getAudioTracks()[0].stop();
        //製作wav blob並傳給另一個function
        rec.exportWAV(createDownloadLink);
    }

    function createDownloadLink(blob) {
        const url = URL.createObjectURL(blob);

        blobToBase64(blob).then(res => {
            // 轉換後的base64
            console.log('base64', res)
        })
        audio.src = url
        /*
        var filename = new Date().toISOString();
        upload link
        var xhr = new XMLHttpRequest();
        xhr.onload = function (e) {
            if (this.readyState === 4) {
                console.log("Server returned: ", e.target.responseText);
            }
        };
        var fd = new FormData();
        fd.append("audio_data", blob, filename);
        xhr.open("POST", "upload.php", true);
        xhr.send(fd);
        */
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
            bstr = atob(arr[1]),
            l = bstr.length,
            u8Arr = new Uint8Array(l);
    
        while (l--) {
            u8Arr[l] = bstr.charCodeAt(l);
        }
        return new Blob([u8Arr], {
            type: fileType
        });
    }
    
    // const demo = 'data:audio/wav;base64,'
    // URL.createObjectURL(base64ToBlob(demo))
    recorder.start = startRecording
    recorder.stop = stopRecording
    recorder.pause = pause
    return recorder
}

export default Test;