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

// Carousel (banner atas)
let currentSlide = 0;
const slides = document.querySelectorAll('.slide');
const slideTrack = document.querySelector('.slide-track');
const dotsContainer = document.getElementById('sliderDots');

function showSlide(index) {
  currentSlide = (index + slides.length) % slides.length;
  slideTrack.style.transform = `translateX(-${currentSlide * 100}%)`;
  updateDots();
}

function updateDots() {
  dotsContainer.innerHTML = '';
  slides.forEach((_, i) => {
    const dot = document.createElement('span');
    if (i === currentSlide) dot.classList.add('active');
    dot.addEventListener('click', () => showSlide(i));
    dotsContainer.appendChild(dot);
  });
}

document.querySelector('.prev').addEventListener('click', () => showSlide(currentSlide - 1));
document.querySelector('.next').addEventListener('click', () => showSlide(currentSlide + 1));
setInterval(() => showSlide(currentSlide + 1), 5000);
updateDots();

// Preview saat hover / touch
document.querySelectorAll('.gallery-scroll-track img').forEach(img => {
  let hoverTimeout;
  let preview;

  function showPreview() {
    if (document.querySelector('.zoom-preview-box')) return;
    preview = document.createElement('div');
    preview.className = 'zoom-preview-box';
    const zoomed = document.createElement('img');
    zoomed.src = img.src;
    preview.appendChild(zoomed);

    const rect = img.getBoundingClientRect();
    preview.style.position = 'absolute';
    preview.style.top = `${window.scrollY + rect.top - 180}px`;
    preview.style.left = `${rect.left + rect.width / 2}px`;
    preview.style.transform = 'translateX(-50%)';

    document.body.appendChild(preview);
  }

  img.addEventListener('mouseenter', () => {
    hoverTimeout = setTimeout(showPreview, 200);
  });

  img.addEventListener('mouseleave', () => {
    clearTimeout(hoverTimeout);
    if (preview) {
      preview.remove();
      preview = null;
    }
  });

  img.addEventListener('touchstart', () => {
    hoverTimeout = setTimeout(showPreview, 300);
  });

  img.addEventListener('touchend', () => {
    clearTimeout(hoverTimeout);
    if (preview) {
      preview.remove();
      preview = null;
    }
  });
});


let galleryScrollIndex = 0;
const galeriTrack = document.getElementById('galleryTrack');
const images = galleryTrack?.children || [];
const itemWidth = 262;

function scrollGallery(direction) {
  galleryScrollIndex += direction;

  if (galleryScrollIndex < 0) galleryScrollIndex = 0;
  if (galleryScrollIndex >= images.length) galleryScrollIndex = images.length - 1;

  galleryTrack.style.transform = `translateX(-${galleryScrollIndex * itemWidth}px)`;
}
