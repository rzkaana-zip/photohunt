const mitraId = localStorage.getItem("activeMitraId") || "mitra_001";

const previewTitle = document.getElementById("previewTitle");
const previewDesc = document.getElementById("previewDesc");
const previewLocation = document.getElementById("previewLocation");
const previewFacilities = document.getElementById("previewFacilities");
const closePreview = document.getElementById("closePreview");

function loadPreviewStudio() {
  const allData = JSON.parse(localStorage.getItem("photohuntStudios")) || {};
  const studio = allData[mitraId];

  if (!studio) {
    previewTitle.textContent = "Preview Studio";
    previewDesc.textContent = "Studio belum tersedia.";
    previewLocation.textContent = "-";
    return;
  }

  previewTitle.textContent = `Preview: ${studio.name}`;
  previewDesc.innerHTML = `
    <strong>${studio.name}</strong><br>
    ${studio.description || ""}
  `;

  previewLocation.textContent = studio.location || "Lokasi belum diisi";

  previewFacilities.innerHTML = "";
  (studio.facilities || []).forEach(f => {
    const chip = document.createElement("span");
    chip.className = "mitra-chip";
    chip.textContent = f;
    previewFacilities.appendChild(chip);
  });
}

closePreview.addEventListener("click", () => {
  window.location.href = "kelola-studio.html";
});

loadPreviewStudio();
