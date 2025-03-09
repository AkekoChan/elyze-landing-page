import { gsap } from "gsap";
import SplitType from "split-type";

const DOM = {
  header: {
    logo: {
      img: document.querySelector(".header-logo__img"),
      text: document.querySelector(".header-logo__text"),
    },
    link: document.querySelector(".header-link"),
  },
  hero: {
    title: document.querySelector(".hero-title"),
    text: document.querySelector(".hero-cta__text"),
    link: document.querySelector(".hero-cta__download"),
  },
  background: {
    logo: document.querySelector(".background-logo"),
    lines: document.querySelector(".background-line"),
  },
};

const revealHeader = () => {
  const { img, text } = DOM.header.logo;
  const { link } = DOM.header;

  const tlHeader = gsap.timeline({ ease: "power2.out" });

  tlHeader
    .from(img, {
      rotation: -145,
      x: -40,
      duration: 0.8,
    })
    .from(
      text,
      {
        y: 20,
        opacity: 0,
        duration: 0.6,
      },
      ">-0.2"
    )
    .fromTo(
      link,
      {
        y: 20,
        opacity: 0,
      },
      { y: 0, opacity: 1, duration: 0.4 },
      ">-0.2"
    );
};

const revealHero = () => {
  const { title, link, text } = DOM.hero;

  if (!title || !link || !text) return;

  const split = new SplitType(title, { split: "lines" });

  const tlHero = gsap.timeline({ ease: "power2.out", delay: 0.4 });

  tlHero
    .from(split.lines, {
      duration: 1.2,
      y: 200,
      opacity: 0,
      stagger: 0.2,
    })
    .from(text, {
      duration: 0.4,
      x: 20,
      opacity: 0,
    })
    .fromTo(
      link,
      {
        y: 20,
        opacity: 0,
      },
      { y: 0, opacity: 1, duration: 0.4 }
    );
};

const revealBackground = () => {
  const { logo, lines } = DOM.background;

  if (!logo || !lines) return;

  const paths = lines.querySelectorAll("path");

  console.log(paths);

  const tlBackground = gsap.timeline({ ease: "power2.out", delay: 0.4 });

  tlBackground.fromTo(
    logo,
    {
      y: 200,
      rotate: -90,
    },
    {
      y: -200,
      rotate: -25,
      duration: 1,
    },
    ">-0.2"
  );

  paths.forEach((path) => {
    const length = path.getTotalLength();

    path.style.strokeDasharray = length;
    path.style.strokeDashoffset = length;

    tlBackground.to(path, {
      strokeDashoffset: 0,
      duration: 0.6,
    });
  });
};

const init = () => {
  revealHeader();
  revealHero();
  revealBackground();
};

document.addEventListener("DOMContentLoaded", init);
