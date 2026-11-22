// ==========================================================
// JOGO.JS - lógica da cruzadinha
// Depende de dados.js (PALAVRAS, TOTAL_LINHAS, TOTAL_COLUNAS, VIDAS_INICIAIS)
// ==========================================================

// ----- Elementos da página -----
var el = {
  tabuleiro: document.getElementById("tabuleiro"),
  dicaTitulo: document.getElementById("dica-titulo"),
  dicaTexto: document.getElementById("dica-texto"),
  acertos: document.getElementById("contador-acertos"),
  vidas: document.getElementById("vidas"),
  resultado: document.getElementById("resultado"),
  listaHorizontal: document.getElementById("lista-horizontal"),
  listaVertical: document.getElementById("lista-vertical"),
  alerta: document.getElementById("alerta"),
  telaFim: document.getElementById("tela-fim"),
  fimTitulo: document.getElementById("fim-titulo"),
  fimAcertos: document.getElementById("fim-acertos"),
  fimAproveitamento: document.getElementById("fim-aproveitamento")
};

// ----- Estado do jogo -----
var celulas = [];        // celulas[linha][coluna] = input, ou null se a casa não tem letra
var estado = [];         // estado[i] = true quando a palavra i já foi acertada
var erradas = {};        // erradas[i] = true quando o Conferir marcou a palavra i como errada
var indiceDica = 0;      // palavra em destaque
var vidas = VIDAS_INICIAIS;
var encerrado = false;
var inicioArrasto = null;
var timerAlerta = null;

// ----- Funções auxiliares -----

// posição da letra k da palavra p no tabuleiro
function posicaoDaLetra(p, k) {
  if (p.direcao === "horizontal") {
    return { linha: p.linha, coluna: p.coluna + k };
  }
  return { linha: p.linha + k, coluna: p.coluna };
}

// índice da palavra que começa nessa casa com essa direção (-1 se não houver)
function palavraQueComeca(linha, coluna, direcao) {
  for (var i = 0; i < PALAVRAS.length; i++) {
    var p = PALAVRAS[i];
    if (p.linha === linha && p.coluna === coluna && p.direcao === direcao) {
      return i;
    }
  }
  return -1;
}

// índice de uma palavra que passa por essa casa (-1 se nenhuma)
function palavraQuePassaPor(linha, coluna) {
  for (var i = 0; i < PALAVRAS.length; i++) {
    for (var k = 0; k < PALAVRAS[i].resposta.length; k++) {
      var pos = posicaoDaLetra(PALAVRAS[i], k);
      if (pos.linha === linha && pos.coluna === coluna) {
        return i;
      }
    }
  }
  return -1;
}

// texto digitado na palavra i, ou null se alguma casa estiver vazia
function lerLetras(i) {
  var p = PALAVRAS[i];
  var texto = "";
  for (var k = 0; k < p.resposta.length; k++) {
    var pos = posicaoDaLetra(p, k);
    var valor = celulas[pos.linha][pos.coluna].value;
    if (valor === "") {
      return null;
    }
    texto = texto + valor;
  }
  return texto;
}

// rótulo curto, ex.: "3 Horizontal"
function rotulo(i) {
  var tipo = PALAVRAS[i].direcao === "horizontal" ? "Horizontal" : "Vertical";
  return PALAVRAS[i].numero + " " + tipo;
}

function contarAcertos() {
  var total = 0;
  for (var i = 0; i < PALAVRAS.length; i++) {
    if (estado[i]) {
      total = total + 1;
    }
  }
  return total;
}

// ----- Numeração (em ordem de leitura) -----
function numerarPalavras() {
  var numero = 0;
  for (var l = 0; l < TOTAL_LINHAS; l++) {
    for (var c = 0; c < TOTAL_COLUNAS; c++) {
      var comecaAlguma = false;
      for (var i = 0; i < PALAVRAS.length; i++) {
        if (PALAVRAS[i].linha === l && PALAVRAS[i].coluna === c) {
          comecaAlguma = true;
          PALAVRAS[i].numero = numero + 1;
        }
      }
      if (comecaAlguma) {
        numero = numero + 1;
      }
    }
  }
}

// número a mostrar na casa (0 = sem número)
function numeroDaCasa(linha, coluna) {
  for (var i = 0; i < PALAVRAS.length; i++) {
    if (PALAVRAS[i].linha === linha && PALAVRAS[i].coluna === coluna) {
      return PALAVRAS[i].numero;
    }
  }
  return 0;
}

// ----- Montagem do tabuleiro -----
function montarTabuleiro() {
  // matriz vazia
  for (var l = 0; l < TOTAL_LINHAS; l++) {
    celulas[l] = [];
    for (var c = 0; c < TOTAL_COLUNAS; c++) {
      celulas[l][c] = null;
    }
  }
  // marca as casas que têm letra
  for (var i = 0; i < PALAVRAS.length; i++) {
    for (var k = 0; k < PALAVRAS[i].resposta.length; k++) {
      var pos = posicaoDaLetra(PALAVRAS[i], k);
      celulas[pos.linha][pos.coluna] = "marca";
    }
  }

  // desenha a tabela
  el.tabuleiro.innerHTML = "";
  for (var linha = 0; linha < TOTAL_LINHAS; linha++) {
    var tr = document.createElement("tr");
    for (var coluna = 0; coluna < TOTAL_COLUNAS; coluna++) {
      var td = document.createElement("td");
      if (celulas[linha][coluna] === null) {
        td.className = "casa-bloqueada";
      } else {
        var numero = numeroDaCasa(linha, coluna);
        if (numero > 0) {
          var span = document.createElement("span");
          span.className = "numero-casa";
          span.textContent = numero;
          td.appendChild(span);
        }
        var input = criarCelula(linha, coluna);
        celulas[linha][coluna] = input;
        td.appendChild(input);
      }
      tr.appendChild(td);
    }
    el.tabuleiro.appendChild(tr);
  }
}

// cria o input de uma casa e liga os eventos
function criarCelula(linha, coluna) {
  var input = document.createElement("input");
  input.type = "text";
  input.maxLength = 1;
  input.className = "celula";
  input.setAttribute("aria-label", "Linha " + (linha + 1) + ", coluna " + (coluna + 1));

  // digitar: converte para maiúscula, limpa marcações e vai para a próxima casa
  input.addEventListener("input", function () {
    input.value = input.value.toUpperCase();
    erradas = {};
    pintar();
    var proxima = null;
    if (coluna + 1 < TOTAL_COLUNAS && celulas[linha][coluna + 1]) {
      proxima = celulas[linha][coluna + 1];
    } else if (linha + 1 < TOTAL_LINHAS && celulas[linha + 1][coluna]) {
      proxima = celulas[linha + 1][coluna];
    }
    if (proxima && proxima.value === "") {
      proxima.focus();
    }
  });

  // começo do arraste: guarda a casa e destaca a palavra que passa por ela
  input.addEventListener("mousedown", function () {
    inicioArrasto = { linha: linha, coluna: coluna };
    var i = palavraQuePassaPor(linha, coluna);
    if (i !== -1) {
      indiceDica = i;
    }
    mostrarDica();
    pintar();
  });

  // fim do arraste: valida a palavra
  input.addEventListener("mouseup", function () {
    if (inicioArrasto !== null) {
      validarArrasto(inicioArrasto, { linha: linha, coluna: coluna });
    }
    inicioArrasto = null;
  });

  return input;
}

// ----- Pintura: cores, destaque e travamento de palavras certas -----
function pintar() {
  for (var l = 0; l < TOTAL_LINHAS; l++) {
    for (var c = 0; c < TOTAL_COLUNAS; c++) {
      if (celulas[l][c] !== null) {
        celulas[l][c].className = "celula";
        celulas[l][c].readOnly = false;
      }
    }
  }
  for (var i = 0; i < PALAVRAS.length; i++) {
    for (var k = 0; k < PALAVRAS[i].resposta.length; k++) {
      var pos = posicaoDaLetra(PALAVRAS[i], k);
      var input = celulas[pos.linha][pos.coluna];
      if (i === indiceDica) {
        input.classList.add("destaque");
      }
      if (erradas[i]) {
        input.classList.add("errada");
      }
      if (estado[i]) {
        input.classList.add("certa");
        input.readOnly = true;
      }
    }
  }
}

// ----- Validação por arraste (começo -> fim da palavra) -----
function validarArrasto(a, b) {
  if (encerrado) {
    return;
  }
  // clique simples serve só para digitar
  if (a.linha === b.linha && a.coluna === b.coluna) {
    return;
  }

  var direcao;
  if (a.linha === b.linha) {
    direcao = "horizontal";
  } else if (a.coluna === b.coluna) {
    direcao = "vertical";
  } else {
    mostrarAlerta("Arraste em linha reta: na horizontal ou na vertical.", "erro");
    return;
  }

  var linhaIni = Math.min(a.linha, b.linha);
  var colunaIni = Math.min(a.coluna, b.coluna);
  var tamanho;
  if (direcao === "horizontal") {
    tamanho = Math.abs(b.coluna - a.coluna) + 1;
  } else {
    tamanho = Math.abs(b.linha - a.linha) + 1;
  }

  var i = palavraQueComeca(linhaIni, colunaIni, direcao);
  if (i === -1) {
    mostrarAlerta("Esse trecho não corresponde a nenhuma palavra da cruzadinha.", "erro");
    return;
  }

  var p = PALAVRAS[i];
  if (p.resposta.length !== tamanho) {
    mostrarAlerta("Arraste do começo ao fim da palavra inteira.", "erro");
    return;
  }

  indiceDica = i;
  mostrarDica();

  if (estado[i]) {
    mostrarAlerta("Você já acertou essa palavra!", "sucesso");
    pintar();
    return;
  }

  var digitado = lerLetras(i);
  if (digitado === null) {
    mostrarAlerta("Preencha todas as letras antes de validar.", "erro");
    return;
  }

  if (digitado === p.resposta) {
    estado[i] = true;
    mostrarAlerta("Acertou! Palavra " + p.numero + " certa.", "sucesso");
  } else {
    vidas = vidas - 1;
    erradas = {};
    erradas[i] = true;
    mostrarAlerta("Palavra errada! Você perdeu uma vida.", "erro");
  }

  atualizar();

  if (vidas <= 0) {
    finalizar(false);
  } else if (contarAcertos() === PALAVRAS.length) {
    finalizar(true);
  }
}

// ----- Botão Conferir: mostra certas e erradas -----
function conferir() {
  if (encerrado) {
    return;
  }
  erradas = {};
  var certas = [];
  var listaErradas = [];
  var incompletas = 0;

  for (var i = 0; i < PALAVRAS.length; i++) {
    if (estado[i]) {
      certas.push(rotulo(i));
      continue;
    }
    var digitado = lerLetras(i);
    if (digitado === null) {
      incompletas = incompletas + 1;
    } else if (digitado === PALAVRAS[i].resposta) {
      estado[i] = true;
      certas.push(rotulo(i));
    } else {
      erradas[i] = true;
      listaErradas.push(rotulo(i));
    }
  }

  vidas = Math.max(0, vidas - listaErradas.length);

  var texto = "Certas: " + (certas.length > 0 ? certas.join(", ") : "nenhuma") + ".";
  texto = texto + " Erradas: " + (listaErradas.length > 0 ? listaErradas.join(", ") : "nenhuma") + ".";
  if (incompletas > 0) {
    texto = texto + " Incompletas: " + incompletas + ".";
  }
  if (listaErradas.length > 0) {
    texto = texto + " Você perdeu " + listaErradas.length +
      (listaErradas.length === 1 ? " vida." : " vidas.");
  }
  el.resultado.textContent = texto;

  atualizar();

  if (vidas === 0) {
    finalizar(false);
  } else if (contarAcertos() === PALAVRAS.length) {
    finalizar(true);
  }
}

// ----- Botão Reiniciar -----
function reiniciar() {
  for (var i = 0; i < PALAVRAS.length; i++) {
    estado[i] = false;
  }
  for (var l = 0; l < TOTAL_LINHAS; l++) {
    for (var c = 0; c < TOTAL_COLUNAS; c++) {
      if (celulas[l][c] !== null) {
        celulas[l][c].value = "";
      }
    }
  }
  erradas = {};
  vidas = VIDAS_INICIAIS;
  indiceDica = 0;
  encerrado = false;
  el.resultado.textContent = "";
  el.telaFim.classList.add("oculto");
  mostrarDica();
  atualizar();
}

// ----- Placar e pintura juntos -----
function atualizar() {
  atualizarPlacar();
  pintar();
}

function atualizarPlacar() {
  el.acertos.textContent = contarAcertos() + " de " + PALAVRAS.length + " palavras";
  var coracoes = "";
  for (var v = 0; v < vidas; v++) {
    coracoes = coracoes + "♥ ";
  }
  if (coracoes === "") {
    coracoes = "nenhuma";
  }
  el.vidas.textContent = "Vidas: " + coracoes;
}

// ----- Dicas: anterior, próxima e lista -----
function mostrarDica() {
  var p = PALAVRAS[indiceDica];
  var tipo = p.direcao === "horizontal" ? "Horizontal" : "Vertical";
  el.dicaTitulo.textContent = "Dica " + (indiceDica + 1) + " de " + PALAVRAS.length +
    " · " + p.numero + " " + tipo;
  el.dicaTexto.textContent = p.dica;
}

function dicaAnterior() {
  indiceDica = indiceDica - 1;
  if (indiceDica < 0) {
    indiceDica = PALAVRAS.length - 1;
  }
  mostrarDica();
  pintar();
}

function dicaProxima() {
  indiceDica = indiceDica + 1;
  if (indiceDica >= PALAVRAS.length) {
    indiceDica = 0;
  }
  mostrarDica();
  pintar();
}

function montarListas() {
  el.listaHorizontal.innerHTML = "";
  el.listaVertical.innerHTML = "";
  for (var i = 0; i < PALAVRAS.length; i++) {
    var p = PALAVRAS[i];
    var li = document.createElement("li");
    li.textContent = p.numero + ". " + p.dica;
    li.setAttribute("data-indice", i);
    li.addEventListener("click", aoClicarNaPista);
    if (p.direcao === "horizontal") {
      el.listaHorizontal.appendChild(li);
    } else {
      el.listaVertical.appendChild(li);
    }
  }
}

function aoClicarNaPista(evento) {
  indiceDica = Number(evento.currentTarget.getAttribute("data-indice"));
  mostrarDica();
  pintar();
}

// ----- Alerta (pop-up) -----
function mostrarAlerta(mensagem, tipo) {
  el.alerta.textContent = mensagem;
  el.alerta.className = "alerta " + tipo;
  if (timerAlerta !== null) {
    clearTimeout(timerAlerta);
  }
  timerAlerta = setTimeout(function () {
    el.alerta.className = "alerta oculto";
  }, 2500);
}

// ----- Fim de jogo -----
function finalizar(venceu) {
  encerrado = true;
  var acertos = contarAcertos();
  var aproveitamento = Math.round((acertos / PALAVRAS.length) * 100);
  if (venceu) {
    el.fimTitulo.textContent = "Parabéns, você completou a cruzadinha!";
  } else {
    el.fimTitulo.textContent = "Fim de jogo, suas vidas acabaram.";
  }
  el.fimAcertos.textContent = "Acertos: " + acertos + " de " + PALAVRAS.length + " palavras";
  el.fimAproveitamento.textContent = "Aproveitamento: " + aproveitamento + "%";
  el.telaFim.classList.remove("oculto");
}

// ----- Ligação dos botões e eventos gerais -----
document.getElementById("btn-anterior").addEventListener("click", dicaAnterior);
document.getElementById("btn-proxima").addEventListener("click", dicaProxima);
document.getElementById("btn-conferir").addEventListener("click", conferir);
document.getElementById("btn-reiniciar").addEventListener("click", reiniciar);
document.getElementById("btn-jogar-novamente").addEventListener("click", reiniciar);

// soltar o mouse fora de uma casa cancela o arraste
document.addEventListener("mouseup", function () {
  inicioArrasto = null;
});

// ----- Início -----
for (var i = 0; i < PALAVRAS.length; i++) {
  estado[i] = false;
}
numerarPalavras();
montarTabuleiro();
montarListas();
atualizar();
mostrarDica();
