import Swiper from 'swiper';
import { Navigation, Pagination } from 'swiper/modules';
import { Fancybox } from '@fancyapps/ui';
import '@fancyapps/ui/dist/fancybox/fancybox.css';
import IMask from 'imask';

function initProductPage() {
  // Инициализация только на странице товара
  if (!document.querySelector('.product')) return;

  initPhotoGallery();
  initCollectionSlider();
  initSizeSelector();
  initFancybox();
  initFavorite();
  initPhoneMask();
  initInvalidInputs();
  initAgreeCheckbox();
}

function initFavorite() {
  const btn = document.querySelector('.product__favorite');
  if (!btn) return;
  btn.addEventListener('click', () => btn.classList.toggle('is-active'));
}

function initInvalidInputs() {
  document.querySelectorAll('.product__buy-field .input.is-invalid').forEach(input => {
    input.addEventListener('input', () => input.classList.remove('is-invalid'), { once: true });
  });
}

function initAgreeCheckbox() {
  const label = document.querySelector('.product__buy-agree');
  if (!label) return;
  const input = label.querySelector('input[type="checkbox"]');
  if (!input) return;
  input.addEventListener('change', () => {
    if (input.checked) label.classList.remove('is-invalid');
  });
}

function initPhoneMask() {
  const input = document.querySelector('.product__buy-field input[type="tel"]');
  if (!input) return;

  IMask(input, {
    mask: '+{7} (000) 000-00-00',
  });
}

function initFancybox() {
  Fancybox.bind('[data-fancybox]', {
    Carousel: {
      Toolbar: {
        display: {
          right: ['close']
        }
      },
    }
  });
}

// --- Галерея фотографий товара ---
function initPhotoGallery() {
  const el = document.querySelector('.product__swiper');
  if (!el) return;

  new Swiper(el, {
    modules: [Navigation, Pagination],
    loop: true,
    navigation: {
      nextEl: '.product__gallery-next',
      prevEl: '.product__gallery-prev',
    },
    pagination: {
      el: '.product__pagination',
      clickable: true,
      type: 'bullets',
    },
    slidesPerView: 1,
    spaceBetween: 0,
  });
}

// --- Слайдер «Также из коллекции» ---
function initCollectionSlider() {
  const el = document.querySelector('.product__col-swiper');
  if (!el) return;

  new Swiper(el, {
    modules: [Navigation],
    navigation: {
      nextEl: '.product__col-next',
      prevEl: '.product__col-prev',
    },
    slidesPerView: 4,
    spaceBetween: 0,
    breakpoints: {
      0: {
        slidesPerView: 2.1,
        spaceBetween: 0,
      },
      769: {
        slidesPerView: 3,
        spaceBetween: 0,
      },
      1281: {
        slidesPerView: 4,
        spaceBetween: 0,
      },
    },
  });
}

// --- Выбор размера ---
function initSizeSelector() {
  const sizes = document.querySelectorAll('.product__size');
  if (!sizes.length) return;

  sizes.forEach(btn => {
    btn.addEventListener('click', () => {
      sizes.forEach(b => b.classList.remove('is-active'));
      btn.classList.add('is-active');
    });
  });
}

document.addEventListener('DOMContentLoaded', () => {
  initProductPage();
});

export default initProductPage;
