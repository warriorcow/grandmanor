// Мокапные данные товаров
const mockProducts = [
  {
    id: 1,
    name: 'Комод Modern Wave',
    price: 55537,
    image: '@images/furniture-1.jpg'
  },
  {
    id: 2,
    name: 'Шкаф Classic Style',
    price: 87420,
    image: '@images/furniture-2.jpg'
  },
  {
    id: 3,
    name: 'Диван Premium Comfort',
    price: 125000,
    image: '@images/furniture-3.jpg'
  },
  {
    id: 4,
    name: 'Стол обеденный Royal',
    price: 65300,
    image: '@images/furniture-4.jpg'
  },
  {
    id: 5,
    name: 'Кресло Executive Chair',
    price: 42800,
    image: '@images/furniture-5.jpg'
  }
];

class Search {
  constructor(element) {
    this.element = element;
    this.input = element.querySelector('.search__input');
    this.dropdown = element.querySelector('.search__dropdown');
    this.resultsContainer = element.querySelector('.search__results');
    
    this.init();
  }

  init() {
    // Обработка ввода в поле поиска
    this.input.addEventListener('input', (e) => {
      this.handleSearch(e.target.value);
    });

    // Показ/скрытие выпадающего списка
    this.input.addEventListener('focus', () => {
      this.showDropdown();
    });

    // Закрытие при клике вне компонента
    document.addEventListener('click', (e) => {
      if (!this.element.contains(e.target)) {
        this.hideDropdown();
      }
    });

    // Обработка клика по товару
    this.element.addEventListener('click', (e) => {
      const item = e.target.closest('.search__item');
      if (item) {
        const productId = item.dataset.productId;
        this.handleProductClick(productId);
      }
    });
  }

  handleSearch(query) {
    if (!query.trim()) {
      this.renderResults(mockProducts.slice(0, 3));
      return;
    }

    // Фильтрация товаров по запросу
    const filteredProducts = mockProducts.filter(product =>
      product.name.toLowerCase().includes(query.toLowerCase())
    );

    this.renderResults(filteredProducts.slice(0, 3));
    this.showDropdown();
  }

  renderResults(products) {
    const title = this.resultsContainer.querySelector('.search__results-title');
    const titleText = title ? title.outerHTML : '<h3 class="search__results-title">Товары:</h3>';
    
    if (products.length === 0) {
      this.resultsContainer.innerHTML = `
        ${titleText}
        <p style="text-align: center; color: #8B8B8B; padding: 20px 0;">Ничего не найдено</p>
      `;
      return;
    }

    const itemsHTML = products.map(product => `
      <div class="search__item" data-product-id="${product.id}">
        <div class="search__item-image">
          <img src="${product.image}" alt="${product.name}" onerror="this.src='@images/placeholder.jpg'">
        </div>
        <div class="search__item-info">
          <h4 class="search__item-name">${product.name}</h4>
          <div class="search__item-price">
            <span class="search__price-value">${this.formatPrice(product.price)}</span>
            <span class="search__price-currency">руб.</span>
          </div>
        </div>
      </div>
    `).join('');

    this.resultsContainer.innerHTML = titleText + itemsHTML;
  }

  formatPrice(price) {
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
  }

  handleProductClick(productId) {
    const product = mockProducts.find(p => p.id === parseInt(productId));
    if (product) {
      console.log('Выбран товар:', product);
      // Здесь можно добавить переход на страницу товара
      // window.location.href = `/product/${productId}`;
    }
  }

  showDropdown() {
    this.dropdown.style.display = 'block';
    // Если результатов нет, показываем первые 3 товара
    const hasResults = this.resultsContainer.querySelectorAll('.search__item').length > 0;
    if (!hasResults) {
      this.renderResults(mockProducts.slice(0, 3));
    }
  }

  hideDropdown() {
    this.dropdown.style.display = 'none';
  }
}

// Инициализация компонента при загрузке страницы
document.addEventListener('DOMContentLoaded', () => {
  const searchElements = document.querySelectorAll('.search');
  searchElements.forEach(element => {
    new Search(element);
  });
});

export default Search;

