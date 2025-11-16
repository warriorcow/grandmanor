function initPromotion() {
    const cover = document.querySelector('.promotion__cover');
    const iframe = document.querySelector('.promotion__iframe');

    if (!cover || !iframe) return;

    cover.addEventListener('click', () => {
        cover.style.display = 'none';

        // Автозапуск видео
        const src = iframe.src;
        iframe.src = src.includes('?') ? src + '&autoplay=1' : src + '?autoplay=1';
    });
}

document.addEventListener('DOMContentLoaded', () => {
    initPromotion();
});

export default initPromotion;