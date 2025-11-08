export function renderizarPersonajes(personajes, contenedor) {
  personajes.forEach(p => {
    const card = document.createElement("article");
    card.classList.add("card", "small");
    card.innerHTML = `
      <div class="card-media">
        <img src="${p.image || ''}" alt="${p.name || 'Personaje'}" />
      </div>
      <div class="card-body">
        <h4 class="card-name">${p.name || 'Sin nombre'}</h4>
        <p class="card-meta">Raza: ${p.race || '—'}</p>
        <p class="card-ki">Ki: ${p.ki || '0'}</p>
      </div>
    `;
    contenedor.appendChild(card);
  });
}
