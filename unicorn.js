var canvas = document.getElementById("draw")
var WIDTH = canvas.width = 1920
var HEIGHT = canvas.height = 1080
canvas.style.width = "90vw"
canvas.style.height = "calc(90vw / 16 * 9)"

var ctx = canvas.getContext("2d")

var unicorn = new Image()
unicorn.src = "https://images-na.ssl-images-amazon.com/images/I/71%2BncdWcmRL.png"

var uni_x = WIDTH / 2
var uni_y = HEIGHT / 2

var uni_dx = 3
var uni_dy = 3

setInterval(draw,16)

class Firework {
	constructor(x, color, blast) {
  	
  }
}

function draw() {
	ctx.fillStyle = "#FFC0CB"
  ctx.fillRect(0,0,WIDTH,HEIGHT)
  
  ctx.fillStyle = "#F1F1F1"
  ctx.font = "150px Quicksand"
  ctx.textAlign = "center"
  ctx.fillText("Happy Mommy's Day!", WIDTH / 2, HEIGHT / 2)
  
  uni_x+=uni_dx
  uni_y+=uni_dy
  
  if (uni_x + 200 >= WIDTH)
  	uni_dx = -uni_dx
  if (uni_y + 200 >= HEIGHT)
  	uni_dy = -uni_dy
  if (uni_x < 0) uni_dx = -uni_dx
  if (uni_y < 0) uni_dy = -uni_dy
  
  ctx.drawImage(unicorn,uni_x,uni_y,200,200)
}
