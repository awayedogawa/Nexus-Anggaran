// 1. Inisialisasi Firebase
// (Bagian ini tetap sama)
const firebaseConfig = {
    apiKey: "AIzaSyAbCvNcwK7RDGKnV_Bw6aElF5tHGBNHM54",
    authDomain: "ptk-2-c08f3.firebaseapp.com",
    projectId: "ptk-2-c08f3",
    storageBucket: "ptk-2-c08f3.appspot.com",
    messagingSenderId: "702477103941",
    appId: "1:702477103941:web:77a30352e32681abe2042c"
};

firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();

// 2. Pilih Elemen HTML
// (Bagian ini tetap sama)
const loginForm = document.getElementById('form-login');
const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');

// 3. Tambahkan Event Listener untuk Form
// (Bagian ini tetap sama)
loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = emailInput.value;
    const password = passwordInput.value;

    // 4. Logika Login Firebase
    auth.signInWithEmailAndPassword(email, password)
        .then((userCredential) => {
            const user = userCredential.user;
            console.log("Login berhasil!", user);
            // Kita tidak perlu alert di sini karena langsung redirect
            window.location.href = 'dashboard.html'; 
        })
        .catch((error) => {
            // ===== BAGIAN YANG DIPERBARUI ADA DI SINI =====
            const errorCode = error.code;
            console.error("Login Gagal:", error);
            
            // Cek untuk error kredensial yang tidak valid
            if (errorCode === 'auth/invalid-credential' || errorCode === 'auth/wrong-password' || errorCode === 'auth/user-not-found') {
                alert('Email atau password yang Anda masukkan salah. Silakan coba lagi.');
            } else {
                // Untuk error lainnya
                alert(`Terjadi kesalahan. Silakan coba beberapa saat lagi.`);
            }
        });
});
