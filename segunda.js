// --------------------
// REVEAL ON SCROLL (mejorado con delay)
// --------------------
document.querySelectorAll(".reveal").forEach(el => {
  const delay = el.getAttribute("data-delay");
  if (delay) el.style.setProperty("--d", `${delay}ms`);
});

const io = new IntersectionObserver((entries) => {
  entries.forEach((e) => {
    if (e.isIntersecting) {
      e.target.classList.add("show");
      io.unobserve(e.target);
    }
  });
}, { threshold: 0.15 });

document.querySelectorAll(".reveal").forEach(el => io.observe(el));


// --------------------
// SLIDER "MOMENTOS" (1 foto a la vez + dots + mensaje)
// --------------------
const slides = [
  { src: "aventura.jpeg", msg: "Amé mucho este día, tienes un espíritu apasionado por la aventura y la espontanedad. Quiero hacer contigo varias cosas que nunca hecho" },
  { src: "hogar.jpeg", msg: "Soy muy repetitivo en esto, lo sé. Pero es la verdad, no puede explicar lo bien y realizado que me siento estando a tu lado, no es una zona de comfort es un lugar dónde tuve que haber estado hace mucho tiempo " },
  { src: "natural.jpeg", msg: "Todo en mi ser se desarrolla de una forma tan pura y consistente. No tengo que forzar una superficialidad para demostrar algo, toda expresión hacia a ti es mi ser" },
];


let idx = 0;

const slideImg = document.getElementById("slideImg");
const slideMsg = document.getElementById("slideMsg");
const toggleMsg = document.getElementById("toggleMsg");
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");
const slideArea = document.getElementById("slideArea");
const dots = document.getElementById("dots");

function buildDots(){
  dots.innerHTML = "";
  slides.forEach((_, i) => {
    const b = document.createElement("button");
    b.className = "dot" + (i === idx ? " active" : "");
    b.setAttribute("aria-label", `Ir a foto ${i+1}`);
    b.addEventListener("click", () => goTo(i));
    dots.appendChild(b);
  });
}

function setDotActive(){
  dots.querySelectorAll(".dot").forEach((d, i) => {
    d.classList.toggle("active", i === idx);
  });
}

function hideMsg(){
  slideMsg.style.display = "none";
  toggleMsg.textContent = "Mostrar mensaje";
}

function renderSlide(){
  // fade suave
  slideImg.style.opacity = "0";
  hideMsg();

  const s = slides[idx];
  slideImg.src = s.src;

  // cuando carga, vuelve a 1
  slideImg.onload = () => {
    slideImg.style.opacity = "1";
  };

  slideMsg.textContent = s.msg;
  setDotActive();
}

function next(){
  idx = (idx + 1) % slides.length;
  renderSlide();
}

function prev(){
  idx = (idx - 1 + slides.length) % slides.length;
  renderSlide();
}

function goTo(i){
  idx = i;
  renderSlide();
}

toggleMsg.addEventListener("click", () => {
  const hidden = slideMsg.style.display === "none";
  slideMsg.style.display = hidden ? "block" : "none";
  toggleMsg.textContent = hidden ? "Ocultar mensaje" : "Mostrar mensaje";
});

nextBtn.addEventListener("click", next);
prevBtn.addEventListener("click", prev);
slideArea.addEventListener("click", next);

buildDots();
renderSlide();

// --------------------
// CORAZONES AL PASAR MOUSE
// --------------------

document.querySelectorAll(".hover-hearts").forEach(title => {

  title.addEventListener("mouseenter", () => {

    for(let i = 0; i < 6; i++){
      createHeart(title);
    }

  });

});

function createHeart(parent){

  const heart = document.createElement("span");
  heart.classList.add("floating-heart");
  heart.textContent = "💖";

  const x = Math.random() * parent.offsetWidth;
  const delay = Math.random() * 0.5;

  heart.style.left = `${x}px`;
  heart.style.bottom = "0px";
  heart.style.animationDelay = `${delay}s`;

  parent.appendChild(heart);

  setTimeout(() => {
    heart.remove();
  }, 1800);
}

function showSurprise(){
  const messages = [
    "Eres oficialmente mi persona favorita.",
    "Te gano bien fácil en plato.",
    "Confieso que me gustó comer ese moco que tenías.",
    "Algún día te va a gustar tanto el maíz como a mí.",
    "Me encanta ver de cerca tu rostro.",
    "Entonces chama... Todavía no sé qué pasó con el Guacamole??",
    "Exámen de Españooool! Estoy ahora en el 'Establecimiento' ó 'Establecimienta'?",
    "Era Establecimiento btw... :D",
    "Ante ayer caminé 2.4KM, cuidado conmigo cuando camines ;). No sé cuánto es en miles, I bet you know",
    "Chiste Chiste: Me sacaron de un groupchat de paracaidismo ... Se ve que no les CAÍA bien  XDD",
    "Amo tu voz en todo momento, ternura linda",
    "Todavía me acuerdo de ese momento cuando te tiraste ese peo en el ascensor. Todavía me cago de la risa",
    "Un bonbon como tu nunca está de más en la vida",
    "Quieres un segundo Chiste? BET!!.  - Qué dice una Cereza al verse en el espejo? ¿Ceré Eza? XDDD"

  ];
  const random = messages[Math.floor(Math.random()*messages.length)];
  document.getElementById("surpriseText").textContent = random;
}

function measureLove(){
  const percentage = Math.floor(Math.random()*20) + 80;
  document.getElementById("loveFill").style.width = percentage + "%";
  document.getElementById("loveText").textContent = percentage + "% confirmado oficialmente.";
}

function heartRain(){
  for(let i=0;i<30;i++){
    const heart = document.createElement("div");
    heart.textContent = "💖";
    heart.style.position = "fixed";
    heart.style.left = Math.random()*100 + "vw";
    heart.style.top = "-20px";
    heart.style.fontSize = "20px";
    heart.style.opacity = 1;
    heart.style.transition = "transform 3s linear, opacity 3s linear";
    document.body.appendChild(heart);

    setTimeout(()=>{
      heart.style.transform = "translateY(100vh)";
      heart.style.opacity = 0;
    },50);

    setTimeout(()=>{
      heart.remove();
    },3000);
  }
}


