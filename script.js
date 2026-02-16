document.addEventListener('DOMContentLoaded', () => {
    // --- Inisialisasi Elemen ---
    const navbar = document.getElementById('navbar');
    const menuBtn = document.getElementById('menu-btn');
    const menuIcon = document.getElementById('menu-icon');
    const mobileMenu = document.getElementById('mobile-menu');
    const mobileLinks = document.querySelectorAll('.mobile-link');
    const contactForm = document.getElementById('contactForm');
    
    const container = document.getElementById('carouselContainer');
    const prevBtn = document.getElementById('prevDest');
    const nextBtn = document.getElementById('nextDest');

    // --- 1. Navigasi & Mobile Menu (Versi Ringkas & Stabil) ---

    const toggleMenu = () => {
        const isOpened = mobileMenu.classList.contains('translate-x-0');
        
        if (isOpened) {
            // Tutup Menu
            mobileMenu.classList.replace('translate-x-0', 'translate-x-full');
            menuIcon.classList.replace('fa-times', 'fa-bars');
            document.body.style.overflow = 'auto';
        } else {
            // Buka Menu
            mobileMenu.classList.replace('translate-x-full', 'translate-x-0');
            menuIcon.classList.replace('fa-bars', 'fa-times');
            document.body.style.overflow = 'hidden';
        }
    };

    menuBtn.addEventListener('click', toggleMenu);

    // Tutup menu saat link diklik (untuk mobile)
    mobileLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (mobileMenu.classList.contains('translate-x-0')) {
                toggleMenu();
            }
        });
    });

    // Efek Scroll pada Navbar
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
            // Warna icon saat scroll (jika navbar putih, icon jadi emerald tua)
            if (!mobileMenu.classList.contains('translate-x-0')) {
                menuBtn.classList.add('text-emerald-950');
            }
        } else {
            navbar.classList.remove('scrolled');
            menuBtn.classList.remove('text-emerald-950');
        }
    });


    // --- 2. Logika Carousel Destinasi ---

    const getScrollStep = () => {
        // Mengambil lebar container agar geseran pas
        return container.clientWidth; 
    };

    // Fungsi untuk menghentikan guncangan panah
    const stopInitialAnimation = () => {
        const icons = [nextBtn.querySelector('i'), prevBtn.querySelector('i')];
        icons.forEach(icon => {
            if (icon) {
                icon.style.animation = 'none';
            }
        });
    };

    nextBtn.addEventListener('click', () => {
        container.scrollLeft += getScrollStep();
        stopInitialAnimation();
    });

    prevBtn.addEventListener('click', () => {
        container.scrollLeft -= getScrollStep();
        stopInitialAnimation();
    });


    // --- 3. Smooth Scroll (Perbaikan Offset) ---

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const offset = 80; 
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - offset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });


    // --- 4. Form Submission (Simulasi) ---

    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const btn = contactForm.querySelector('button');
            const originalText = btn.innerText;
            
            // Efek Loading
            btn.innerText = 'Mengirim...';
            btn.disabled = true;
            btn.classList.add('opacity-70', 'cursor-not-allowed');

            // Simulasi Delay API
            setTimeout(() => {
                alert('Pesan terkirim! Tim DivTravel akan menghubungi Anda segera.');
                contactForm.reset();
                
                btn.innerText = originalText;
                btn.disabled = false;
                btn.classList.remove('opacity-70', 'cursor-not-allowed');
            }, 2000);
        });
    }

    // --- Tambahan Inisialisasi Modal ---
    const loginModal = document.getElementById('loginModal');
    const loginCard = document.getElementById('loginCard');
    const closeLogin = document.getElementById('closeLogin');
    const loginForm = document.getElementById('loginForm');
    
    // Selector untuk semua link yang mengarah ke #login
    const loginLinks = document.querySelectorAll('a[href="#login"]');

    // Fungsi Buka Modal
    const openLogin = (e) => {
        e.preventDefault();
        
        // Jika sedang di mobile, tutup dulu mobile menu-nya
        if (mobileMenu.classList.contains('translate-x-0')) {
            toggleMenu(); 
        }

        loginModal.classList.remove('hidden');
        // Delay sedikit agar animasi transition scale & opacity berjalan
        setTimeout(() => {
            loginCard.classList.remove('scale-95', 'opacity-0');
            loginCard.classList.add('scale-100', 'opacity-100');
        }, 10);
        document.body.style.overflow = 'hidden'; // Kunci scroll
    };

    // Fungsi Tutup Modal
    const closeLoginModal = () => {
        loginCard.classList.remove('scale-100', 'opacity-100');
        loginCard.classList.add('scale-95', 'opacity-0');
        
        setTimeout(() => {
            loginModal.classList.add('hidden');
            // Hanya aktifkan scroll jika mobile menu juga tertutup
            if (mobileMenu.classList.contains('translate-x-full')) {
                document.body.style.overflow = 'auto';
            }
        }, 300);
    };

    // Event Listeners
    loginLinks.forEach(link => link.addEventListener('click', openLogin));
    closeLogin.addEventListener('click', closeLoginModal);
    
    // Tutup jika klik di luar area card (di backdrop)
    loginModal.addEventListener('click', (e) => {
        if (e.target === loginModal.firstElementChild || e.target === loginModal) {
            closeLoginModal();
        }
    });

    // Handle Submit Login (Simulasi)
    if (loginForm) {
        loginForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const btn = loginForm.querySelector('button');
            btn.innerText = 'Memverifikasi...';
            
            setTimeout(() => {
                alert('Login Berhasil! Selamat datang di DivTravel.');
                closeLoginModal();
                btn.innerText = 'Masuk Sekarang';
            }, 1500);
        });
    }
});