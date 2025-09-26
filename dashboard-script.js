// =================================================================
// SCRIPT UNTUK HALAMAN DASHBOARD (dashboard-script.js)
// =================================================================

// Inisialisasi Firebase menggunakan variabel dari firebase-config.js
try {
    firebase.initializeApp(firebaseConfig);
} catch(e) {
    console.error("Firebase initialization error:", e);
}
const auth = firebase.auth();

// =================================================================
// 1. CEK STATUS LOGIN & JAGA HALAMAN
// Fungsi ini berjalan setiap kali halaman dashboard dimuat.
// =================================================================
auth.onAuthStateChanged((user) => {
    const userEmailElement = document.getElementById('user-email');

    if (user) {
        // Jika pengguna terdeteksi (sudah login):
        console.log("Pengguna terdeteksi:", user.email);
        
        // Tampilkan email pengguna di header.
        if(userEmailElement) {
            userEmailElement.textContent = user.email;
        }

    } else {
        // Jika tidak ada pengguna yang login:
        console.log("Tidak ada pengguna, mengarahkan ke halaman login.");
        
        // "Tendang" kembali ke halaman login (index.html).
        window.location.href = 'index.html';
    }
});

// =================================================================
// 2. FUNGSI LOGOUT
// Menambahkan event listener ke tombol logout.
// =================================================================
const logoutButton = document.getElementById('logout-button');

if (logoutButton) {
    logoutButton.addEventListener('click', () => {
        auth.signOut().then(() => {
            // Logout berhasil
            console.log("Logout berhasil.");
            alert("Anda telah berhasil logout.");
            window.location.href = 'index.html';
        }).catch((error) => {
            // Terjadi error saat logout
            console.error("Gagal logout:", error);
            alert("Gagal untuk logout. Silakan coba lagi.");
        });
    });
}

// =================================================================
// 3. (PLACEHOLDER) FUNGSI NAVIGASI
// Di masa depan, kita bisa menambahkan logika di sini untuk menangani
// klik pada menu sidebar.
// =================================================================
console.log("dashboard-script.js berhasil dimuat.");
