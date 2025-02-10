class Transacao {
  constructor(id_usuario, titulo, valor, tipo, categoria, data, descricao) {
    this.id = Transacao.generateID();
    this.id_usuario = id_usuario;
    this.titulo = titulo;
    this.valor = valor;
    this.tipo = tipo;
    this.categoria = categoria;
    this.data = data;
    this.descricao = descricao;
  }

  static generateID() {
    return Math.floor(Math.random() * 100000);
  }
}

const tabela = document.getElementById("tabela");
const entradasDisplay = document.querySelector("#entradas-resultado");
const saidasDisplay = document.querySelector("#saidas-resultado");
const totalDisplay = document.querySelector("#total-resultado");
const divTotalDisplay = document.querySelector(".total");
const cifraoTotalDisplay = document.querySelector(".material-symbols-rounded");

let ordenar = "Data";
const maisRecenteDisplay = document.querySelector("#maisRecente");
const maisAntigaDisplay = document.querySelector("#maisAntiga");
const porCategoriaDisplay = document.querySelector("#porCategoria");
const porDataDisplay = document.querySelector("#porData");

const formAddTransacao = document.querySelector("#form-adicionarTransacao");
const inputTransacaoTitulo = document.querySelector("#novo-titulo");
const inputTransacaoValor = document.querySelector("#novo-valor");
const inputTransacaoTipo = document.getElementsByName("novo-tipo");
const inputTransacaoCategoria = document.getElementsByName("novo-categoria");
const inputTransacaoData = document.querySelector("#novo-data");
const inputTransacaoDescricao = document.querySelector("#novo-descricao");

const formEditTransacao = document.querySelector("#form-editarTransacao");
const inputEditTransacaoTitulo = document.querySelector("#editar-titulo");
const inputEditTransacaoValor = document.querySelector("#editar-valor");
const inputEditTransacaoTipo = document.getElementsByName("editar-tipo");
const inputEditTransacaoCategoria =
  document.getElementsByName("editar-categoria");
const inputEditTransacaoData = document.querySelector("#editar-data");
const inputEditTransacaoDescricao = document.querySelector("#editar-descricao");

const hoje = new Date().toISOString().split("T")[0];
const [hojeAno, hojeMes, hojedia] = hoje.split("-");

function capitalizar(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

const navagation = document.querySelector(".navagation");
navagation.onclick = function () {
  document.querySelector(".menuToggle").classList.toggle("menuAtivo");
  navagation.classList.toggle("menuAtivo");
};
document.addEventListener("click", (event) => {
  if (!navagation.contains(event.target)) {
    document.querySelector(".menuToggle").classList.remove("menuAtivo");
    navagation.classList.remove("menuAtivo");
  }
});

const addTransacao = document.querySelector(".addTransacao");
addTransacao.onclick = function () {
  document.querySelector("#modal").classList.toggle("modalAtivo");
  document.querySelector(".body").classList.toggle("modalAtivo");
  const hoje = new Date().toISOString().split("T")[0];
  document.getElementById("novo-data").value = hoje;
};
const modalClose = document.querySelector(".modal-close");
modalClose.onclick = function () {
  document.querySelector("#modal").classList.remove("modalAtivo");
  document.querySelector(".body").classList.remove("modalAtivo");
  limparInputAdd();
};

const EditModalClose = document.querySelector(".modalEdit-close");
EditModalClose.onclick = function () {
  document.querySelector("#modalEdit").classList.remove("modalAtivo");
  document.querySelector(".body").classList.remove("modalAtivo");
  limparInputEdit();
};

localStorageUserId = JSON.parse(localStorage.getItem("UserAtualID"));
UserAtualID =
  localStorage.getItem("UserAtualID") !== null ? localStorageUserId : [];

const localStorageTransactions = JSON.parse(
  localStorage.getItem("transactions")
);
let listTransactionsGeral =
  localStorage.getItem("transactions") !== null ? localStorageTransactions : [];
let listTransactions = [];

const updateLocalStorage = () => {
  localStorage.setItem("transactions", JSON.stringify(listTransactionsGeral));
};

const updateListaTransactions = () => {
  listTransactions = listTransactionsGeral.filter(
    (transaction) => transaction.id_usuario === UserAtualID
  );
};

const init = () => {
  tabela.replaceChildren();
  updateListaTransactions();
  listTransactions.forEach(addTransactionIntoDOM);
  ordenarInit();
  updateValorTotal();
};

const addTransactionIntoDOM = (transaction) => {
  const tipo = transaction.tipo == "Entrada" ? "corC2" : "corC3";
  const details = document.createElement("details");

  details.classList.add("tabela-item");
  details.innerHTML = `
  <summary class="tabela-item-texto">
    <p class="titulo fonte1-p corA5">${capitalizar(transaction.titulo)}</p>
    <p class="valor fonte1-p ${tipo}">R$ ${transaction.valor.toFixed(2)}</p>
    <p class="categoria fonte1-p corA5">${transaction.categoria}</p>
    <p class="data fonte1-p corA5">${transaction.data}</p>
    <div>
    <button class="editar" onClick="editTransaction(${transaction.id})">
      <img src="../img/icon-edit.svg">
    </button>
    <button class="excluir" onClick="removeTransaction(${transaction.id})">
      <img src="../img/icon-delete.svg">
    </button>
  </summary>
  <div class="tabela-item-descricao">
    <img src="../img/icon-up.svg">
      <p>${capitalizar(transaction.descricao)}</p>
  </div>`;

  const ordenarListTransations = () => {
    if (maisRecenteDisplay.classList.contains("ordenarEscolhido")) {
      tabela.prepend(details);
    } else if (maisAntigaDisplay.classList.contains("ordenarEscolhido")) {
      tabela.append(details);
    }
  };
  ordenarListTransations();
};

function ordenarInit() {
  switch (ordenar) {
    case "Data":
      ordenarData();
      break;
    case "Categoria":
      ordenarCategoria();
      break;
    case "maisRecente":
      ordenarMaisRecente();
      break;
    case "maisAntiga":
      ordenarMaisAntigo();
      break;
  }
}

function ordenarMaisRecente() {
  maisRecenteDisplay.classList.remove("ordenarEscolhido", "select");
  maisAntigaDisplay.classList.remove("ordenarEscolhido", "select");
  porDataDisplay.classList.remove("select");
  porCategoriaDisplay.classList.remove("select");
  maisRecenteDisplay.classList.add("ordenarEscolhido", "select");
  ordenar = `${maisRecenteDisplay.id}`;
  tabela.replaceChildren();
  listTransactions.forEach(addTransactionIntoDOM);
}
function ordenarMaisAntigo() {
  maisRecenteDisplay.classList.remove("ordenarEscolhido", "select");
  maisAntigaDisplay.classList.remove("ordenarEscolhido", "select");
  porDataDisplay.classList.remove("select");
  porCategoriaDisplay.classList.remove("select");
  maisAntigaDisplay.classList.add("ordenarEscolhido", "select");
  ordenar = `${maisAntigaDisplay.id}`;
  tabela.replaceChildren();
  listTransactions.forEach(addTransactionIntoDOM);
}

function ordenarCategoria() {
  listCategoria = listTransactions
    .slice()
    .sort((a, b) => a.categoria.localeCompare(b.categoria));
  tabela.replaceChildren();
  maisRecenteDisplay.classList.remove("ordenarEscolhido", "select");
  porDataDisplay.classList.remove("select");
  porCategoriaDisplay.classList.add("select");
  maisAntigaDisplay.classList.add("ordenarEscolhido");
  maisAntigaDisplay.classList.remove("select");
  tabela.replaceChildren();
  listCategoria.forEach(addTransactionIntoDOM);
}

function ordenarData() {
  listData = listTransactions
    .slice()
    .sort(
      (a, b) =>
        new Date(a.data.split("/").reverse().join("-")) -
        new Date(b.data.split("/").reverse().join("-"))
    );
  tabela.replaceChildren();
  maisAntigaDisplay.classList.remove("ordenarEscolhido", "select");
  porDataDisplay.classList.add("select");
  porCategoriaDisplay.classList.remove("select");
  maisRecenteDisplay.classList.add("ordenarEscolhido");
  maisRecenteDisplay.classList.remove("select");
  tabela.replaceChildren();
  listData.forEach(addTransactionIntoDOM);
}

const updateValorTotal = () => {
  listTransactions.forEach(function (transaction) {
    if (transaction.tipo == "Entrada") {
      transaction.amount = transaction.valor;
    } else if (transaction.tipo == "Saida") {
      transaction.amount = -transaction.valor;
    }
    const [dia, mes, ano] = transaction.data.split("/");
    transaction.mes = mes;
    transaction.ano = ano;
  });

  const transactionAmounts = listTransactions.map((transaction) =>
    transaction.mes === hojeMes && transaction.ano === hojeAno
      ? transaction.amount
      : 0
  );

  const total = transactionAmounts.reduce(
    (somatorio, transaction) => somatorio + transaction,
    0
  );
  const entradas = transactionAmounts
    .filter((valor) => valor > 0)
    .reduce((somatorio, transaction) => somatorio + transaction, 0)
    .toFixed(2);
  const saidas = transactionAmounts
    .filter((valor) => valor < 0)
    .reduce((somatorio, transaction) => somatorio + transaction, 0)
    .toFixed(2);

  totalDisplay.textContent = `R$ ${total}`;
  entradasDisplay.textContent = `R$ ${entradas}`;
  saidasDisplay.textContent = `R$ ${saidas}`;

  if (total >= 0) {
    divTotalDisplay.classList.remove("borderCorC3");
    cifraoTotalDisplay.classList.remove("corC3");
    divTotalDisplay.classList.add("borderCorC2");
    cifraoTotalDisplay.classList.add("corC2");
  } else {
    divTotalDisplay.classList.remove("borderCorC2");
    cifraoTotalDisplay.classList.remove("corC2");
    divTotalDisplay.classList.add("borderCorC3");
    cifraoTotalDisplay.classList.add("corC3");
  }
};


formAddTransacao.addEventListener("submit", (event) => {
  event.preventDefault();

  const TransacaoTitulo = inputTransacaoTitulo.value;
  const TransacaoValor = Number(inputTransacaoValor.value);
  const TransacaoTipo = document.querySelector(
    'input[name="novo-tipo"]:checked'
  ).value;
  const TransacaoCategoria = document.querySelector(
    'input[name="novo-categoria"]:checked'
  ).value;
  const TransacaoData = formatarData(inputTransacaoData.value);
  function formatarData(valor) {
    if (!valor) return "";
    const [ano, mes, dia] = valor.split("-");
    return `${dia}/${mes}/${ano}`;
  }
  let TransacaoDescricao = " ";
  if (inputTransacaoDescricao.value === "") {
    TransacaoDescricao = "Sem descrição!";
  } else {
    TransacaoDescricao = inputTransacaoDescricao.value;
  }

  const novaTransacao = new Transacao(
    UserAtualID,
    TransacaoTitulo,
    TransacaoValor,
    TransacaoTipo,
    TransacaoCategoria,
    TransacaoData,
    TransacaoDescricao
  );

  listTransactionsGeral.push(novaTransacao);
  init();
  updateLocalStorage();

  document.querySelector("#modal").classList.remove("modalAtivo");
  document.querySelector(".body").classList.remove("modalAtivo");
  limparInputAdd();
});

const categoriaNavP = document.querySelector(
  "#form-adicionarTransacao #inputCategoria p"
);
const categoriaNav = document.querySelector(
  "#form-adicionarTransacao #inputCategoria"
);
categoriaNav.onclick = function () {
  document
    .querySelector("#form-adicionarTransacao #categoria-options")
    .classList.toggle("modalAtivo1");
  categoriaNav.classList.toggle("modalAtivo1");
};

function categoriaEscolhida(element) {
  categoriaNavP.classList.add("corA5");
  categoriaNavP.innerHTML = `${element.textContent}`;
  document
    .querySelector("#form-adicionarTransacao #categoria-options")
    .classList.remove("modalAtivo1");
  categoriaNav.classList.remove("modalAtivo1");
}

const limparInputAdd = () => {
  inputTransacaoTitulo.value = "";
  inputTransacaoValor.value = "";
  inputTransacaoData.value = "";
  inputTransacaoDescricao.value = "";
  if (document.querySelector('input[name="novo-tipo"]:checked')) {
    document.querySelector('input[name="novo-tipo"]:checked').checked = false;
  }
  if (document.querySelector('input[name="novo-categoria"]:checked')) {
    document.querySelector(
      'input[name="novo-categoria"]:checked'
    ).checked = false;
  }
  categoriaNavP.classList.remove("corA5");
  categoriaNavP.innerHTML = `Escolha uma categoria`;
};

const removeTransaction = (ID) => {
  listTransactionsGeral = listTransactionsGeral.filter(
    (transaction) => transaction.id !== ID
  );

  updateLocalStorage();
  init();
};

const editTransaction = (ID) => {
  limparInputEdit();
  document.querySelector("#modalEdit").classList.toggle("modalAtivo");
  document.querySelector(".body").classList.toggle("modalAtivo");

  const selectTransaction = listTransactions.find(
    (transaction) => transaction.id === ID
  );
  inputEditTransacaoTitulo.value = `${capitalizar(selectTransaction.titulo)}`;
  inputEditTransacaoValor.value = selectTransaction.valor;

  document.querySelector(
    `input#editar-tipo-${selectTransaction.tipo}`
  ).checked = true;

  document.querySelector(
    `input#EditCategoria-${selectTransaction.categoria}`
  ).checked = true;
  EditCategoriaNavP.classList.add("corA5");
  EditCategoriaNavP.innerHTML = `${selectTransaction.categoria}`;
  document
    .querySelector("#form-editarTransacao #EditCategoria-options")
    .classList.remove("modalAtivo1");
  EditCategoriaNav.classList.remove("modalAtivo1");

  const [dia, mes, ano] = selectTransaction.data.split("/");
  inputEditTransacaoData.value = `${ano}-${mes}-${dia}`;
  inputEditTransacaoDescricao.value = capitalizar(selectTransaction.descricao);

  IDtransactionEditando = selectTransaction.id;
};

let IDtransactionEditando = 0;

formEditTransacao.addEventListener("submit", (event) => {
  event.preventDefault();

  const editTransaction = listTransactionsGeral.find(
    (t) => t.id === IDtransactionEditando
  );

  editTransaction.titulo = inputEditTransacaoTitulo.value;
  editTransaction.valor = Number(inputEditTransacaoValor.value);
  editTransaction.tipo = document.querySelector(
    'input[name="editar-tipo"]:checked'
  ).value;
  editTransaction.categoria = document.querySelector(
    'input[name="editar-categoria"]:checked'
  ).value;

  editTransaction.data = formatarData(inputEditTransacaoData.value);
  function formatarData(valor) {
    if (!valor) return "";
    const [ano, mes, dia] = valor.split("-");
    return `${dia}/${mes}/${ano}`;
  }

  let TransacaoDescricao1 = " ";
  if (inputEditTransacaoDescricao.value === "") {
    TransacaoDescricao1 = "Sem descrição!";
  } else {
    TransacaoDescricao1 = inputEditTransacaoDescricao.value;
  }
  editTransaction.descricao = TransacaoDescricao1;

  init();
  updateLocalStorage();

  document.querySelector("#modalEdit").classList.remove("modalAtivo");
  document.querySelector(".body").classList.remove("modalAtivo");
  limparInputEdit();
});

const EditCategoriaNavP = document.querySelector(
  "#form-editarTransacao #EditinputCategoria p"
);
const EditCategoriaNav = document.querySelector(
  "#form-editarTransacao #EditinputCategoria"
);
EditCategoriaNav.onclick = function () {
  document
    .querySelector("#form-editarTransacao #EditCategoria-options")
    .classList.toggle("modalAtivo1");
  EditCategoriaNav.classList.toggle("modalAtivo1");
};

const limparInputEdit = () => {
  inputEditTransacaoTitulo.value = "";
  inputEditTransacaoValor.value = "";
  inputEditTransacaoData.value = "";
  inputEditTransacaoDescricao.value = "";
  if (document.querySelector('input[name="editar-tipo"]:checked')) {
    document.querySelector('input[name="editar-tipo"]:checked').checked = false;
  }
  if (document.querySelector('input[name="editar-categoria"]:checked')) {
    document.querySelector(
      'input[name="editar-categoria"]:checked'
    ).checked = false;
  }
  EditCategoriaNavP.classList.remove("corA5");
  EditCategoriaNavP.innerHTML = `Escolha uma categoria`;
};

function EditCategoriaEscolhida(element) {
  EditCategoriaNavP.classList.add("corA5");
  EditCategoriaNavP.innerHTML = `${element.textContent}`;
  document
    .querySelector("#form-editarTransacao #EditCategoria-options")
    .classList.remove("modalAtivo1");
  EditCategoriaNav.classList.remove("modalAtivo1");
}

init();
ordenarData();
