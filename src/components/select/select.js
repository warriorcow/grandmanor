function initCustomSelects() {
    const selects = document.querySelectorAll('.select');
    if (!selects.length) return;

    selects.forEach(select => {
        const trigger = select.querySelector('.select__trigger');
        const dropdown = select.querySelector('.select__dropdown');
        const hiddenInput = select.querySelector('input[type="hidden"]');
        const valueDisplay = select.querySelector('.select__value');
        const options = select.querySelectorAll('.select__option');

        // Если нет нужных элементов - пропускаем
        if (!trigger || !dropdown || !hiddenInput || !valueDisplay || !options.length) return;

        // Изначально скрываем дропдаун
        dropdown.style.display = 'none';

        trigger.addEventListener('click', (e) => {
            e.stopPropagation();

            const isOpen = select.classList.contains('open');

            if (isOpen) {
                // Закрываем текущий
                select.classList.remove('open');
                dropdown.style.display = 'none';
            } else {
                // Закрываем все остальные
                selects.forEach(s => {
                    s.classList.remove('open');
                    s.querySelector('.select__dropdown').style.display = 'none';
                });

                // Открываем текущий
                select.classList.add('open');
                dropdown.style.display = 'block';
            }
        });

        // Выбор опции
        options.forEach(option => {
            option.addEventListener('click', () => {
                const value = option.getAttribute('data-value');
                const label = option.textContent;

                // Снимаем выделение со всех
                options.forEach(opt => {
                    opt.classList.remove('selected');
                });

                // Выделяем выбранную
                option.classList.add('selected');

                // Обновляем отображение
                valueDisplay.textContent = label;

                // Записываем в hidden input
                hiddenInput.value = value;
                select.setAttribute('data-value', value);

                // Закрываем dropdown
                select.classList.remove('open');
                dropdown.style.display = 'none';

                // Кидаем событие
                const event = new CustomEvent('change', {
                    detail: { value, label, name: hiddenInput.name }
                });
                select.dispatchEvent(event);
            });
        });

        // Установка начального значения
        const initialValue = select.getAttribute('data-value');
        if (initialValue) {
            const initialOption = select.querySelector(`.select__option[data-value="${initialValue}"]`);
            if (initialOption) {
                initialOption.classList.add('selected');
                valueDisplay.textContent = initialOption.textContent;
                hiddenInput.value = initialValue;
            }
        }
    });

    // Закрытие при клике вне селекта
    document.addEventListener('click', () => {
        selects.forEach(select => {
            select.classList.remove('open');
            select.querySelector('.select__dropdown').style.display = 'none';
        });
    });
}

document.addEventListener('DOMContentLoaded', () => {
    initCustomSelects();
});