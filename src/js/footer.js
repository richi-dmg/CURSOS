/* =========================
   CONFIG: Cursos del footer
========================= */
const FOOTER_COURSES = [
  { text: "Data & Automatización", href: "curso-data.html" },
  { text: "Desarrollo Web Full Stack", href: "curso-fullstack.html" },
  { text: "JavaScript desde Básico a Intermedio", href: "curso-js.html" },
  { text: "Python para Principiante", href: "curso-python.html" },
  { text: "Programación Web", href: "curso-web.html" },
  { text: "UX/UI Design", href: "curso-ux-ui.html" },
];

function initFooter() {
  // Año automático
  const yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // Render cursos
  const list = document.getElementById("footerCoursesList");
  if (!list) {
    console.warn("No se encontró #footerCoursesList (¿está dentro de footer.html?)");
    return;
  }

  if (!Array.isArray(FOOTER_COURSES) || FOOTER_COURSES.length === 0) {
    list.closest(".footer-col")?.remove();
    return;
  }

  list.innerHTML = "";
  for (const course of FOOTER_COURSES) {
    const li = document.createElement("li");
    const a = document.createElement("a");
    a.textContent = course.text;
    a.href = course.href;
    li.appendChild(a);
    list.appendChild(li);
  }
}

// Cargar footer e inicializar al terminar
fetch("/public/footer.html")
  .then((r) => {
    if (!r.ok) throw new Error(`HTTP ${r.status} al cargar footer.html`);
    return r.text();
  })
  .then((html) => {
    const container = document.getElementById("footer-container");
    if (!container) throw new Error("No existe #footer-container en el HTML");
    container.innerHTML = html;

    // IMPORTANTÍSIMO: inicializar DESPUÉS de inyectar el footer
    initFooter();
  })
  .catch((err) => console.error("Error loading footer:", err));
