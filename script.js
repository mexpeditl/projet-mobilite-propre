/* =====================================================
   SCRIPT PRINCIPAL DU SITE
   Projet : Mobilité propre à Douala
   Toutes les animations et interactions sont centralisées ici
===================================================== */


/* =====================================================
   1️⃣ ANIMATION AU SCROLL (Intersection Observer)
   Les éléments apparaissent quand ils entrent dans l'écran
===================================================== */

const animatedElements = document.querySelectorAll(
".video-container, .container, .impact-card, .engagement-box, .timeline-item"
);

const observer = new IntersectionObserver(entries => {

entries.forEach(entry => {

if(entry.isIntersecting){
entry.target.classList.add("show");
}

});

});

animatedElements.forEach(el => observer.observe(el));



/* =====================================================
   2️⃣ HERO : EFFET LUMIÈRE QUI SUIT LA SOURIS
===================================================== */

const hero = document.querySelector(".hero");

if(hero){

hero.addEventListener("mousemove", e => {

const x = e.clientX;
const y = e.clientY;

hero.style.backgroundPosition =
`${50 + x/50}% ${50 + y/50}%`;

});

hero.addEventListener("mousemove", e => {

const rect = hero.getBoundingClientRect();

const x = e.clientX - rect.left;
const y = e.clientY - rect.top;

hero.style.setProperty("--x", x + "px");
hero.style.setProperty("--y", y + "px");

});

}



/* =====================================================
   3️⃣ MENU HAMBURGER (NAVIGATION MOBILE)
===================================================== */

const toggle = document.querySelector(".menu-toggle");
const navLinks = document.querySelector(".nav-links");

if (toggle) {
    // Ouverture/Fermeture au clic
    toggle.addEventListener("click", () => {
        navLinks.classList.toggle("show");
        navLinks.classList.toggle("nav-open");
    });

    // Fermeture automatique quand la souris quitte le menu
    navLinks.addEventListener("mouseleave", () => {
        navLinks.classList.remove("show");
        navLinks.classList.remove("nav-open");
    });
}


/* =====================================================
   4️⃣ PARTICULES ÉCOLOGIQUES EN BACKGROUND
===================================================== */

const canvas = document.getElementById("particles");

if(canvas){

const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let particles = [];

for(let i=0;i<60;i++){

particles.push({

x:Math.random()*canvas.width,
y:Math.random()*canvas.height,
r:Math.random()*2+1,
d:Math.random()*1

});

}

function draw(){

ctx.clearRect(0,0,canvas.width,canvas.height);

ctx.fillStyle="rgba(46,204,113,0.3)";

particles.forEach(p=>{

ctx.beginPath();
ctx.arc(p.x,p.y,p.r,0,Math.PI*2);
ctx.fill();

});

update();

}

function update(){

particles.forEach(p=>{

p.y += p.d;

if(p.y>canvas.height){

p.y=0;
p.x=Math.random()*canvas.width;

}

});

}

setInterval(draw,33);

}



/* =====================================================
   5️⃣ COMPTEUR CO2 ÉCONOMISÉ
===================================================== */

let counter = 0;

setInterval(()=>{

counter += Math.floor(Math.random()*10);

const co2Element = document.getElementById("co2");

if(co2Element){
co2Element.innerText = counter;
}

},1000);



/* =====================================================
   6️⃣ SCORE ENVIRONNEMENTAL
===================================================== */

let score = 0;

function updateScore(){

if(score<85){

score += 5;

const scoreBar = document.getElementById("score");
const scoreText = document.getElementById("scoreText");

if(scoreBar && scoreText){

scoreBar.style.width = score + "%";

scoreText.innerText =
"Impact citoyen : " + score + "%";

}

}

}

setInterval(updateScore,1200);



/* =====================================================
   7️⃣ HERO PARALLAX AU SCROLL
===================================================== */

window.addEventListener("scroll", () => {

const scroll = window.pageYOffset;

if(hero){
hero.style.backgroundPositionY = scroll * 0.5 + "px";
}

});



/* =====================================================
   8️⃣ CARTE INTERACTIVE DE DOUALA (Leaflet)
===================================================== */

const mapElement = document.getElementById("doualaMap");

if(mapElement){

const map = L.map('doualaMap').setView([4.0511, 9.7679], 12);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
attribution:'© OpenStreetMap'
}).addTo(map);


/* Marqueurs principaux */

L.marker([4.0511, 9.7679]).addTo(map).bindPopup("Akwa : zone stratégique pour la mobilité douce");
L.marker([4.0483, 9.7043]).addTo(map).bindPopup("Ndokoti : réduire les embouteillages grâce au vélo");
L.marker([4.0615, 9.7012]).addTo(map).bindPopup("Deido : potentiel pour pistes cyclables");
L.marker([4.0587, 9.6920]).addTo(map).bindPopup("Bonanjo : centre administratif accessible à pied");
L.marker([4.050, 9.730]).addTo(map).bindPopup("Bessengue : quartier résidentiel");

/* Quartiers supplémentaires */

L.marker([4.0750, 9.6700]).addTo(map).bindPopup("Bonabéri : extension urbaine");
L.marker([4.0580, 9.7550]).addTo(map).bindPopup("Logpom : zone résidentielle dense");
L.marker([4.0850, 9.7620]).addTo(map).bindPopup("Logbessou : pôle universitaire");
L.marker([4.0450, 9.7420]).addTo(map).bindPopup("Ndogbong : zone mixte habitat / école");
L.marker([3.9900, 9.7850]).addTo(map).bindPopup("Yassa : entrée Est de Douala");
L.marker([4.0300, 9.6950]).addTo(map).bindPopup("Bonapriso : zone idéale pour la marche");
L.marker([4.0720, 9.7480]).addTo(map).bindPopup("Kotto : nouveau centre urbain");
L.marker([4.0050, 9.8350]).addTo(map).bindPopup("Japoma : zone sportive");
L.marker([4.0150, 9.7750]).addTo(map).bindPopup("Ndogpassi : pôle commercial");
L.marker([4.0320, 9.7180]).addTo(map).bindPopup("Brazzaville : quartier historique");
L.marker([4.0920, 9.7700]).addTo(map).bindPopup("Logbessou II : extension résidentielle");

}



/* =====================================================
   9️⃣ ANIMATION : VÉLO QUI TRAVERSE LA PAGE AU SCROLL
===================================================== */

window.addEventListener("scroll", () => {

const bike = document.querySelector(".bike-scroll");

if(bike){

const scrollTop = window.scrollY;

const docHeight =
document.body.scrollHeight - window.innerHeight;

const progress = scrollTop / docHeight;

bike.style.left = progress * window.innerWidth + "px";

}

});



/* =====================================================
   🔟 MODE SOMBRE
===================================================== */

const darkBtn = document.querySelector(".dark-toggle");

if(darkBtn){

darkBtn.addEventListener("click", () => {

document.body.classList.toggle("dark-mode");

});

}



/* =====================================================
   1️⃣1️⃣ BOUTON RETOUR EN HAUT
===================================================== */

const scrollBtn = document.getElementById("scrollTop");

window.addEventListener("scroll", () => {

if(scrollBtn){

if(window.scrollY > 300){
scrollBtn.style.display = "block";
}else{
scrollBtn.style.display = "none";
}

}

});

if(scrollBtn){

scrollBtn.onclick = () => {

window.scrollTo({
top:0,
behavior:"smooth"
});

};

}



/* =====================================================
   1️⃣2️⃣ SIMULATEUR IMPACT CITOYEN
===================================================== */

const citizensSlider = document.getElementById("citizens");

if(citizensSlider){

const citizenCount = document.getElementById("citizen-count");
const co2Saved = document.getElementById("co2-saved");
const carsRemoved = document.getElementById("cars-removed");

function updateImpact(){

let citizens = citizensSlider.value;

citizenCount.textContent = citizens;

let co2 = (citizens * 0.2).toFixed(1);
let cars = Math.floor(citizens * 0.5);

co2Saved.textContent = co2;
carsRemoved.textContent = cars;

}

citizensSlider.addEventListener("input", updateImpact);

updateImpact();

}



/* =====================================================
   1️⃣3️⃣ GRAPHIQUE POLLUTION URBAINE
===================================================== */

const chartCanvas = document.getElementById('pollutionChart');

if(chartCanvas){

new Chart(chartCanvas, {

type: 'line',

data: {

labels: ["2025","2026","2027","2028","2029","2030"],

datasets: [

{
label: "Pollution automobile",
data: [100,110,120,130,140,150],
borderWidth:3
},

{
label: "Usage du vélo",
data: [5,15,25,40,60,80],
borderWidth:3
}

]

},

options:{
responsive:true
}

});

}



/* =====================================================
   1️⃣4️⃣ SIMULATEUR PISTES CYCLABLES
===================================================== */

const kmSlider = document.getElementById("bikeKm");

if(kmSlider){

const kmValue = document.getElementById("kmValue");
const impactResult = document.getElementById("impactResult");

function updateSimulation(){

let km = kmSlider.value;

kmValue.textContent = km;

let citizens = km * 500;

impactResult.textContent =
"Environ " + citizens +
" citoyens pourraient adopter le vélo quotidiennement.";

}

kmSlider.addEventListener("input", updateSimulation);

updateSimulation();

}



/* =====================================================
   1️⃣5️⃣ SERVICE WORKER (PWA)
===================================================== */

if ("serviceWorker" in navigator) {

navigator.serviceWorker.register("service-worker.js")

.then(() => console.log("Service Worker activé"))

.catch(error => console.log("Service Worker erreur :", error));

}



/* =====================================================
   1️⃣6️⃣ SPLASH SCREEN (ÉCRAN DE CHARGEMENT)
===================================================== */

window.addEventListener("load", function(){

const splash = document.getElementById("splash-screen");

if(splash){

setTimeout(() => {

splash.classList.add("hide");

}, 1800);

}

});



// ===============================
// BOUTON RETOUR EN HAUT
// ===============================

const backToTop = document.getElementById("backToTop");

window.addEventListener("scroll", () => {

if(window.scrollY > 500){
backToTop.style.display = "block";
}else{
backToTop.style.display = "none";
}

});

backToTop.addEventListener("click", () => {

window.scrollTo({
top: 0,
behavior: "smooth"
});

});




// ===============================
// MENU MOBILE
// ===============================

// const toggle = document.querySelector(".menu-toggle");
// const navLinks = document.querySelector(".nav-links");

// toggle.addEventListener("click", () => {

// navLinks.classList.toggle("nav-open");

// });