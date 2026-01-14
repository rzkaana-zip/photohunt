// const currentUser = localStorage.getItem('currentUser');
// if (!currentUser) {
//     window.location.href = 'login.html';
//     return;
// }
// const user = JSON.parse(currentUser);
// if (user.role === 'mitra') {
//     window.location.href = 'mitra-dashboard.html';
//     return;
// }

// console.log('Selamat datang pelanggan:', user.name);
const scope = (function () {
        const root = document.querySelector(".beranda");
        let currentCategory = "photobox";
        let currentCity = "bekasi";

        const studiosDB = [
          {
            name: "Selfie Time, Mal Lippo Cikarang.",
            city: "bekasi",
            category: "photobox",
            img: "https://placehold.co/600x350/png?text=Selfie+Time",
          },
          {
            name: "DirtyLine Studio, Tambun.",
            city: "bekasi",
            category: "photobox",
            img: "https://placehold.co/600x350/png?text=DirtyLine",
          },
          {
            name: "Angel Studios, Bekasi Timur.",
            city: "bekasi",
            category: "photobox",
            img: "https://placehold.co/600x350/png?text=Angel+Studios",
          },

          {
            name: "Sejiwa Studio Pro, Galaxy.",
            city: "bekasi",
            category: "photostudio",
            img: "https://placehold.co/600x350/333/fff?text=Sejiwa+Studio",
          },
          {
            name: "Fana Potret Keluarga, Summarecon.",
            city: "bekasi",
            category: "photostudio",
            img: "https://placehold.co/600x350/333/fff?text=Fana+Potret",
          },

          {
            name: "Photomatics, Blok M Square.",
            city: "jakarta",
            category: "photobox",
            img: "https://placehold.co/600x350/png?text=Photomatics+JKT",
          },

          {
            name: "Kencana Photo Studio, Tebet.",
            city: "jakarta",
            category: "photostudio",
            img: "https://placehold.co/600x350/333/fff?text=Kencana+Photo",
          },

          {
            name: "BSD PhotoCorner.",
            city: "tangerang",
            category: "photobox",
            img: "https://placehold.co/600x350/png?text=BSD+Corner",
          },
        ];

        const select = (selector) => root.querySelector(selector);
        const selectAll = (selector) => root.querySelectorAll(selector);

        function renderStudios() {
          const container = select(".js-studio-container");

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

            card.innerHTML = `
        <img src="${item.img}" class="studio-img" alt="${item.name}">
        <div class="studio-name">${item.name}</div>
      `;

            container.appendChild(card);
          });

          const cityName =
            currentCity.charAt(0).toUpperCase() + currentCity.slice(1);
          const catName =
            currentCategory === "photobox" ? "PhotoBox" : "PhotoStudio";
          select(
            ".js-see-more"
          ).innerText = `Lihat ${catName} (${cityName}) lainnya >`;
        }

        function switchCategory(cat) {
          currentCategory = cat;
          select(".js-tab-photobox").classList.remove("active");
          select(".js-tab-photostudio").classList.remove("active");

          if (cat === "photobox")
            select(".js-tab-photobox").classList.add("active");
          if (cat === "photostudio")
            select(".js-tab-photostudio").classList.add("active");

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
            const inputVal = select(".js-input-location").value.toLowerCase();
            const validCities = ["jakarta", "bekasi", "tangerang", "depok"];

            const foundCity = validCities.find((c) => inputVal.includes(c));

            if (foundCity) {
              const tabs = selectAll(".city-tab");
              tabs.forEach((tab) => {
                if (tab.innerText.toLowerCase() === foundCity) {
                  filterStudio(foundCity, tab);
                }
              });
            } else {
              alert(
                "Mencari '" +
                  inputVal +
                  "'... (Coba ketik 'Jakarta' atau 'Bekasi')"
              );
            }
          };
        }

        renderStudios();

        return { switchCategory, filterStudio };
      })();

