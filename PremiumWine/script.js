const title = document.querySelector(".title");
const titleParagraph = document.querySelector(".title-para");
const titleLink = document.querySelector(".link-find");

const circle = document.querySelector(".circle");

const tl = new TimelineLite();

tl.fromTo(
  circle,
  1.5,
  { transform: "scale(0.1)", opacity: 0 },
  { transform: "scale(1)", opacity: 1 }
)
  .fromTo(title, 1, { y: "15rem", opacity: 0 }, { y: "0", opacity: 1 }, "-=0.5")
  .fromTo(
    titleParagraph,
    1,
    { y: "15rem", opacity: 0 },
    { y: "0", opacity: 1 },
    "-=0.5"
  )
  .fromTo(
    titleLink,
    1,
    { y: "15rem", opacity: 0 },
    { y: "0", opacity: 1 },
    "-=0.7"
  );
