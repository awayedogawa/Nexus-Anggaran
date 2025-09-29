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
    programTreeView.innerHTML = '';

    db.collection("rka_submissions").orderBy("nama_program", "asc").get()
        .then((querySnapshot) => {
            if (querySnapshot.empty) {
                programTreeView.innerHTML = '<li class="program"><span>Belum ada program.</span></li>';
                return;
            }

            querySnapshot.forEach((doc) => {
                const programData = doc.data();
                const programElement = document.createElement('li');
                programElement.classList.add('program');
                
                // ===== PENAMBAHAN BARU 1: Simpan ID di elemen =====
                programElement.dataset.id = doc.id;

                const spanElement = document.createElement('span');
                spanElement.textContent = programData.nama_program;
                
                programElement.appendChild(spanElement);

                // ===== PENAMBAHAN BARU 2: Tambahkan Event Listener Klik =====
                programElement.addEventListener('click', function() {
                    const programId = this.dataset.id;
                    alert(`ID Program yang diklik: ${programId}`);
                    // Nanti kita akan panggil fungsi untuk menampilkan detail di sini
                });

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
