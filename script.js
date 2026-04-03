// ===== NAVBAR SCROLL EFFECT =====
const navbar = document.getElementById("navbar");

window.addEventListener("scroll", () => {
  navbar.classList.toggle("scrolled", window.scrollY > 50);
});

// ===== MOBILE NAV TOGGLE =====
const navToggle = document.getElementById("navToggle");
const navLinks = document.getElementById("navLinks");

navToggle.addEventListener("click", () => {
  navToggle.classList.toggle("open");
  navLinks.classList.toggle("open");
});

// Close mobile nav on link click
navLinks.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    navToggle.classList.remove("open");
    navLinks.classList.remove("open");
  });
});

// ===== ACTIVE NAV LINK ON SCROLL =====
const sections = document.querySelectorAll("section[id]");

function updateActiveLink() {
  const scrollY = window.scrollY + 200;
  sections.forEach((section) => {
    const top = section.offsetTop;
    const height = section.offsetHeight;
    const id = section.getAttribute("id");
    const link = document.querySelector(`.nav-links a[href="#${id}"]`);
    if (link) {
      link.classList.toggle("active", scrollY >= top && scrollY < top + height);
    }
  });
}

window.addEventListener("scroll", updateActiveLink);

// ===== TYPING EFFECT =====
const roles = [
  "Développeur Web",
  "Passionné du code",
  "Créateur de solutions",
  "En veille technologique",
];

const typedRole = document.getElementById("typedRole");
let roleIndex = 0;
let charIndex = 0;
let isDeleting = false;

function typeRole() {
  const current = roles[roleIndex];

  if (isDeleting) {
    typedRole.textContent = current.substring(0, charIndex - 1);
    charIndex--;
  } else {
    typedRole.textContent = current.substring(0, charIndex + 1);
    charIndex++;
  }

  let speed = isDeleting ? 40 : 80;

  if (!isDeleting && charIndex === current.length) {
    speed = 2000;
    isDeleting = true;
  } else if (isDeleting && charIndex === 0) {
    isDeleting = false;
    roleIndex = (roleIndex + 1) % roles.length;
    speed = 500;
  }

  setTimeout(typeRole, speed);
}

typeRole();

// ===== COUNTER ANIMATION =====
function animateCounters() {
  const counters = document.querySelectorAll(".stat-number");

  counters.forEach((counter) => {
    if (counter.dataset.animated) return;

    const target = parseInt(counter.dataset.count);
    const duration = 1500;
    const start = performance.now();

    function update(now) {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      counter.textContent = Math.floor(eased * target);

      if (progress < 1) {
        requestAnimationFrame(update);
      } else {
        counter.textContent = target;
        counter.dataset.animated = "true";
      }
    }

    requestAnimationFrame(update);
  });
}

// ===== SKILL BARS ANIMATION =====
function animateSkillBars() {
  const bars = document.querySelectorAll(".skill-progress");
  bars.forEach((bar) => {
    if (bar.dataset.animated) return;
    const width = bar.dataset.width;
    bar.style.width = width + "%";
    bar.dataset.animated = "true";
  });
}

// ===== SCROLL ANIMATIONS (Intersection Observer) =====
const observerOptions = {
  threshold: 0.15,
  rootMargin: "0px 0px -50px 0px",
};

// Observe sections for fade-in
const fadeElements = document.querySelectorAll(
  ".about-grid, .skill-category, .project-card, .timeline-item, .contact-card, .contact-form, .section-header",
);

fadeElements.forEach((el) => el.classList.add("fade-in"));

const fadeObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
    }
  });
}, observerOptions);

fadeElements.forEach((el) => fadeObserver.observe(el));

// Observe specific sections for animations
const statsSection = document.querySelector(".hero-stats");
const skillsSection = document.querySelector(".skills");

const sectionObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        if (entry.target === statsSection) animateCounters();
        if (entry.target === skillsSection) animateSkillBars();
      }
    });
  },
  { threshold: 0.3 },
);

if (statsSection) sectionObserver.observe(statsSection);
if (skillsSection) sectionObserver.observe(skillsSection);

// ===== PROJECT FILTERS =====
const filterButtons = document.querySelectorAll(".filter-btn");
const projectCards = document.querySelectorAll(".project-card");

filterButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    const filter = btn.dataset.filter;

    filterButtons.forEach((b) => b.classList.remove("active"));
    btn.classList.add("active");

    projectCards.forEach((card) => {
      if (filter === "all" || card.dataset.category === filter) {
        card.classList.remove("hidden");
        card.style.animation = "fadeInUp 0.5s ease-out forwards";
      } else {
        card.classList.add("hidden");
      }
    });
  });
});

// ===== CONTACT FORM =====
const contactForm = document.getElementById("contactForm");

contactForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const btn = contactForm.querySelector('button[type="submit"]');
  const originalText = btn.textContent;
  btn.textContent = "Message envoyé !";
  btn.style.background = "var(--accent-secondary)";

  setTimeout(() => {
    btn.textContent = originalText;
    btn.style.background = "";
    contactForm.reset();
  }, 3000);
});

// ===== SMOOTH SCROLL FOR ANCHORS =====
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", (e) => {
    e.preventDefault();
    const target = document.querySelector(anchor.getAttribute("href"));
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
    }
  });
});
