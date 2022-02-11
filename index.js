import i18Obj from "./translate.js";

const burger = document.querySelector(".burger");
const menu = document.querySelector(".menu");
burger.addEventListener("click", function () {
  burger.classList.toggle("burger-active");
  menu.classList.toggle("menu-open");
});

const menu_items = document.querySelectorAll(".menu-item a");
for (let menu_item of menu_items) {
  menu_item.addEventListener("click", function () {
    if (menu.classList.contains("menu-open")) {
      menu.classList.remove("menu-open");
      burger.classList.remove("burger-active");
    }
  });
}
const portfolio_buttons = document.querySelector(".buttons");
let portfolio_images = document.querySelectorAll(".portfolio__images__item");
console.log(portfolio_images);
function changeImage(target) {
  if (target.classList.contains("portfolio-btn")) {
    portfolio_images.forEach((elem, index) => {
      elem.firstElementChild.src = `./assets/img/${target.dataset.season}/${
        index + 1
      }.jpg`;
    });
  }
}
portfolio_buttons.addEventListener("click", function (event) {
  for (let button of portfolio_buttons.children) {
    if (button != event.target && !button.classList.contains("portfolio-btn")) {
      button.classList.add("portfolio-btn");
    }
  }
  changeImage(event.target);
  event.target.classList.remove("portfolio-btn");
});

let lang = "en";
let theme = "dark";

function getTranslate(newLang) {
  if (newLang != lang) {
    lan_changer.firstElementChild.classList.toggle("lan-changer_picked");
    lan_changer.lastElementChild.classList.toggle("lan-changer_picked");
    let data = document.querySelectorAll("[data-i18]");
    data.forEach((elem) => {
      if (!elem.placeholder) {
        elem.textContent = i18Obj[newLang][elem.dataset.i18];
      } else {
        elem.placeholder = i18Obj[newLang][elem.dataset.i18];
        elem.textContent = "";
      }
    });
    lang = newLang;
  }
}

const lan_changer = document.querySelector(".lan-changer");
lan_changer.addEventListener("click", function (event) {
  getTranslate(event.target.textContent);
});

const theme_changer = document.querySelector(".theme");
function setTheme(newTheme) {
  if (newTheme != theme) {
    if (newTheme == "dark") {
      theme_changer.classList.remove("light-theme");
      theme_changer.classList.add("dark-theme");
      theme = "dark";
      document.documentElement.style.setProperty("--body-color", "#000");
      document.documentElement.style.setProperty("--text-color", "#fff");
      document.documentElement.style.setProperty("--hover-color", "#fff");
      document.documentElement.style.setProperty(
        "--portfolio-btn-hover",
        "inherit"
      );
      document.documentElement.style.setProperty(
        "--portfolio-btn-color",
        "#bdae82"
      );
      document.documentElement.style.setProperty("--section-title", "#bdae82");
    } else if (newTheme == "light") {
      theme_changer.classList.remove("dark-theme");
      theme_changer.classList.add("light-theme");
      theme = "light";
      document.documentElement.style.setProperty("--body-color", "#fff");
      document.documentElement.style.setProperty("--text-color", "#000");
      document.documentElement.style.setProperty("--hover-color", "#000");
      document.documentElement.style.setProperty(
        "--portfolio-btn-hover",
        "#bdae82"
      );
      document.documentElement.style.setProperty(
        "--portfolio-btn-color",
        "#000"
      );
      document.documentElement.style.setProperty("--section-title", "#000");
    }
  }
}
theme_changer.addEventListener("click", function () {
  if (theme == "dark") {
    setTheme("light");
  } else {
    setTheme("dark");
  }
});
function setLocalStorage() {
  localStorage.setItem("lang", lang);
  localStorage.setItem("theme", theme);
}
window.addEventListener("beforeunload", setLocalStorage);
function getLocalStorage() {
  if (localStorage.getItem("lang")) {
    const newlang = localStorage.getItem("lang");
    getTranslate(newlang);
  }
  if (localStorage.getItem("theme")) {
    const newtheme = localStorage.getItem("theme");
    setTheme(newtheme);
  }
}
window.addEventListener("load", getLocalStorage());

function preloadImage() {
  const seasons = ["winter", "summer", "spring", "autumn"];
  seasons.forEach((elem) => {
    for (let i = 0; i < 6; i++) {
      let img = new Image();
      img.src = `./assets/img/${elem}/${i + 1}.jpg`;
    }
  });
}

preloadImage();
console.log(
  "Ваша отметка - 85 балла(ов) Отзыв по пунктам ТЗ: Все пункты выполнены полностью!"
);
