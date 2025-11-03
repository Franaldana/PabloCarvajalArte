// === Datos demo: reemplaza con tus collages (SE MANTIENE TU ESTRUCTURA) ===
const WORKS = [
  { id: 1, title: 'Collage 1', thumb: 'img/collage1.jpg', price: 30000 },
  { id: 2, title: 'Collage 2', thumb: 'img/collage2.jpg', price: 30000 },
  { id: 3, title: 'Collage 3', thumb: 'img/collage3.jpg', price: 30000 },
  { id: 4, title: 'Collage 4', thumb: 'img/collage4.jpg', price: 30000 },
  { id: 5, title: 'Collage 5', thumb: 'img/collage5.jpg', price: 30000 },
  { id: 6, title: 'Collage 6', thumb: 'img/collage6.jpg', price: 30000 }
];

// === (Opcional) agrega estos campos si quieres personalizar modal por obra ===
// Ej: { id: 1, ..., full: 'img/collage1-grande.jpg', desc: 'Descripción breve...' }

// === Datos de transferencia (edita con los tuyos) ===
const TRANSFER = {
  bankName: "BancoEstado",
  accountType: "Cuenta RUT",
  accountName: "Pablo Carvajal",
  rut: "12.345.678-9",
  accountNumber: "12.345.678",
  email: "pablo@ejemplo.cl"
};

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
        <h3>Instrucciones de transferencia</h3>
        <ul>
          <li><strong>Banco:</strong> <span id="bankName"></span></li>
          <li><strong>Tipo de cuenta:</strong> <span id="accountType"></span></li>
          <li><strong>Titular:</strong> <span id="accountName"></span></li>
          <li><strong>RUT:</strong> <span id="rut"></span></li>
          <li><strong>N° de cuenta:</strong> <span id="accountNumber"></span></li>
          <li><strong>Correo:</strong> <span id="email"></span></li>
        </ul>
        <p class="note">Envía el comprobante por Instagram y recibirás confirmación del envío o retiro en Santiago.</p>
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

  modal.querySelector('#bankName').textContent = TRANSFER.bankName;
  modal.querySelector('#accountType').textContent = TRANSFER.accountType;
  modal.querySelector('#accountName').textContent = TRANSFER.accountName;
  modal.querySelector('#rut').textContent = TRANSFER.rut;
  modal.querySelector('#accountNumber').textContent = TRANSFER.accountNumber;
  modal.querySelector('#email').textContent = TRANSFER.email;

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
