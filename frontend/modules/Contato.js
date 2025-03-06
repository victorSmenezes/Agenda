import validator from "validator";

export default class Contato  {
  constructor(formClass) {
    this.form = document.querySelector(formClass);
  }


  init () {
    this.events()
  }

  events() {
    if(!this.form) return
    this.form.addEventListener('submit', e => {
      e.preventDefault();
      this.validate(e);
    })
  }

  validate(e) {
    const element = e.target;

    let nomeMessage = element.querySelector('.error-name');
    let emailMessage = element.querySelector('.email-error');
    let telMessage = element.querySelector('.tel-error');

    const nomeInput = element.querySelector('input[name="nome"]');
    const emailInput = element.querySelector('input[name="email"]');
    const telInput = element.querySelector('input[name="tel"]');

    let error = false;

    if(!nomeMessage) {
      nomeMessage = document.createElement('div')
      nomeMessage.classList.add('error-name')
      nomeInput.insertAdjacentElement('afterend', nomeMessage)
    }

    if(!emailMessage) {
      emailMessage = document.createElement('div')
      emailMessage.classList.add('email-error')
      emailInput.insertAdjacentElement('afterend', emailMessage)
    }
    
    if(!telMessage) {
      telMessage = document.createElement('div')
      telMessage.classList.add('tel-error')
      telInput.insertAdjacentElement('afterend', telMessage)
    }

    nomeMessage.innerHTML = ''
    emailMessage.innerHTML = ''
    telMessage.innerHTML = ''

    if(!nomeInput.value) {
      nomeMessage.innerHTML = "Nome é obrigatório!"
      error = true
    }

    if(emailInput.value && !validator.isEmail(emailInput.value)) {
      emailMessage.innerHTML = 'Email Inválido.';
      error = true;
    }

    if(!emailInput.value && !telInput.value) {
      telMessage.innerHTML = 'Ao menos 1 campo é requerido: email ou tel.'
      error = true;
    }


    if(!error) {
      nomeMessage.remove()
      emailMessage.remove()
      telMessage.remove()
      element.submit()
    }
  }
}