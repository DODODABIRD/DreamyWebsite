// Data Toko Alamak Mall King
const stores = [
    { name: "Ambatufit Apparel", category: "fashion", description: "Pakaian olahraga premium yang lentur dan sangat nyaman untuk mengeluarkan energi maksimal." },
    { name: "Gourmet Ngawi Cafe", category: "dining", description: "Menyajikan hidangan legendaris dengan cita rasa yang bikin kamu berteriak puas." },
    { name: "Dreamybull Tech", category: "tech", description: "Spesialis perangkat streaming resolusi tinggi dan aksesoris kamera berkualitas." },
    { name: "Revo Threads", category: "fashion", description: "Custom tailoring kasual, cocok untuk nongkrong santai bareng mas-mas barbershop." },
    { name: "Spice Omaygot", category: "dining", description: "Kuliner pedas lokal yang kenikmatannya bikin merem melek tak tertahankan." },
    { name: "Thug Den PC", category: "tech", description: "Pusat rakit PC spek gahar bagi para penikmat hardware tangguh dan kokoh." },
    { name: "Batu Classic Wear", category: "fashion", description: "Koleksi kaos putih polos dan tanktop legendaris untuk kenyamanan di dalam rumah." },
    { name: "The Iron Bistro", category: "dining", description: "Restoran steak protein tinggi, tempat berkumpulnya para penikmat gym berotot." }
];

// Inisialisasi Situs Pusat Kenikmatan
document.addEventListener('DOMContentLoaded', () => {
    renderStores(stores);
    setupFilters();
    setupAuthToggle(); // SEKARANG SUDAH DIPANGGIL SUPAYA TOGGLE WORK
    setupContactForm();
    setupSignupForm();
    alert('Situs berhasil dimuat... Ah... Selamat datang di Alamak Mall... Omaygot...');
});

// Logika Ganti Mode Login dan Signup
function setupAuthToggle() {
    const loginBtn = document.getElementById('toggle-login');
    const signupBtn = document.getElementById('toggle-signup');
    const loginForm = document.getElementById('login-form');
    const signupForm = document.getElementById('signup-form');

    if (loginBtn && signupBtn) {
        loginBtn.addEventListener('click', (e) => {
            // Mencegah navigasi bawaan tag <a> jika hanya ingin toggle form
            e.preventDefault(); 
            alert('Ganti ke mode login... Aku mau login sekarang... Ah...');
            loginBtn.classList.add('active');
            signupBtn.classList.remove('active');
            loginForm.classList.remove('hidden');
            signupForm.classList.add('hidden');
        });

        signupBtn.addEventListener('click', () => {
            alert('Ambatukam... Berubah ke mode daftar sekarang... Bergabunglah dengan klub Ambatukam...');
            signupBtn.classList.add('active');
            loginBtn.classList.remove('active');
            signupForm.classList.remove('hidden');
            loginForm.classList.add('hidden');
        });
    }
}

// Gambar Kartu Toko ke Layar
function renderStores(storesToRender) {
    const storeGrid = document.querySelector('.store-grid');
    if (!storeGrid) return; // Guard clause biar gak error di halaman auth
    storeGrid.innerHTML = '';

    storesToRender.forEach(store => {
        const card = document.createElement('div');
        card.className = 'store-card';
        card.innerHTML = `
            <h3>${store.name}</h3>
            <p>${store.description}</p>
            <span class="category-tag">${store.category}</span>
        `;
        storeGrid.appendChild(card);
    });
}

// Pengaturan tombol filter toko
function setupFilters() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const category = btn.getAttribute('data-category');
            if (category === 'all') {
                alert('Ambatublow... Menampilkan semua toko di Alamak Mall... Semuanya keluar...');
                renderStores(stores);
            } else {
                const filtered = stores.filter(s => s.category === category);
                alert('Menyaring kategori ' + category.toUpperCase() + '... Ah... Ditemukan ' + filtered.length + ' toko... Omaygot...');
                renderStores(filtered);
            }
        });
    });
}

// Simulasi form markas
function setupContactForm() {
    const form = document.getElementById('mall-contact');
    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            alert('Pesanmu sedang dikirim ke markas besar Alamak Mall... Aku tidak kuat menahannya...');
            const btn = form.querySelector('button');
            const originalText = btn.innerText;
            
            btn.innerText = 'Mengirim... Ah...';
            btn.disabled = true;
            window.alert("Pesan yang bagus... Aku akan memeriksanya sebentar lagi... Cek emailmu... Omaygot...");
            setTimeout(() => {
                btn.innerText = 'Pesan Sudah Keluar!';
                btn.style.background = '#27ae60';
                alert('Batu Khan... Sukses... Pesanmu sudah tersampaikan ke para Thug Master...');
                form.reset();

                setTimeout(() => {
                    btn.innerText = originalText;
                    btn.style.background = '';
                    btn.disabled = false;
                }, 3000);
            }, 1500);
        });
    }
}

// Validasi form pendaftaran dengan gaya Ambatukam mendalam
function setupSignupForm() {
    const signupForm = document.getElementById('signup-form');
    if (!signupForm) return;

    signupForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const name = document.getElementById('signup-name').value.trim();
        const email = document.getElementById('signup-email').value.trim();
        const password = document.getElementById('signup-password').value;
        const confirmPassword = document.getElementById('signup-confirm').value;

        clearErrors();
        let isValid = true;
        
        // 1. Validasi Nama
        if (!validateName(name)) {
            showError('error-name', 'Namamu terlalu pendek... Minimal 3 huruf dan gaboleh angka...');
            isValid = false;
        }
        
        // 2. Validasi Email
        if (!validateEmail(email)) {
            showError('error-email', 'Alamat email tidak valid... Masukkan yang benar...');
            isValid = false;
        }
        
        // 3. Validasi Kekuatan Password
        const passwordStrength = checkPasswordStrength(password);
        if (!passwordStrength.isValid) {
            showError('error-password', passwordStrength.feedback);
            document.getElementById('signup-password').value = '';
            document.getElementById('signup-confirm').value = '';
            document.getElementById('signup-password').focus();
            isValid = false;
        }
        
        // 4. Validasi Konfirmasi Password
        if (password !== confirmPassword) {
            showError('error-confirm', 'Password tidak sama... Masukkan ulang...');
            document.getElementById('signup-confirm').value = '';
            document.getElementById('signup-confirm').focus();
            isValid = false;
        }

        // Eksekusi Akhir jika Semua Lolos Validasi
        if (isValid) {
            alert('Semua validasi lolos... Aku akan membuat akun Ambatukam milikmu sekarang... Ambatukam...');
            const btn = signupForm.querySelector('button');
            const originalText = btn.innerText;
            
            btn.innerText = 'Membuat Akun... Ah... Omaygot...';
            btn.disabled = true;

            setTimeout(() => {
                btn.innerText = 'Akun Sudah Jadi!';
                btn.style.background = '#27ae60';
                alert('Ambatukam sukses... Akun Ambatukam milikmu telah selesai dibuat... Selamat datang di Thug Club... Yes sir...');
                signupForm.reset();

                setTimeout(() => {
                    btn.innerText = originalText;
                    btn.style.background = '';
                    btn.disabled = false;
                }, 3000);
            }, 1500);
        } else {
            alert('Validasi gagal... Tolong perbaiki kesalahan di layar... Aku tidak kuat melihat error ini...');
        }
    });
}

// Fungsi Validasi Nama
function validateName(name) {
    return name.length >= 3 && /^[a-zA-Z\s]+$/.test(name);
}

// Fungsi Validasi Email
function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Pemeriksaan Kekuatan Password
function checkPasswordStrength(password) {
    let strength = 'lemah... ah...';
    let feedback = '';
    let isValid = true;

    if (password.length < 8) {
        feedback += 'Kurang panjang (Minimal 8 karakter). ';
        isValid = false;
    }
    
    if (!/[0-9]/.test(password)) {
        feedback += 'Kurang angka (Minimal 1 angka). ';
        isValid = false;
    }
    
    if (!/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password)) {
        feedback += 'Kurang simbol spesial (!@#$). ';
        isValid = false;
    }

    if (isValid) {
        let score = 0;
        if (password.length >= 12) score++;
        if (/[A-Z]/.test(password)) score++;
        
        if (score >= 2) {
            strength = 'SANGAT KUAT... AH...';
        } else {
            strength = 'KUAT... OMAYGOT...';
        }
    }

    return {
        isValid: isValid,
        strength: strength,
        feedback: feedback.trim()
    };
}

// Menampilkan Pesan Error ke elemen HTML
function showError(elementId, message) {
    const errorElement = document.getElementById(elementId);
    if (errorElement) {
        errorElement.textContent = message;
        errorElement.classList.add('show');
    }
}

// Membersihkan Semua Pesan Error
function clearErrors() {
    const errorElements = document.querySelectorAll('.error-message');
    errorElements.forEach(elem => {
        elem.textContent = '';
        elem.classList.remove('show');
    });
}