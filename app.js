document.addEventListener('DOMContentLoaded', () => {
    // === CEK LOGIN ===
    const currentUser = localStorage.getItem('currentUser');
    if (!currentUser) {
        window.location.href = 'login.html';
        return;
    }
    const user = JSON.parse(currentUser);

    // Tampilkan nama user di header
    document.querySelector('.logo').insertAdjacentHTML('afterend',
        `<span style="margin-left:15px; color:white; font-weight:600;">Hi, ${user.name.split(' ')[0]}!</span>`);

    // === VARIABEL KATEGORI (Photobox / Photostudio) ===
    let currentCategory = 'photobox'; 

    document.querySelectorAll('.category-tab').forEach(tab => {
        tab.addEventListener('click', () => {
            document.querySelectorAll('.category-tab').forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
            currentCategory = tab.dataset.type;     
            loadStudios();                         
        });
    });

    // === DATABASE SETUP ===
    let db;
    const dbName = 'PhotoHuntDB';
    const dbVersion = 1;

    const sampleStudios = [
        { id: 1, type: 'photostudio', name: 'Selfie Time, Mall Pulo Gadung', location: 'Jakarta', capacity: 4, photos: ['images/selfietime.jpeg'], description: 'Studio selfie modern.' },
        { id: 2, type: 'photostudio', name: 'Dirtyline Studio, Tambun', location: 'Bekasi', capacity: 6, photos: ['https://via.placeholder.com/400x300/4ECDC4/FFFFFF?text=Dirtyline'], description: 'Ruang foto kreatif.' },
        { id: 3, type: 'photobox',   name: 'Angel Photobox, Bekasi Timur', location: 'Bekasi', capacity: 2, photos: ['https://via.placeholder.com/400x300/45B7D1/FFFFFF?text=Angel'], description: 'Photobox cepat & murah.' },
        { id: 4, type: 'photobox',   name: 'Kawaii Box, Pantai Indah Kapuk', location: 'Jakarta', capacity: 3, photos: ['https://via.placeholder.com/400x300/FFA07A/FFFFFF?text=Kawaii'], description: 'Tema Jepang lucu.' }
    ];

    function initDB() {
        const request = indexedDB.open(dbName, dbVersion);
        request.onsuccess = (e) => { db = e.target.result; loadStudios(); };
        request.onupgradeneeded = (e) => {
            db = e.target.result;
            db.createObjectStore('studios', { keyPath: 'id' });
            const store = db.createObjectStore('studios', { keyPath: 'id' });
            sampleStudios.forEach(s => store.add(s)); 
        };
    }

    function loadStudios() {
        const transaction = db.transaction(['studios'], 'readonly');
        const store = transaction.objectStore('studios');
        const request = store.getAll();

        request.onsuccess = () => {
            const filtered = request.result.filter(s => s.type === currentCategory);
            const grid = document.getElementById('results');
            if (filtered.length === 0) {
                grid.innerHTML = `<p style="grid-column:1/-1;text-align:center;color:#999;margin:40px;">Belum ada ${currentCategory} di daerah ini</p>`;
                return;
            }
            grid.innerHTML = filtered.map(studio => `
                <div class="studio-card" onclick="openModal(${studio.id})">
                    <img src="${studio.photos[0]}" alt="${studio.name}">
                    <div class="studio-info">
                        <h3>${studio.name}</h3>
                        <p>${studio.location} • Kapasitas ${studio.capacity} orang</p>
                    </div>
                </div>
            `).join('');
        };
    }

    window.openModal = (id) => {  };
    window.makeBooking = (id) => { };

    // === LOGOUT ===
    document.getElementById('logoutBtn')?.addEventListener('click', () => {
        if (confirm('Keluar dari akun?')) {
            localStorage.removeItem('currentUser');
            window.location.href = 'login.html';
        }
    });

    // === START ===
    initDB();
});