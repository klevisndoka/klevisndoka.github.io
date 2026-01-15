// Base64 encoded email: a2xldmlzbkBnbWFpbC5jb20=
const ENCRYPTED_EMAIL = "a2xldmlzbkBnbWFpbC5jb20=";
let captchaAnswer = 0;

function showCaptcha() {
  const modal = document.getElementById('captchaModal');
  const numberDisplay = document.getElementById('captchaNumber');
  const optionsContainer = document.getElementById('captchaOptions');

  captchaAnswer = Math.floor(Math.random() * 9) + 1;
  numberDisplay.textContent = captchaAnswer;

  let options = [captchaAnswer];
  while (options.length < 4) {
    let wrong = Math.floor(Math.random() * 9) + 1;
    if (!options.includes(wrong)) options.push(wrong);
  }
  options = options.sort(() => Math.random() - 0.5);

  optionsContainer.innerHTML = options.map(num =>
    `<button class="modal-option" onclick="verifyCaptcha(${num})">${num}</button>`
  ).join('');

  modal.classList.add('active');
}

function verifyCaptcha(selected) {
  if (selected === captchaAnswer) {
    const email = atob(ENCRYPTED_EMAIL);
    window.location.href = 'mailto:' + email;
    closeCaptcha();
  } else {
    const content = document.querySelector('.modal-content');
    content.style.animation = 'none';
    setTimeout(() => content.style.animation = 'shake 0.3s', 10);
    setTimeout(showCaptcha, 300);
  }
}

function closeCaptcha() {
  document.getElementById('captchaModal').classList.remove('active');
}

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') closeCaptcha();
});

document.getElementById('emailBtn')?.addEventListener('click', showCaptcha);
document.getElementById('closeModal')?.addEventListener('click', closeCaptcha);
document.getElementById('captchaModal')?.addEventListener('click', (e) => {
  if (e.target.id === 'captchaModal') closeCaptcha();
});
