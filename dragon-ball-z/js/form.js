const form = document.getElementById("contactForm");

form.addEventListener("submit", e => {
  e.preventDefault();
  const nombre = form.nombre.value.trim();
  const email = form.email.value.trim();
  const mensaje = form.mensaje.value.trim();
  // Validaciones simples
  if (!nombre || !email || !mensaje) {
    alert("⚠️ Por favor, completá todos los campos obligatorios.");
    return;
  }
  // Validación email básica
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    alert("⚠️ Ingresá un correo electrónico válido.");
    return;
  }
  alert(`✅ Gracias, ${nombre}. Tu mensaje fue enviado con éxito.`);
  form.reset();
});
