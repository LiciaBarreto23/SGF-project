class Usuario {
  constructor(nome, telefone, cpf, email, senha) {
    this.id = Usuario.generateID(); 
    this.nome = nome;
    this.telefone = telefone;
    this.cpf = cpf;
    this.email = email;
    this.senha = senha;
  }

  static generateID() {
    return Math.floor(Math.random() * 100000);
  }
}

const modal = document.querySelector("#cadastro-modal");
const modalH3 = document.querySelector("#cadastro-modal h3");
const modalp = document.querySelector("#cadastro-modal p");
const closeModal = document.querySelector("#cadastro-modal-button");

closeModal.onclick = function () {
  modal.classList.remove("modalAtivo");
  document.querySelector("#cadastro .body").classList.remove("modalAtivo");
};

const localStorageUsuarios = JSON.parse(localStorage.getItem("usuarios"));
let listUsuarios =
  localStorage.getItem("usuarios") !== null ? localStorageUsuarios : [];

const updateLocalStorage = () => {
  localStorage.setItem("usuarios", JSON.stringify(listUsuarios));
};

const formCadastro = document.querySelector("#cadastro-form");
const inputNome = document.querySelector("#cadastro-form #nome");
const inputTelefone = document.querySelector("#cadastro-form #telefone");
const inputCpf = document.querySelector("#cadastro-form #cpf");
const inputEmail = document.querySelector("#cadastro-form #email");
const inputSenha = document.querySelector("#cadastro-form #senha");
const inputSenhaConf = document.querySelector("#cadastro-form #senhaConf");

let erroEmail = false;

formCadastro.addEventListener("submit", (event) => {
  event.preventDefault();

  if (verificarExistencia()) {
    const CadastroNome = inputNome.value;
    const CadastroTelefone = inputTelefone.value;
    const CadastroCpf = inputCpf.value;
    const CadastroEmail = inputEmail.value;
    const CadastroSenha = inputSenha.value;
    const CadastroSenhaConf = inputSenhaConf.value;

    verificarEmail(CadastroEmail);

    if (erroEmail === false) {
      const OK =
        verificarSenha(CadastroSenha, CadastroSenhaConf) &&
        verificarDados(CadastroTelefone, CadastroCpf);
      if (OK) {
        setTimeout(() => {
          modal.classList.add("modalAtivo");
          document.querySelector("#cadastro .body").classList.add("modalAtivo");
          limparInput();
        }, 800);

        const novoUsuario = new Usuario(CadastroNome, CadastroTelefone, CadastroCpf, CadastroEmail, CadastroSenha);

        listUsuarios.push(novoUsuario);
        updateLocalStorage();
      }
    }
  } else {
    exibirErro("Email ja cadastrado.")
  }
});

const verificarExistencia = () => {
  const CadastroEmail = inputEmail.value;
  const UsuarioExiste = listUsuarios.find((user) => user.email === CadastroEmail);
  if(UsuarioExiste){
    return false
  } else{
    return true
  }
}

function verificarSenha(CadastroSenha, CadastroSenhaConf) {
  if (CadastroSenha === CadastroSenhaConf) {
    if (CadastroSenha.length >= 5) {
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

function verificarDados(CadastroTelefone, CadastroCpf) {
  if (CadastroTelefone.length === 11) {
    if (CadastroCpf.length === 11) {
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

async function verificarEmail(CadastroEmail) {
  const url = `https://api.hunter.io/v2/email-verifier?email=${CadastroEmail}&api_key=1b5fc6f99aecfffe116e57d2ad5703ccb924ed13`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    if (data.data.result === "deliverable") {
      erroEmail = false
    } else {
      exibirErro("Email invalido!");
      erroEmail = true;
    }
  } catch (error) {
    exibirErro("Erro ao verificar e-mail.");
    erroEmail = true;
    sendResponse({ success: false});
  }
}

function exibirErro(mnsg) {
  modal.classList.add("modalAtivo", "borderCorC3");
  document.querySelector("#cadastro .body").classList.add("modalAtivo");
  modalH3.innerHTML = "Tente novamente!";
  modalp.innerHTML = `${mnsg}`;
}

function limparInput() {
  inputNome.value = "";
  inputTelefone.value = "";
  inputCpf.value = "";
  inputEmail.value = "";
  inputSenha.value = "";
  inputSenhaConf.value = "";
}
