let db;

const request = indexedDB.open('PhotoHuntAuth', 1);

request.onsuccess = (e) => {
  db = e.target.result;
  loadProfile();
};

request.onerror = () => {
  console.error("Gagal membuka database");
};


function loadProfile() {
  const userData = localStorage.getItem('currentUser');
  if (!userData) {
    window.location.href = 'login.html';
    return;
  }

  const user = JSON.parse(userData);

  document.querySelector('.profile-header h3').innerText = user.name;
  document.querySelector('.profile-header p').innerText = user.email;

  const inputs = document.querySelectorAll('.profile-form input, .profile-form select');

  inputs[0].value = user.name || '';
  inputs[1].value = user.username || user.email.split('@')[0];
  inputs[2].value = user.email;
  inputs[3].value = user.location || '';
  inputs[4].value = user.gender || '';
  inputs[5].value = user.birthday || '';
}


const profileBtn = document.querySelectorAll('.profile-btn')[0];

profileBtn.addEventListener('click', () => {
  const inputs = document.querySelectorAll('.profile-form input, .profile-form select');

  const updatedUser = {
    ...JSON.parse(localStorage.getItem('currentUser')),
    name: inputs[0].value.trim(),
    username: inputs[1].value.trim(),
    email: inputs[2].value.trim().toLowerCase(),
    location: inputs[3].value.trim(),
    gender: inputs[4].value,
    birthday: inputs[5].value
  };

  if (!updatedUser.name || !updatedUser.username || !updatedUser.email) {
    alert('Field bertanda * wajib diisi');
    return;
  }

  const tx = db.transaction('users', 'readwrite');
  const store = tx.objectStore('users');

  store.put(updatedUser).onsuccess = () => {
    localStorage.setItem('currentUser', JSON.stringify(updatedUser));
    console.log('Profile updated:', updatedUser);
    alert('Profile berhasil diperbarui');
  };
});


const passwordBtn = document.querySelectorAll('.profile-btn')[1];

passwordBtn.addEventListener('click', () => {
  const passInputs = document.querySelectorAll("input[type='password']");
  const currentPass = passInputs[0].value;
  const newPass = passInputs[1].value;
  const confirmPass = passInputs[2].value;

  if (!currentPass || !newPass || !confirmPass) {
    alert('Semua field password wajib diisi');
    return;
  }

  if (newPass.length < 6) {
    alert('Password minimal 6 karakter');
    return;
  }

  if (newPass !== confirmPass) {
    alert('Konfirmasi password tidak cocok');
    return;
  }

  const user = JSON.parse(localStorage.getItem('currentUser'));

  if (user.password !== currentPass) {
    alert('Password lama salah');
    return;
  }

  user.password = newPass;

  const tx = db.transaction('users', 'readwrite');
  const store = tx.objectStore('users');

  store.put(user).onsuccess = () => {
    localStorage.setItem('currentUser', JSON.stringify(user));
    alert('Password berhasil diubah. Silakan login ulang.');
    localStorage.removeItem('currentUser');
    window.location.href = 'login.html';
  };
});
