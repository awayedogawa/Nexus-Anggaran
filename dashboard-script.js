// Inisialisasi Firebase (menggunakan variabel dari firebase-config.js)
firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();

// Pilih Elemen HTML
const userEmailElement = document.getElementById('user-email');
const logoutButton = document.getElementById('logout-button');

// Cek status otentikasi pengguna
auth.onAuthStateChanged((user) => {
    if (user) {
        // Jika pengguna sudah login
        console.log("Pengguna terdeteksi:", user.email);
        // Tampilkan email pengguna
        userEmailElement.textContent = user.email;
    } else {
        // Jika pengguna tidak login, tendang kembali ke halaman login
        console.log("Tidak ada pengguna, mengarahkan ke halaman login.");
        window.location.href = 'index.html';
    }
});

// Tambahkan event listener untuk tombol logout
logoutButton.addEventListener('click', () => {
    auth.signOut().then(() => {
        // Jika logout berhasil
        console.log("Logout berhasil.");
        alert("Anda telah berhasil logout.");
        window.location.href = 'index.html';
    }).catch((error) => {
        // Jika terjadi error saat logout
        console.error("Gagal logout:", error);
        alert("Gagal untuk logout. Silakan coba lagi.");
    });
});
