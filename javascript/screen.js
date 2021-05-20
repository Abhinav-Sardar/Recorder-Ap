let startBtn = document.getElementById('start') ; 
let stopBtn = document.getElementById('stop') ; 
const video = document.querySelector('video') ; 
video.style.display = 'none' ; 
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
                video.style.display = 'block' ; 
                let blob = new Blob(videoChunks , {type:'video/webm'}) ; 
                let videoURL = window.URL.createObjectURL(blob) ; 
                let button = document.createElement('button') ;
                button.innerText = 'Download' 
                button.style.backgroundColor = 'blue' ; 
                button.onclick = ()=> {
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
                document.getElementById('buttons').appendChild(button); 
                video.src = videoURL;
                video.onloadedmetadata = () => video.play() ; 
                video.setAttribute('controls' ,'controls') ; 
            }
            
        }
        catch(error) {
            console.log(error) ; 
            startBtn.disabled = false ; 
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



function Download(link){
    let a = document.createElement('a') ; 
    a.href = link ; 
    a.download = 'Recording' ; 
    a.style.display = 'none' ; 
    document.body.appendChild(a) ; 
    a.click() ; 
}

document.getElementById('refresh').addEventListener('click' , () => window.location.reload())