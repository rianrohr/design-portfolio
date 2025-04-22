// Load header
fetch("/header.html")
  .then(res => res.text())
  .then(data => {
    document.getElementById("header-placeholder").innerHTML = data;
    lucide?.createIcons();
  })
  .catch(err => console.error("Header failed to load:", err));

// Load footer
fetch("/footer.html")
  .then(res => res.text())
  .then(data => {
    document.getElementById("footer-placeholder").innerHTML = data;
    lucide?.createIcons();
  })
  .catch(err => console.error("Footer failed to load:", err));


// -------------------- Scroll Progress Bar --------------------
document.addEventListener("DOMContentLoaded", () => {
  const scrollBar = document.getElementById("scroll-progress-bar");

  if (scrollBar) {
    window.addEventListener("scroll", () => {
      const scrollTop = window.scrollY;
      const docHeight = document.body.scrollHeight - window.innerHeight;
      const scrollPercent = (scrollTop / docHeight) * 100;
      scrollBar.style.width = scrollPercent + "%";
    });
  }
});

// -------------------- Fade-in on View --------------------
document.addEventListener("DOMContentLoaded", () => {
  const fadeElements = document.querySelectorAll(".fade-in");
  const observer = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1 }
  );
  fadeElements.forEach(el => observer.observe(el));
});

// -------------------- Highlight TOC on Scroll --------------------
document.addEventListener("scroll", () => {
  const sections = document.querySelectorAll("section[id]");
  const menuLinks = document.querySelectorAll("#toc-progress a");
  const scrollPos = window.scrollY + window.innerHeight / 3;

  sections.forEach(section => {
    if (
      scrollPos >= section.offsetTop &&
      scrollPos < section.offsetTop + section.offsetHeight
    ) {
      menuLinks.forEach(link => link.classList.remove("active"));
      const active = document.querySelector(`#toc-progress a[href="#${section.id}"]`);
      active?.classList.add("active");
    }
  });
});

// -------------------- Case Study Overlay: Open --------------------
document.querySelectorAll('.project-tile').forEach(tile => {
  tile.addEventListener('click', function () {
    const overlay = document.getElementById('case-study-overlay');
    const iframe = document.getElementById('overlay-iframe');
    const url = this.getAttribute('data-url'); // project URL from tile
    iframe.src = url;
    overlay.classList.remove('hidden');
  });
});

// -------------------- Case Study Overlay: Close Button --------------------
document.getElementById('close-overlay')?.addEventListener('click', () => {
  const overlay = document.getElementById('case-study-overlay');
  const iframe = document.getElementById('overlay-iframe');
  iframe.src = '';
  overlay.classList.add('hidden');
});

// -------------------- Case Study Overlay: Escape Key --------------------
document.addEventListener('keydown', function (event) {
  const overlay = document.getElementById('case-study-overlay');
  const iframe = document.getElementById('overlay-iframe');
  if (event.key === "Escape" && overlay && !overlay.classList.contains('hidden')) {
    iframe.src = '';
    overlay.classList.add('hidden');
  }
});