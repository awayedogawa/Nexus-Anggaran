// =================================================================
// SCRIPT UNTUK HALAMAN PENYUSUNAN RKA
// =================================================================

// Inisialisasi Firebase (menggunakan variabel dari firebase-config.js)
const db = firebase.firestore(); // Inisialisasi Firestore

// Pilih elemen tombol
const tambahProgramBtn = document.getElementById('tambah-program-btn');

// Tambahkan event listener ke tombol "Tambah Program"
if (tambahProgramBtn) {
    tambahProgramBtn.addEventListener('click', () => {
        // 1. Minta input dari pengguna
        const namaProgram = prompt("Masukkan Nama Program Baru:");

        // 2. Cek apakah pengguna memasukkan nama
        if (namaProgram) {
            // 3. Simpan data ke Firestore
            db.collection("rka_submissions").add({
                nama_program: namaProgram,
                status: "Draft",
                dibuat_pada: firebase.firestore.FieldValue.serverTimestamp() // Menambahkan waktu pembuatan
            })
            .then((docRef) => {
                console.log("Program baru berhasil disimpan dengan ID: ", docRef.id);
                alert("Program baru '" + namaProgram + "' berhasil ditambahkan!");
                // Di sini nanti kita akan tambahkan kode untuk memuat ulang daftar program
            })
            .catch((error) => {
                console.error("Error menambahkan program: ", error);
                alert("Terjadi kesalahan saat menyimpan program.");
            });
        }
    });
}

console.log("penyusunan-rka-script.js berhasil dimuat.");
