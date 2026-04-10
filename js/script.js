/* detectar si es móvil */
const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

if (!isMobile) {
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
}

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

const seccionVideos=document.getElementById("seccion-videos")
const galeriaVideos=document.getElementById("galeria-videos")
const modalVideo=document.getElementById("modal-video")
const modalOverlay=document.getElementById("modal-overlay")
const modalCerrar=document.getElementById("modal-cerrar")
const reproductorVideo=document.getElementById("reproductor-video")
const modalTitulo=document.getElementById("modal-titulo")
const modalDescripcion=document.getElementById("modal-descripcion")

function formatearTitulo(title,file){
if(title&&title.trim()){
return title.trim()
}

const name=file.split("/").pop().split("\\").pop()
return name.replace(/\.[^.]+$/,"").replace(/[-_]+/g," ")
}

function cerrarModalVideo(){
modalVideo.hidden=true
reproductorVideo.pause()
reproductorVideo.removeAttribute("src")
reproductorVideo.load()
document.body.style.overflowY="auto"
}

function abrirModalVideo(video){
modalTitulo.textContent=formatearTitulo(video.title,video.file)
modalDescripcion.textContent=video.description||""
reproductorVideo.src=`videos/${video.file}`
modalVideo.hidden=false
document.body.style.overflowY="hidden"
reproductorVideo.load()
}

function cargarVideos(){
try{
const videos=Array.isArray(window.CARTA_VIDEOS)?window.CARTA_VIDEOS:[]

if(videos.length===0){
return
}

seccionVideos.hidden=false
galeriaVideos.innerHTML=""

videos.forEach(video=>{
if(!video.file){
return
}

const card=document.createElement("div")
card.className="video-card"

const title=document.createElement("h3")
title.textContent=formatearTitulo(video.title,video.file)

const description=document.createElement("p")
description.textContent=video.description||"Un momento especial para volver a verlo contigo."

const button=document.createElement("button")
button.className="video-boton"
button.type="button"
button.textContent="Ver video"
button.addEventListener("click",()=>abrirModalVideo(video))

card.appendChild(title)
card.appendChild(description)
card.appendChild(button)
galeriaVideos.appendChild(card)
})

if(!galeriaVideos.children.length){
seccionVideos.hidden=true
}
}catch(error){
console.error("No se pudo cargar el catalogo de videos.",error)
}
}

modalCerrar.addEventListener("click",cerrarModalVideo)
modalOverlay.addEventListener("click",cerrarModalVideo)

document.addEventListener("keydown",event=>{
if(event.key==="Escape"&&!modalVideo.hidden){
cerrarModalVideo()
}
})

cargarVideos()
