const startBtn = document.getElementById('start') ; 
const stopBtn = document.getElementById('stop') ; 
let isRecording = false ; 
let link  = document.querySelector('a') ; 
let video = document.querySelector('video') ; 
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
        recorder.onstop = (ev) => {
            // document.getElementById('download').removeAttribute('disabled') ; 
            console.log(audioChunks) ; 
            console.log(ev.data)
            let blob = new Blob(audioChunks , {type:'audio/mp3'}) ; 
            audioChunks = [] ; 
            let audioUrl = window.URL.createObjectURL(blob) ; 
            let audioOBJ= document.querySelector('audio') ; 
            audioOBJ.setAttribute('controls' , 'controls')
            audioOBJ.src = audioUrl ; 
            console.log(audioUrl)
            audioOBJ.onloadeddata = () => {
                audioOBJ.play() ; 
            }
            // document.querySelector('a').href = URL.createObjectURL(blob) 
            // for; 

        }
    }
    else {
        alert('Your browser doesnt support the user audio or video. Sorry!')
    }
}
GetUserAudio(); 