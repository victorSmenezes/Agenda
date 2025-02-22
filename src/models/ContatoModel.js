const mongoose = require('mongoose');
const validator = require('validator');

const ContatoSchema = new mongoose.Schema({
  nome: { type: String, required: true },
  sobrenome: { type: String, default: ''},
  email: { type: String, required: false, default: '' },
  tel: { type: String, required: false, default: '' },
  criadoEm: { type: Date,  default: Date.now },
});

const ContatoModel = mongoose.model('Contato', ContatoSchema);

function Contato(body) {
  this.body = body;
  this.errors = [];
  this.contato = null;
};

Contato.buscaPorId = async (id) => {
  if(typeof id !== "string") return;
  const user = await ContatoModel.findById(id);

  return user
}

Contato.prototype.register = async function () {
  this.valida();

  if(this.errors.length > 0) return;
  this.contato = await ContatoModel.create(this.body);
}

Contato.prototype.valida = function () {
  this.cleanUp();

  //validação
  // O email precisa ser válido
  if (this.body.email && !validator.isEmail(this.body.email)) this.errors.push('Email inválido');
  if(!this.body.nome) this.errors.push('Nome é obrigatório!');
  if(!this.body.email && !this.body.tel) {
    this.errors.push('Ao menos 1 contato necessita ser enviado: email ou telefone.')
  }
}

Contato.prototype.cleanUp = function () {
  for (const key in this.body) {
    if (typeof this.body[key] !== 'string') {
      this.body[key] = '';
    }
  }

  this.body = {
    nome: this.body.nome,
    sobrenome: this.body.sobrenome,
    email: this.body.email,
    tel: this.body.tel
  }
}

Contato.prototype.edit = async function (id) {
  if(typeof id !== "string") return;
  this.valida();
  if(this.errors.length > 0) return;
  this.contato = await ContatoModel.findByIdAndUpdate(id, this.body, { new: true });
}

module.exports = Contato;
