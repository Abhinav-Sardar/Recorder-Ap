let startBtn = document.getElementById('start') ; 
let stopBtn = document.getElementById('stop') ; 
const video = document.querySelector('video') ; 
async function GetUserScreen() {
    if(navigator.mediaDevices && navigator.mediaDevices.getDisplayMedia){
        console.log('User screen available') ; 
        try {
            let stream = await navigator.mediaDevices.getDisplayMedia() ; 
            let videoChunks = [] ; 
            let recorder = new MediaRecorder(stream) ;
            recorder.start() ; 
            recorder.ondataavailable =(ev) => {
                if(ev.data.size > 0) {
                    videoChunks.push(ev.data); 
                    console.log(`Pushed ${ev.data}`) ; 
                }
            }
            recorder.onstop = () => {
                console.log('Stopped') ; 
                let blob = new Blob(videoChunks , {type:'video/webm'}) ; 
                console.log(blob) ; 
                let audioUrl = URL.createObjectURL(blob) ; 
                video.src = audioUrl ; 
                video.setAttribute('controls' , 'controls') ; 
                video.onloadedmetadata = () => {
                    video.play() ; 
                }
            }
            
        }
        catch(error) {
            console.log(error) ; 
            alert('We cant record your screen without the permissions. Give us permissions 😠')
        }

    }
    else {
        // console.log('')
        alert('Your browser doesnt support accessing user\'s audio/video. Try using chrome') ; 
    }
}
startBtn.addEventListener('click' , () => {
    startBtn.disabled = true ; 
    GetUserScreen() ;
}) ; 