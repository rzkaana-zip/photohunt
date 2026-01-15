document.addEventListener('DOMContentLoaded', () => {
    // --- 1. SIMULASI DATA DARI DATABASE (BACKEND) ---
    // Nanti diganti dengan fetch('/api/cancellations')
    const dbData = [
        {
            id: "res_018",
            studio_name: "Selfie Time, Mal Lippo Cikarang",
            package_name: "Paket Single",
            reservation_date: "2025-12-17T15:00:00",
            total_price: 25000,
            refund_amount: 0, // 0 artinya hangus
            reason: "Sakit, tidak bisa datang",
            request_date: "2025-12-15T16:20:00",
            status: "pending", // pending, approved, rejected, cancelled
            bank_info: {
                bank: "BNI",
                number: "6667778889",
                name: "Andi Pratama"
            }
        },
       
    ];

    // Simpan data di variabel global agar bisa difilter
    window.allCancellations = dbData;
    
    // Render awal (tampilkan semua)
    renderList(window.allCancellations);
});

// --- 2. FUNGSI RENDER UTAMA ---
function renderList(data) {
    const container = document.getElementById('data-container');
    container.innerHTML = ''; // Bersihkan container

    if (data.length === 0) {
        container.innerHTML = '<div style="text-align:center; padding:20px;">Tidak ada data ditemukan.</div>';
        return;
    }

    data.forEach(item => {
        // A. Format Tanggal & Rupiah
        const resDate = new Date(item.reservation_date).toLocaleDateString('id-ID', { day: '2-digit', month: '2-digit', year: 'numeric' });
        const resTime = new Date(item.reservation_date).toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' });
        const reqDate = new Date(item.request_date).toLocaleString('id-ID', { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit' });
        
        const formatRupiah = (num) => new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(num);

        // B. Logika Tampilan Berdasarkan Data
        let badgeHtml = '';
        let refundValueHtml = '';
        let actionsHtml = '';
        let bankDetailsHtml = '';
        let footerStatusHtml = '';

        // -- Logic Status Badge
        if (item.status === 'pending') {
            badgeHtml = `<div class="cr-badge cr-badge--pending">Menunggu Persetujuan</div>`;
            // Tampilkan tombol aksi hanya jika pending
            actionsHtml = `
                <div class="cr-actions">
                  <div class="cr-actions__prompt">
                    <span class="cr-prompt-text">Proses refund untuk customer?</span>
                    ${item.refund_amount === 0 ? '<small class="cr-prompt-warning">*Pembatalan < H-2, DP hangus</small>' : ''}
                  </div>
                  <div class="cr-actions__buttons">
                    <button class="cr-btn cr-btn--approve" onclick="handleAction('${item.id}', 'approve')">
                       <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg> Setujui
                    </button>
                    <button class="cr-btn cr-btn--reject" onclick="handleAction('${item.id}', 'reject')">
                       <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg> Tolak
                    </button>
                  </div>
                </div>`;
        } else if (item.status === 'approved') {
            badgeHtml = `<div class="cr-badge cr-badge--cancelled">Dibatalkan (Refund Sukses)</div>`;
            footerStatusHtml = `<div class="cr-footer-status"><div class="cr-status-tag cr-status-tag--refunded">Dana Dikembalikan</div></div>`;
        } else {
            badgeHtml = `<div class="cr-badge cr-badge--rejected">Ditolak</div>`;
        }

        // -- Logic Refund Amount (Hangus vs Nominal)
        if (item.refund_amount === 0) {
            refundValueHtml = `<span class="cr-value cr-text-hangus">DP Hangus</span>`;
        } else {
            refundValueHtml = `<span class="cr-value cr-text-refund">${formatRupiah(item.refund_amount)}</span>`;
        }

        // -- Logic Bank Details (Hanya tampil jika ada data bank)
        if (item.bank_info) {
            bankDetailsHtml = `
            <div class="cr-bank-details">
              <div class="cr-bank-header">📌 Informasi Rekening Refund:</div>
              <div class="cr-bank-info">
                <div class="cr-bank-row"><span class="cr-bank-label">Bank:</span><span class="cr-bank-value">${item.bank_info.bank}</span></div>
                <div class="cr-bank-row"><span class="cr-bank-label">No. Rekening:</span><span class="cr-bank-value">${item.bank_info.number}</span></div>
                <div class="cr-bank-row"><span class="cr-bank-label">Atas Nama:</span><span class="cr-bank-value">${item.bank_info.name}</span></div>
              </div>
            </div>`;
        }

        // C. Template Literal HTML (Kerangka Card)
        const cardHtml = `
          <div class="cr-card" id="card-${item.id}">
            <div class="cr-card__header">
              <div class="cr-card__meta">
                <h3 class="cr-card__venue">${item.studio_name}</h3>
                <div class="cr-card__submeta">
                  <span class="cr-card__id">ID: ${item.id}</span>
                  <span class="cr-card__separator">•</span>
                  <span class="cr-card__package">${item.package_name}</span>
                </div>
              </div>
              ${badgeHtml}
            </div>

            <div class="cr-info-grid">
              <div class="cr-info-item">
                <span class="cr-label">Tanggal Reservasi</span>
                <span class="cr-value">${resDate}</span>
                <span class="cr-subvalue">${resTime}</span>
              </div>
              <div class="cr-info-item">
                <span class="cr-label">Total Harga</span>
                <span class="cr-value">${formatRupiah(item.total_price)}</span>
              </div>
              <div class="cr-info-item">
                <span class="cr-label">Jumlah Refund</span>
                ${refundValueHtml}
              </div>
            </div>

            <div class="cr-reason">
              <span class="cr-reason__label">Alasan Pembatalan:</span>
              <span class="cr-reason__text">${item.reason}</span>
            </div>
            
            <div class="cr-timestamp">Diajukan: ${reqDate}</div>

            ${bankDetailsHtml}
            ${actionsHtml}
            ${footerStatusHtml}
          </div>
        `;

        // Masukkan card ke dalam container
        container.insertAdjacentHTML('beforeend', cardHtml);
    });
}

// --- 3. FUNGSI FILTER TAB ---
function filterData(status, tabElement) {
    // Update UI Tab Active
    document.querySelectorAll('.cr-tab').forEach(t => t.classList.remove('cr-tab--active'));
    tabElement.classList.add('cr-tab--active');

    // Filter Logic
    let filteredData;
    if (status === 'all') {
        filteredData = window.allCancellations;
    } else if (status === 'pending') {
        filteredData = window.allCancellations.filter(item => item.status === 'pending');
    } else if (status === 'approved') {
        filteredData = window.allCancellations.filter(item => item.status === 'approved');
    }

    renderList(filteredData);
}

// --- 4. FUNGSI AKSI (APPROVE/REJECT) ---
function handleAction(id, type) {
    const actionText = type === 'approve' ? 'menyetujui' : 'menolak';
    
    if(confirm(`Apakah Anda yakin ingin ${actionText} refund untuk ID: ${id}?`)) {
        // Simulasi Call ke API Backend
        console.log(`Mengirim request ke API: /api/refund/${id}/${type}`);
        
        // Simulasi Update UI (Menghapus card atau update status)
        alert(`Berhasil ${actionText} refund!`);
        
        // Opsional: Hapus card dari tampilan agar tidak perlu refresh
        const card = document.getElementById(`card-${id}`);
        if(card) {
            card.style.opacity = '0.5';
            card.style.pointerEvents = 'none';
            // Atau remove(): card.remove();
        }
    }
}