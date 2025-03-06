import 'core-js/stable';
import 'regenerator-runtime/runtime';
import Login from './modules/Login';
import Contato from './modules/Contato';

import './assets/css/style.css';

const login = new Login('.form-login');
const cadastro = new Login('.form-cadastro');

login.init()
cadastro.init() 

const register = new Contato('.form-register');
const edit = new Contato('.form-edit');

register.init();
edit.init();