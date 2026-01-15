const params = new URLSearchParams(window.location.search);
const idReservasi = params.get("id");

const alasanInput = document.querySelector("#alasanInput");
const cancelBtn = document.querySelector(".cancel-btn");

document.querySelector(".back-btn").addEventListener("click", () => {
    if (idReservasi) {
        window.location.href = `pemesanan.html?id=${idReservasi}`;
    } else {
        window.location.href = "history.html";
    }
});

alasanInput.addEventListener("input", () => {
    const text = alasanInput.value.trim();
    
    if (text.length > 0) {
        cancelBtn.disabled = false;
    } else {
        cancelBtn.disabled = true;
    }
});

cancelBtn.addEventListener("click", () => {
    const alasan = alasanInput.value.trim();
    
    const dataPembatalan = {
        id_reservasi: idReservasi,
        alasan: alasan,
        timestamp: new Date().toISOString()
    };

    console.log("Memproses pembatalan...", dataPembatalan);

    cancelBtn.innerHTML = "Menunggu Konfirmasi Mitra...";
    cancelBtn.disabled = true;
    alasanInput.disabled = true; 

    setTimeout(() => {
        console.log("Konfirmasi diterima. Mengalihkan halaman...");
        
        localStorage.setItem('alasan_batal', alasan);

        window.location.href = `info-batal.html?id=${idReservasi}`; 
        
    }, 2000); 
});