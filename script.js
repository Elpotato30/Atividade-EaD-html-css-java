// Guarda a nota (de 1 a 5) escolhida em cada categoria.
// Valor 0 significa que o usuário ainda não avaliou.
const notas = {
  direcao: 0,
  roteiro: 0,
  terror: 0,
  fidelidade: 0
};

// Cria as 5 estrelas de cada categoria assim que a página carrega.
// Para cada categoria, gera 5 elementos <span> com o símbolo ★
// e define o que acontece ao clicar em cada um.
function criarEstrelas() {
  for (const categoria in notas) {
    const container = document.getElementById("estrelas-" + categoria);

    for (let i = 1; i <= 5; i++) {
      const estrela = document.createElement("span");
      estrela.className = "estrela";
      estrela.textContent = "★";
      // Ao clicar, chama a função que registra a nota da categoria.
      estrela.onclick = function () {
        escolherNota(categoria, i);
      };
      container.appendChild(estrela);
    }
  }
}

// FUNCIONALIDADE 1: registrar a nota de uma categoria.
// Executada quando o usuário clica em uma estrela.
// Pinta de dourado as estrelas até a que foi clicada e apaga as demais.
function escolherNota(categoria, valor) {
  notas[categoria] = valor;

  const estrelas = document.getElementById("estrelas-" + categoria).children;
  for (let i = 0; i < estrelas.length; i++) {
    // classList.toggle com segundo parâmetro: adiciona a classe se for true, remove se for false.
    estrelas[i].classList.toggle("ativa", i < valor);
  }
}

// FUNCIONALIDADE 2: calcular a nota final.
// Executada ao clicar em "Calcular nota final".
// Soma as notas, divide pela quantidade de categorias e mostra o resultado na tela.
function calcularNotaFinal() {
  const resultado = document.getElementById("resultadoNota");
  const valores = Object.values(notas);

  // Se alguma categoria ainda não foi avaliada, avisa o usuário.
  if (valores.includes(0)) {
    resultado.textContent = "Avalie todas as categorias antes de calcular a nota final.";
    return;
  }

  const soma = valores.reduce(function (total, nota) {
    return total + nota;
  }, 0);
  const media = soma / valores.length;

  // toFixed(1) mostra a média com uma casa decimal.
  resultado.textContent = "Nota final: " + media.toFixed(1) + " de 5 estrelas";
}

// FUNCIONALIDADE 3: mostrar e ocultar a ficha técnica.
// Executada ao clicar no botão "Mostrar ficha técnica".
function mostrarOcultarFicha() {
  const ficha = document.getElementById("ficha");
  const botao = document.getElementById("btnFicha");

  // Adiciona ou remove a classe "oculto" (que esconde o elemento no CSS).
  const estaOculta = ficha.classList.toggle("oculto");

  // Troca o texto do botão conforme o estado da lista.
  botao.textContent = estaOculta ? "Mostrar ficha técnica" : "Ocultar ficha técnica";
}

// FUNCIONALIDADE 4: publicar a opinião escrita.
// Executada ao clicar em "Publicar opinião".
// Pega o texto digitado no campo e o exibe em uma caixa na página.
function publicarOpiniao() {
  const campo = document.getElementById("campoOpiniao");
  const caixa = document.getElementById("opiniaoPublicada");

  // trim() remove espaços em branco do começo e do fim do texto.
  const texto = campo.value.trim();

  if (texto === "") {
    alert("Escreva sua opinião antes de publicar!");
    return;
  }

  // textContent insere o texto de forma segura (sem interpretar HTML).
  caixa.textContent = "Minha opinião: " + texto;
  caixa.classList.remove("oculto");
}

// Chama a função que cria as estrelas quando a página termina de carregar.
criarEstrelas();
