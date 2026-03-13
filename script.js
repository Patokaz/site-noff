// Inicializa AOS se existir
if (typeof AOS !== "undefined") {
  AOS.init();
}

const video = document.querySelector("video");

video.muted = true;
video.play().catch(() => {
  console.log("Autoplay bloqueado");
});

// Rolar até o fim da pagina
function scrollbot() {
  const bottom = document.getElementById('Bottom');
  if (bottom) {
    bottom.scrollIntoView({
      behavior: 'smooth'
    });
  }
}

// Rolar ate o topo da pagina / animação botão wpp
const btn = document.querySelector(".button-wpp img");

if (btn) {
  window.addEventListener("scroll", () => {
    if (window.scrollY > 0) {
      btn.classList.add("roll");
    } else {
      btn.classList.remove("roll");
    }
  });
}

// feedback container
document.addEventListener("DOMContentLoaded", () => {

  const buttons = document.querySelectorAll(".feedback-icons button");
  const feedbacks = document.querySelectorAll(".feedback");

  if (buttons.length && feedbacks.length) {

    feedbacks[0].classList.add("active");
    buttons[0].classList.add("active");

    buttons.forEach(btn => {
      btn.addEventListener("click", () => {

        const targetId = btn.getAttribute("data-target");

        feedbacks.forEach(fb => fb.classList.remove("active"));
        buttons.forEach(b => b.classList.remove("active"));

        const targetFeedback = document.getElementById(targetId);

        if (targetFeedback) {
          targetFeedback.classList.add("active");
        }

        btn.classList.add("active");

      });
    });

  }

});

// forms

// Nome
const nome = document.getElementById('nome');

if (nome) {
  nome.addEventListener('input', e => {
    e.target.value = e.target.value.replace(/[^A-Za-zÀ-ÿ\s]/g, '');
  });
}

// Empresa
const empresa = document.getElementById('empresa');

if (empresa) {
  empresa.addEventListener('input', e => {
    e.target.value = e.target.value.replace(/[^A-Za-zÀ-ÿ0-9\s&.-]/g, '');
  });
}

// Telefone
const telefone = document.getElementById('telefone');

if (telefone) {
  telefone.addEventListener('input', e => {

    let v = e.target.value.replace(/\D/g, '');

    if (v.length > 11) {
      v = v.slice(0, 11);
    }

    v = v.replace(/^(\d{2})(\d)/g, '($1) $2');
    v = v.replace(/(\d{5})(\d{4})$/, '$1-$2');

    e.target.value = v;

  });
}

// Popup formulário
const form = document.getElementById('contato-form');
const popup = document.getElementById('popup-sucesso');
const closeBtn = document.querySelector('.popup-sucesso .close');

if (form && popup && closeBtn) {

  form.addEventListener('submit', function() {

  setTimeout(() => {
    popup.style.display = 'flex';
    form.reset();
  }, 500);

});

  closeBtn.addEventListener('click', () => {
    popup.style.display = 'none';
  });

  window.addEventListener('click', (e) => {
    if (e.target === popup) {
      popup.style.display = 'none';
    }
  });

}