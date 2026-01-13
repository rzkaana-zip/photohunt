document.addEventListener('DOMContentLoaded', () => {
      
      const backBtn = document.getElementById('spBack');
      if (backBtn) {
        backBtn.addEventListener('click', () => {
          if (document.referrer) {
            window.history.back();
          } else {
            console.log("Kembali ke Home"); }
        });
      }

      const header = document.getElementById('mainHeader');
      window.addEventListener('scroll', () => {
        if (window.scrollY > 10) {
          header.classList.add('scrolled');
        } else {
          header.classList.remove('scrolled');
        }
      });

      const langDropdown = document.getElementById('spLang');
      const langTrigger = langDropdown.querySelector('.sp-trigger');
      const langLabel = document.getElementById('spLangLabel');
      const langOptions = langDropdown.querySelectorAll('.sp-option');

      langTrigger.addEventListener('click', (e) => {
        e.stopPropagation();
        langDropdown.classList.toggle('open');
      });

      langOptions.forEach(option => {
        option.addEventListener('click', () => {
          langOptions.forEach(opt => opt.classList.remove('active'));
          option.classList.add('active');
          langLabel.textContent = option.textContent;
          langDropdown.classList.remove('open');
        });
      });

      document.addEventListener('click', (e) => {
        if (!langDropdown.contains(e.target)) {
          langDropdown.classList.remove('open');
        }
      });

      const themeBoxes = document.querySelectorAll('.sp-theme-box');
      themeBoxes.forEach(box => {
        box.addEventListener('click', () => {
          themeBoxes.forEach(b => b.classList.remove('active'));
          box.classList.add('active');
          console.log('Tema:', box.dataset.theme);
        });
      });

      const linkItems = document.querySelectorAll('[data-link]');
      linkItems.forEach(item => {
        item.addEventListener('click', () => {
          const target = item.dataset.link;
          if(target) window.location.href = target;
        });
      });

      const logoutBtn = document.getElementById('spLogout');
      if (logoutBtn) {
        logoutBtn.addEventListener('click', () => {
          if(confirm("Apakah anda yakin ingin keluar?")) {
            alert("Logout berhasil!");
          }
        });
      }
    });