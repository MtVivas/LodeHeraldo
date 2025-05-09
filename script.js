const slides = document.querySelector('.slides');
const images = document.querySelectorAll('.slides img');
let index = 0;
let startX = 0;
let isDragging = false;
const slideInterval = 15000;

function updateSlidePosition() {
  images.forEach((img, i) => {
    img.classList.toggle('active', i === index);
  });
  slides.style.transform = `translateX(-${index * 100}%)`;
}

function nextSlide() {
  index = (index + 1) % images.length;
  updateSlidePosition();
}

function prevSlide() {
  index = (index - 1 + images.length) % images.length;
  updateSlidePosition();
}

setInterval(nextSlide, slideInterval);

document.querySelector('.prev').addEventListener('click', prevSlide);
document.querySelector('.next').addEventListener('click', nextSlide);

// Swipe
slides.addEventListener('touchstart', (e) => {
  startX = e.touches[0].clientX;
  isDragging = true;
});

slides.addEventListener('touchend', (e) => {
  if (!isDragging) return;
  const endX = e.changedTouches[0].clientX;
  const diff = startX - endX;
  if (diff > 50) nextSlide();
  else if (diff < -50) prevSlide();
  isDragging = false;
});

// Menú toggle
const menuBtn = document.querySelector('.menu-btn');
const nav = document.querySelector('.nav');

menuBtn.addEventListener('click', () => {
  nav.classList.toggle('nav-open');
});

document.querySelectorAll('.menu a').forEach((link) => {
  link.addEventListener('click', () => {
    nav.classList.remove('nav-open');
  });
});
