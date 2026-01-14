document.addEventListener("DOMContentLoaded", () => {
        const emailInput = document.getElementById("phluEmail");
        const passwordInput = document.getElementById("phluPassword");

        const loginBtn = document.getElementById("phluLoginBtn");
        const signupBtn = document.querySelector(".phlu-signup-btn");
        const googleBtn = document.querySelector(".phlu-google");

        const roleUser = document.getElementById("phluRoleUser");
        const roleMitra = document.getElementById("phluRoleMitra");

        let currentRole = "pengguna";

        roleUser.addEventListener("click", () => {
          currentRole = "pengguna";
          roleUser.style.border = "2px solid #000";
          roleMitra.style.border = "none";
        });

        roleMitra.addEventListener("click", () => {
          currentRole = "mitra";
          roleMitra.style.border = "2px solid #000";
          roleUser.style.border = "none";
        });

        loginBtn.addEventListener("click", () => {
          const email = emailInput.value.trim();
          const password = passwordInput.value.trim();

          if (!email || !password) {
            alert("Email dan Password wajib diisi untuk Login.");
            return;
          }

          console.log("LOGIN");
          console.log("Role:", currentRole);
          console.log("Email:", email);

          alert(`Login berhasil sebagai ${currentRole.toUpperCase()}`);
          window.location.href = "customer-app.html";
        });

        signupBtn.addEventListener("click", () => {
          console.log("NAVIGATE TO SIGN UP PAGE");
          console.log("Role:", currentRole);

          window.location.href = `signup.html?role=${currentRole}`;
        });

        googleBtn.addEventListener("click", () => {
          console.log("GOOGLE AUTH");
          console.log("Role:", currentRole);

          window.location.href = `google-auth.html?role=${currentRole}`;
        });
      });
