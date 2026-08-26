/* =========================================================
   EDIT THIS ARRAY — one object per project.
   This is the only part of the file most people need to touch.

   Fields:
     title       (string, required)
     tagline     (string) short one-liner, shown in mono under the title
     description (string) 2-4 sentences
     stack       (array of strings) tech tags
     image       (string) path to a screenshot, e.g. "media/project1.jpg"
     video       (string, optional) path to an MP4 demo clip, e.g. "media/project1.mp4"
     youtube     (string, optional) a YouTube video ID (use instead of `video`)
     gallery     (array of strings, optional) extra screenshot paths for a
                 mini photo strip under the main viewport (click to enlarge)
     links       ({ github, demo }) either can be omitted

   Leave `image`/`video` as "" to show a placeholder frame — useful while
   you're still building the site and don't have media yet.
========================================================= */
const PROJECTS = [
  {
    title: "Project One",
    tagline: "One line describing what it does and for whom.",
    description:
      "Two or three sentences on the problem, your approach, and the result. " +
      "Mention your specific role if this was a team project.",
    stack: ["React", "Node.js", "PostgreSQL"],
    image: "", // e.g. "media/project1.jpg"
    video: "", // e.g. "media/project1.mp4"
    youtube: "", // e.g. "dQw4w9WgXcQ"
    gallery: [], // e.g. ["media/project1-2.jpg", "media/project1-3.jpg"]
    links: {
      github: "https://github.com/tyler-eclipse/project-one",
      demo: "",
    },
  },
  {
    title: "Project Two",
    tagline: "One line describing what it does and for whom.",
    description:
      "Two or three sentences on the problem, your approach, and the result. " +
      "Concrete numbers (users, latency, test coverage) read as credible.",
    stack: ["Python", "Flask", "Docker"],
    image: "",
    video: "",
    youtube: "",
    gallery: [],
    links: {
      github: "https://github.com/tyler-eclipse/project-two",
      demo: "",
    },
  },
  {
    title: "Project Three",
    tagline: "One line describing what it does and for whom.",
    description:
      "Two or three sentences on the problem, your approach, and the result. " +
      "What made this one interesting or hard?",
    stack: ["Java", "Spring Boot"],
    image: "",
    video: "",
    youtube: "",
    gallery: [],
    links: {
      github: "https://github.com/tyler-eclipse/project-three",
      demo: "",
    },
  },
];

/* =========================================================
   RENDERING — you shouldn't need to edit below this line.
========================================================= */

const placeholderSVG = `
  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M3 5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5Z" stroke="currentColor" stroke-width="1.2"/>
    <circle cx="8.5" cy="9" r="1.5" stroke="currentColor" stroke-width="1.2"/>
    <path d="m4 17 5-5 3 3 4-5 4 5" stroke="currentColor" stroke-width="1.2" stroke-linejoin="round"/>
  </svg>`;

const playSVG = `
  <svg viewBox="0 0 60 60"><circle cx="30" cy="30" r="27"/><path d="M25 20l17 10-17 10V20z"/></svg>`;

function figureNumber(i) {
  return String(i + 1).padStart(2, "0");
}

function renderViewport(project, index) {
  const hasVideo = project.video || project.youtube;

  if (hasVideo) {
    let mediaTag = "";
    if (project.youtube) {
      mediaTag = `<iframe class="figure__yt" width="100%" height="100%" style="border:0;display:none"
        src="https://www.youtube.com/embed/${project.youtube}?autoplay=1"
        allow="autoplay; encrypted-media" allowfullscreen></iframe>`;
    } else {
      mediaTag = `<video controls preload="metadata" style="display:none"
        ${project.image ? `poster="${project.image}"` : ""}>
        <source src="${project.video}" type="video/mp4">
      </video>`;
    }

    const posterInner = project.image
      ? `<img src="${project.image}" alt="${project.title} preview">`
      : `<div class="figure__placeholder">${placeholderSVG}<span>DEMO VIDEO — add a video or YouTube ID in script.js</span></div>`;

    return `
      <div class="figure__viewport" data-video-wrap>
        <span class="figure__badge">FIG. ${figureNumber(index)} — DEMO</span>
        ${posterInner}
        ${mediaTag}
        <button class="figure__play" aria-label="Play demo video" data-play-btn>
          ${playSVG}
        </button>
        <span class="vp-tick vp-tick--tl"></span>
        <span class="vp-tick vp-tick--br"></span>
      </div>`;
  }

  if (project.image) {
    return `
      <div class="figure__viewport">
        <span class="figure__badge">FIG. ${figureNumber(index)}</span>
        <img src="${project.image}" alt="${project.title} screenshot" data-lightbox-trigger data-src="${project.image}">
        <span class="vp-tick vp-tick--tl"></span>
        <span class="vp-tick vp-tick--br"></span>
      </div>`;
  }

  return `
    <div class="figure__viewport">
      <span class="figure__badge">FIG. ${figureNumber(index)}</span>
      <div class="figure__placeholder">
        ${placeholderSVG}
        <span>SCREENSHOT — add an image path in script.js</span>
      </div>
      <span class="vp-tick vp-tick--tl"></span>
      <span class="vp-tick vp-tick--br"></span>
    </div>`;
}

function renderThumbs(project) {
  if (!project.gallery || project.gallery.length === 0) return "";
  const allImages = [project.image, ...project.gallery].filter(Boolean);
  const thumbs = allImages
    .map(
      (src) =>
        `<button data-lightbox-trigger data-src="${src}"><img src="${src}" alt="${project.title} thumbnail"></button>`
    )
    .join("");
  return `<div class="figure__thumbs">${thumbs}</div>`;
}

function renderLinks(project) {
  const links = [];
  if (project.links?.github)
    links.push(`<a href="${project.links.github}" target="_blank" rel="noopener">Source ↗</a>`);
  if (project.links?.demo)
    links.push(`<a href="${project.links.demo}" target="_blank" rel="noopener">Live demo ↗</a>`);
  return links.length ? `<div class="figure__links">${links.join("")}</div>` : "";
}

function renderProject(project, index) {
  const stackChips = project.stack.map((s) => `<span class="chip">${s}</span>`).join("");
  return `
    <article class="figure">
      <div>
        ${renderViewport(project, index)}
        ${renderThumbs(project)}
      </div>
      <div class="figure__body">
        <p class="figure__num">FIGURE ${figureNumber(index)}</p>
        <h3 class="figure__title">${project.title}</h3>
        <p class="figure__tagline">${project.tagline}</p>
        <p class="figure__desc">${project.description}</p>
        <div class="chip-row">${stackChips}</div>
        ${renderLinks(project)}
      </div>
    </article>`;
}

function renderAllProjects() {
  const container = document.getElementById("projectList");
  container.innerHTML = PROJECTS.map(renderProject).join("");
  wireUpVideos(container);
  wireUpLightboxTriggers(container);
  observeFigures(container);
}

/* ---- Video play buttons: swap poster/placeholder for real media on click ---- */
function wireUpVideos(container) {
  container.querySelectorAll("[data-play-btn]").forEach((btn) => {
    btn.addEventListener("click", () => {
      const wrap = btn.closest("[data-video-wrap]");
      const media = wrap.querySelector("video, .figure__yt");
      const poster = wrap.querySelector("img, .figure__placeholder");
      if (poster) poster.style.display = "none";
      btn.style.display = "none";
      if (media) {
        media.style.display = "block";
        if (media.tagName === "VIDEO") media.play().catch(() => {});
      }
    });
  });
}

/* ---- Lightbox for photo galleries ---- */
const lightbox = document.getElementById("lightbox");
const lightboxImg = document.getElementById("lightboxImg");
let lightboxSet = [];
let lightboxIndex = 0;

function wireUpLightboxTriggers(container) {
  container.querySelectorAll("[data-lightbox-trigger]").forEach((el) => {
    el.addEventListener("click", () => {
      const figure = el.closest(".figure");
      lightboxSet = Array.from(figure.querySelectorAll("[data-lightbox-trigger]")).map(
        (n) => n.dataset.src
      );
      lightboxIndex = lightboxSet.indexOf(el.dataset.src);
      openLightbox();
    });
  });
}

function openLightbox() {
  lightboxImg.src = lightboxSet[lightboxIndex];
  lightbox.classList.add("is-open");
  lightbox.setAttribute("aria-hidden", "false");
}
function closeLightbox() {
  lightbox.classList.remove("is-open");
  lightbox.setAttribute("aria-hidden", "true");
}
function stepLightbox(delta) {
  lightboxIndex = (lightboxIndex + delta + lightboxSet.length) % lightboxSet.length;
  lightboxImg.src = lightboxSet[lightboxIndex];
}

document.getElementById("lightboxClose").addEventListener("click", closeLightbox);
document.getElementById("lightboxPrev").addEventListener("click", () => stepLightbox(-1));
document.getElementById("lightboxNext").addEventListener("click", () => stepLightbox(1));
lightbox.addEventListener("click", (e) => {
  if (e.target === lightbox) closeLightbox();
});
document.addEventListener("keydown", (e) => {
  if (!lightbox.classList.contains("is-open")) return;
  if (e.key === "Escape") closeLightbox();
  if (e.key === "ArrowLeft") stepLightbox(-1);
  if (e.key === "ArrowRight") stepLightbox(1);
});

/* ---- Scroll reveal ---- */
function observeFigures(container) {
  const items = container.querySelectorAll(".figure");
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          io.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15 }
  );
  items.forEach((item) => io.observe(item));
}

/* ---- Mobile nav ---- */
const navBurger = document.getElementById("navBurger");
const navMobile = document.getElementById("navMobile");
navBurger.addEventListener("click", () => {
  const open = navMobile.classList.toggle("is-open");
  navBurger.setAttribute("aria-expanded", String(open));
});
navMobile.querySelectorAll("a").forEach((a) =>
  a.addEventListener("click", () => {
    navMobile.classList.remove("is-open");
    navBurger.setAttribute("aria-expanded", "false");
  })
);

/* ---- Init ---- */
renderAllProjects();
