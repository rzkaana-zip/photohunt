        document.addEventListener('DOMContentLoaded', () => {
            console.log('Mitra Cancellation Module Loaded');

            const tabs = document.querySelectorAll('.cr-tab');
            tabs.forEach(tab => {
                tab.addEventListener('click', () => {
                    tabs.forEach(t => t.classList.remove('cr-tab--active'));
                    tab.classList.add('cr-tab--active');
                    console.log('Filtering by:', tab.innerText);
                });
            });

            
            document.querySelectorAll('.js-approve-btn').forEach(btn => {
                btn.addEventListener('click', function(e) {
                    const card = this.closest('.cr-card');
                    const id = card.dataset.id;
                    
                    if(confirm(`Apakah Anda yakin ingin menyetujui refund untuk ID: ${id}?`)) {
                        console.log(`Sending API request: APPROVE ${id}`);
                        alert(`Refund ${id} disetujui!`);
                        card.remove(); 
                    }
                });
            });

            document.querySelectorAll('.js-reject-btn').forEach(btn => {
                btn.addEventListener('click', function(e) {
                    const card = this.closest('.cr-card');
                    const id = card.dataset.id;

                    if(confirm(`Apakah Anda yakin ingin menolak refund untuk ID: ${id}?`)) {
                        console.log(`Sending API request: REJECT ${id}`);
                        alert(`Refund ${id} ditolak!`);
                        card.remove();
                    }
                });
            });
        });
