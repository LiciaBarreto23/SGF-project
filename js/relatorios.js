localStorageUserId = JSON.parse(localStorage.getItem("UserAtualID"));
UserAtualID =
  localStorage.getItem("UserAtualID") !== null ? localStorageUserId : [];

const localStorageTransactions = JSON.parse(
  localStorage.getItem("transactions")
);
let listTransactionsGeral =
  localStorage.getItem("transactions") !== null ? localStorageTransactions : [];

let listTransactions = listTransactionsGeral.filter(transaction => transaction.id_usuario === UserAtualID)

const buttonAno = document.querySelector("#buttonAno span");
buttonAno.onclick = function () {
  document.querySelector("#ano-options").classList.toggle("modalAtivo");
};
document.addEventListener("click", (event) => {
  if (!buttonAno.contains(event.target)) {
    document.querySelector("#ano-options").classList.remove("modalAtivo");
  }
});
const buttonMes = document.querySelector("#buttonMes span");
buttonMes.onclick = function () {
  document.querySelector("#mes-options").classList.toggle("modalAtivo");
};
document.addEventListener("click", (event) => {
  if (!buttonMes.contains(event.target)) {
    document.querySelector("#mes-options").classList.remove("modalAtivo");
  }
});

const hoje = new Date().toISOString().split("T")[0];
const [hojeAno, hojeMes, hojedia] = hoje.split("-");

document.querySelector(`input#mes-${hojeMes}`).checked = true;
document.querySelector(`input#ano-${hojeAno}`).checked = true;

const anoNavP = document.querySelector("#buttonAno span p");
const mesNavP = document.querySelector("#buttonMes span p");

const insufDado = document.querySelector("#insuf-dados")

const dashboard = document.querySelector("#dashboard");

function atualizarNavP() {
  const inputAnoChecked = document.querySelector('input[name="ano"]:checked');
  const inputMesChecked = document.querySelector('input[name="mes"]:checked');
  anoNavP.innerHTML = `${inputAnoChecked.value}`;
  mesNavP.innerHTML = `${inputMesChecked.value}`;

  init();
}

function closeModal() {
  document.querySelector("#mes-options").classList.remove("modalAtivo");
  document.querySelector("#ano-options").classList.remove("modalAtivo");
}

const updateDadoEscolhido = () => {
  insufDado.classList.remove("pAtivo")
  const mesEscolhido = document
    .querySelector('input[name="mes"]:checked')
    .getAttribute("id")
    .split("mes-")[1];
  const anoEscolhido = document
    .querySelector('input[name="ano"]:checked')
    .getAttribute("id")
    .split("ano-")[1];
  
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

  //grafico 1
  const transactionGeral = listTransactions.map((transaction) =>
    transaction.mes === mesEscolhido && transaction.ano === anoEscolhido
      ? transaction.amount
      : 0
  );

  const totalGeral = transactionGeral.reduce(
    (somatorio, transaction) => somatorio + transaction,
    0
  );
  const entradasGeral = Number(
    transactionGeral
      .filter((valor) => valor > 0)
      .reduce((somatorio, transaction) => somatorio + transaction, 0)
      .toFixed(2)
  );
  const saidasGeral = Number(
    Math.abs(
      transactionGeral
        .filter((valor) => valor < 0)
        .reduce((somatorio, transaction) => somatorio + transaction, 0)
        .toFixed(2)
    )
  );

  //grafico 2
  const catAlimentacao = listTransactions.map((transaction) =>
    transaction.mes === mesEscolhido &&
    transaction.ano === anoEscolhido &&
    transaction.categoria === "Alimentação"
      ? transaction.amount
      : 0
  );
  const AlimentacaoGeral = catAlimentacao.reduce(
    (somatorio, transaction) => somatorio + transaction,
    0
  );
  const Alimetacao = { nome: "Alimentação", valor: AlimentacaoGeral };

  const catEducacao = listTransactions.map((transaction) =>
    transaction.mes === mesEscolhido &&
    transaction.ano === anoEscolhido &&
    transaction.categoria === "Educação"
      ? transaction.amount
      : 0
  );
  const EducacaoGeral = catEducacao.reduce(
    (somatorio, transaction) => somatorio + transaction,
    0
  );
  const Educacao = { nome: "Educação", valor: EducacaoGeral };

  const catLazer = listTransactions.map((transaction) =>
    transaction.mes === mesEscolhido &&
    transaction.ano === anoEscolhido &&
    transaction.categoria === "Lazer"
      ? transaction.amount
      : 0
  );
  const LazerGeral = catLazer.reduce(
    (somatorio, transaction) => somatorio + transaction,
    0
  );
  const Lazer = { nome: "Lazer", valor: LazerGeral };

  const catMoradia = listTransactions.map((transaction) =>
    transaction.mes === mesEscolhido &&
    transaction.ano === anoEscolhido &&
    transaction.categoria === "Moradia"
      ? transaction.amount
      : 0
  );
  const MoradiaGeral = catMoradia.reduce(
    (somatorio, transaction) => somatorio + transaction,
    0
  );
  const Moradia = { nome: "Moradia", valor: MoradiaGeral };

  const catPessoal = listTransactions.map((transaction) =>
    transaction.mes === mesEscolhido &&
    transaction.ano === anoEscolhido &&
    transaction.categoria === "Pessoal"
      ? transaction.amount
      : 0
  );
  const PessoalGeral = catPessoal.reduce(
    (somatorio, transaction) => somatorio + transaction,
    0
  );
  const Pessoal = { nome: "Pessoal", valor: PessoalGeral };

  const catSaude = listTransactions.map((transaction) =>
    transaction.mes === mesEscolhido &&
    transaction.ano === anoEscolhido &&
    transaction.categoria === "Saude"
      ? transaction.amount
      : 0
  );
  const SaudeGeral = catSaude.reduce(
    (somatorio, transaction) => somatorio + transaction,
    0
  );
  const Saude = { nome: "Saude", valor: SaudeGeral };

  const catTransporte = listTransactions.map((transaction) =>
    transaction.mes === mesEscolhido &&
    transaction.ano === anoEscolhido &&
    transaction.categoria === "Transporte"
      ? transaction.amount
      : 0
  );
  const TransporteGeral = catTransporte.reduce(
    (somatorio, transaction) => somatorio + transaction,
    0
  );
  const Transporte = { nome: "Transporte", valor: TransporteGeral };

  const catTrabalho = listTransactions.map((transaction) =>
    transaction.mes === mesEscolhido &&
    transaction.ano === anoEscolhido &&
    transaction.categoria === "Trabalho"
      ? transaction.amount
      : 0
  );
  const TrabalhoGeral = catTrabalho.reduce(
    (somatorio, transaction) => somatorio + transaction,
    0
  );
  const Trabalho = { nome: "Trabalho", valor: TrabalhoGeral };

  const catOutros = listTransactions.map((transaction) =>
    transaction.mes === mesEscolhido &&
    transaction.ano === anoEscolhido &&
    transaction.categoria === "Outros"
      ? transaction.amount
      : 0
  );
  const OutrosGeral = catOutros.reduce(
    (somatorio, transaction) => somatorio + transaction,
    0
  );
  const Outros = { nome: "Outros", valor: OutrosGeral };

  //Grafico 3
  const transactionJaneiro = listTransactions.map((transaction) =>
    transaction.mes === "01" && transaction.ano === anoEscolhido
      ? transaction.amount
      : 0
  );
  const JaneiroGeral = transactionJaneiro.reduce(
    (somatorio, transaction) => somatorio + transaction,
    0
  );
  const Janeiro = { nome: "Janeiro", valor: JaneiroGeral };

  const transactionFevereiro = listTransactions.map((transaction) =>
    transaction.mes === "02" && transaction.ano === anoEscolhido
      ? transaction.amount
      : 0
  );
  const FevereiroGeral = transactionFevereiro.reduce(
    (somatorio, transaction) => somatorio + transaction,
    0
  );
  const Fevereiro = { nome: "Fevereiro", valor: FevereiroGeral };

  const transactionMarço = listTransactions.map((transaction) =>
    transaction.mes === "03" && transaction.ano === anoEscolhido
      ? transaction.amount
      : 0
  );
  const MarçoGeral = transactionMarço.reduce(
    (somatorio, transaction) => somatorio + transaction,
    0
  );
  const Março = { nome: "Março", valor: MarçoGeral };

  const transactionAbril = listTransactions.map((transaction) =>
    transaction.mes === "04" && transaction.ano === anoEscolhido
      ? transaction.amount
      : 0
  );
  const AbrilGeral = transactionAbril.reduce(
    (somatorio, transaction) => somatorio + transaction,
    0
  );
  const Abril = { nome: "Abril", valor: AbrilGeral };

  const transactionMaio = listTransactions.map((transaction) =>
    transaction.mes === "05" && transaction.ano === anoEscolhido
      ? transaction.amount
      : 0
  );
  const MaioGeral = transactionMaio.reduce(
    (somatorio, transaction) => somatorio + transaction,
    0
  );
  const Maio = { nome: "Maio", valor: MaioGeral };

  const transactionJunho = listTransactions.map((transaction) =>
    transaction.mes === "06" && transaction.ano === anoEscolhido
      ? transaction.amount
      : 0
  );
  const JunhoGeral = transactionJunho.reduce(
    (somatorio, transaction) => somatorio + transaction,
    0
  );
  const Junho = { nome: "Junho", valor: JunhoGeral };

  const transactionJulho = listTransactions.map((transaction) =>
    transaction.mes === "07" && transaction.ano === anoEscolhido
      ? transaction.amount
      : 0
  );
  const JulhoGeral = transactionJulho.reduce(
    (somatorio, transaction) => somatorio + transaction,
    0
  );
  const Julho = { nome: "Julho", valor: JulhoGeral };

  const transactionAgosto = listTransactions.map((transaction) =>
    transaction.mes === "08" && transaction.ano === anoEscolhido
      ? transaction.amount
      : 0
  );
  const AgostoGeral = transactionAgosto.reduce(
    (somatorio, transaction) => somatorio + transaction,
    0
  );
  const Agosto = { nome: "Agosto", valor: AgostoGeral };

  const transactionSetembro = listTransactions.map((transaction) =>
    transaction.mes === "09" && transaction.ano === anoEscolhido
      ? transaction.amount
      : 0
  );
  const SetembroGeral = transactionSetembro.reduce(
    (somatorio, transaction) => somatorio + transaction,
    0
  );
  const Setembro = { nome: "Setembro", valor: SetembroGeral };

  const transactionOutubro = listTransactions.map((transaction) =>
    transaction.mes === "10" && transaction.ano === anoEscolhido
      ? transaction.amount
      : 0
  );
  const OutubroGeral = transactionOutubro.reduce(
    (somatorio, transaction) => somatorio + transaction,
    0
  );
  const Outubro = { nome: "Outubro", valor: OutubroGeral };

  const transactionNovembro = listTransactions.map((transaction) =>
    transaction.mes === "11" && transaction.ano === anoEscolhido
      ? transaction.amount
      : 0
  );
  const NovembroGeral = transactionNovembro.reduce(
    (somatorio, transaction) => somatorio + transaction,
    0
  );
  const Novembro = { nome: "Novembro", valor: NovembroGeral };

  const transactionDezembro = listTransactions.map((transaction) =>
    transaction.mes === "12" && transaction.ano === anoEscolhido
      ? transaction.amount
      : 0
  );
  const DezembroGeral = transactionDezembro.reduce(
    (somatorio, transaction) => somatorio + transaction,
    0
  );
  const Dezembro = { nome: "Dezembro", valor: DezembroGeral };

  criarGrafico1(
    document.querySelector('input[name="mes"]:checked').value,
    document.querySelector('input[name="ano"]:checked').value,
    totalGeral,
    entradasGeral,
    saidasGeral
  );
  criarGrafico2(
    document.querySelector('input[name="mes"]:checked').value,
    document.querySelector('input[name="ano"]:checked').value,
    Alimetacao,
    Educacao,
    Lazer,
    Moradia,
    Pessoal,
    Saude,
    Transporte,
    Trabalho,
    Outros
  );
  criarGrafico3(
    document.querySelector('input[name="mes"]:checked').value,
    document.querySelector('input[name="ano"]:checked').value,
    Janeiro,
    Fevereiro,
    Março,
    Abril,
    Maio,
    Junho,
    Julho,
    Agosto,
    Setembro,
    Outubro,
    Novembro,
    Dezembro
  );
  const length = (listTransactions.filter(transaction => transaction.mes === mesEscolhido && transaction.ano === anoEscolhido)).length
  if(length===0){
    insufDado.classList.add("pAtivo")
  }  
};

const criarGrafico1 = (
  mesEscolhido,
  anoEscolhido,
  totalGeral,
  entradasGeral,
  saidasGeral
) => {
  const grafico = document.createElement("div");
  grafico.innerHTML = `<canvas id="grafico1" width="500" height="350"></canvas>`;
  dashboard.prepend(grafico);

  const ctx = document.getElementById("grafico1");
  new Chart(ctx, {
    type: "bar",
    data: {
      labels: ["Entradas", "Saidas", "Total"],
      datasets: [
        {
          label: `Valor`,
          data: [entradasGeral, saidasGeral, totalGeral],
          borderWidth: 1,
          backgroundColor: [
            "rgba(53, 138, 0, 0.8)",
            "rgba(195, 0, 0, 0.8)",
            "rgba(27, 82, 153, 0.8)",
          ],
          borderColor: [
            "rgb(53, 138, 0)",
            "rgb(195, 0, 0)",
            "rgb(27, 82, 153)",
          ],
        },
      ],
    },
    options: {
      plugins: {
        title: {
          display: true,
          text: `Balanço Geral ${mesEscolhido} ${anoEscolhido}`,
        },
        legend: {
          display: false,
        },
      },
      scales: {
        y: {
          beginAtZero: true,
        },
      },
    },
  });
};

const criarGrafico2 = (
  mesEscolhido,
  anoEscolhido,
  Alimetacao,
  Educacao,
  Lazer,
  Moradia,
  Pessoal,
  Saude,
  Transporte,
  Trabalho,
  Outros
) => {
  const grafico = document.createElement("div");
  grafico.innerHTML = `<canvas id="grafico2" width="350" height="350"></canvas>`;
  dashboard.append(grafico);

  const ctx = document.getElementById("grafico2");
  new Chart(ctx, {
    type: "pie",
    data: {
      labels: [
        Alimetacao.nome,
        Educacao.nome,
        Lazer.nome,
        Moradia.nome,
        Pessoal.nome,
        Saude.nome,
        Transporte.nome,
        Trabalho.nome,
        Outros.nome,
      ],
      datasets: [
        {
          label: `Valor`,
          data: [
            Alimetacao.valor,
            Educacao.valor,
            Lazer.valor,
            Moradia.valor,
            Pessoal.valor,
            Saude.valor,
            Transporte.valor,
            Trabalho.valor,
            Outros.valor,
          ],
          borderWidth: 1,
          backgroundColor: [
            "rgba(255, 99, 132, 0.8)",
            "rgba(38, 224, 198, 0.8)",
            "rgba(224, 185, 38, 0.8)",
            "rgba(130, 66, 167, 0.8)",
            "rgba(54, 162, 235, 0.8)",
            "rgba(126, 225, 33, 0.8)",
            "rgba(36, 89, 224, 0.8)",
            "rgba(224, 102, 26, 0.8)",
            "rgba(70, 139, 130, 0.8)",
          ],
          borderColor: [
            "rgb(255, 99, 132)",
            "rgb(38, 224, 198)",
            "rgb(224, 185, 38)",
            "rgb(130, 66, 167)",
            "rgb(54, 162, 235)",
            "rgb(126, 225, 33)",
            "rgb(36, 89, 224)",
            "rgb(224, 102, 26)",
            "rgb(70, 139, 130)",
          ],
        },
      ],
    },
    options: {
      plugins: {
        title: {
          display: true,
          text: `Gastor por Categoria - ${mesEscolhido}`,
        },
        legend: {
          display: true,
        },
      },
    },
  });
};

const criarGrafico3 = (
  mesEscolhido,
  anoEscolhido,
  Janeiro,
  Fevereiro,
  Março,
  Abril,
  Maio,
  Junho,
  Julho,
  Agosto,
  Setembro,
  Outubro,
  Novembro,
  Dezembro
) => {
  const grafico = document.createElement("div");
  grafico.innerHTML = `<canvas id="grafico3" width="500" height="350"></canvas>`;
  dashboard.append(grafico);

  const ctx = document.getElementById("grafico3");
  new Chart(ctx, {
    type: "line",
    data: {
      labels: [
        Janeiro.nome,
        Fevereiro.nome,
        Março.nome,
        Abril.nome,
        Maio.nome,
        Junho.nome,
        Julho.nome,
        Agosto.nome,
        Setembro.nome,
        Outubro.nome,
        Novembro.nome,
        Dezembro.nome,
      ],
      datasets: [
        {
          label: `Valor`,
          data: [
            Janeiro.valor,
            Fevereiro.valor,
            Março.valor,
            Abril.valor,
            Maio.valor,
            Junho.valor,
            Julho.valor,
            Agosto.valor,
            Setembro.valor,
            Outubro.valor,
            Novembro.valor,
            Dezembro.valor,
          ],
          borderWidth: 2,
          backgroundColor: ["rgb(27, 82, 153)"],
          borderColor: ["rgba(27, 82, 153, 0.6)"],
        },
      ],
    },
    options: {
      plugins: {
        title: {
          display: true,
          text: `Valor Total ${anoEscolhido}`,
        },
        legend: {
          display: false,
        },
      },
    },
  });
};

const init = () => {
  dashboard.replaceChildren();
  insufDado.classList.remove("pAtivo")
  updateDadoEscolhido();
};

init();
