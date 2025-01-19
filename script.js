// Variáveis globais
let currentPage = 1;
const totalPages = 4; // Número total de páginas

// Função para exibir a página específica
function showPage(pageNumber) {
    for (let i = 1; i <= totalPages; i++) {
        document.getElementById('page' + i).style.display = i === pageNumber ? 'block' : 'none';
    }

    // Atualiza os botões "Anterior" e "Próximo"
    document.querySelectorAll('button').forEach((button) => {
        if (button.textContent.includes('Anterior')) button.disabled = pageNumber === 1;
        if (button.textContent.includes('Próximo')) button.disabled = pageNumber === totalPages;
    });

    currentPage = pageNumber;
}

// Função para ir para a próxima página
function nextPage() {
    const currentPageQuestions = document.querySelectorAll(`#page${currentPage} input[type="radio"]`);

    if (currentPage < totalPages) showPage(currentPage + 1);
}

// Função para voltar à página anterior
function prevPage() {
    if (currentPage > 1) showPage(currentPage - 1);
}

// Função para concluir o questionário e calcular o resultado
function submitQuiz() {
    let score = 0;
    const totalQuestions = 4; // Número fixo de questões
    let resultHtml = '<h3>Resultado do Quiz</h3>';
    const formElements = document.getElementById('quizForm').elements;

    for (let element of formElements) {
        if (element.type === 'radio' && element.checked) {
            // Verifica se a resposta está correta
            const isCorrect = element.getAttribute('data-correct') === 'true';
            const questionNumber = element.name;

            if (isCorrect) {
                score++;
                resultHtml += `<p>${questionNumber}: <span class="correct">Resposta correta!</span></p>`;
            } else {
                resultHtml += `<p>${questionNumber}: <span class="incorrect">Resposta incorreta.</span></p>`;
            }
        }
    }

    // Calcula o percentual de acerto
    const percentage = (score / totalQuestions) * 100;
    resultHtml += `<p>Você acertou ${score} de ${totalQuestions} perguntas.</p>`;
    resultHtml += `<p>Percentual de acerto: ${percentage.toFixed(2)}%</p>`;
    resultHtml += '<button onclick="location.reload()">Tentar novamente</button>';

    // Exibe o resultado
    const resultContainer = document.getElementById('result');
    resultContainer.innerHTML = resultHtml;
    resultContainer.style.display = 'block';
    window.scrollTo(0, 0); // Move para o topo da página
}

// Inicializa na primeira página
document.addEventListener('DOMContentLoaded', () => showPage(1));
