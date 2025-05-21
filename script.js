// Splash screen
window.addEventListener('load', () => {
  const splash = document.getElementById('splash-screen');
  splash.style.opacity = '0';
  setTimeout(() => splash.style.display = 'none', 600);
});

// Floating WA toggle
document.getElementById('toggleContact').addEventListener('click', () => {
  const options = document.getElementById('contactOptions');
  options.style.display = options.style.display === 'flex' ? 'none' : 'flex';
});

// Scroll controls
document.getElementById('scrollUp').addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

document.getElementById('scrollDown').addEventListener('click', () => {
  window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
});

// Carousel logic
let currentSlide = 0;
const slides = document.querySelectorAll('.slide');
const slideTrack = document.querySelector('.slide-track');
const dotsContainer = document.getElementById('sliderDots');

function showSlide(index) {
  if (index >= slides.length) currentSlide = 0;
  else if (index < 0) currentSlide = slides.length - 1;
  else currentSlide = index;

  slideTrack.style.transform = `translateX(-${currentSlide * 100}%)`;
  updateDots();
}

function updateDots() {
  dotsContainer.innerHTML = '';
  slides.forEach((_, i) => {
    const dot = document.createElement('span');
    dot.classList.add(i === currentSlide ? 'active' : '');
    dot.addEventListener('click', () => showSlide(i));
    dotsContainer.appendChild(dot);
  });
}

document.querySelector('.prev').addEventListener('click', () => showSlide(currentSlide - 1));
document.querySelector('.next').addEventListener('click', () => showSlide(currentSlide + 1));

setInterval(() => showSlide(currentSlide + 1), 5000);

updateDots();
