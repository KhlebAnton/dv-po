document.addEventListener('DOMContentLoaded', () => {

    // хедер
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

    // попап
    (function () {
        const openButtons = document.querySelectorAll('[data-btn-modal="call"]');
        const modal = document.querySelector('.modal-overlay[data-modal="call"]');

        if (!modal) {
            console.warn('Модальное окно с data-modal="call" не найдено');
            return;
        }

        const closeButton = modal.querySelector('.modal-close');

        function openModal() {
            modal.classList.add('is-open');
            document.body.style.overflow = 'hidden'; 
        }

        function closeModal() {
            modal.classList.remove('is-open');
            document.body.style.overflow = ''; 
        }

        modal.addEventListener('click', function (e) {
            if (e.target === modal) {
                closeModal();
            }
        });

        if (closeButton) {
            closeButton.addEventListener('click', closeModal);
        }

        document.addEventListener('keydown', function (e) {
            if (e.key === 'Escape' && modal.classList.contains('is-open')) {
                closeModal();
            }
        });

        openButtons.forEach(button => {
            button.addEventListener('click', function (e) {
                e.preventDefault();
                openModal();
            });
        });
    })();

    // анимация числ
    (function () {
        const animatedCounts = document.querySelectorAll('.count-animated');
        const animatedDops = document.querySelectorAll('.count-animated__dop');
        const secAnimated = 4000;

        function getEasedValue(progress) {
            return progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
        }

        function animateValue(element, end, duration) {
            const startTime = performance.now();
            element.textContent = '0';

            function update(currentTime) {
                const elapsed = currentTime - startTime;
                let progress = Math.min(1, elapsed / duration);

                const eased = getEasedValue(progress);
                let current = Math.floor(end * eased);

                if (progress === 1) {
                    current = end;
                    element.style.width = 'auto';
                }

                element.textContent = current;

                if (progress < 1) {
                    requestAnimationFrame(update);
                }
            }

            requestAnimationFrame(update);
        }

        function fadeIn(element, duration, delay = 0) {
            element.style.opacity = '0';
            element.style.transition = `opacity ${duration}ms ease-out ${delay}ms`;

            element.offsetHeight;

            element.style.opacity = '1';
        }

        animatedCounts.forEach(count => {
            const finishCount = parseInt(count.textContent, 10);
            if (isNaN(finishCount)) return;

            count.setAttribute('data-final', finishCount);

            const wCount = count.offsetWidth;
            count.style.width = wCount + 'px';
            count.textContent = '0';

            count.style.opacity = '0';
        });

        animatedDops.forEach(dop => {
            dop.style.opacity = '0';
        });

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const container = entry.target.closest('.stats-item');
                    if (!container) return;

                    const countElement = container.querySelector('.count-animated');
                    const dopElements = container.querySelectorAll('.count-animated__dop');

                    if (countElement) {
                        const finalValue = parseInt(countElement.getAttribute('data-final'), 10);
                        if (!isNaN(finalValue) && finalValue > 0) {
                            animateValue(countElement, finalValue, secAnimated);
                            fadeIn(countElement, 3000, 0);
                        }
                    }

                    dopElements.forEach((dop, index) => {
                        fadeIn(dop, 3000, index * 100);
                    });

                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.1
        });

        const statsItems = document.querySelectorAll('.stats-item');
        statsItems.forEach(item => {
            observer.observe(item);
        });
    })();

    // анимация заголовков
    (function () {
        const fadeInTitles = document.querySelectorAll('.fade-in-animated');

        function fadeInTitle(element, delay = 0) {
            element.style.opacity = '0';
            element.style.transform = 'translateY(20px)';
            element.style.transition = `opacity 0.6s cubic-bezier(0.4, 0, 0.2, 1) ${delay}s, transform 0.6s cubic-bezier(0.4, 0, 0.2, 1) ${delay}s`;

            element.offsetHeight;

            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }

        fadeInTitles.forEach(title => {
            title.style.opacity = '0';
            title.style.transform = 'translateY(20px)';
        });

        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry, index) => {
                if (entry.isIntersecting) {
                    fadeInTitle(entry.target, index * 0.1);
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });

        // Запуск наблюдения
        fadeInTitles.forEach(title => {
            observer.observe(title);
        });
    })();

    // раскрытие списков в меню мобилки
    const mobileNavDropItems = document.querySelectorAll('.mobile-nav__dropdown');

    mobileNavDropItems.forEach(item => {
        const title = item.querySelector('.mobile-nav__dropdown-title');
        title.addEventListener('click', () => {
            if (!item.classList.contains('is-open')) {
                item.classList.add('is-open')
            } else { item.classList.remove('is-open') }
        })
    });

    // мобильное меню
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


    // маска телефон 
    const phoneInputs = document.querySelectorAll('.phone-input');
    if (phoneInputs.length) {
        phoneInputs.forEach(input => {
            var iti = window.intlTelInput(input, {
                nationalMode: true,
                initialCountry: 'auto',
                geoIpLookup: function (callback) {
                    jQuery.get('https://ipinfo.io', function () { }, 'jsonp').always(function (resp) {
                        var countryCode = resp && resp.country ? resp.country : 'us';
                        callback(countryCode);
                    });
                },
                utilsScript: '/scripts/utils.js',
                preferredCountries: ['ru']
            });
            var handleChange = function () {
                var text = iti.isValidNumber() ? iti.getNumber() : '';
                iti.setNumber(text);
                input.value = text;
            };
            input.addEventListener('mouseleave', handleChange);
            input.addEventListener('change', handleChange);
        });
    };


    // свайпер  Нам доверяют — мы помогаем
    const swiperContainer = document.querySelector('.trust__content-swiper');

    const swiper = new Swiper(swiperContainer, {
        slidesPerView: 'auto',
        spaceBetween: 20,
        navigation: {
            nextEl: '.custom-swiper-nav_next',
            prevEl: '.custom-swiper-nav_prev',
        },
        pagination: {
            el: '.trust__content_pagination',
            clickable: true,
        },
        breakpoints: {
            1000: {
                slidesPerView: 2,
                spaceBetween: 0,
            }
        }
    });

    // свайпер   Включение в реестр по этапам
    const stepSwiperContainer = document.querySelector('.steps__swiper');

    const stepSwiper = new Swiper(stepSwiperContainer, {
        slidesPerView: 'auto',
        spaceBetween: 32,
        freeMode: {
            enabled: true,         // ВКЛЮЧАЕМ свободную прокрутку
            momentum: true,        // инерция после отпускания
            momentumRatio: 0.5,    // сила инерции (0 - нет, 1 - максимальная)
            momentumVelocityRatio: 1,
            momentumBounce: true,  // отскок при достижении края
            momentumBounceRatio: 1,
            sticky: false,         // запрет прилипания к началу/концу
            minimumVelocity: 0.02  // мин. скорость для инерции
        },
        grabCursor: true,        // курсор-рука при наведении
        simulateTouch: true,     // тач-события
        touchRatio: 1,
        touchAngle: 45,
        breakpoints: {
            1000: {
                spaceBetween: 40,
            }
        }
    });

    // свайпер  Требования для подачи заявки
    const requirementsSwiperContainer = document.querySelector('.requirements__swiper');

    const requirementsSwiper = new Swiper(requirementsSwiperContainer, {
        slidesPerView: 1,
        spaceBetween: 0,
        navigation: {
            nextEl: '.requirements__nav_btn_next',
            prevEl: '.requirements__nav_btn_prev',
        },
        pagination: {
            el: '.requirements_pagination',
            clickable: true,
        },
        effect: 'fade',
        fadeEffect: {
            crossFade: true
        },
    });

// свайпер  Нас рекомендуют
    const recommendedSwiperContainer = document.querySelector('.recommended_swiper');

    const recommendedSwiper = new Swiper(recommendedSwiperContainer, {
        slidesPerView: 'auto',
        spaceBetween: 16,
        navigation: {
            nextEl: '.recommended_nav_btn_next',
            prevEl: '.recommended_nav_btn_prev',
        },
        pagination: {
            el: '.recommended_pagination',
            clickable: true,
        }
    });

    // раскрытие текста в Нас рекомендуют
    (function () {
        const wrappers = document.querySelectorAll('.recommended__text-wrapper');

        wrappers.forEach(wrapper => {
            const textElement = wrapper.querySelector('.recommended__text');
            const moreBtn = wrapper.querySelector('.more_text');

            if (!textElement || !moreBtn) return;

            const needsTruncation = () => {
                const originalOverflow = textElement.style.overflow;
                const originalDisplay = textElement.style.display;
                const originalWebkitLineClamp = textElement.style.webkitLineClamp;

                textElement.style.overflow = 'visible';
                textElement.style.display = 'block';
                textElement.style.webkitLineClamp = 'unset';

                const fullHeight = textElement.scrollHeight;

                const lineHeight = parseFloat(getComputedStyle(textElement).lineHeight);
                const maxHeight = lineHeight * 8;

                textElement.style.overflow = originalOverflow;
                textElement.style.display = originalDisplay;
                textElement.style.webkitLineClamp = originalWebkitLineClamp;

                return fullHeight > maxHeight + 1;
            };

            if (needsTruncation()) {
                moreBtn.style.display = 'inline-block';

                const updateButtonText = () => {
                    const isOpen = wrapper.classList.contains('is-open');
                    moreBtn.textContent = isOpen ? 'Скрыть' : 'Подробнее';
                };

                const toggleText = () => {
                    wrapper.classList.toggle('is-open');
                    updateButtonText();
                };

                updateButtonText();
                moreBtn.addEventListener('click', toggleText);
            } else {
                moreBtn.style.display = 'none';
                wrapper.classList.remove('is-open');
                textElement.style.webkitLineClamp = 'unset';
                textElement.style.display = 'block';
            }
        });
    })();

    // свайпер   Заявки пишут люди 
    const teamSwiperContainer = document.querySelector('.team-swiper');

    const teamSwiper = new Swiper(teamSwiperContainer, {
        slidesPerView: 'auto',
        spaceBetween: 12,
        navigation: {
            nextEl: '.team_nav_btn_next',
            prevEl: '.team_nav_btn_prev',
        },
        pagination: {
            el: '.team_pagination',
            clickable: true,
        }
    });


    // вопросы ответы
    const faqItems = document.querySelectorAll('.faq-item');

    faqItems.forEach(faq => {

        faq.addEventListener('click', (e) => {
            e.stopPropagation(); // предотвращаем всплытие

            // Если текущий уже открыт - просто закрываем его
            if (faq.classList.contains('is-open')) {
                faq.classList.remove('is-open');
            } else {
                // Закрываем все остальные
                faqItems.forEach(item => {
                    item.classList.remove('is-open');
                });
                // Открываем текущий
                faq.classList.add('is-open');
            }
        });
    });

    // свайпер Оказываем более 35+ услуг
    const servicesSwiperContainer = document.querySelector('.services-swiper');

    const servicesSwiper = new Swiper(servicesSwiperContainer, {
        slidesPerView: 'auto',
        spaceBetween: 16,
        navigation: {
            nextEl: '.services_nav_btn_next',
            prevEl: '.services_nav_btn_prev',
        },
        pagination: {
            el: '.services_pagination',
            clickable: true,
        }
    });

    // свапер блог
    const blogSwiperContainer = document.querySelector('.blog-swiper');

    const blogSwiper = new Swiper(blogSwiperContainer, {
        slidesPerView: 'auto',
        spaceBetween: 24,
        navigation: {
            nextEl: '.blog_nav_btn_next',
            prevEl: '.blog_nav_btn_prev',
        },
        pagination: {
            el: '.blog_pagination',
            clickable: true,
        }
    });

});

