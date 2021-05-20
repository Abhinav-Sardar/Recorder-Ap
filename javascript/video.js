let video = document.querySelector('video') ; 
let startRecording = document.getElementById('start') ; 
let stopRecording = document.getElementById('stop') ; 
let download = document.getElementById('download') ;
let hasStartedCamera = false ; 
let startCamera = document.getElementById('start-cam') ; 
async function getUserCamera () {
    if(navigator.mediaDevices && navigator.mediaDevices.getUserMedia){
        console.log('Media available');
        let stream = await navigator.mediaDevices.getUserMedia({video:true}) ; 
        let recorder = new MediaRecorder(stream) ; 
        video.srcObject = stream ; 
        let videoChunks = [] ; 
        video.play() ; 
        startCamera.onclick = () => {
            if(!hasStartedCamera) {
                video.style.display=  'block' ; 
                startCamera.innerText = 'Stop Camera' ; 
                hasStartedCamera = true ; 
            }
            else {
                video.style.display=  'none' ; 
                startCamera.innerText = 'Start Camera' ; 
                hasStartedCamera = false ; 
            }
        }
        recorder.ondataavailable = (ev) => {
            videoChunks.push(ev.data) ; 
        }
        startRecording.onclick = () => {
            if(!hasStartedCamera){
                alert('You have to turn your camera on in order to record.')
            }
            else {
                recorder.start() ; 
                console.log('Started')  ; 
                stopRecording.onclick = () => recorder.stop() ; 
                startCamera.disabled = true ; 
                startRecording.disabled = true ; 
            }
        }

        recorder.onstop = () => {
            stopRecording.disabled = true ; 
            console.log('Stopped' , videoChunks) ; 
            let blob = new Blob(videoChunks , {type:'video/webm'}) ; 
            let videoURL = URL.createObjectURL(blob) ; 
            document.querySelector('#videocont').removeChild(video) ; 
            video = document.createElement('video'); 
            video.setAttribute('controls' , 'controls') ; 
            video.src = videoURL ; 
            document.querySelector('#videocont').appendChild(video) ; 
            video.style.display = 'block'
            console.log(video) 
            video.onloadedmetadata = () => video.play() ; 
        }
    }
    
    else {
        alert('Your browser doesnt support accessing user\'s camera. Try using chrome instead') ; 
    }
}
getUserCamera() ; 

