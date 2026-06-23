document.addEventListener('DOMContentLoaded', ()=> {
    // свапер hero
    const mainHeroBottom = document.querySelector('.main-hero-bottom_nav');

    const HeroBottomNavSwiper = new Swiper(mainHeroBottom, {
        slidesPerView: 'auto',
        spaceBetween: 0,
        
    });
})