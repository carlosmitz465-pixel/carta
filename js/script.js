/* corazones */

setInterval(()=>{

let c=document.createElement("div")
c.className="corazon"
c.innerHTML="💜"

c.style.left=Math.random()*100+"vw"

document.body.appendChild(c)

setTimeout(()=>c.remove(),6000)

},400)



/* patitos */

setInterval(()=>{

let p=document.createElement("div")
p.className="pato"
p.innerHTML="🦆"

p.style.top=Math.random()*100+"vh"

document.body.appendChild(p)

setTimeout(()=>p.remove(),12000)

},7000)



/* cerditos */

setInterval(()=>{

let c=document.createElement("div")
c.className="cerdito"
c.innerHTML="🐷"

c.style.top=Math.random()*100+"vh"

document.body.appendChild(c)

setTimeout(()=>c.remove(),15000)

},9000)



/* solo una canción a la vez */

const audios=document.querySelectorAll("audio")

audios.forEach(audio=>{

audio.addEventListener("play",()=>{

audios.forEach(other=>{

if(other!==audio){

other.pause()
other.currentTime=0

}

})

})

})