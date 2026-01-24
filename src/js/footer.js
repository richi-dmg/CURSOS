fetch("/public/footer.html")
  .then(response => response.text())
  .then(html => {
    document.getElementById("footer-container").innerHTML = html;
  })
  .catch(error => console.error("Error loading footer:", error));

  /* =========================
   CONFIG: Cursos del footer
   =========================
   Edita SOLO este arreglo
*/
const FOOTER_COURSES = [
  { text: "Excel desde cero", href: "curso-excel.html" },
  { text: "Power BI básico", href: "curso-powerbi.html" },
  { text: "Introducción a SQL", href: "curso-sql.html" },
  { text: "Ciberseguridad esencial", href: "curso-ciberseguridad.html" },
];

/* =========================
   INIT FOOTER
   ========================= */
document.addEventListener("DOMContentLoaded", () => {

  /* ---------- Año automático ---------- */
  const yearEl = document.getElementById("year");
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }

  /* ---------- Render cursos ---------- */
  const list = document.getElementById("footerCoursesList");
  if (!list) return;

  // Si no hay cursos, elimina la columna completa
  if (!Array.isArray(FOOTER_COURSES) || FOOTER_COURSES.length === 0) {
    list.closest(".footer-col")?.remove();
    return;
  }

  list.innerHTML = "";

  FOOTER_COURSES.forEach((course) => {
    const li = document.createElement("li");
    const a = document.createElement("a");

    a.textContent = course.text;
    a.href = course.href;

    li.appendChild(a);
    list.appendChild(li);
  });
});
