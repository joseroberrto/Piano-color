const fases_melodia1 = [
    {
    nome:"parte1",
    sequencia:["green", "yellow-orange","yellow-green"]
    },
    {
    nome:"parte2",
    sequencia:["green", "yellow-orange","blue"]
    },
    {
    nome:"parte3",
    sequencia:["green", "yellow-orange","red2","green","yellow-orange"]
    },
    {
    nome:"parte4",
    sequencia:["orange", "purple","orange","green"]
    },

];

let faseAtual = 0;
let indicePasso = 0;

function verificarProgresso(corClicada) {
    const melodiaDaFase = fases_melodia1[faseAtual].sequencia;

    if (corClicada === melodiaDaFase[indicePasso]) {
        indicePasso++;

    if (indicePasso === melodiaDaFase.length) {
            mostrarFeedback(true);

            setTimeout(() => {
                proximaFase();
            }, 1500);
        }
    } else {
        mostrarFeedback(false);
    }
}

function proximaFase() {
    faseAtual++;
    indicePasso = 0;

    if (faseAtual < fases_melodia1.length) {
        console.log("Iniciando: " + fases_melodia1[faseAtual].nome);
        atualizarBolinhasNoPainel(); // Função para mudar as cores no topo
    } else {
        alert("Parabéns! Você completou a melodia inteira! 🎉");
        faseAtual = 0; // Reinicia o jogo
        iniciarjogo();
    }
}

function atualizarBolinhasNoPainel() {
    const coresNovaFase = fases_melodia1[faseAtual].sequencia;
    const container = document.querySelector(".melodia1");
    
    // Limpa o que está lá
    container.innerHTML = "";

    // Cria as novas bolinhas dinamicamente
    coresNovaFase.forEach((cor, index) => {
        const novaBolinha = document.createElement("div");
        novaBolinha.id = `cor${index + 1}`;
        novaBolinha.className = `cores cor-${cor}`; // Usa a classe de cor correspondente
        container.appendChild(novaBolinha);

        // Adiciona o sinal de "+" entre elas, exceto na última
        if (index < coresNovaFase.length - 1) {
            const mais = document.createElement("span");
            mais.className = "mais";
            mais.textContent = "+";
            container.appendChild(mais);
        }
    });
}



function iniciarjogo(){
    console.log('botão clicado');
    const menu = document.getElementById('menu');
    menu.style.display = 'none';

    const jogo = document.getElementById('jogo');
    jogo.style.display = 'flex';

    faseAtual = 0;
    indicePasso = 0;
    
    atualizarBolinhasNoPainel();
   
}


function tocarSom(nota) {
    const audio = new Audio (`AUDIO/${nota}.mp3`);
    audio.play().catch(e => console.log("Erro ao tocar som:",e));
}

const teclas = document.querySelectorAll(".key");

teclas.forEach(tecla => {
    tecla.addEventListener("click", () => {
        const corEscolhida = tecla.dataset.color;
        const notaTocada = tecla.dataset.note;

        if (notaTocada) {
            tocarSom(notaTocada);
        }

        if (!corEscolhida) return;

        verificarProgresso(corEscolhida);

    });
});

function mostrarFeedback(sucesso) {
    const feedback = document.getElementById("feedback");
    if (!feedback) return;

    feedback.textContent = sucesso ? "Acertou! 🎉" : "Ops! Tente novamente. ❌";
    feedback.className = `feedback ${sucesso ? "acerto" : "erro"} show`;

    // Remove a mensagem depois de 1.2 segundos
    setTimeout(() => {
        feedback.className = "feedback";
    }, 1200);
}