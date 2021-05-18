const startBtn = document.getElementById('start') ; 
const stopBtn = document.getElementById('stop') ; 
let isRecording = false ; 
async function GetUserAudio() { 
    if(navigator.mediaDevices && navigator.mediaDevices.getUserMedia){
        console.log('User media available!') ; 
        let stream = await navigator.mediaDevices.getUserMedia({audio:true, video:false}) ; 
        let recorder = new MediaRecorder(stream) ; 
        console.log(recorder) ; 
        let audioChunks = [] ; 
        startBtn.onclick = () => {
            startBtn.setAttribute('disabled' , 'disabled') ; 
            stopBtn.removeAttribute('disabled') ; 
            recorder.start();
            console.log("Recording has started") ; 
        }
        stopBtn.onclick = () => {
            stopBtn.setAttribute('disabled' , 'disabled') ; 
            startBtn.removeAttribute('disabled') ; 
            recorder.stop() ; 
            console.log('Recording has stopped') ; 
        }
        recorder.ondataavailable = (event) => {
            audioChunks.push(event.data) ; 
        }
        recorder.onstop = () => {
            console.log(audioChunks)
            let blob = new Blob(audioChunks , {type:'audio/mp3'}) ; 
            audioChunks = [] ; 
            let audioUrl = window.URL.createObjectURL(blob) ; 
            let audioOBJ= document.querySelector('audio') ; 
            audioOBJ.setAttribute('controls' , 'controls')
            audioOBJ.src = audioUrl ; 
            audioOBJ.onloadeddata = () => {
                audioOBJ.play() ; 
            }

        }
    }
    else {
        alert('Your browser doesnt support the user audio or video. Sorry!')
    }
}
GetUserAudio() ; 