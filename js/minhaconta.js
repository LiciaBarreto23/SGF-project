const localStorageUsuarios = JSON.parse(localStorage.getItem('usuarios'))
let listUsuarios = localStorage.getItem('usuarios') !== null ? localStorageUsuarios : []

localStorageUserId = JSON.parse(localStorage.getItem("UserAtualID"));
UserAtualID =
  localStorage.getItem("UserAtualID") !== null ? localStorageUserId : [];

const usuario = listUsuarios.find((user) => user.id === UserAtualID);


const Pnome = document.querySelector("#dados-nome")
const Ptelefone = document.querySelector("#dados-telefone")
const Pcpf = document.querySelector("#dados-cpf")
const Pemail = document.querySelector("#dados-email")
const Psenha = document.querySelector("#dados-senha")

const visibilityIcon = document.querySelector(".visibility-icon")

Pnome.textContent = usuario.nome
Ptelefone.textContent = formatarTelefone(usuario.telefone)
Pcpf.textContent = formatarCpf(usuario.cpf)
Pemail.textContent = usuario.email
Psenha.textContent = hiddenSenha()

function formatarTelefone(valor) {
  if (!valor) return "";
  const telefone = `(${usuario.telefone.charAt(0)+usuario.telefone.charAt(1)})${usuario.telefone.slice(2)}`;
  return telefone;
}
function formatarCpf(valor) {
  if (!valor) return "";
  const cpf = `${usuario.cpf.charAt(0)+usuario.cpf.charAt(1)+usuario.cpf.charAt(2)}.${usuario.cpf.charAt(3)+usuario.cpf.charAt(4)+usuario.cpf.charAt(5)}.${usuario.cpf.charAt(6)+usuario.cpf.charAt(7)+usuario.cpf.charAt(8)}-${usuario.cpf.charAt(9)+usuario.cpf.charAt(10)+usuario.cpf.charAt(11)}`;
  return cpf;
}

function hiddenSenha(){
  return "*".repeat(usuario.senha.length)
}

function soltar(){
  Psenha.textContent = hiddenSenha()
  visibilityIcon.style.backgroundImage = "url('../img/icon-visibilityON.svg')";
}
function segurando(){
  Psenha.textContent = usuario.senha
  visibilityIcon.style.backgroundImage = "url('../img/icon-visibilityOFF.svg')";
}