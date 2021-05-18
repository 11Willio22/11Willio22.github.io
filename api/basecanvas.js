var canvas = 0
var width = 0
var height = 0
var ctx = 0


var mx = 0
var my = 0
var keys = new Map()
var buttons = new Map()

function createCanvas() {
	canvas = document.getElementById("draw")
  WIDTH = canvas.width = 1920
  HEIGHT = canvas.height = 1080
  canvas.style.width = "100vw"
  canvas.style.height = "calc(100vw / 16 * 9)"
  
  ctx = canvas.getContext("2d")
}

function setupInputs() {
  
  window.addEventListener("keydown", (e)=>{
  	keys.set(e.key, true)
  })
  window.addEventListener("keyup", (e)=>{
  	keys.set(e.key, false)
  })
  canvas.addEventListener("mousedown", (e)=>{
  	buttons.set(e.button, true)
  })
  canvas.addEventListener("mouseup", (e)=>{
  	buttons.set(e.button, false)
  })
  canvas.addEventListener("mousemove", (e)=>{
  	let b = canvas.getBoundingClientRect()
    mx = (e.clientX - b.left) / (b.right - b.left) * WIDTH
    my = (e.clientY - b.top) / (b.bottom - b.top) * HEIGHT
  })
}

function send(url, msg, onReceive) {
	fetch (url, {
  	method: "POST",
    body: msg
  })
  .then(response => response.text())
  .then(text => onReceive(text))
}

createCanvas()
setupInputs()

ctx.fillStyle = "#5757C1"
ctx.fillRect(0,0,WIDTH,HEIGHT)

ctx.fillStyle = "#F1F1F1"
ctx.textAlign = "center"
ctx.font = "100px Arial"
ctx.fillText("Have a nice day! :D", WIDTH / 2, HEIGHT / 2)
