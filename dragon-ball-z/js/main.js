import { obtenerPersonajes } from "./api.js";
import { renderizarPersonajes } from "./render.js";

const teamAContainer = document.getElementById("teamA");
const teamBContainer = document.getElementById("teamB");
const loader = document.getElementById("loader");
const errorMsg = document.getElementById("error");
const result = document.getElementById("result");
const newBattleBtn = document.getElementById("newBattle");

let personajes = [];

async function iniciar() {
  try {
    loader.style.display = "block";
    const data = await obtenerPersonajes();
    personajes = data;
    generarBatalla();
  } catch (err) {
    console.error(err);
    errorMsg.textContent = "Hubo un problema al cargar los personajes.";
  } finally {
    loader.style.display = "none";
  }
}

/*  |-- parseKi --|
    Convierte cualquier valor de 'ki' a número entero.
    - Quita espacios, puntos y comas usados como separador de miles.
    - Extrae dígitos y signo si hay.
    - Si no hay número válido devuelve 0.
*/
function parseKi(kiValue) {
  if (!kiValue) return 0;
  // Si ya es número, devolvemos el entero
  if (typeof kiValue === "number" && !Number.isNaN(kiValue)) return Math.floor(kiValue);
  let s = String(kiValue).trim().toLowerCase();
  // Si es "unknown", "?" o "-", lo tratamos como 0
  if (["unknown", "?", "-", "none", ""].includes(s)) return 0;
  // Tabla de multiplicadores
  const magnitudes = {
  thousand: 1e3,
  million: 1e6,
  billion: 1e9,
  trillion: 1e12,
  quadrillion: 1e15,
  quintillion: 1e18,
  sextillion: 1e21,
  septillion: 1e24,
  googol: 1e130,
  googolplex: 1e40,
  };
  // detectar número y palabra
  const regex = /([\d.,]+)\s*([a-z]+)/i;
  const match = s.match(regex);
  if (match) {
  const num = parseFloat(match[1].replace(/,/g, ""));
  const word = match[2].toLowerCase();
  const mult = magnitudes[word] ?? 1;
  const result = num * mult;
  if (!Number.isNaN(result)) return Math.floor(result);
  }
  // Si solo hay dígitos, puntos o comas, limpiar separadores
  const onlyDigits = s.replace(/[^\d\-]/g, "");
  if (onlyDigits === "" || onlyDigits === "-" || onlyDigits === "+") return 0;
  const n = parseInt(onlyDigits, 10);
  return Number.isNaN(n) ? 0 : n;
}


/* formatNumber (para mostrar) */
function formatNumber(n){
  return new Intl.NumberFormat('es-AR').format(n);
}

function generarBatalla() {
  teamAContainer.innerHTML = "";
  teamBContainer.innerHTML = "";
  result.textContent = "";
  // Tomar 6 personajes aleatorios distintos
  const seleccion = personajes
  .slice() // clonar
  .sort(() => 0.5 - Math.random())
  .slice(0, 6);
  const equipoA = seleccion.slice(0, 3);
  const equipoB = seleccion.slice(3, 6);
  // Renderizar (nota: renderizarPersonajes solo crea las cards dentro del contenedor)
  renderizarPersonajes(equipoA, teamAContainer);
  renderizarPersonajes(equipoB, teamBContainer);
  // Calcular poder total con parseKi
  const totalA = equipoA.reduce((sum, p) => sum + parseKi(p?.ki ?? 0), 0);
  const totalB = equipoB.reduce((sum, p) => sum + parseKi(p?.ki ?? 0), 0);
  // Mostrar totales junto al resultado
  let mensaje = "";
  if (totalA > totalB) mensaje = `💥 ¡Gana el Equipo A! (${formatNumber(totalA)} vs ${formatNumber(totalB)})`;
  else if (totalB > totalA) mensaje = `🔥 ¡Gana el Equipo B! (${formatNumber(totalA)} vs ${formatNumber(totalB)})`;
  else mensaje = `🤝 ¡Empate! Ambos con ${formatNumber(totalA)} de poder.`;
  // Mostramos también los totales por equipo encima o debajo (opcional)
  const resumen = document.createElement("div");
  resumen.className = "resumen-totales";
  resumen.innerHTML = `
  <p>Equipo A: <strong>${formatNumber(totalA)}</strong></p>
  <p>Equipo B: <strong>${formatNumber(totalB)}</strong></p>
  `;
  // limpiar y agregar
  result.appendChild(resumen);
  // Resultado principal (texto grande)
  const titulo = document.createElement("p");
  titulo.className = "resultado-titulo";
  titulo.textContent = mensaje;
  result.appendChild(titulo);
}

newBattleBtn.addEventListener("click", generarBatalla);

iniciar();
