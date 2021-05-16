var buildTime = 0
var maxBuildTime = 300
var timerActive = false

var timer = 0

var timerDisplay = document.getElementById("timer")

function send(url, onReceive) {
	fetch (url, {
  	method: "GET"
  })
  .then(response => response.text())
  .then(text => {
  	onReceive(text)
    console.log(text)
  })
}

function getNewTopic() {
	send("https://random-word-form.herokuapp.com/random/noun/a?count=1", (text)=>{
  	document.getElementById("topic").innerHTML = text.substring(2,text.length - 2)
  	
  })
}

function updateTimer() {
	buildTime--
  if (buildTime == 0) clearInterval(timer)
	let minutes = "" + parseInt(buildTime / 60)
  let seconds = "" + (buildTime % 60)
	document.getElementById("timer").innerHTML = ((minutes.length == 1) ? "0" + minutes : minutes) + ":" + ((seconds.length == 1) ? "0" + seconds : seconds)
  
  let r = (parseInt(Math.random() * 256)).toString(16)
  let g = (parseInt(Math.random() * 256)).toString(16)
  let b = (parseInt(Math.random() * 256)).toString(16)
  timerDisplay.style.color = "#" + ((r.length == 1) ? "0" + r : r) + ((b.length == 1) ? "0" + b : b) + ((g.length == 1) ? "0" + g : g) 
  
}

document.getElementById("new").onclick = (e)=>{
	if (timerActive) 
  	clearInterval(timer)
  timer = setInterval(updateTimer, 1000)
  timerActive = true
  buildTime = maxBuildTime
	let minutes = "" + parseInt(buildTime / 60)
  let seconds = "" + (buildTime % 60)
  document.getElementById("timer").innerHTML = ((minutes.length == 1) ? "0" + minutes : minutes) + ":" + ((seconds.length == 1) ? "0" + seconds : seconds)
  getNewTopic()
}
