const localStorageUsuarios = JSON.parse(localStorage.getItem("usuarios"));
let listUsuarios =
  localStorage.getItem("usuarios") !== null ? localStorageUsuarios : [];

localStorageUserId = JSON.parse(localStorage.getItem("UserAtualID"));
UserAtualID =
  localStorage.getItem("UserAtualID") !== null ? localStorageUserId : [];

const usuario = listUsuarios.find((user) => user.id === UserAtualID);

const updateLocalStorage = () => {
  localStorage.setItem("usuarios", JSON.stringify(listUsuarios));
};

const mnsgEdit = document.querySelector("#mnsg-edit");

const formEditUser = document.querySelector("#editarconta-form");
const inputEditUserNome = document.querySelector("#editUser-nome");
const inputEditUserTelefone = document.querySelector("#editUser-telefone");
const inputEditUserCpf = document.querySelector("#editUser-cpf");
const inputEditUserEmail = document.querySelector("#editUser-email");
const inputEditUserSenha = document.querySelector("#editUser-senha");
const inputEditUserConfSenha = document.querySelector("#editUser-confSenha");

function init() {
  inputEditUserNome.value = capitalizar(usuario.nome);
  inputEditUserTelefone.value = usuario.telefone;
  inputEditUserCpf.value = usuario.cpf;
  inputEditUserEmail.value = usuario.email;
}

function capitalizar(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

formEditUser.addEventListener("submit", (event) => {
  event.preventDefault();

  const EditUserNome = inputEditUserNome.value;
  const EditUserTelefone = inputEditUserTelefone.value;
  const EditUserCpf = inputEditUserCpf.value;
  const EditUserSenha = inputEditUserSenha.value;
  const EditUserSenhaConf = inputEditUserConfSenha.value;

  console.log(EditUserTelefone.split("()"));
  const OK = verificarDados(EditUserTelefone, EditUserCpf);
  if (OK) {
    mnsgEdit.classList.remove("pAtivo", "corC3");
    mnsgEdit.classList.add("pAtivo", "corC2");
    mnsgEdit.innerHTML = `Dados Alterados!`;

    init();
    limparInput();

    usuario.nome = EditUserNome;
    usuario.telefone = EditUserTelefone;
    usuario.cpf = EditUserCpf;

    if (verificarSenha(EditUserSenha, EditUserSenhaConf) == "ok") {
      usuario.senha = EditUserSenha;
      setTimeout(() => {
        window.location.href = "minhaconta.html";
      }, 1000);
      init()
    } else if (verificarSenha(EditUserSenha, EditUserSenhaConf) == "vazio") {
      setTimeout(() => {
        window.location.href = "minhaconta.html";
      }, 1000);
      init()
    }

    updateLocalStorage();
  }
});

function verificarSenha(EditUserSenha, EditUserSenhaConf) {
  if (EditUserSenha == "" && EditUserSenhaConf == "" ) {
    return "vazio";
  } else {
    if (EditUserSenha === EditUserSenhaConf) {
      if (EditUserSenha.length >= 5) {
        return "ok";
      } else {
        exibirErro("Senhas Fraca, deve conter mais de 5 caracteres.");
        return false;
      }
    } else {
      exibirErro("Senhas devem ser iguais.");
      return false;
    }
  }
}

function verificarDados(EditUserTelefone, EditUserCpf) {
  if (EditUserTelefone.length === 11) {
    if (EditUserCpf.length === 11) {
      return true;
    } else {
      exibirErro(
        "CPF Invalido. Deve conter apenas numeros, sem espaços ou simbolos."
      );
      return false;
    }
  } else {
    exibirErro(
      "Telefone Invalido. Deve conter DDD e telefone, sem espaços ou simbolos."
    );
    return false;
  }
}

function exibirErro(mnsg) {
  mnsgEdit.classList.remove("pAtivo", "corC2");
  mnsgEdit.classList.add("pAtivo", "corC3");
  mnsgEdit.innerHTML = `${mnsg}`;
  init();
}

function limparInput() {
  inputEditUserSenha.value = "";
  inputEditUserConfSenha.value = "";
}

init();
