"use strict";

const header = document.querySelector(".header");
const showcase = document.querySelector(".showcase");
const content = document.querySelector(".content");
const login = document.querySelector(".sign-login");
const logo = document.getElementById("logo");
const btnSign = document.getElementById("sing-up");
const overlay = document.querySelector(".overlay");
const modal = document.querySelector(".modal");

const tl = new TimelineLite();
const b = new TimelineLite({ paused: true });

tl.fromTo(
  showcase,
  0.6,
  { height: "0%", opacity: 0 },
  { height: "83%", opacity: 1 }
)

  .fromTo(showcase, 0.4, { width: "100%" }, { width: "75%" })
  .fromTo(content, 1, { opacity: 0 }, { opacity: 1 })
  .fromTo(logo, 1, { x: "-100%", opacity: 0 }, { x: "0%", opacity: 1 }, "-=1")
  .fromTo(login, 1, { y: "-100%", opacity: 0 }, { y: "0%", opacity: 1 }, "-=1");

btnSign.addEventListener("click", function (e) {
  overlay.classList.remove("hide");
  modal.classList.remove("hide");
  overlay.classList.add("show");
  modal.classList.add("show");
});
overlay.addEventListener("click", function (e) {
  overlay.classList.remove("show");
  modal.classList.remove("show");
  overlay.classList.add("hide");
  modal.classList.add("hide");
});
