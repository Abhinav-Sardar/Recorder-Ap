let pages = ['/html/audio.html' , '/html/video.html' , '/html/screen.html'] ; 
let links = document.querySelectorAll('.icon-cont') ; 
links.forEach((link , index) => {
    link.addEventListener('click' , () => {
        window.location.assign(pages[index]) ; 
    })
})
