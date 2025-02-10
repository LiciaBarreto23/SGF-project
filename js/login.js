let localStorageUsuarios = JSON.parse(localStorage.getItem("usuarios"));
let listUsuarios =
  localStorage.getItem("usuarios") !== null ? localStorageUsuarios : [];

const localStorageUserId = JSON.parse(localStorage.getItem("UserAtualID"));
let UserAtualID =
  localStorage.getItem("UserAtualID") !== null ? localStorageUserId : 0;

const formLogin = document.querySelector("#form-login");
const inputEmail = document.querySelector("#login-email");
const inputSenha = document.querySelector("#login-senha");

const mnsgLogin = document.querySelector("#mnsg-login");

formLogin.addEventListener("submit", (event) => {
  event.preventDefault();

  const LoginEmail = inputEmail.value;
  const LoginSenha = inputSenha.value;

  const usuario = listUsuarios.find((user) => user.email === LoginEmail);
  if (usuario) {
    if (LoginSenha === usuario.senha) {
      mnsgLogin.textContent = "Login concluido! Aguarde...";
      mnsgLogin.classList.remove("corC3");
      mnsgLogin.classList.add("pAtivo", "corC2");

      UserAtualID = usuario.id;
      updateLocalStorage();

      setTimeout(() => {
        window.location.href = "pags/principal.html";
      }, 800);
    } else {
      mnsgLogin.textContent = "Senha incorreta!";
      mnsgLogin.classList.add("pAtivo");
      inputSenha.value = "";
    }
  } else {
    mnsgLogin.textContent = "Usuario não encontrado!";
    mnsgLogin.classList.add("pAtivo");
    limparInputLogin();
  }
});

const updateLocalStorage = () => {
  localStorage.setItem("UserAtualID", JSON.stringify(UserAtualID));
};

const fecharmnsgP = () => {
  mnsgP.classList.remove("pAtivo");
};

function limparInputLogin() {
  inputEmail.value = "";
  inputSenha.value = "";
}

document.addEventListener("DOMContentLoaded", () => {
  if(UserAtualID !== 0){
    setTimeout(() => {
      window.location.href = "pags/principal.html";
    }, 500);
  }
});


const divLogin = document.querySelector("#div-login")
const divEmail = document.querySelector("#div-email")
const divSenha = document.querySelector("#div-senha")

const FormEmail = document.querySelector("#form-email")
const inputConfEmail = document.querySelector("#confEmail")
const mnsgEmail = document.querySelector("#mnsg-email")
const FormSenha = document.querySelector("#form-senha")
const inputNovaSenha = document.querySelector("#nova-senha")
const inputConfNovaSenha = document.querySelector("#ConfNova-senha")
const SpanNomeSenha = document.querySelector("#mnsg-senha")
const mnsgSenha = document.querySelector("#div-senha h3")

const updateLocalStorageSenha = () => {
  localStorage.setItem("usuarios", JSON.stringify(listUsuarios));
};

FormEmail.addEventListener("submit", (event) => {
  event.preventDefault();

  const confEmail = inputConfEmail.value

  const usuario = listUsuarios.find((user) => user.email === confEmail);
  if(usuario){
    mnsgEmail.classList.remove("pAtivo")
    divSenha.classList.add("modalAtivo")
    inputConfEmail.blur()
    mnsgSenha.textContent = `Olà, ${usuario.nome}`
  }else{
    mnsgEmail.classList.add("pAtivo")
    limparInputEmail()
  }
})

FormSenha.addEventListener("submit", (event) => {
  event.preventDefault();

  const confEmail = inputConfEmail.value
  const usuario = listUsuarios.find((user) => user.email === confEmail);

  const novaSenha = inputNovaSenha.value
  const ConfnovaSenha = inputConfNovaSenha.value

  if(verificarSenha(novaSenha, ConfnovaSenha)){
    usuario.senha = novaSenha;
    updateLocalStorageSenha()

    mnsgSenha.classList.remove("corC3", "fonte1-pp","corA5", "fonte1-x")
    mnsgSenha.classList.add("corC2", "fonte1-m")
    mnsgSenha.textContent = "Senha redefinida!"    

    setTimeout(() => {
      closeDivEmail();
    }, 1000);
  }else{
    limparInputSenha()
  }

})

function verificarSenha(novaSenha, ConfnovaSenha) {
  if (novaSenha === ConfnovaSenha) {
    if (novaSenha.length >= 5) {
      return true;
    } else {
      exibirErro("Senhas Fraca, deve conter mais de 5 caracteres.");
      return false;
    }
  } else {
    exibirErro("Senhas devem ser iguais.");
    return false;
  }
}

function exibirErro(mnsg){
  mnsgSenha.classList.remove("corA5", "fonte1-x")
  mnsgSenha.classList.add("corC3", "fonte1-pp","pAtivo")
  mnsgSenha.textContent = mnsg
}


function esqueciSenhaClick() {
  divLogin.classList.remove("modalAtivo")
  divEmail.classList.add("modalAtivo")
  divSenha.classList.remove("modalAtivo")
  mnsgEmail.classList.remove("pAtivo")
  mnsgSenha.classList.remove("pAtivo")
  limparInputLogin()
}

function closeDivEmail() {
  divLogin.classList.add("modalAtivo")
  divEmail.classList.remove("modalAtivo")
  divSenha.classList.remove("modalAtivo")
  mnsgEmail.classList.remove("pAtivo")
  mnsgSenha.classList.remove("pAtivo")
}

function limparInputEmail(){
  inputConfEmail.value = ""
}
function limparInputSenha(){
  inputNovaSenha.value = ""
  inputConfNovaSenha.value = ""
}