// 1. Inisialisasi Firebase
const firebaseConfig = {
    apiKey: "AIzaSyAbCvNcwK7RDGKnV_Bw6aElF5tHGBNHM54",
    authDomain: "ptk-2-c08f3.firebaseapp.com",
    projectId: "ptk-2-c08f3",
    storageBucket: "ptk-2-c08f3.appspot.com",
    messagingSenderId: "702477103941",
    appId: "1:702477103941:web:77a30352e32681abe2042c"
};

// Inisialisasi Aplikasi Firebase
firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();

// 2. Pilih Elemen HTML
const loginForm = document.getElementById('form-login');
const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');

// 3. Tambahkan Event Listener untuk Form
loginForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const email = emailInput.value;
    const password = passwordInput.value;

    // 4. Logika Login Firebase
    auth.signInWithEmailAndPassword(email, password)
        .then((userCredential) => {
            // Jika login berhasil
            const user = userCredential.user;
            console.log("Login berhasil!", user);
            alert("Login berhasil! Anda akan diarahkan ke dashboard.");
            
            // Arahkan ke halaman dashboard (yang akan kita buat selanjutnya)
            window.location.href = 'dashboard.html'; 
        })
        .catch((error) => {
            // Jika login gagal
            const errorCode = error.code;
            const errorMessage = error.message;
            console.error("Login Gagal:", errorCode, errorMessage);
            
            // Tampilkan pesan error yang lebih ramah
            if (errorCode === 'auth/wrong-password' || errorCode === 'auth/user-not-found') {
                alert('Email atau password yang Anda masukkan salah.');
            } else {
                alert(`Terjadi kesalahan: ${errorMessage}`);
            }
        });
});
