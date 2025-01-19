// Variáveis globais
let currentPage = 1;
const totalPages = 6; // Atualizado conforme o número correto de páginas

function showPage(pageNumber) {
    // Oculta todas as páginas e exibe apenas a página atual
    for (let i = 1; i <= totalPages; i++) {
        document.getElementById('page' + i).style.display = i === pageNumber ? 'block' : 'none';
    }

    // Atualiza o estado dos botões "Anterior" e "Próxima"
    document.querySelectorAll('button').forEach((button) => {
        if (button.textContent.includes('Anterior')) button.disabled = pageNumber === 1;
        if (button.textContent.includes('Próxima')) button.disabled = pageNumber === totalPages;
    });

    currentPage = pageNumber;
}

function nextPage() {
    if (currentPage < totalPages) showPage(currentPage + 1);
}

function prevPage() {
    if (currentPage > 1) showPage(currentPage - 1);
}

function submitQuiz() {
    let score = 0;
    let totalQuestions = 0;
    let resultHtml = '<h3>Resultado do Quiz</h3>';
    const formElements = document.getElementById('quizForm').elements;

    // Itera sobre todos os elementos do formulário
    for (let element of formElements) {
        if (element.type === 'radio' && element.checked) {
            totalQuestions++;

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
    const percentage = totalQuestions > 0 ? (score / totalQuestions) * 100 : 0;
    resultHtml += `<p>Você acertou ${score} de ${totalQuestions} perguntas.</p>`;
    resultHtml += `<p>Percentual de acerto: ${percentage.toFixed(2)}%</p>`;

    // Exibe o resultado no gabarito
    const resultContainer = document.getElementById('result');
    resultContainer.innerHTML = resultHtml;
    resultContainer.style.display = 'block';
    window.scrollTo(0, 0); // Move para o topo da página
}

// Inicializa na primeira página
showPage(currentPage);
