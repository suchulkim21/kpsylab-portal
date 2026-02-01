export class QuestionManager {
    constructor(stageId, questions, nextUrl) {
        this.stageId = stageId;
        this.questions = questions;
        this.nextUrl = nextUrl;
        this.currentIndex = 0;
        this.answers = {};

        this.init();
    }

    init() {
        // Load saved progress if any
        const savedProgress = localStorage.getItem(`mnps_progress_${this.stageId}`);
        if (savedProgress) {
            this.currentIndex = parseInt(savedProgress, 10);
        }

        // If starting from the beginning, clear previous data to prevent score pollution
        if (this.currentIndex === 0) {
            localStorage.removeItem(`mnps_answers_${this.stageId}`);
            localStorage.removeItem(`mnps_score_${this.stageId}`);
        }

        this.renderQuestion();
    }

    renderQuestion() {
        const container = document.getElementById('question-container');
        const progressFill = document.getElementById('progress-fill');

        if (this.currentIndex >= this.questions.length) {
            this.finishStage();
            return;
        }

        // Start timer for response latency tracking
        this.questionStartTime = Date.now();

        const question = this.questions[this.currentIndex];
        const progress = ((this.currentIndex) / this.questions.length) * 100;

        progressFill.style.width = `${progress}%`;

        container.innerHTML = `
            <div class="question-card fade-in">
                <h3 class="question-text">${question.text}</h3>
                <div class="options-grid">
                    ${question.options.map((opt, idx) => `
                        <button class="option-btn" onclick="qm.selectAnswer(${idx}, ${opt.score})">
                            ${opt.text}
                        </button>
                    `).join('')}
                </div>
            </div>
        `;
    }

    selectAnswer(optionIndex, score) {
        // Calculate response latency
        const latency = Date.now() - this.questionStartTime;

        // Save answer
        this.answers[this.currentIndex] = score;

        // Save individual answers to localStorage
        const storedAnswers = JSON.parse(localStorage.getItem(`mnps_answers_${this.stageId}`) || '{}');
        storedAnswers[this.currentIndex] = score;
        localStorage.setItem(`mnps_answers_${this.stageId}`, JSON.stringify(storedAnswers));

        // Save Metadata (Latency & Pattern)
        const storedMetadata = JSON.parse(localStorage.getItem(`mnps_metadata_${this.stageId}`) || '{}');
        storedMetadata[this.currentIndex] = {
            latency: latency,
            score: score,
            timestamp: Date.now()
        };
        localStorage.setItem(`mnps_metadata_${this.stageId}`, JSON.stringify(storedMetadata));

        // Calculate total score
        const totalScore = Object.values(storedAnswers).reduce((a, b) => a + b, 0);
        localStorage.setItem(`mnps_score_${this.stageId}`, totalScore);

        // Move to next
        this.currentIndex++;
        localStorage.setItem(`mnps_progress_${this.stageId}`, this.currentIndex);

        this.renderQuestion();
    }

    finishStage() {
        window.location.href = this.nextUrl;
    }
}
