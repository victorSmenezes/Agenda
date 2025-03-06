import validator from "validator";

export default class Login {
  constructor(formClass) {
    this.form = document.querySelector(formClass);
  }

  init() {
    this.events();
  }

  events() {
    if (!this.form) return;
    this.form.addEventListener('submit', e => {
      e.preventDefault();
      this.validate(e);
    })
  };

  validate(e) {
    const el = e.target;

    let emailMessage = el.querySelector('.email-error');
    let passwordMessage = el.querySelector('.password-error');

    const emailInput = el.querySelector('input[name="email"]');
    const passwordInput = el.querySelector('input[name="password"]');
    let error = false;
    
    if (!emailMessage) {
      emailMessage = document.createElement('div')
      emailMessage.classList.add('email-error')
      emailInput.insertAdjacentElement('afterend', emailMessage)
    }
    
    if (!passwordMessage) {
      passwordMessage = document.createElement('div')
      passwordMessage.classList.add('password-error')
      passwordInput.insertAdjacentElement('afterend', passwordMessage)
    }

    emailMessage.innerHTML = '';
    passwordMessage.innerHTML = '';

    if (!validator.isEmail(emailInput.value)) {
      emailMessage.innerHTML = 'Email Inválido.';
      error = true;
    };

    if (passwordInput.value.length < 3 || passwordInput.value.length > 50) {
      passwordMessage.innerHTML = 'Senha Inválida.';
      error = true;
    };
    
    if (!error) {
      emailMessage.remove()
      passwordMessage.remove()
      el.submit();
    }
  }
};