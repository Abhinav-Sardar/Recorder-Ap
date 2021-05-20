let video = document.querySelector('video') ; 
let startRecording = document.getElementById('start') ; 
let stopRecording = document.getElementById('stop') ; 
let download = document.getElementById('download') ;
let hasStartedCamera = false ; 
let startCamera = document.getElementById('start-cam') ; 

let setStatus  = (status) => document.getElementById('status').innerText = status ;  
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
                setStatus('Your camera is on but you are not being recorded.')
            }
            else {
                video.style.display=  'none' ; 
                startCamera.innerText = 'Start Camera' ; 
                hasStartedCamera = false ; 
                setStatus('Your camera is off.')
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
                stopRecording.onclick = () => {
                    recorder.stop() ; 
                    setStatus('Your face has been recorded! Enjoy the recording :)')
                }
                startCamera.disabled = true ; 
                startRecording.disabled = true ;
                setStatus('You are being recorded! Make some gestures.')
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
            console.log(video)  ; 
            video.onloadedmetadata = () => video.play() ; 
            download.style.display = 'inline' ; 
            download.onclick = () => {
                let result = prompt('What should be the extension of the downloaded file ? Type mp4 for .mp4 and webm for .webm. (.webm is recommended due to browser issues.)') ; 
                if(result.toLowerCase() === 'mp4') {
                    let newBlob = new Blob(videoChunks , {type:`video/mp4`}) ; 
                    let url = URL.createObjectURL(newBlob); 
                    Download(url) ; 
                }
                else if(result.toLowerCase() === 'webm'){
                    let newBlob = new Blob(videoChunks , {type:`video/webm`}) ; 
                    let url = URL.createObjectURL(newBlob); 
                    Download(url) ;
                }
                else {
                    alert('Invalid response recieved! Expected webm or mp4')
                }
            }
        }

    }
    
    else {
        alert('Your browser doesnt support accessing user\'s camera. Try using chrome instead') ; 
    }
}
getUserCamera() ; 

document.getElementById('refresh').onclick = () => window.location.reload() ; 

function Download(link){
    let a = document.createElement('a') ; 
    a.href = link ; 
    a.download = 'Recording' ; 
    a.style.display = 'none' ; 
    document.body.appendChild(a) ; 
    a.click() ; 
}