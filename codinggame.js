class Tile {
	
	constructor(imgSrc) {
		this.img = new Image()
		this.img.src = imgSrc + ".png"
	}
	
}
function drawPlayer() {
	ctx.drawImage(img_player,playerX * tileSize,playerY * tileSize,tileSize,tileSize)
}

function update() {
	
	if (executingInstructions) {
		if (playerX == playerTargetX && playerY == playerTargetY) 
			go = true
		if (go) {
			
			execute(instructionSet[instructionLine])
			console.log(instructionSet[instructionLine])
			if (instructionLine >= instructionSet.length)  {
				instructionLine = 0
				executingInstructions = false
				go = false
			}
			instructionLine++
		}
		
	}	
	
	ctx.clearRect(0,0,document.getElementById("canvas").width,document.getElementById("canvas").height)
  ctx.strokeStyle = "#232323"
	ctx.lineWidth = 1
	for (let y = 0; y < Math.ceil(tilesY); y++) {
		for (let x = 0; x < Math.ceil(tilesX); x++) {
			ctx.drawImage(map[x + y * tilesX].img,x * tileSize, y * tileSize, tileSize, tileSize)
		}
	}
	if (playerX < playerTargetX) playerX+=playerSpeed;
	if (playerX > playerTargetX) playerX-=playerSpeed;
	if (playerY < playerTargetY) playerY+=playerSpeed;
	if (playerY > playerTargetY) playerY-=playerSpeed;
	
	
	drawPlayer()
	
	document.getElementById("playerPos").innerHTML = "(" + playerX + "," + playerY + ")"
	
	
}


function execute(command) {
	if (command == "" || command == undefined)
		return;
		
	let spl = command.split(" ")
	let cmd = spl[0]
	let args = spl[1]
console.log("execute: '" + cmd + "' '" + args + "' " + Number(args[0]))
	if (cmd == "up") {
		playerTargetY -= Number(args)
	}
	if (cmd == "down") {
		playerTargetY += Number(args)
	}
	if (cmd == "right") {
		playerTargetX += Number(args)
	}
	if (cmd == "left") {
		playerTargetX -= Number(args)
	}
}

function compile() {
	let lines = document.getElementById("command").value.replace("\n","").split(";")
	let num = 0
	let iSet = ""
	while (num < lines.length - 1) {
		let cmd = lines[num].split("(")[0]
		let args = (lines[num] + " ").substring(cmd.length + 1,lines[num].length - 1)
		iSet += cmd + " " + args + "\n"
		console.log("> '" + cmd + "' '" + args + "'")
		num++
	}
	console.log("\"" + iSet + "\"")
	instructionSet = iSet.split("\n")
	console.log("> \"" + instructionSet + "\"")
}

function run() {
	compile()
	executingInstructions = true
	instructionLine = 0
}

function createLevel() {
	map = []
	for (let y = 0; y < tilesY; y++) {
		for (let x = 0; x < tilesX; x++) {
			map[x + y * tilesX] = tiles.get(randchoice(Array.from(tiles.keys())))
		}
	}
}

function randint(max) {
	return Math.floor(Math.random() * max)
}

function randboolean(max) {
	return Math.floor(Math.random() * 2) == 1
}

function randchoice(list) {
	return list[randint(list.length)]
}

function addTile(tileName) {
	tiles.set(tileName,new Tile(tileName))
}

//Tiles:
var tiles = new Map()
addTile("grass")
addTile("grass1")
addTile("stone")
addTile("stone1")
addTile("flower")
addTile("flower2")
addTile("puddle")

var img_player = new Image()
img_player.src = "player.png"

var canvas = document.getElementById("canvas")
var width = 1280
var height = 720
canvas.width = width
canvas.height = height
canvas.style.width = "640px"
canvas.style.height = "360px"
var ctx = document.getElementById("canvas").getContext("2d")
ctx.imageSmoothingEnabled = false

var executingInstructions = false
var instructionLine = 0

var playerX = 0
var playerY = 0
var playerTargetX = 0
var playerTargetY = 0
var playerSpeed = 0.25

var instructionSet = []
var instructionBegan = false

var inputHistory = []

var map = []
var tileSize = 64
var tilesX = width / tileSize
var tilesY = height / tileSize
var go = false

createLevel()

window.setInterval(update,100)



