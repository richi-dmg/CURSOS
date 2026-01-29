const form = document.getElementById("contactForm");
const btn = document.getElementById("btnSend");
const toast = document.getElementById("toast");

const fields = {
  name: { wrap: document.getElementById("nameField"), el: document.getElementById("nombre"), err: document.getElementById("nameError") },
  email:{ wrap: document.getElementById("emailField"), el: document.getElementById("email"), err: document.getElementById("emailError") },
  pais: { wrap: document.getElementById("countryField"), el: document.getElementById("pais"), err: document.getElementById("paisError") },
  paisOtro: { wrap: document.getElementById("otherCountryField"), el: document.getElementById("paisOtro"), err: document.getElementById("paisOtroError") },
  phone:{ wrap: document.getElementById("phoneField"), el: document.getElementById("telefono"), err: document.getElementById("phoneError") },
  course:{ wrap: document.getElementById("courseField"), el: document.getElementById("curso"), err: document.getElementById("courseError") },
  msg:  { wrap: document.getElementById("msgField"), el: document.getElementById("mensaje"), err: document.getElementById("msgError") },
};

function setError(wrap, errEl, msg){
  wrap.classList.add("is-error");
  errEl.textContent = msg;

  const control = wrap.querySelector("input, textarea, select");
  if (control){
    control.style.animation = "none";
    // reflow para reiniciar animación
    // eslint-disable-next-line no-unused-expressions
    control.offsetHeight;
    control.style.animation = "";
  }
}

function clearError(wrap, errEl){
  wrap.classList.remove("is-error");
  errEl.textContent = "";
}

function showToast(message){
  toast.textContent = message;
  toast.classList.add("show");
  clearTimeout(showToast._t);
  showToast._t = setTimeout(() => toast.classList.remove("show"), 2600);
}

// Email básico
function isValidEmailBasic(value){
  const v = value.trim();
  if (!v.includes("@")) return false;
  const parts = v.split("@");
  if (parts.length !== 2) return false;
  if (!parts[0]) return false;
  if (!parts[1] || parts[1].length < 3) return false;
  if (!parts[1].includes(".")) return false;
  return true;
}

// Detecta país por timezone/language
function detectCountrySuggestion(){
  const tz = Intl.DateTimeFormat().resolvedOptions().timeZone || "";
  const lang = navigator.language || "";

  // Si estás en America/Lima, default Perú
  if (tz === "America/Lima") return "Perú";

  // Heurísticas suaves por idioma (no perfecto)
  if (lang.startsWith("es-PE")) return "Perú";
  if (lang.startsWith("es-CL")) return "Chile";
  if (lang.startsWith("es-CO")) return "Colombia";
  if (lang.startsWith("es-EC")) return "Ecuador";
  if (lang.startsWith("es-MX")) return "México";
  if (lang.startsWith("es-ES")) return "España";
  if (lang.startsWith("es-AR")) return "Argentina";
  if (lang.startsWith("en-US")) return "Estados Unidos";

  return "Otro";
}

function applyCountryAuto(){
  const suggested = detectCountrySuggestion();
  const select = fields.pais.el;

  const exists = [...select.options].some(o => o.value === suggested);
  select.value = exists ? suggested : "Otro";
  toggleOtherCountry(select.value === "Otro");

  if (suggested !== "Otro" && exists){
    showToast(`País detectado: ${suggested}`);
  }
}

function toggleOtherCountry(show){
  fields.paisOtro.wrap.hidden = !show;
  if (!show){
    fields.paisOtro.el.value = "";
    clearError(fields.paisOtro.wrap, fields.paisOtro.err);
  }
}

// Eventos
fields.pais.el.addEventListener("change", () => {
  toggleOtherCountry(fields.pais.el.value === "Otro");
  clearError(fields.pais.wrap, fields.pais.err);
});

fields.email.el.addEventListener("input", () => {
  if (fields.email.wrap.classList.contains("is-error") && isValidEmailBasic(fields.email.el.value)){
    clearError(fields.email.wrap, fields.email.err);
  }
});

fields.name.el.addEventListener("input", () => {
  if (fields.name.wrap.classList.contains("is-error") && fields.name.el.value.trim().length >= 2){
    clearError(fields.name.wrap, fields.name.err);
  }
});

fields.course.el.addEventListener("change", () => {
  if (fields.course.wrap.classList.contains("is-error") && fields.course.el.value){
    clearError(fields.course.wrap, fields.course.err);
  }
});

fields.msg.el.addEventListener("input", () => {
  if (fields.msg.wrap.classList.contains("is-error") && fields.msg.el.value.trim().length >= 10){
    clearError(fields.msg.wrap, fields.msg.err);
  }
});

// Submit
form.addEventListener("submit", (e) => {
  e.preventDefault();

  let ok = true;

  const nombre = fields.name.el.value.trim();
  const email = fields.email.el.value.trim();
  const pais = fields.pais.el.value;
  const paisOtro = fields.paisOtro.el.value.trim();
  const curso = fields.course.el.value;
  const msg = fields.msg.el.value.trim();

  if (nombre.length < 2){
    setError(fields.name.wrap, fields.name.err, "Escribe tu nombre (mínimo 2 caracteres).");
    ok = false;
  } else clearError(fields.name.wrap, fields.name.err);

  if (!isValidEmailBasic(email)){
    setError(fields.email.wrap, fields.email.err, "Correo inválido (ej: nombre@dominio.com).");
    ok = false;
  } else clearError(fields.email.wrap, fields.email.err);

  if (!pais){
    setError(fields.pais.wrap, fields.pais.err, "Selecciona tu país.");
    ok = false;
  } else clearError(fields.pais.wrap, fields.pais.err);

  if (pais === "Otro" && paisOtro.length < 2){
    setError(fields.paisOtro.wrap, fields.paisOtro.err, "Especifica tu país.");
    ok = false;
  } else clearError(fields.paisOtro.wrap, fields.paisOtro.err);

  if (!curso){
    setError(fields.course.wrap, fields.course.err, "Elige el curso de interés.");
    ok = false;
  } else clearError(fields.course.wrap, fields.course.err);

  if (msg.length < 10){
    setError(fields.msg.wrap, fields.msg.err, "Cuéntanos un poco más (mínimo 10 caracteres).");
    ok = false;
  } else clearError(fields.msg.wrap, fields.msg.err);

  if (!ok) return;

  // Demo de envío
  btn.classList.add("is-loading");

  setTimeout(() => {
    btn.classList.remove("is-loading");
    showToast("Mensaje enviado (demo). Conecta esto a tu backend cuando quieras.");
    form.reset();
    toggleOtherCountry(false);
    applyCountryAuto(); // vuelve a sugerir país
  }, 900);
});

// Auto país al cargar
applyCountryAuto();
