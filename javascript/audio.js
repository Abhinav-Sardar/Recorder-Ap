const startBtn  = document.getElementById('start') ; 
const stopBtn  = document.getElementById('stop') ; 
const audioElement = document.querySelector('audio') ; 

const setStatus = (textContent) => {
    const status = document.getElementById('status') ; 
    status.innerText = textContent ; 
}

async function getUserAudio () {
    if(navigator.mediaDevices && navigator.mediaDevices.getUserMedia){
        console.log('User media available!') ; 
        let stream = await navigator.mediaDevices.getUserMedia({audio:{
            echoCancellation:true ,
        } , video:false}) ; 
        
        console.log(stream) ; 
        let recorder = new MediaRecorder(stream) ;
        let audioChunks = [] ;  
        startBtn.onclick = () => {
            console.log('Recorder started!');
            setStatus('You are being recorded. Speak something!') ; 
            recorder.start() ; 
            startBtn.disabled = true ; 
        }
        stopBtn.onclick = () => {
            recorder.stop() ; 
            setStatus('Recording has stopped. Click on refresh record to set up a new recording.') ;
            console.log('recording has stopped') ;  
            stopBtn.disabled = true ; 
        }
        recorder.ondataavailable = (e)=> {
            audioChunks.push(e.data) ; 
        }
        recorder.onstop = () => {
            const blob = new Blob(audioChunks , {type:"audio/mp3"}) ; 
            // audioChunks = [] ; 
            // console.log(URL.createObjectURL(blob)) ;
            let audioURL = URL.createObjectURL(blob) ;
            audioElement.src = audioURL ; 
            audioElement.onloadedmetadata = ()=> {
                audioElement.setAttribute('controls' , 'controls') ;
                audioElement.play() ; 
            }

        }
    }
    else {
        alert('Accessing user audio/video is prohibhited in your browser. Try using chrome.') ; 
    }
}
getUserAudio() ; 

document.getElementById('refresh').addEventListener('click' , () => window.location.reload());
console.log(navigator) ; 