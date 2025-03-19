const quizData = [
    {
        question: "O que significa 'let' em JavaScript?",
        answers: [
            { text: "Declara uma variável mutável com escopo de bloco", correct: true },
            { text: "Declara uma variável constante", correct: false },
            { text: "Declara uma função", correct: false }
        ]
    },
    {
        question: "Quando usar 'const' em vez de 'let'?",
        answers: [
            { text: "Quando a variável nunca será reatribuída", correct: true },
            { text: "Quando a variável pode ser redeclarada", correct: false },
            { text: "Quando for uma variável global", correct: false }
        ]
    },
    {
        question: "Qual é a principal característica de 'var'?",
        answers: [
            { text: "Possui escopo de bloco", correct: false },
            { text: "Possui escopo de função", correct: true },
            { text: "Não pode ser redeclarada", correct: false }
        ]
    },
    {
        question: "Qual é a estrutura correta de um if-else?",
        answers: [
            { text: "if condição { código } else { código }", correct: true },
            { text: "if condição [ código ] else [ código ]", correct: false },
            { text: "if código then else", correct: false }
        ]
    },
    {
        question: "Qual destas frases está correta sobre 'if'? ",
        answers: [
            { text: "É usado para verificar condições", correct: true },
            { text: "Declara variáveis imutáveis", correct: false },
            { text: "Sempre roda independentemente da condição", correct: false }
        ]
    }
];

let currentQuestionIndex = 0;
let score = 0;

const questionContainer = document.getElementById("question-container");

// Função para carregar a pergunta
function loadQuestion() {
    questionContainer.innerHTML = ""; // Limpa o conteúdo anterior

    const currentQuestion = quizData[currentQuestionIndex];

    // Adiciona a pergunta
    const questionElement = document.createElement("div");
    questionElement.classList.add("question");
    questionElement.textContent = currentQuestion.question;
    questionContainer.appendChild(questionElement);

    // Adiciona as respostas como botões
    currentQuestion.answers.forEach((answer) => {
        const button = document.createElement("button");
        button.textContent = answer.text;
        button.classList.add("answer-btn");
        button.addEventListener("click", () => selectAnswer(button, answer.correct));
        questionContainer.appendChild(button);
    });
}

// Função para selecionar uma resposta
function selectAnswer(button, correct) {
    if (correct) {
        button.classList.add("correct");
        score++;
    } else {
        button.classList.add("wrong");
    }

    // Aguarda um momento antes de ir para a próxima pergunta
    setTimeout(() => {
        currentQuestionIndex++;
        if (currentQuestionIndex < quizData.length) {
            loadQuestion();
        } else {
            showResult();
        }
    }, 1000);
}

// Função para exibir o resultado final
function showResult() {
    if (score === 0) {
        // Caso o usuário erre todas as perguntas
        questionContainer.innerHTML = `
            <h2>Fim do Quiz!</h2>
            <p>Amador, fraco... volte quando tiver aprendido mais sobre JavaScript!</p>
        `;
    } else if (score > quizData.length / 2) {
        // Caso o usuário acerte mais da metade das perguntas
        questionContainer.innerHTML = `
            <h2>Fim do Quiz!</h2>
            <p>Está no caminho certo (mas ainda tem muita coisa pela frente)</p>
        `;
    } else {
        // Caso o usuário tenha um desempenho mediano
        questionContainer.innerHTML = `
            <h2>Fim do Quiz!</h2>
            <p>Você acertou ${score} de ${quizData.length} perguntas.</p>
        `;
    }
}

// Inicia o quiz
loadQuestion();
