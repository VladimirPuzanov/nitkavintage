function burgerOpen() {
  document.querySelector("header")?.classList.add("active")
  document.querySelector("html")?.classList.add("lock")
  burger.classList.add("active")
  burger.removeEventListener("click", burgerOpen)
  burger.addEventListener("click", burgerClose)
}

function burgerClose() {
  document.querySelector("header")?.classList.remove("active")
  document.querySelector("html")?.classList.remove("lock")
  burger.classList.remove("active")
  burger.removeEventListener("click", burgerClose)
  burger.addEventListener("click", burgerOpen)
}

function cartOpen() {
  document.querySelector("header")?.classList.remove("active")
  document.querySelector(".header__cart")?.classList.add("active")
  document.querySelector("html")?.classList.add("lock")
  burger.classList.add("active")
  burger.removeEventListener("click", burgerClose)
  burger.removeEventListener("click", burgerOpen)
  burger.addEventListener("click", cartClose)
}

function cartClose() {
  document.querySelector(".header__cart")?.classList.remove("active")
  document.querySelector("html")?.classList.remove("lock")
  burger.classList.remove("active")
  burger.removeEventListener("click", cartClose)
  burger.addEventListener('click', burgerOpen)
}

function formClose() {
  document.querySelector(".header__form")?.classList.remove("active")
  burger.removeEventListener("click", formClose)
  document.querySelector(".cart__close")?.removeEventListener("click", formClose)
}

function formOpen() {
  document.querySelector(".header__form")?.classList.add("active")
  document.querySelector(".cart__close")?.addEventListener("click", formClose)
  burger.addEventListener("click", formClose)
}

function submitClose() {
  document.querySelector(".header__result")?.classList.remove("active")
  document.querySelector(".cart__close")?.removeEventListener("click", submitClose)
  burger.removeEventListener("click", submitClose)
}

function submit(e) {
  document.querySelector(".cart__close")?.addEventListener("click", submitClose)
  burger.addEventListener("click", submitClose)
}

function truncateWithoutWordBreak(str, maxLength) {
  if (str.length <= maxLength) return str;
  const lastSpaceIndex = str.lastIndexOf(' ', maxLength);
  const cutPoint = lastSpaceIndex > 0 ? lastSpaceIndex : maxLength;
  return str.slice(0, cutPoint).trim() + "...";
}

const burger = document.querySelector(".header__burger")
if (burger) {
  burger.addEventListener("click", burgerOpen)
}

const cart = document.querySelector(".header__button_cart")
if (cart) {
  cart.addEventListener('click', cartOpen)
}

const cartCloseBtn = document.querySelector(".cart__close")
if (cartCloseBtn) {
  cartCloseBtn.addEventListener("click", cartClose)
}

const formOpenBtn = document.querySelector(".cart__submit")
if (formOpenBtn) {
  formOpenBtn.addEventListener("click", formOpen)
}

const formCloseBtn = document.querySelector(".form__close")
if (formCloseBtn) {
  formCloseBtn.addEventListener("click", formClose)
}

const submitBtn = document.querySelector(".header__form form button[type=submit]")
if (submitBtn) {
  submitBtn.addEventListener("click", submit)
}

const closeSubmitBtn = document.querySelector(".header__result button")
if (closeSubmitBtn) {
  closeSubmitBtn.addEventListener("click", submitClose)
  closeSubmitBtn.addEventListener("click", formClose)
  closeSubmitBtn.addEventListener("click", cartClose)
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

const descAcc = document.querySelectorAll(".product__text")
if (descAcc.length > 0) {
  descAcc.forEach(btn => {
    btn.addEventListener('click', () => {
      btn.classList.toggle("active")
      content = btn.nextElementSibling
      if (content) {
        if (content.style.maxHeight) {
          content.removeAttribute("style")
        } else {
          content.style.maxHeight = content.scrollHeight + "px"
        }
      }
    })
  });
}

const bigView = document.querySelector(".catalog-page__view_big")
const listView = document.querySelector(".catalog-page__view_list")
const smallView = document.querySelector(".catalog-page__view_small")
const catalogPage = document.querySelector(".catalog-page")

if (catalogPage) {
  if (bigView) {
    if (window.innerWidth >= 1024) {
      bigView.classList.add("active")
    }
    bigView.addEventListener("click", () => {
      catalogReloadAnimation()
      listView?.classList.remove("active")
      smallView?.classList.remove("active")
      bigView?.classList.add("active")
      setTimeout(() => {
        if (window.innerWidth < 1024) {
          catalogPage.classList.add("small")
        } else {
          catalogPage.classList.remove("small")
          catalogPage.classList.remove("list")
        }
      }, 600);
    })
  }
  if (smallView) {
    smallView.addEventListener("click", () => {
      catalogReloadAnimation()
      bigView?.classList.remove("active")
      listView?.classList.remove("active")
      smallView?.classList.add("active")
      setTimeout(() => {
        catalogPage.classList.remove("big")
        catalogPage.classList.remove("list")
        catalogPage.classList.add("small")
      }, 600);
    })
  }
  if (listView) {
    if (window.innerWidth < 1024) {
      listView.classList.add("active")
    }
    listView.addEventListener("click", () => {
      catalogReloadAnimation()
      bigView?.classList.remove("active")
      smallView?.classList.remove("active")
      listView?.classList.add("active")
      setTimeout(() => {
        if (window.innerWidth < 1024) {
          catalogPage.classList.remove("small")
        } else {
          catalogPage.classList.remove("big")
          catalogPage.classList.remove("small")
          catalogPage.classList.add("list")
        }
      }, 600);
    })
  }
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
