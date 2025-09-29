// =================================================================
// SCRIPT UNTUK HALAMAN PENYUSUNAN RKA
// =================================================================

// Inisialisasi Firebase
const db = firebase.firestore();

// Pilih elemen HTML
const tambahProgramBtn = document.getElementById('tambah-program-btn');
const programTreeView = document.getElementById('program-tree-view');
const detailTitle = document.getElementById('detail-title');
const detailTableContent = document.getElementById('detail-table-content');

// =================================================================
// FUNGSI BARU: Tampilkan Detail Program di Panel Kanan
// =================================================================
const displayProgramDetails = (programId) => {
    // Ambil satu dokumen spesifik dari Firestore berdasarkan ID
    db.collection("rka_submissions").doc(programId).get()
        .then((doc) => {
            if (doc.exists) {
                const programData = doc.data();
                
                // 1. Ubah Judul Panel Kanan
                detailTitle.textContent = `Detail Rincian Belanja - ${programData.nama_program}`;
                
                // 2. Kosongkan dan isi konten detail
                detailTableContent.innerHTML = `<p>Data untuk program <strong>${programData.nama_program}</strong> berhasil dimuat. Selanjutnya kita akan menampilkan detail belanja di sini.</p>`;

            } else {
                console.log("Dokumen tidak ditemukan!");
                detailTitle.textContent = 'Detail Rincian Belanja';
                detailTableContent.innerHTML = `<p class='error'>Gagal memuat data. Dokumen tidak ditemukan.</p>`;
            }
        }).catch((error) => {
            console.error("Error mengambil detail program: ", error);
        });
};


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
                programElement.dataset.id = doc.id;
                
                const spanElement = document.createElement('span');
                spanElement.textContent = programData.nama_program;
                programElement.appendChild(spanElement);

                // Ganti alert() dengan fungsi baru
                programElement.addEventListener('click', function() {
                    // Ambil ID dari program yang diklik
                    const programId = this.dataset.id;
                    // Panggil fungsi untuk menampilkan detailnya
                    displayProgramDetails(programId);
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
                loadPrograms(); 
            })
            .catch((error) => {
                console.error("Error menambahkan program: ", error);
            });
        }
    });
}

// =================================================================
// JALANKAN FUNGSI SAAT HALAMAN PERTAMA KALI DIBUKA
// =================================================================
document.addEventListener('DOMContentLoaded', loadPrograms);
