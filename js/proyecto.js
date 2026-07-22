// Datos de proyectos — placeholders, reemplazar con los reales de Andrea
const projectsData = {
  1: { name: "Lorem Ipsun", videos: 5 },
  2: { name: "Lorem Ipsun", videos: 4 },
  3: { name: "Lorem Ipsun", videos: 6 },
  4: { name: "Lorem Ipsun", videos: 3 },
  5: { name: "Lorem Ipsun", videos: 5 },
  6: { name: "Lorem Ipsun", videos: 4 },
};

const params = new URLSearchParams(window.location.search);
const projectId = params.get("p") || "1";
const project = projectsData[projectId] || projectsData[1];

document.getElementById("projectName").textContent = project.name;

const stage = document.getElementById("carouselStage");
let currentIndex = 0;
const totalVideos = project.videos;

// Genera los elementos placeholder (luego cada uno será un <video src="...">)
function buildVideoItems() {
  stage.innerHTML = "";
  for (let i = 0; i < totalVideos; i++) {
    const item = document.createElement("div");
    item.classList.add("video-item");
    item.dataset.index = i;
    item.innerHTML = `<i class="fa-solid fa-play"></i>&nbsp; Video ${i + 1}`;
    stage.appendChild(item);
  }
}

function renderPositions() {
  const items = stage.querySelectorAll(".video-item");
  items.forEach((item, i) => {
    item.classList.remove("center", "left", "right", "hidden");
    if (i === currentIndex) {
      item.classList.add("center");
    } else if (i === (currentIndex - 1 + totalVideos) % totalVideos) {
      item.classList.add("left");
    } else if (i === (currentIndex + 1) % totalVideos) {
      item.classList.add("right");
    } else {
      item.classList.add("hidden");
    }
  });
}

function goNext() {
  currentIndex = (currentIndex + 1) % totalVideos;
  renderPositions();
}

function goPrev() {
  currentIndex = (currentIndex - 1 + totalVideos) % totalVideos;
  renderPositions();
}

// Auto-rotación de derecha a izquierda
let autoRotate = setInterval(goNext, 4000);

function resetAutoRotate() {
  clearInterval(autoRotate);
  autoRotate = setInterval(goNext, 4000);
}

document.getElementById("nextBtn").addEventListener("click", () => {
  goNext();
  resetAutoRotate();
});

document.getElementById("prevBtn").addEventListener("click", () => {
  goPrev();
  resetAutoRotate();
});

buildVideoItems();
renderPositions();