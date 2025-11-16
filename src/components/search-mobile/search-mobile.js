function initSearchMobile() {
    const searchTabbarOpenBtn = document.querySelector('#search-tabbar-open');
    const searchTabbarCloseBtn = document.querySelector('#search-tabbar-close');
    const searchMobileEl = document.querySelector('.search-mobile');

    searchMobileEl.style.transition = ".3s ease";

    searchTabbarOpenBtn.addEventListener('click', () => {
        document.body.style.overflow = 'hidden';
        searchMobileEl.classList.add('open');
    })

    searchTabbarCloseBtn.addEventListener('click', () => {
        document.body.style.overflow = '';
        searchMobileEl.classList.remove('open');
    });
}

document.addEventListener('DOMContentLoaded', () => {
    initSearchMobile();
});

export default initSearchMobile;
