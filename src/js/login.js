const form = document.getElementById("loginForm");

const emailField = document.getElementById("emailField");
const passField  = document.getElementById("passField");

const emailInput = document.getElementById("email");
const passInput  = document.getElementById("password");

const emailError = document.getElementById("emailError");
const passError  = document.getElementById("passError");

const btn = document.getElementById("btnLogin");

function setError(fieldEl, errorEl, message) {
  fieldEl.classList.add("is-error");
  errorEl.textContent = message;

  // Reinicia la animación (por si el usuario dispara el error repetidas veces)
  const input = fieldEl.querySelector("input");
  input.style.animation = "none";
  // eslint-disable-next-line no-unused-expressions
  input.offsetHeight; // reflow
  input.style.animation = "";
}

function clearError(fieldEl, errorEl) {
  fieldEl.classList.remove("is-error");
  errorEl.textContent = "";
}

// Validación simple: requiere @ y (opcional) un punto después
function isValidEmailBasic(value) {
  const v = value.trim();
  if (!v.includes("@")) return false;

  const parts = v.split("@");
  if (parts.length !== 2) return false;
  if (parts[0].length === 0) return false;
  if (parts[1].length < 3) return false;
  if (!parts[1].includes(".")) return false;

  return true;
}

emailInput.addEventListener("input", () => {
  // Validación “en vivo” pero suave (solo si ya hubo error o si hay algo escrito)
  if (emailField.classList.contains("is-error") || emailInput.value.length > 0) {
    if (isValidEmailBasic(emailInput.value)) {
      clearError(emailField, emailError);
    }
  }
});

passInput.addEventListener("input", () => {
  if (passField.classList.contains("is-error") && passInput.value.trim().length >= 6) {
    clearError(passField, passError);
  }
});

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const email = emailInput.value.trim();
  const pass  = passInput.value;

  let ok = true;

  // Email
  if (!isValidEmailBasic(email)) {
    setError(emailField, emailError, "Ingresa un correo válido (ej: nombre@dominio.com).");
    ok = false;
  } else {
    clearError(emailField, emailError);
  }

  // Password
  if (pass.trim().length < 6) {
    setError(passField, passError, "La contraseña debe tener al menos 6 caracteres.");
    ok = false;
  } else {
    clearError(passField, passError);
  }

  if (!ok) return;

  // Simulación de login (loading)
  btn.classList.add("is-loading");

  setTimeout(() => {
    btn.classList.remove("is-loading");

    // Aquí reemplazas por tu lógica real:
    // - fetch a tu API
    // - validar credenciales
    // - guardar token
    // - redirect
    alert("Login OK (demo). Conecta esto a tu backend cuando esté listo.");
  }, 900);
});
