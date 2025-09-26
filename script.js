// 1. Inisialisasi Firebase
const firebaseConfig = {
    apiKey: "AIzaSyAbCvNcwK7RDGKnV_Bw6aElF5tHGBNHM54",
    authDomain: "ptk-2-c08f3.firebaseapp.com",
    projectId: "ptk-2-c08f3",
    storageBucket: "ptk-2-c08f3.appspot.com", // Saya perbaiki storageBucket-nya
    messagingSenderId: "702477103941",
    appId: "1:702477103941:web:77a30352e32681abe2042c"
};

// Pastikan untuk mengimpor fungsi yang diperlukan
// (Ini akan kita lakukan saat menghubungkan SDK di HTML)

// 2. Pilih Elemen HTML
const loginForm = document.getElementById('form-login');
const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');

// 3. Tambahkan Event Listener untuk Form
loginForm.addEventListener('submit', (e) => {
    // Mencegah form dari refresh halaman otomatis
    e.preventDefault();

    // Ambil nilai dari input
    const email = emailInput.value;
    const password = passwordInput.value;

    console.log("Mencoba login dengan:");
    console.log("Email:", email);
    console.log("Password:", password);

    // LOGIKA LOGIN FIREBASE AKAN KITA TAMBAHKAN DI SINI
    alert(`Proses login untuk ${email} akan ditambahkan.`);
});
