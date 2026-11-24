const menuButton = document.querySelector('.menu-button');
const nav = document.querySelector('.main-nav');

menuButton.addEventListener('click', () => {
  const open = nav.classList.toggle('open');
  menuButton.setAttribute('aria-expanded', String(open));
});

nav.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    nav.classList.remove('open');
    menuButton.setAttribute('aria-expanded', 'false');
  });
});

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll('.reveal').forEach(element => observer.observe(element));

const quizForm = document.getElementById('quiz-form');
const quizResult = document.getElementById('quiz-result');
const resultTitle = document.getElementById('result-title');
const resultCopy = document.getElementById('result-copy');

quizForm.addEventListener('submit', event => {
  event.preventDefault();
  const data = new FormData(quizForm);
  const score = ['q1', 'q2', 'q3'].reduce((total, name) => total + Number(data.get(name)), 0);

  if (score >= 5) {
    resultTitle.textContent = 'Você já está fazendo a diferença.';
    resultCopy.textContent = 'Continue fortalecendo esses hábitos e inspire outras pessoas a fazer o mesmo. Compartilhar conhecimento é uma ação poderosa.';
  } else if (score >= 3) {
    resultTitle.textContent = 'Você está no caminho certo.';
    resultCopy.textContent = 'Comece escolhendo uma nova prática sustentável nesta semana: reduzir descartáveis ou separar corretamente os recicláveis.';
  } else {
    resultTitle.textContent = 'Sua próxima ação pode mudar tudo.';
    resultCopy.textContent = 'Comece pequeno: leve uma garrafa reutilizável e nunca descarte resíduos em ruas, rios ou praias. Pequenos passos criam grandes hábitos.';
  }

  quizForm.style.display = 'none';
  quizResult.classList.add('visible');
});

document.getElementById('quiz-reset').addEventListener('click', () => {
  quizForm.reset();
  quizForm.style.display = 'block';
  quizResult.classList.remove('visible');
});

const pledgeButton = document.getElementById('pledge-button');
const modal = document.getElementById('pledge-modal');
const closeModal = modal.querySelector('.modal-close');
const pledgeOptions = modal.querySelectorAll('.pledge-options button');
const modalSuccess = document.getElementById('modal-success');
const pledgeCount = document.getElementById('pledge-count');

function openModal() {
  modal.hidden = false;
  document.body.classList.add('modal-open');
  closeModal.focus();
}

function closeModalWindow() {
  modal.hidden = true;
  document.body.classList.remove('modal-open');
  pledgeButton.focus();
}

pledgeButton.addEventListener('click', openModal);
closeModal.addEventListener('click', closeModalWindow);
modal.addEventListener('click', event => {
  if (event.target === modal) closeModalWindow();
});
document.addEventListener('keydown', event => {
  if (event.key === 'Escape' && !modal.hidden) closeModalWindow();
});

pledgeOptions.forEach(option => {
  option.setAttribute('aria-pressed', 'false');
  option.addEventListener('click', () => {
    const selected = option.classList.toggle('selected');
    option.setAttribute('aria-pressed', String(selected));

    const selectedCount = modal.querySelectorAll('.pledge-options button.selected').length;

    if (selectedCount > 0) {
      if (pledgeButton.dataset.committed !== 'true') {
        const count = Number(pledgeCount.textContent.replaceAll('.', '')) + 1;
        pledgeCount.textContent = count.toLocaleString('pt-BR');
        pledgeButton.dataset.committed = 'true';
      }

      modalSuccess.textContent = selectedCount === 1
        ? '1 compromisso escolhido! Agora é hora de colocar em prática.'
        : `${selectedCount} compromissos escolhidos! Agora é hora de colocá-los em prática.`;
      pledgeButton.innerHTML = 'Compromissos assumidos <span>✓</span>';
    } else {
      modalSuccess.textContent = 'Selecione pelo menos um compromisso.';
      pledgeButton.innerHTML = 'Assinar compromisso <span>+</span>';
      pledgeButton.dataset.committed = 'false';
    }
  });
});

const collectionFilter = document.getElementById('collection-filter');
const collectionCards = document.querySelectorAll('.collection-card');
const collectionEmpty = document.getElementById('collection-empty');

collectionFilter?.addEventListener('input', () => {
  const term = collectionFilter.value.trim().toLowerCase();
  let visibleCount = 0;

  collectionCards.forEach(card => {
    const visible = !term || card.dataset.location.includes(term);
    card.hidden = !visible;
    if (visible) visibleCount += 1;
  });

  collectionEmpty.hidden = visibleCount !== 0;
});

const questionForm = document.getElementById('question-form');
questionForm?.addEventListener('submit', event => {
  event.preventDefault();
  const name = document.getElementById('question-name').value.trim();
  document.getElementById('question-status').textContent = `Obrigado, ${name}! Sua mensagem foi registrada nesta demonstração.`;
  questionForm.reset();
});

if (window.matchMedia('(max-width: 900px)').matches === false) {
  nav.classList.remove('open');
}

document.addEventListener('keydown', event => {
  if (event.key === 'Escape' && nav.classList.contains('open')) {
    nav.classList.remove('open');
    menuButton.setAttribute('aria-expanded', 'false');
    menuButton.focus();
  }
});

window.addEventListener('resize', () => {
  if (window.innerWidth > 900) {
    nav.classList.remove('open');
    menuButton.setAttribute('aria-expanded', 'false');
  }
});

if ('IntersectionObserver' in window) {
  // Observer já configurado acima.
} else {
  document.querySelectorAll('.reveal').forEach(element => element.classList.add('visible'));
}
