// Datos de proyectos — placeholders, reemplazar con los reales de Andrea
const projectsData = {
  1: {
    name: "Lorem Ipsun",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Este proyecto integra espacio y luz natural, con materiales nobles que dialogan con el entorno.",
    items: 6,
  },
};

const params = new URLSearchParams(window.location.search);
const projectId = params.get("p") || "1";
const project = projectsData[projectId] || projectsData[1];

document.getElementById("galeriaNombre").textContent = project.name;
document.getElementById("amBackLink").href = `proyecto.html?p=${projectId}`;

// Un solo marco: renders y planos se van intercalando adentro (crossfade)
const stage = document.getElementById("galeriaStage");
let current = 0;

function buildStageItems() {
  for (let i = 0; i < project.items; i++) {
    const isRender = i % 2 === 0;
    const item = document.createElement("div");
    item.classList.add("galeria-item");
    item.innerHTML = `
      <i class="fa-solid ${isRender ? "fa-image" : "fa-drafting-compass"}"></i>
      <span>${isRender ? "Render" : "Plano"} ${Math.ceil((i + 1) / 2)}</span>
    `;
    stage.appendChild(item);
  }
}

function showItem(index) {
  const items = stage.querySelectorAll(".galeria-item");
  items.forEach((item, i) => item.classList.toggle("active", i === index));
}

function nextItem() {
  current = (current + 1) % project.items;
  showItem(current);
}

buildStageItems();
showItem(current);
setInterval(nextItem, 3500);

// Efecto de escritura a mano, letra por letra
const textEl = document.getElementById("galeriaTexto");
const fullText = project.description;
let charIndex = 0;

function typeWriter() {
  if (charIndex < fullText.length) {
    textEl.textContent += fullText.charAt(charIndex);
    charIndex++;
    setTimeout(typeWriter, 35);
  }
}

typeWriter();