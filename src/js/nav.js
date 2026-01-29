/* =========================
   CONFIG: Cursos (editar aquí)
   ========================= */
const NAV_COURSES = [
  { text: "Data & Automatización", href: "curso-data.html" },
  { text: "Desarrollo Web Full Stack", href: "curso-fullstack.html" },
  { text: "JavaScript desde Básico a Intermedio", href: "curso-js.html" },
  { text: "Python para Principiante", href: "curso-python.html" },
  { text: "Programación Web", href: "curso-web.html" },
  { text: "UX/UI Design", href: "curso-ux-ui.html" },
];

fetch("/public/nav.html")
  .then((response) => response.text())
  .then((html) => {
    const container = document.getElementById("nav-container");
    if (!container) return;
    container.innerHTML = html;

    // ✅ CLAVE: inicializar DESPUÉS de inyectar
    initNav();
  })
  .catch((error) => console.error("Error loading navigation:", error));

function initNav() {
  const $ = (id) => document.getElementById(id);

  // Render cursos (desktop + móvil)
  const renderCourses = (ul) => {
    if (!ul) return;
    ul.innerHTML = "";
    NAV_COURSES.forEach((c) => {
      const li = document.createElement("li");
      const a = document.createElement("a");
      a.textContent = c.text;
      a.href = c.href;
      li.appendChild(a);
      ul.appendChild(li);
    });
  };

  renderCourses($("coursesMenu"));
  renderCourses($("drawerCoursesMenu"));

  // Dropdowns desktop (click)
  const aboutDropdown = $("aboutDropdown");
  const aboutBtn = $("aboutBtn");
  const coursesDropdown = $("coursesDropdown");
  const coursesBtn = $("coursesBtn");

  const closeDesktopDropdowns = () => {
    if (aboutDropdown) aboutDropdown.classList.remove("open");
    if (aboutBtn) aboutBtn.setAttribute("aria-expanded", "false");
    if (coursesDropdown) coursesDropdown.classList.remove("open");
    if (coursesBtn) coursesBtn.setAttribute("aria-expanded", "false");
  };

  const toggleDesktopDropdown = (dd, btn) => {
    if (!dd || !btn) return;
    const willOpen = !dd.classList.contains("open");
    closeDesktopDropdowns();
    if (willOpen) {
      dd.classList.add("open");
      btn.setAttribute("aria-expanded", "true");
    }
  };

  if (aboutBtn) {
    aboutBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      toggleDesktopDropdown(aboutDropdown, aboutBtn);
    });
  }

  if (coursesBtn) {
    coursesBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      toggleDesktopDropdown(coursesDropdown, coursesBtn);
    });
  }

  // No cerrar si haces click dentro del dropdown desktop
  document.querySelectorAll(".dropdown").forEach((menu) => {
    menu.addEventListener("click", (e) => e.stopPropagation());
  });

  document.addEventListener("click", closeDesktopDropdowns);

  // Drawer móvil
  const navToggle = $("navToggle");
  const drawer = $("navDrawer");
  const overlay = $("overlay");
  const drawerClose = $("drawerClose");

  const openDrawer = () => {
    if (!drawer || !overlay || !navToggle) return;
    drawer.classList.add("open");
    overlay.hidden = false;
    drawer.setAttribute("aria-hidden", "false");
    navToggle.setAttribute("aria-expanded", "true");
    document.body.style.overflow = "hidden";
  };

  const closeDrawer = () => {
    if (!drawer || !overlay || !navToggle) return;
    drawer.classList.remove("open");
    overlay.hidden = true;
    drawer.setAttribute("aria-hidden", "true");
    navToggle.setAttribute("aria-expanded", "false");
    document.body.style.overflow = "";
  };

  if (navToggle) navToggle.addEventListener("click", openDrawer);
  if (drawerClose) drawerClose.addEventListener("click", closeDrawer);
  if (overlay) overlay.addEventListener("click", closeDrawer);

  // Acordeones móvil
  const drawerAboutBtn = $("drawerAboutBtn");
  const drawerAboutAcc = $("drawerAboutAccordion");
  const drawerCoursesBtn = $("drawerCoursesBtn");
  const drawerCoursesAcc = $("drawerCoursesAccordion");

  const toggleAcc = (acc, btn) => {
    if (!acc || !btn) return;
    const isOpen = acc.classList.toggle("open");
    btn.setAttribute("aria-expanded", String(isOpen));
  };

  if (drawerAboutBtn && drawerAboutAcc) {
    drawerAboutBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      toggleAcc(drawerAboutAcc, drawerAboutBtn);
    });
  }

  if (drawerCoursesBtn && drawerCoursesAcc) {
    drawerCoursesBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      toggleAcc(drawerCoursesAcc, drawerCoursesBtn);
    });
  }

  // Links dentro del drawer: cerrar al navegar
  document.querySelectorAll(".drawer-sublist a").forEach((a) => {
    a.addEventListener("click", (e) => {
      e.stopPropagation();
      closeDrawer();
    });
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      closeDesktopDropdowns();
      closeDrawer();
    }
  });
}

