// =================================================================
// SCRIPT UNTUK HALAMAN PENYUSUNAN RKA
// =================================================================

// Inisialisasi Firebase
const db = firebase.firestore();
let currentProgramId = null; // Variabel untuk menyimpan ID program yang aktif

// Pilih elemen HTML
const tambahProgramBtn = document.getElementById('tambah-program-btn');
const programTreeView = document.getElementById('program-tree-view');
const detailTitle = document.getElementById('detail-title');
const detailTableContent = document.getElementById('detail-table-content');
const detailActions = document.getElementById('detail-actions');


// =================================================================
// FUNGSI BARU: Tambah Rincian Belanja ke Firestore
// =================================================================
const addRincianBelanja = (programId) => {
    // 1. Minta input dari pengguna (untuk sementara pakai prompt)
    const uraian = prompt("Masukkan Uraian Belanja:");
    const jumlah = prompt("Masukkan Jumlah Total (hanya angka):");

    // 2. Cek jika input valid
    if (!uraian || !jumlah || isNaN(parseInt(jumlah))) {
        alert("Input tidak valid. Uraian harus diisi dan Jumlah harus berupa angka.");
        return;
    }

    // 3. Siapkan data baru
    const newRincian = {
        kode_rekening: "-",
        uraian: uraian,
        volume: 1,
        satuan: "Ls",
        jumlah_total: parseInt(jumlah)
    };

    // 4. Update dokumen di Firestore
    const programDocRef = db.collection("rka_submissions").doc(programId);

    programDocRef.update({
        rincian_belanja: firebase.firestore.FieldValue.arrayUnion(newRincian)
    })
    .then(() => {
        console.log("Rincian baru berhasil ditambahkan");
        alert("Rincian belanja berhasil ditambahkan!");
        displayProgramDetails(programId); // Muat ulang detail untuk menampilkan data baru
    })
    .catch((error) => {
        console.error("Error menambahkan rincian: ", error);
        alert("Gagal menambahkan rincian.");
    });
};


// =================================================================
// FUNGSI UNTUK MENAMPILKAN DETAIL PROGRAM DI PANEL KANAN (DIPERBARUI)
// =================================================================
const displayProgramDetails = (programId) => {
    currentProgramId = programId; // Simpan ID program yang sedang aktif

    db.collection("rka_submissions").doc(programId).get()
        .then((doc) => {
            if (doc.exists) {
                const programData = doc.data();
                
                detailTitle.textContent = `Detail Rincian Belanja - ${programData.nama_program}`;
                detailTableContent.innerHTML = '';

                const header = document.createElement('div');
                header.classList.add('rka-detail-header');
                header.innerHTML = `
                    <span>Kode Rekening</span>
                    <span>Uraian</span>
                    <span class="text-right">Volume</span>
                    <span class="text-right">Jumlah Total</span>
                `;
                detailTableContent.appendChild(header);

                if (programData.rincian_belanja && programData.rincian_belanja.length > 0) {
                    programData.rincian_belanja.forEach(item => {
                        const row = document.createElement('div');
                        row.classList.add('rka-detail-row');
                        row.innerHTML = `
                            <span>${item.kode_rekening || '-'}</span>
                            <span>${item.uraian || ''}</span>
                            <span class="text-right">${item.volume || 0} ${item.satuan || ''}</span>
                            <span class="text-right">${(item.jumlah_total || 0).toLocaleString('id-ID')}</span>
                        `;
                        detailTableContent.appendChild(row);
                    });
                } else {
                    detailTableContent.innerHTML += `<p style="padding: 20px; text-align: center;">Belum ada rincian belanja untuk program ini.</p>`;
                }

                // Perbarui Tombol Aksi untuk menyertakan tombol "Tambah Rincian"
                detailActions.innerHTML = `
                    <button id="tambah-rincian-btn" class="btn btn-outline"><i class="fas fa-plus"></i> Tambah Rincian</button>
                    <div>
                        <button class="btn btn-secondary">Simpan Draft</button>
                        <button class="btn btn-primary">Ajukan Persetujuan</button>
                    </div>
                `;
                
                // Tambahkan event listener untuk tombol "Tambah Rincian" yang baru dibuat
                document.getElementById('tambah-rincian-btn').addEventListener('click', () => {
                    addRincianBelanja(currentProgramId);
                });

            } else {
                console.log("Dokumen tidak ditemukan!");
            }
        }).catch((error) => {
            console.error("Error mengambil detail program: ", error);
        });
};


// =================================================================
// FUNGSI UNTUK MEMUAT PROGRAM (TETAP SAMA)
// =================================================================
const loadPrograms = () => {
    programTreeView.innerHTML = '';
    db.collection("rka_submissions").orderBy("nama_program", "asc").get()
        .then((querySnapshot) => {
            if (querySnapshot.empty) {
                programTreeView.innerHTML = '<li class="program"><span>Belum ada program.</span></li>';
                return;
            }
            querySnapshot.forEach((doc, index) => { // tambahkan index
                const programData = doc.data();
                const programElement = document.createElement('li');
                programElement.classList.add('program');
                programElement.dataset.id = doc.id;
                const spanElement = document.createElement('span');
                spanElement.textContent = programData.nama_program;
                programElement.appendChild(spanElement);
                programElement.addEventListener('click', function() {
                    displayProgramDetails(this.dataset.id);
                });
                programTreeView.appendChild(programElement);

                // Otomatis klik program pertama saat daftar selesai dimuat
                if (index === 0) {
                    displayProgramDetails(doc.id);
                }
            });
        });
};


// =================================================================
// EVENT LISTENER UNTUK TOMBOL "TAMBAH PROGRAM" (TETAP SAMA)
// =================================================================
if (tambahProgramBtn) {
    tambahProgramBtn.addEventListener('click', () => {
        const namaProgram = prompt("Masukkan Nama Program Baru:");
        if (namaProgram) {
            db.collection("rka_submissions").add({
                nama_program: namaProgram,
                status: "Draft",
                dibuat_pada: firebase.firestore.FieldValue.serverTimestamp(),
                rincian_belanja: []
            }).then(() => {
                loadPrograms();
            });
        }
    });
}

// =================================================================
// JALANKAN FUNGSI SAAT HALAMAN PERTAMA KALI DIBUKA
// =================================================================
document.addEventListener('DOMContentLoaded', loadPrograms);
