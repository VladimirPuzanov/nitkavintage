const burger = document.querySelector(".header__burger")
let header = document.querySelector(".header")
if (burger && header) {
  burger.addEventListener("click", () => {
    header.classList.toggle("active")
    document.querySelector("html").classList.toggle("lock")
  })
}

const observer = new IntersectionObserver((entries) => {
  let animationDelay = 0;
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      if (entry.target.classList.contains("animation-group")) {
        animationDelay = animationDelay + 100
      } else {
        animationDelay = 0;
      }
      setTimeout(() => {
        entry.target.classList.add("animated")
      }, animationDelay);
      observer.unobserve(entry.target)
    }
  });
}, {
  threshold: 0.5,
  rootMargin: '50px',
});

const animatedItems = document.querySelectorAll(".to_animate")

if (animatedItems.length > 0) {
  animatedItems.forEach(item => {
    observer.observe(item)
  })
}

