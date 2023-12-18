const mario = document.querySelector(".mario");
const canoVerde = document.querySelector(".obstaculo");
const pontuacaoElemento = document.getElementById("pontuacao");
const telaGameOver = document.getElementById("telaGameOver");
const pontuacaoFinalElemento = document.getElementById("pontuacaoFinal");

let pontuacao = 0;

const pulo = () => { 
  mario.classList.add("pular");

  setTimeout(() => {
    mario.classList.remove("pular");
  }, 500);
};

const atualizarPontuacao = () => {
  pontuacao += 1;
  pontuacaoElemento.innerText = 'Pontuação: ' + pontuacao;

  if (pontuacao >= 10000) {
    telaGameOver.style.display = 'block';
    pontuacaoFinalElemento.innerText = pontuacao;
    pontuacaoElemento.innerText = 'Você ganhou!';
    clearInterval(loop);
  }
};

const loop = setInterval(() => {
  const posicaoObstaculo = canoVerde.offsetLeft
  const posicaoMario = +window.getComputedStyle(mario).bottom.replace('px', '')

  if(posicaoObstaculo <= 120 && posicaoObstaculo > 0 && posicaoMario < 80) {
      canoVerde.style.animation = 'none'
      canoVerde.style.left = `${posicaoObstaculo}px`

      mario.style.animation = 'none'
      mario.style.left = `${mario}px`

      mario.src = 'images/game-over.png'
      mario.style.width = '75px'
      mario.style.marginLeft = '50px'

      telaGameOver.style.display = 'block';
      pontuacaoFinalElemento.innerText = pontuacao;

      clearInterval(loop);
  } else {
      atualizarPontuacao();
  }
}, 10);


document.addEventListener("keydown", function(event) {
  if (event.key === " ") { 
    event.preventDefault();
    pulo();
  }
});


function obterParametroUrl(nome) {
  var urlParams = new URLSearchParams(window.location.search);
  return urlParams.get(nome);
}

var nomeJogador = obterParametroUrl('nome');
if (nomeJogador) {
  var nomeJogadorElemento = document.getElementById('nomeJogador');
  nomeJogadorElemento.innerText = 'Player: ' + nomeJogador;
}

function voltarParaIndex() {
  window.location.href = "index.html";
}

function recomecarJogo() {
  window.location.href = "game.html?nome=" + nomeJogador;
}