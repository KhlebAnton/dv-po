document.addEventListener('DOMContentLoaded', () => {

    const btnOpenQuize = document.querySelectorAll('[data-btn-modal="quize"]');
    const modalQuize = document.querySelector('.modal-overlay[data-modal="quize"]');

    if (!modalQuize) return;

    const closeButtonQuize = modalQuize.querySelector('.modal-close');

    const steps = modalQuize.querySelectorAll('.quiz-step');
    const nextBtn = modalQuize.querySelector('.quiz-next');
    const prevBtn = modalQuize.querySelector('.quiz-prev');

    const resultBlock = modalQuize.querySelector('.quiz-result');
    const resultTitle = modalQuize.querySelector('.result-title');
    const resultText = modalQuize.querySelector('.result-text');
    

    const contactBlock = modalQuize.querySelector('.quiz-contact');
    const showContactBtn = modalQuize.querySelector('.show-contact-form');

    const quizNav = modalQuize.querySelector('.quiz-nav');

    let currentStep = 0;

    let quizData = {
        q1: '',
        q2: '',
        q3: '',
        q4: '',
        q5: '',
        score: 0,
        result: ''
    };

 function showStep(index) {

    steps.forEach(step => {
        step.classList.remove('active');
    });

    steps[index].classList.add('active');

    if (index === 0) {
        prevBtn.disabled= true;
    } else {
        prevBtn.disabled= false;
    }

    const checked = steps[index].querySelector(
        'input[type="radio"]:checked'
    );

    nextBtn.disabled = !checked;

    nextBtn.textContent =
        index === steps.length - 1
            ? 'Рассчитать'
            : 'Далее';
}

    function resetQuiz() {

        currentStep = 0;

        quizData = {
            q1: '',
            q2: '',
            q3: '',
            q4: '',
            q5: '',
            score: 0,
            result: ''
        };

        modalQuize.querySelectorAll('input[type="radio"]').forEach(input => {
            input.checked = false;
        });

        steps.forEach(step => {
            step.style.display = '';
            step.classList.remove('active');
        });

        resultBlock.style.display = 'none';
        contactBlock.style.display = 'none';

        quizNav.style.display = 'flex';
        nextBtn.disabled = true;
        showStep(0);
    }

    function openModalQuize() {
        resetQuiz();

        modalQuize.classList.add('is-open');
        document.body.style.overflow = 'hidden';
    }

    function closeModalQuize() {
        modalQuize.classList.remove('is-open');
        document.body.style.overflow = '';
    }

    function calculateResult() {

        const q1 = modalQuize.querySelector('[name="q1"]:checked');
        const q2 = modalQuize.querySelector('[name="q2"]:checked');
        const q3 = modalQuize.querySelector('[name="q3"]:checked');
        const q4 = modalQuize.querySelector('[name="q4"]:checked');
        const q5 = modalQuize.querySelector('[name="q5"]:checked');

        const score =
            Number(q1?.value || 0) +
            Number(q2?.value || 0) +
            Number(q3?.value || 0) +
            Number(q4?.value || 0);

        const riskProduction =
            q1?.dataset?.risk === 'true';

        quizData.q1 = q1?.nextElementSibling?.textContent.trim() || '';
        quizData.q2 = q2?.nextElementSibling?.textContent.trim() || '';
        quizData.q3 = q3?.nextElementSibling?.textContent.trim() || '';
        quizData.q4 = q4?.nextElementSibling?.textContent.trim() || '';
        quizData.q5 = q5?.nextElementSibling?.textContent.trim() || '';

        quizData.score = score;

        steps.forEach(step => {
            step.style.display = 'none';
        });

        quizNav.style.display = 'none';

        resultBlock.style.display = 'flex';

        if (riskProduction) {

            quizData.result =
                'Высокий риск отказа (производство за пределами РФ)';

            resultTitle.textContent =
                'По совокупности ответов сейчас высокий риск отказа';

            resultText.textContent =
                'По части критериев нужна более глубокая проверка. Это нормально: большинство компаний на этом этапе не знают точного ответа. Более точную оценку требований и формы документа возможно провести только после аудита. Оставьте заявку или позвоните нам, чтобы узнать подробности.';
showContactBtn.textContent = 'Получить консультацию';
            return;
        }

        if (score >= 5) {

            quizData.result =
                'Высокий шанс включения в реестр';

            resultTitle.textContent =
                'У вас высокий шанс включения в реестр!';

            resultText.textContent =
                'По вашим ответам продукция предварительно соответствует базовым критериям реестра. Но точную оценку требований и формы документа возможно провести только после аудита. Оставьте заявку или позвоните нам, чтобы узнать подробности.';
showContactBtn.textContent = 'Узнать про аудит';

        } else if (score >= 2) {

            quizData.result =
                'Нужна предварительная проверка';

            resultTitle.textContent =
                'Нужна предварительная проверка';

            resultText.textContent =
                'По нескольким критериям ваша продукция пока не дотягивает до требований реестра – это может быть связано с местом производства, долей иностранных компонентов, правами на документацию или комплектом документов. Точную причину и реальные варианты решения покажет аудит.';
showContactBtn.textContent = 'Узнать про аудит';

        } else {

            quizData.result =
                'Высокий риск отказа';

            resultTitle.textContent =
                'По совокупности ответов сейчас высокий риск отказа';

            resultText.textContent =
                'По нескольким критериям ваша продукция пока не дотягивает до требований реестра – это может быть связано с местом производства, долей иностранных компонентов, правами на документацию или комплектом документов.';
showContactBtn.textContent = 'Получить консультацию';
        
            }

        console.log('QUIZ DATA', quizData);

        const hiddenInput =
            modalQuize.querySelector('[name="quiz_result"]');

        if (hiddenInput) {

            hiddenInput.value = JSON.stringify(quizData);
        }
    }

    showStep(0);
    steps.forEach(step => {

    const radios = step.querySelectorAll(
        'input[type="radio"]'
    );

    radios.forEach(radio => {

        radio.addEventListener('change', () => {

            nextBtn.disabled = false;

        });

    });

});

    nextBtn.addEventListener('click', () => {

        const current = steps[currentStep];

        const checked =
            current.querySelector('input[type="radio"]:checked');

        if (!checked) {
            alert('Выберите вариант ответа');
            return;
        }

        if (currentStep < steps.length - 1) {

            currentStep++;

            showStep(currentStep);

            return;
        }

        calculateResult();
    });

    prevBtn.addEventListener('click', () => {

        if (currentStep === 0) return;

        currentStep--;

        showStep(currentStep);
    });

    showContactBtn.addEventListener('click', () => {

        resultBlock.style.display = 'none';

        contactBlock.style.display = 'flex';
    });

    modalQuize.addEventListener('click', e => {

        if (e.target === modalQuize) {
            closeModalQuize();
        }
    });

    if (closeButtonQuize) {
        closeButtonQuize.addEventListener('click', closeModalQuize);
    }

    document.addEventListener('keydown', e => {

        if (
            e.key === 'Escape' &&
            modalQuize.classList.contains('is-open')
        ) {
            closeModalQuize();
        }
    });

    btnOpenQuize.forEach(button => {

        button.addEventListener('click', e => {

            e.preventDefault();

            openModalQuize();
        });
    });

});