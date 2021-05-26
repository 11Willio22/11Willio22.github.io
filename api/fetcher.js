var url = document.getElementById("url")
var body = document.getElementById("body")
var send = document.getElementById("send")
var res = document.getElementById("response")


fetch("https://random-words-api.vercel.app/word")
.then(response => response.text())
.then(text => console.log(text))
.catch(error => console.log(error))

function request(url,msg,onResponse,post=false) {
	if (post) {
  	fetch (url, {
    	method: "POST",
      body: msg
    })
    .then(response => response.text())
    .then(text => onResponse(text))
		.catch(error => console.log(error))
  } else {
    fetch (url, {
      method: "GET",
    })
    .then(response => response.text())
    .then(text => onResponse(text))
    .catch(error => console.log(error.toString()))
  }
}

send.addEventListener("click",(e)=>{
	
  request(url.value,body.value,(text)=>{
  	res.value = text
  })
  
})
