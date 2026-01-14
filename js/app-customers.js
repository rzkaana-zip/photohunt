// --- LOGIC AUTH (Biarkan dikomentari jika belum dipakai) ---
// const currentUser = localStorage.getItem('currentUser');
// if (!currentUser) {
//     window.location.href = 'login.html';
// }
// const user = JSON.parse(currentUser);
// if (user && user.role === 'mitra') {
//     window.location.href = 'mitra-dashboard.html';
// }
// console.log('Selamat datang pelanggan:', user ? user.name : 'Guest');


const scope = (function () {
    const root = document.querySelector(".beranda");
    
    if (!root) return {}; 

    let currentCategory = "photobox";
    let currentCity = "bekasi";

    const dateInput = root.querySelector('.js-input-date');
    if (dateInput) {
        dateInput.valueAsDate = new Date();
    }

    const studiosDB = [
        { name: "Selfie Time, Mal Lippo Cikarang.", city: "bekasi", category: "photobox", img: "https://placehold.co/600x350/png?text=Selfie+Time", url: "detail-selfie-time.html" },
        { name: "DirtyLine Studio, Tambun.", city: "bekasi", category: "photobox", img: "https://placehold.co/600x350/png?text=DirtyLine", url: "detail-dirtyline.html" },
        { name: "Angel Studios, Bekasi Timur.", city: "bekasi", category: "photobox", img: "https://placehold.co/600x350/png?text=Angel+Studios", url: "detail-angel-studios.html" },
        { name: "Sejiwa Studio Pro, Galaxy.", city: "bekasi", category: "photostudio", img: "https://placehold.co/600x350/333/fff?text=Sejiwa+Studio", url: "detail-sejiwa.html" },
        { name: "Fana Potret Keluarga, Summarecon.", city: "bekasi", category: "photostudio", img: "https://placehold.co/600x350/333/fff?text=Fana+Potret", url: "detail-fana-potret.html" },
        { name: "Photomatics, Blok M Square.", city: "jakarta", category: "photobox", img: "https://placehold.co/600x350/png?text=Photomatics+JKT", url: "detail-photomatics.html" },
        { name: "Kencana Photo Studio, Tebet.", city: "jakarta", category: "photostudio", img: "https://placehold.co/600x350/333/fff?text=Kencana+Photo", url: "detail-kencana.html" },
        { name: "BSD PhotoCorner.", city: "tangerang", category: "photobox", img: "https://placehold.co/600x350/png?text=BSD+Corner", url: "detail-bsd-corner.html" },
    ];

    const select = (selector) => root.querySelector(selector);
    const selectAll = (selector) => root.querySelectorAll(selector);

    function renderStudios() {
        const container = select(".js-studio-container");
        if (!container) return; 

        container.innerHTML = "";

        const filteredData = studiosDB.filter((item) => {
            return (
                item.category === currentCategory && item.city === currentCity
            );
        });

        if (filteredData.length === 0) {
            container.innerHTML = `<div style="grid-column: 1/-1; text-align: center; color: #888; padding: 40px;">Belum ada studio di kategori ini :(</div>`;
        }

        filteredData.forEach((item) => {
            const card = document.createElement("div");
            card.className = "studio-card";
            
            card.onclick = () => {
                if (item.url) window.location.href = item.url;
                else alert("Halaman untuk " + item.name + " belum disetting.");
            };

            card.innerHTML = `
                <img src="${item.img}" class="studio-img" alt="${item.name}">
                <div class="studio-name">${item.name}</div>
            `;
            container.appendChild(card);
        });

        const seeMoreBtn = select(".js-see-more");
        if (seeMoreBtn) {
            const cityName = currentCity.charAt(0).toUpperCase() + currentCity.slice(1);
            const catName = currentCategory === "photobox" ? "PhotoBox" : "PhotoStudio";
            seeMoreBtn.innerText = `Lihat ${catName} (${cityName}) lainnya >`;
        }
    }

    function switchCategory(cat) {
        currentCategory = cat;
        
        const tabBox = select(".js-tab-photobox");
        const tabStudio = select(".js-tab-photostudio");
        
        if(tabBox) tabBox.classList.remove("active");
        if(tabStudio) tabStudio.classList.remove("active");

        if (cat === "photobox" && tabBox) tabBox.classList.add("active");
        if (cat === "photostudio" && tabStudio) tabStudio.classList.add("active");

        renderStudios();
    }

    function filterStudio(city, element) {
        currentCity = city.toLowerCase();
        const tabs = selectAll(".city-tab");
        tabs.forEach((t) => t.classList.remove("active"));
        if (element) element.classList.add("active");
        renderStudios();
    }

    const btnSearch = select(".js-btn-search");
    if (btnSearch) {
        btnSearch.onclick = () => {
            const inputLoc = select(".js-input-location");
            const inputDate = select(".js-input-date");
            const inputPax = select(".js-input-pax");

            const inputVal = inputLoc ? inputLoc.value.toLowerCase() : "";
            const dateVal = inputDate ? inputDate.value : "-";
            const paxVal = inputPax ? inputPax.value : "-";

            const validCities = ["jakarta", "bekasi", "tangerang", "depok"];
            const foundCity = validCities.find((c) => inputVal.includes(c));

            if (foundCity) {
                const tabs = selectAll(".city-tab");
                tabs.forEach((tab) => {
                    if (tab.innerText.toLowerCase() === foundCity) filterStudio(foundCity, tab);
                });
                alert(`Mencari Studio di ${foundCity.toUpperCase()} pada tanggal ${dateVal} untuk ${paxVal} orang.`);
            } else {
                alert(`Mencari '${inputVal}' pada tanggal ${dateVal} untuk ${paxVal} orang... \n(Coba ketik kota: 'Jakarta' atau 'Bekasi')`);
            }
        };
    }

    renderStudios();

    return { switchCategory, filterStudio };
})();