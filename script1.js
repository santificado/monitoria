document.addEventListener("DOMContentLoaded", () => {
    let currentPage = 1;
    const totalPages = 6;

    function showPage(pageNumber) {
        for (let i = 1; i <= totalPages; i++) {
            const pageElement = document.getElementById('page' + i);
            if (pageElement) {
                pageElement.style.display = i === pageNumber ? 'block' : 'none';
            } else {
                console.error(`Elemento 'page${i}' não encontrado!`);
            }
        }
        currentPage = pageNumber;
    }

    function nextPage() {
        if (currentPage < totalPages) {
            currentPage++;
            showPage(currentPage);
        }
    }

    function prevPage() {
        if (currentPage > 1) {
            currentPage--;
            showPage(currentPage);
        }
    }

    function submitQuiz() {
        let score = 0;
        let totalQuestions = 0;
        let resultHtml = '<h3>Resultado do Quiz</h3>';
        const formElements = document.getElementById('quizForm').elements;

        for (let element of formElements) {
            if (element.type === 'radio' && element.checked) {
                const userAnswer = element.getAttribute('value');
                const correctAnswer = element.getAttribute('data-correct');
                totalQuestions++;

                if (userAnswer === correctAnswer) {
                    score++;
                    resultHtml += `<p>${element.name}: <span class="correct">Resposta correta!</span></p>`;
                } else {
                    resultHtml += `<p>${element.name}: <span class="incorrect">Resposta incorreta.</span> <span class="correct-answer">Resposta correta: ${correctAnswer}</span></p>`;
                }
            }
        }

        const percentage = (score / totalQuestions) * 100;
        resultHtml += `<p>Você acertou ${score} de ${totalQuestions} perguntas.</p>`;
        resultHtml += `<p>Percentual de acerto: ${percentage.toFixed(2)}%</p>`;

        document.getElementById('result').innerHTML = resultHtml;
        document.getElementById('result').style.display = 'block';
        window.scrollTo(0, 0);
    }

    // Exibir a primeira página ao carregar a página
    showPage(currentPage);

    // Expor funções globalmente se necessário
    window.nextPage = nextPage;
    window.prevPage = prevPage;
    window.submitQuiz = submitQuiz;
});
