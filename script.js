document.addEventListener('DOMContentLoaded', () => {
    const navbar = document.getElementById('navbar');
    const menuBtn = document.getElementById('menu-btn');
    const menuIcon = document.getElementById('menu-icon');
    const mobileMenu = document.getElementById('mobile-menu');
    const mobileLinks = document.querySelectorAll('.mobile-link');
    const contactForm = document.getElementById('contactForm');
    const container = document.getElementById('carouselContainer');
    const prevBtn = document.getElementById('prevDest');
    const nextBtn = document.getElementById('nextDest');

    const loginModal = document.getElementById('loginModal');
    const loginCard = document.getElementById('loginCard');
    const closeLogin = document.getElementById('closeLogin');
    const closeLoginDesktop = document.getElementById('closeLoginDesktop');
    const loginForm = document.getElementById('loginForm');
    const loginLinks = document.querySelectorAll('a[href="#login"]');
    const leftSide = document.getElementById('leftSide');
    const rightSide = document.getElementById('rightSide');
    const formElements = document.querySelectorAll('.form-element');

    const toggleMenu = () => {
        const isOpened = mobileMenu.classList.contains('translate-x-0');
        if (isOpened) {
            mobileMenu.classList.replace('translate-x-0', 'translate-x-full');
            menuIcon.className = 'fas fa-bars';
            document.body.style.overflow = 'auto';
        } else {
            mobileMenu.classList.replace('translate-x-full', 'translate-x-0');
            menuIcon.className = 'fas fa-times';
            document.body.style.overflow = 'hidden';
        }
    };

    menuBtn.addEventListener('click', toggleMenu);

    mobileLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (mobileMenu.classList.contains('translate-x-0')) toggleMenu();
        });
    });

    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
            if (!mobileMenu.classList.contains('translate-x-0')) menuBtn.classList.add('text-emerald-950');
        } else {
            navbar.classList.remove('scrolled');
            menuBtn.classList.remove('text-emerald-950');
        }
    });

    const openLogin = (e) => {
        if (e) e.preventDefault();
        
        if (mobileMenu.classList.contains('translate-x-0')) toggleMenu();

        loginModal.classList.remove('hidden');
        loginModal.classList.add('flex');
        
        setTimeout(() => {
            loginCard.classList.remove('scale-95', 'opacity-0');
            loginCard.classList.add('scale-100', 'opacity-100');
        }, 10);

        setTimeout(() => {
            leftSide.classList.add('side-shown');
            rightSide.classList.add('side-shown');
        }, 100);

        setTimeout(() => {
            formElements.forEach(el => el.classList.add('form-element-shown'));
        }, 500);

        document.body.style.overflow = 'hidden';
    };

    const closeLoginModal = () => {
        formElements.forEach(el => el.classList.remove('form-element-shown'));

        setTimeout(() => {
            leftSide.classList.remove('side-shown');
            rightSide.classList.remove('side-shown');
            loginCard.classList.add('scale-95', 'opacity-0');
        }, 200);

        setTimeout(() => {
            loginModal.classList.add('hidden');
            loginModal.classList.remove('flex');
            
            if (!mobileMenu.classList.contains('translate-x-0')) {
                document.body.style.overflow = 'auto';
            }
        }, 800); // 800ms agar pas dengan durasi CSS side-left/right-hidden
    };

    loginLinks.forEach(link => link.addEventListener('click', openLogin));
    if (closeLogin) closeLogin.addEventListener('click', closeLoginModal);
    if (closeLoginDesktop) closeLoginDesktop.addEventListener('click', closeLoginModal);
    
    loginModal.addEventListener('click', (e) => {
        if (e.target === loginModal) closeLoginModal();
    });

    const getScrollStep = () => container.clientWidth;
    const stopInitialAnimation = () => {
        const icons = [nextBtn.querySelector('i'), prevBtn.querySelector('i')];
        icons.forEach(icon => { if (icon) icon.style.animation = 'none'; });
    };

    nextBtn.addEventListener('click', () => {
        container.scrollLeft += getScrollStep();
        stopInitialAnimation();
    });

    prevBtn.addEventListener('click', () => {
        container.scrollLeft -= getScrollStep();
        stopInitialAnimation();
    });

    // Smooth Scroll
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#login') return; 
            if (targetId === '#') return;
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });

    if (loginForm) {
        loginForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const btn = loginForm.querySelector('button');
            const originalText = btn.innerText;
            btn.innerText = 'Verifying...';
            btn.disabled = true;
            btn.classList.add('opacity-80', 'cursor-not-allowed');

            setTimeout(() => {
                alert('Success! Welcome to SkyVoyage.');
                closeLoginModal();
                loginForm.reset();
                btn.innerText = originalText;
                btn.disabled = false;
                btn.classList.remove('opacity-80', 'cursor-not-allowed');
            }, 1500);
        });
    }
});