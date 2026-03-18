// Inicializa AOS se existir
if (typeof AOS !== "undefined") {
  AOS.init();
}

const video = document.querySelector("video");

video.muted = true;
video.play().catch(() => {
  console.log("Autoplay bloqueado");
});


const toggle = document.getElementById("menu-toggle");
const menu = document.querySelector(".header-buttons");

toggle.addEventListener("click", () => {
  menu.classList.toggle("active");
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

// container apresentacao

  function ativarAccordionMobile() {
    const isMobile = window.innerWidth <= 840;
    const cards = document.querySelectorAll(".card-apresentacao");

    cards.forEach(card => {
      const content = card.querySelector(".conteudo");

      // remove eventos antigos clonando o elemento
      const newCard = card.cloneNode(true);
      card.parentNode.replaceChild(newCard, card);
    });

    const newCards = document.querySelectorAll(".card-apresentacao");

    newCards.forEach(card => {
      const content = card.querySelector(".conteudo");

      if (isMobile) {

        content.style.maxHeight = null;

        card.addEventListener("click", () => {

          newCards.forEach(c => {
            const cContent = c.querySelector(".conteudo");

            if (c !== card) {
              c.classList.remove("active");
              cContent.style.maxHeight = null;
            }
          });

          card.classList.toggle("active");

          if (card.classList.contains("active")) {
            content.style.maxHeight = content.scrollHeight + "px";
          } else {
            content.style.maxHeight = null;
          }

        });

      } else {
        content.style.maxHeight = null;
        card.classList.remove("active");
      }
    });
  }

  ativarAccordionMobile();
  window.addEventListener("resize", ativarAccordionMobile);

// fim apresentação

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

  const form = document.getElementById("contato-form");
  const popup = document.getElementById("popup-sucesso");
  const closeBtn = document.querySelector(".popup-sucesso .close");

  if (form && popup && closeBtn) {

    form.addEventListener("submit", async function (e) {
      e.preventDefault(); // 🔥 ESSENCIAL

      const formData = new FormData(form);

      try {
        const response = await fetch(form.action, {
          method: form.method,
          body: formData,
          headers: {
            'Accept': 'application/json'
          }
        });

        if (response.ok) {
          form.reset();
          popup.style.display = "flex";
        } else {
          alert("Erro ao enviar.");
        }

      } catch (error) {
        alert("Erro de conexão.");
      }
    });

    closeBtn.addEventListener("click", () => {
      popup.style.display = "none";
    });

    window.addEventListener("click", (e) => {
      if (e.target === popup) {
        popup.style.display = "none";
      }
    });

  }