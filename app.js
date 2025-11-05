// === Datos demo: reemplaza con tus collages (SE MANTIENE TU ESTRUCTURA) ===
const WORKS = [
  { id: 1, title: 'Collage 1', thumb: 'img/collage1.jpg', price: 30000 },
  { id: 2, title: 'Collage 2', thumb: 'img/collage2.jpg', price: 30000 },
  { id: 3, title: 'Collage 3', thumb: 'img/collage3.jpg', price: 30000 },
  { id: 4, title: 'Collage 4', thumb: 'img/collage4.jpg', price: 30000 },
  { id: 5, title: 'Collage 5', thumb: 'img/collage5.jpg', price: 30000 },
  { id: 6, title: 'Collage 6', thumb: 'img/collage6.jpg', price: 30000 }
];

// Antes tenías aquí el objeto TRANSFER con los datos bancarios.
// Ya no lo necesitamos, así que lo eliminamos.

function moneyCL(n){ return n.toLocaleString('es-CL'); }

// ===== Modal (creado una sola vez) =====
let modal = document.getElementById('collageModal');
if (!modal) {
  modal = document.createElement('dialog');
  modal.id = 'collageModal';
  modal.className = 'modal';
  modal.innerHTML = `
    <div class="modal__card">
      <button class="modal__close" aria-label="Cerrar">✕</button>
      <img id="modalImg" src="" alt="">
      <h2 id="modalTitle"></h2>
      <p id="modalDesc"></p>
      <p id="modalPrice" class="modal__price"></p>
      <div class="modal__transfer">
        <h3>Pasos a seguir</h3>
        <ol>
          <li>Escríbeme por Instagram para confirmar la disponibilidad del collage.</li>
          <li>Indica el nombre o número del collage que quieres comprar.</li>
          <li>Te enviaré los datos de pago y opciones de entrega.</li>
          <li>Una vez confirmado el pago, coordinamos el envío o retiro.</li>
        </ol>
        <p class="note">Si tienes dudas, también puedes escribirme por Instagram.</p>
      </div>
    </div>`;
  document.body.appendChild(modal);

  // cerrar modal
  modal.addEventListener('click', e => { if (e.target === modal) modal.close(); });
  modal.querySelector('.modal__close').addEventListener('click', () => modal.close());
}

// ===== Abre el modal con datos de la obra =====
function openModal(item){
  const fullSrc = item.full || item.thumb; // fallback a la miniatura
  const descTxt = item.desc || 'Obra original en técnica collage. Pieza única.';

  modal.querySelector('#modalImg').src = fullSrc;
  modal.querySelector('#modalImg').alt = item.title;
  modal.querySelector('#modalTitle').textContent = item.title;
  modal.querySelector('#modalDesc').textContent = descTxt;
  modal.querySelector('#modalPrice').textContent = `$${moneyCL(item.price)} CLP`;

  // Ojo: aquí antes se rellenaban los datos de TRANSFER (bankName, etc.).
  // Esas líneas las eliminamos porque ya no existen esos elementos ni el objeto TRANSFER.

  modal.showModal();
}

// ===== Render de tarjetas (miniatura + botón COMPRAR) =====
function render(){
  const grid = document.getElementById('collageGrid');
  if (!grid) return;
  grid.innerHTML = '';

  WORKS.forEach(w => {
    const card = document.createElement('article');
    card.className = 'collage-card';
    card.innerHTML = `
      <img src="${w.thumb}" alt="${w.title}">
      <div>
        <h4>${w.title}</h4>
        <div style="display:flex;justify-content:space-between;align-items:center;gap:12px;margin-top:6px">
          <span>$${moneyCL(w.price)} CLP</span>
          <button class="btn-buy" data-id="${w.id}">COMPRAR →</button>
        </div>
      </div>`;
    grid.appendChild(card);
  });

  // Botones comprar → modal
  document.querySelectorAll('.btn-buy').forEach(btn => {
    btn.addEventListener('click', e => {
      const id = Number(e.currentTarget.dataset.id);
      const item = WORKS.find(x => x.id === id);
      if (item) openModal(item);
    });
  });

  const yearEl = document.getElementById('yearNow');
  if (yearEl) yearEl.textContent = new Date().getFullYear();
}

document.addEventListener('DOMContentLoaded', render);
