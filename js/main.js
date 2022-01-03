const minElement = document.querySelector("#minutes"),
secElement = document.querySelector("#seconds"),
settings = document.querySelector("#settings"),
startStop = document.querySelector("#startStop"),
progressBar = document.querySelector(".outerRing")

let toggleSettings = false,
minutes = document.querySelector("#minutes").innerHTML,
seconds = document.querySelector("#seconds").innerHTML,
progress = null,
progressStart = 0,
progressEnd = parseInt(minutes) * 60 + parseInt(seconds),
speed = 1000,
degTravel = 360 / progressEnd,
minRemaining = 0
secRemaining = 0

function progressTrack() {
    progressStart++
    
    minRemaining = Math.floor((progressEnd - progressStart) % 60)
    secRemaining = Math.floor((progressEnd - progressStart) / 60)
    
    minElement.innerHTML = minRemaining.toString().length == 2 ? minRemaining : `0${minRemaining}`
    secElement.innerHTML = secRemaining.toString().length == 2 ? secRemaining : `0${secRemaining}`
    
    progressBar.style.background = `conic-gradient(#9d0000 ${progressStart * degTravel}deg, #17171a ${progressStart * degTravel}deg)`
    if(progressStart == progressEnd) {
        progressBar.style.background = `conic-gradient(#00aa51 360deg, #00aa51 360deg)`
        clearInterval(progress)
        startStop.innerHTML = "START"
        progress = null
        progressStart = 0
    }
}

function startStopProgress() {
    if (!progress) {
        progress = setInterval(progressTrack, speed)
    } else {
        clearInterval(progress)
        progress = null
        progressStart = 0
        progressBar.style.background = `conic-gradient(#17171a 360deg, #17171a 360deg)`
    }
}

function resetValues() {
    if(progress) {
        clearInterval(progress)
    }
    minutes = document.querySelector("#minutes").innerHTML
    seconds = document.querySelector("#seconds").innerHTML
    toggleSettings = false
    minElement.contentEditable = false
    minElement.style.borderBottom = `none`
    secElement.contentEditable = false
    secElement.style.borderBottom = `none`
    progress = null
}
settings.onclick = function () {
    if(!toggleSettings) {
        toggleSettings = true
        minElement.contentEditable = true
        minElement.getElementsByClassName.borderBottom = "1px dashed #ffffff50"
        secElement.contentEditable = true
        secElement.getElementsByClassName.borderBottom = "1px dashed #ffffff50"
    } else {
        resetValues()
    }
}

minElement.onblur = function () {
    resetValues()
}

secElement.onblur = function () {
    resetValues()
}

startStop.onclick = function() {
    if(startStop.innerHTML === "START") {
        if(!(parseInt(minutes) === 0 && parseInt(seconds) === 0)) {
            startStop.innerHTML = "STOP"
            startStopProgress()
        } else {
            alert("Enter a time!")
        }
    } else {
        startStop.innerHTML = "START"
        startStopProgress()
    }
}
