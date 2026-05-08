document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener("click", function (e) {
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: "smooth" });
    }
  });
});


const btn = document.createElement("button");
btn.id = "backToTop";
btn.innerHTML = "&#8679;";
btn.title = "Kembali ke atas";
document.body.appendChild(btn);

window.addEventListener("scroll", () => {
  if (window.scrollY > 300) {
    btn.style.opacity = "1";
    btn.style.pointerEvents = "auto";
  } else {
    btn.style.opacity = "0";
    btn.style.pointerEvents = "none";
  }
});

btn.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});


const reveals = document.querySelectorAll(
  ".article-card, .profile-card, .about-grid"
);
reveals.forEach(el => el.classList.add("reveal"));

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });

reveals.forEach(el => observer.observe(el));


const typingEl = document.getElementById("typing");
if (typingEl) {
  const text = "Mathilda Asthawa";
  let i = 0;

  function type() {
    if (i < text.length) {
      typingEl.textContent += text.charAt(i);
      i++;
      setTimeout(type, 100);
    }
  }
  setTimeout(type, 500);
}


const lightbox = document.getElementById("lightbox");
if (lightbox) {
  const lightboxImg = document.getElementById("lightbox-img");
  const lightboxClose = document.getElementById("lightbox-close");
  const lightboxPrev = document.getElementById("lightbox-prev");
  const lightboxNext = document.getElementById("lightbox-next");

  const imgs = [...document.querySelectorAll(".gallery-card img")];
  let currentIndex = 0;

  const lightboxCaption = document.getElementById("lightbox-caption");

  function openLightbox(index) {
  currentIndex = index;
  lightboxImg.src = imgs[currentIndex].src;
  lightboxImg.alt = imgs[currentIndex].alt;
  lightboxCaption.textContent = imgs[currentIndex].alt;
  lightbox.classList.add("active");
}

  imgs.forEach((img, index) => {
    img.style.cursor = "pointer";
    img.addEventListener("click", () => openLightbox(index));
  });

  lightboxPrev.addEventListener("click", (e) => {
  e.stopPropagation();
  currentIndex = (currentIndex - 1 + imgs.length) % imgs.length;
  lightboxImg.src = imgs[currentIndex].src;
  lightboxImg.alt = imgs[currentIndex].alt;
  lightboxCaption.textContent = imgs[currentIndex].alt;
  });

  lightboxNext.addEventListener("click", (e) => {
    e.stopPropagation();
    currentIndex = (currentIndex + 1) % imgs.length;
    lightboxImg.src = imgs[currentIndex].src;
    lightboxImg.alt = imgs[currentIndex].alt;
    lightboxCaption.textContent = imgs[currentIndex].alt;
  });

  lightboxClose.addEventListener("click", () => {
    lightbox.classList.remove("active");
  });

  lightbox.addEventListener("click", (e) => {
    if (e.target === lightbox) {
      lightbox.classList.remove("active");
    }
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") lightbox.classList.remove("active");
    if (e.key === "ArrowLeft") lightboxPrev.click();
    if (e.key === "ArrowRight") lightboxNext.click();
  });
}