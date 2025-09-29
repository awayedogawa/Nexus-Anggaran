// =================================================================
// SCRIPT UNTUK HALAMAN PENYUSUNAN RKA
// =================================================================

// Inisialisasi Firebase
const db = firebase.firestore();

// Pilih elemen HTML
const tambahProgramBtn = document.getElementById('tambah-program-btn');
const programTreeView = document.getElementById('program-tree-view');

// =================================================================
// FUNGSI UNTUK MEMUAT DAN MENAMPILKAN PROGRAM DARI FIRESTORE
// =================================================================
const loadPrograms = () => {
    // 1. Kosongkan daftar program yang ada
    programTreeView.innerHTML = '';

    // 2. Ambil data dari collection 'rka_submissions'
    db.collection("rka_submissions").orderBy("dibuat_pada", "asc").get()
        .then((querySnapshot) => {
            if (querySnapshot.empty) {
                programTreeView.innerHTML = '<li class="program"><span>Belum ada program.</span></li>';
                return;
            }

            // 3. Loop melalui setiap dokumen dan buat elemen HTML
            querySnapshot.forEach((doc) => {
                const programData = doc.data();
                const programElement = document.createElement('li');
                programElement.classList.add('program');
                
                // Buat elemen span untuk nama program
                const spanElement = document.createElement('span');
                spanElement.textContent = programData.nama_program;
                
                // Tambahkan elemen span ke dalam li
                programElement.appendChild(spanElement);

                // Tambahkan elemen li ke dalam daftar tree-view
                programTreeView.appendChild(programElement);
            });
        })
        .catch((error) => {
            console.error("Error memuat program: ", error);
            programTreeView.innerHTML = '<li class="program"><span>Gagal memuat program.</span></li>';
        });
};


// =================================================================
// EVENT LISTENER UNTUK TOMBOL "TAMBAH PROGRAM"
// =================================================================
if (tambahProgramBtn) {
    tambahProgramBtn.addEventListener('click', () => {
        const namaProgram = prompt("Masukkan Nama Program Baru:");

        if (namaProgram) {
            db.collection("rka_submissions").add({
                nama_program: namaProgram,
                status: "Draft",
                dibuat_pada: firebase.firestore.FieldValue.serverTimestamp()
            })
            .then((docRef) => {
                console.log("Program baru berhasil disimpan dengan ID: ", docRef.id);
                alert("Program baru '" + namaProgram + "' berhasil ditambahkan!");
                
                // Panggil kembali fungsi loadPrograms agar daftar langsung terupdate
                loadPrograms(); 
            })
            .catch((error) => {
                console.error("Error menambahkan program: ", error);
                alert("Terjadi kesalahan saat menyimpan program.");
            });
        }
    });
}

// =================================================================
// JALANKAN FUNGSI SAAT HALAMAN PERTAMA KALI DIBUKA
// =================================================================
document.addEventListener('DOMContentLoaded', loadPrograms);
