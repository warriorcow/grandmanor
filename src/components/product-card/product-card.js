function initProductCardScript() {
    console.log('initProductCardScript');

    const formatter = new Intl.NumberFormat('ru-RU');

    // все цены в карточках
    const priceSelectors = [
        '.product-card__price-default span',
        '.product-card__price-old del'
    ];

    priceSelectors.forEach(selector => {
        const elements = document.querySelectorAll(selector);

        elements.forEach(el => {
            const value = el.textContent.replace(/\s/g, ''); // убираем пробелы
            const num = parseFloat(value);

            if (!isNaN(num)) {
                el.textContent = formatter.format(num);
            }
        });
    });
}

document.addEventListener('DOMContentLoaded', () => {
    initProductCardScript();
});

export default initProductCardScript;