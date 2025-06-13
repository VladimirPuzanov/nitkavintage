function burgerOpen(){
  document.querySelector("header")?.classList.add("active")
  document.querySelector("html")?.classList.add("lock")
  burger.classList.add("active")
  burger.removeEventListener("click", burgerOpen)
  burger.addEventListener("click", burgerClose)
}

function burgerClose(){
  document.querySelector("header")?.classList.remove("active")
  document.querySelector("html")?.classList.remove("lock")
  burger.classList.remove("active")
  burger.removeEventListener("click", burgerClose)
  burger.addEventListener("click", burgerOpen)
}

function cartOpen(){
  document.querySelector("header")?.classList.remove("active")
  document.querySelector(".header__cart")?.classList.add("active")
  document.querySelector("html")?.classList.add("lock")
  burger.classList.add("active")
  burger.removeEventListener("click", burgerClose)
  burger.removeEventListener("click", burgerOpen)
  burger.addEventListener("click", cartClose)
}

function cartClose(){
  document.querySelector(".header__cart")?.classList.remove("active")
  document.querySelector("html")?.classList.remove("lock")
  burger.classList.remove("active")
  burger.removeEventListener("click", cartClose)
  burger.addEventListener('click', burgerOpen)
}

const burger = document.querySelector(".header__burger")
if(burger){
  burger.addEventListener("click", burgerOpen)
}

const cart = document.querySelector(".header__button_cart")
if(cart){
  cart.addEventListener('click', cartOpen)
}

const cartCloseBtn = document.querySelector(".cart__close")
if(cartCloseBtn){
  cartCloseBtn.addEventListener("click", cartClose)
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
  threshold: 0.3,
  rootMargin: '50px',
});

const animatedItems = document.querySelectorAll(".to_animate")

if (animatedItems.length > 0) {
  animatedItems.forEach(item => {
    observer.observe(item)
  })
}

const CursorFunction = () => {
    const projects = document.querySelectorAll(".cursor-item");
    if (!projects.length) return;
    const cursor = document.querySelector(".cursor");
    if (!cursor) return;
    const cursorWrap = document.querySelector(".cursor__wrap");
    const cursorMove = document.querySelector(".cursor__move");
    if (!cursorWrap || !cursorMove) return;

    let halfWindowWidth = window.innerWidth / 2;
    let halfWindowHeight = window.innerHeight / 2;
    const cursorRect = cursor.getBoundingClientRect();


    const updateWindowDimensions = () => {
        halfWindowWidth = window.innerWidth / 2;
        halfWindowHeight = window.innerHeight / 2;
    };


    window.addEventListener('resize', updateWindowDimensions);

    projects.forEach((project) => {
        
        const handleMouseMove = (e) => {
            if (window.innerWidth < 1024) return;
            const tabElementsExist = document.querySelector('.cursor-item__ignore') !== null;
            const isOverTab = tabElementsExist ? e.target.closest('.cursor-item__ignore') : false;
            const shouldHideCursor = isOverTab;

            cursorWrap.style.opacity = shouldHideCursor ? "0" : "1";
            cursorWrap.style.transform = shouldHideCursor ? "scale(0)" : "scale(1)";

            if (!shouldHideCursor) {
                const x = e.clientX - halfWindowWidth - cursorRect.left;
                const y = e.clientY - halfWindowHeight - cursorRect.top;

                cursorMove.style.transform = `
                    translate3d(${x}px, ${y}px, 0px) 
                    scale3d(1, 1, 1) 
                    rotateX(0deg) rotateY(0deg) rotateZ(0deg) 
                    skew(0deg, 0deg)
                `;
            }
        };

        const handleMouseLeave = () => {
            if (window.innerWidth < 1024) return;
            cursorWrap.style.opacity = "0";
            cursorWrap.style.transform = "scale(0)";
        };

        project.addEventListener("mousemove", handleMouseMove);
        project.addEventListener("mouseleave", handleMouseLeave);
    });

    return () => {
        window.removeEventListener('resize', updateWindowDimensions);
    };
};

CursorFunction();
