const packages = [
            {
                id: 1,
                name: "Paket Basic",
                price: 50000,
                duration: "30 menit",
                isPopular: false,
                features: [
                    "2 cetak foto 4R",
                    "5 foto digital",
                    "1 backdrop pilihan",
                    "Free properti foto"
                ]
            },
            {
                id: 2,
                name: "Paket Standard",
                price: 85000,
                duration: "60 menit",
                isPopular: true,
                features: [
                    "4 cetak foto 4R",
                    "10 foto digital",
                    "2 backdrop pilihan",
                    "Free properti foto",
                    "Free soft file"
                ]
            },
            {
                id: 3,
                name: "Paket Premium",
                price: 150000,
                duration: "90 menit",
                isPopular: false,
                features: [
                    "8 cetak foto 4R",
                    "Unlimited foto digital",
                    "Semua backdrop",
                    "Free properti foto",
                    "Free soft file & video"
                ]
            }
        ];

        function renderPackages(data) {
            const container = document.getElementById('dynamic-pricing-container');
            container.innerHTML = ''; 

            if(data.length === 0) {
                container.innerHTML = '<div style="text-align:center; padding: 20px;">Paket tidak ditemukan.</div>';
                return;
            }

            data.forEach(pkg => {
                const isPop = pkg.isPopular ? 'popular' : '';
                const badge = pkg.isPopular ? 
                    `<div style="display: flex; align-items: center; gap: 12px; margin-bottom: 8px;">
                        <div class="package-title">${pkg.name}</div>
                        <span class="popular-badge">TERPOPULER</span>
                     </div>` : 
                    `<div class="package-title">${pkg.name}</div>`;

                let featuresHtml = '';
                pkg.features.forEach(feat => {
                    featuresHtml += `
                        <div class="feature-item">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#101828" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                            <span class="small-text">${feat}</span>
                        </div>
                    `;
                });

                const cardHtml = `
                    <div class="package-card ${isPop}">
                        <div class="package-header">
                            <div>
                                ${badge}
                                <div class="package-price">Rp ${pkg.price.toLocaleString('id-ID')}</div>
                                <div class="package-duration">Durasi: ${pkg.duration}</div>
                            </div>
                            <button class="select-button">Pilih Paket</button>
                        </div>
                        <div class="package-features">
                            ${featuresHtml}
                        </div>
                    </div>
                `;
                container.innerHTML += cardHtml;
            });
        }

       const searchInput = document.getElementById('packageSearch');
        searchInput.addEventListener('input', function(e) {
            const keyword = e.target.value.toLowerCase();
            const filtered = packages.filter(p => p.name.toLowerCase().includes(keyword));
            renderPackages(filtered);
        });

        const dateInput = document.getElementById('dateInput');
        const dateDisplay = document.getElementById('dateDisplay');

        dateInput.addEventListener('change', function() {
            if(this.value) {
                const dateObj = new Date(this.value);
                const options = { day: 'numeric', month: 'short', year: 'numeric' };
                dateDisplay.innerText = dateObj.toLocaleDateString('id-ID', options);
            }
        });

        const peopleSelect = document.getElementById('peopleSelect');
        const peopleDisplay = document.getElementById('peopleDisplay');

        peopleSelect.addEventListener('change', function() {
            const selectedText = peopleSelect.options[peopleSelect.selectedIndex].text;
            peopleDisplay.innerText = selectedText;
        });

        function switchTab(tabName) {
            const tabContents = document.querySelectorAll('.tab-content');
            tabContents.forEach(tab => tab.classList.remove('active'));
            
            const tabButtons = document.querySelectorAll('.tab-button');
            tabButtons.forEach(button => button.classList.remove('active'));
            
            document.getElementById(`${tabName}-tab`).classList.add('active');
            if(window.event) {
                window.event.target.classList.add('active');
            } else {
               document.querySelector(`.tab-button[onclick="switchTab('${tabName}')"]`).classList.add('active');
            }
        }
        
        document.querySelectorAll('.thumbnail').forEach(thumbnail => {
            thumbnail.addEventListener('click', function() {
                document.querySelectorAll('.thumbnail').forEach(t => t.classList.remove('active'));
                this.classList.add('active');
            });
        });
        
        document.addEventListener('DOMContentLoaded', function() {
            renderPackages(packages); 
        });
