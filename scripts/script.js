document.addEventListener('DOMContentLoaded', () => {
    const headerMenuBtn = document.querySelector('[data-btn="header-menu"]');
    const headerMenu = document.querySelector('.header-menu');

    headerMenuBtn.addEventListener('click', () => {
        headerMenu.classList.toggle('is-open');
        headerMenuBtn.classList.toggle('is-open')
    });
    headerMenu.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            headerMenu.classList.remove('is-open');
            headerMenuBtn.classList.remove('is-open');
        });
    })
    document.addEventListener('click', (e) => {
        if (!headerMenuBtn.contains(e.target) && !headerMenu.contains(e.target)) {
            headerMenu.classList.remove('is-open');
            headerMenuBtn.classList.remove('is-open');
        }
    });


    (function () {
        const animatedCounts = document.querySelectorAll('.count-animated');
        const animatedDop = document.querySelectorAll('.count-animated__dop');

        const secAnimated = 2000;

        function startAnimation(count) {

            const finishCount = +count.getAttribute('data-final');
            count.textContent = 0;

            const pauseAnim = secAnimated / finishCount;

            for (let i = 0; i <= finishCount; i++) {
                setTimeout(() => {
                    count.textContent = i;
                    if (i === finishCount) {
                        count.style.width = 'auto';
                    }
                }, pauseAnim * i);
            }
        }

        // Сохраняем финальные значения и обнуляем
        animatedCounts.forEach(count => {
            const finishCount = count.textContent;
            count.setAttribute('data-final', finishCount);
            const wCount = count.offsetWidth;
            count.style.width = wCount + 'px';
            count.textContent = 0;
        });

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    startAnimation(entry.target);
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.1
        });

        animatedCounts.forEach(count => {
            observer.observe(count);
        });
    })();


    const mobileNavDropItems = document.querySelectorAll('.mobile-nav__dropdown');

    mobileNavDropItems.forEach(item => {
        const title = item.querySelector('.mobile-nav__dropdown-title');
        title.addEventListener('click', () => {
            if (!item.classList.contains('is-open')) {
                item.classList.add('is-open')
            } else { item.classList.remove('is-open') }
        })
    });


    const mobileMenuOverlay = document.querySelector('.mobile-menu-overlay');
    const mobileMenuBtn = document.querySelector('.btn_mobile_menu');
    const mobileMenuBtnClose = document.querySelector('.mobile-menu__close');

    function disableScroll() {
        document.documentElement.style.overflow = 'hidden';
        document.body.style.overflow = 'hidden';
    }

    function enableScroll() {
        document.documentElement.style.overflow = '';
        document.body.style.overflow = '';
    }

    function openMenu() {
        mobileMenuOverlay.classList.add('is-open');
        disableScroll();
    }

    function closeMenu() {
        mobileMenuOverlay.classList.remove('is-open');
        enableScroll();
    }

    mobileMenuBtn.addEventListener('click', openMenu);
    mobileMenuBtnClose.addEventListener('click', closeMenu);

    

});

