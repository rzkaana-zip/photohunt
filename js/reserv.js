console.log("JS jalan");

let paket = null;
let orang = null;
let harga = null;
let jam = null;

document.querySelectorAll(".paket-item").forEach(item => {
  item.addEventListener("click", () => {
    document.querySelectorAll(".paket-item")
      .forEach(p => p.classList.remove("active"));

    item.classList.add("active");

    paket = item.dataset.paket;
    orang = item.dataset.orang;
    harga = item.dataset.harga;

    document.getElementById("jumlahOrang").innerText = orang + " orang";
    document.getElementById("totalHarga").innerText =
      "Rp " + Number(harga).toLocaleString("id-ID");
  });
});

document.querySelectorAll(".jadwal").forEach(j => {
  j.addEventListener("click", () => {
    document.querySelectorAll(".jadwal")
      .forEach(x => x.classList.remove("active"));

    j.classList.add("active");
    jam = j.innerText;
  });
});

document.getElementById("btnBayar").addEventListener("click", () => {
  const tanggal = document.getElementById("tanggal").value;

  if (!paket || !tanggal || !jam) {
    alert("Lengkapi semua pilihan dulu!");
    return;
  }

  const data = {
    paket,
    orang,
    harga,
    tanggal,
    jam
  };

  console.log("DATA RESERVASI:", data);
  alert("Reservasi berhasil!\nCek console.");
});
