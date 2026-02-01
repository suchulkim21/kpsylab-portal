import { feedback } from '/modules/text/feedback.js';
import { archetypes } from '/modules/text/archetypes.js';
import { AssessmentEngine } from '/modules/engine/assessment_engine.js';

document.addEventListener('DOMContentLoaded', async () => {
    const urlParams = new URLSearchParams(window.location.search);
    const resultId = urlParams.get('id');

    // Chart Instances
    let radarChart = null;
    let subTraitChart = null;

    // 1. Fetch Result Data
    try {
        let resultData = null;

        // Priority 1: Fetch from Server if ID exists
        if (resultId) {
            try {
                const response = await fetch(`/api/results/${resultId}`);
                if (response.ok) {
                    const json = await response.json();
                    if (json.success) {
                        resultData = json;
                    }
                }
            } catch (e) {
                console.error('Failed to fetch from server:', e);
            }
        }

        // Priority 2: Load from localStorage (Fallback)
        if (!resultData) {
            const storedResult = localStorage.getItem('mnps_last_result');
            if (storedResult) {
                const parsed = JSON.parse(storedResult);
                if (!resultId || parsed.resultId == resultId) {
                    resultData = parsed;
                }
            }
        }

        // Priority 2.5: Calculate from Answers (Client-side Fallback)
        if (!resultData) {
            console.log('Calculating result from local answers...');
            try {
                const engine = new AssessmentEngine();
                const analysis = engine.getAnalysis();

                // Check if we have valid scores (at least one non-zero)
                const totalScore = Object.values(analysis.scores).reduce((a, b) => a + b, 0);
                if (totalScore > 0) {
                    resultData = analysis;
                    // Save for future use
                    localStorage.setItem('mnps_last_result', JSON.stringify(resultData));
                }
            } catch (e) {
                console.warn('Failed to calculate from local answers:', e);
            }
        }

        // Priority 3: Dummy Data (Last Resort)
        if (!resultData) {
            console.warn('No result data found. Using dummy data.');
            resultData = generateDummyData();
        }

        await renderResults(resultData);

    } catch (error) {
        console.error('Error loading results:', error);
    }

    // 2. Render Functions
    async function renderResults(data) {
        const scores = data.scores;
        const report = data.report || {}; // Ensure report exists

        // Update Visual Score Bars
        const scoreIds = ['machiavellianism', 'narcissism', 'psychopathy', 'sadism'];
        scoreIds.forEach(trait => {
            const score = scores[trait] || 0; // Default to 0 if undefined
            const textEl = document.getElementById(`score-text-${trait}`);
            const barEl = document.getElementById(`bar-${trait}`);

            if (textEl) textEl.textContent = `${score} / 50`;
            if (barEl) {
                barEl.style.width = `${(score / 50) * 100}%`;
                // Color Logic based on score
                if (score >= 35) barEl.style.backgroundColor = '#FF5252'; // High
                else if (score >= 21) barEl.style.backgroundColor = '#FFC107'; // Mid
                else barEl.style.backgroundColor = '#4CAF50'; // Low
            }
        });

        // --- Visual Enhancements ---

        // 1. Percentile Rank (Mock Logic based on total score)
        const totalScore = Object.values(scores).reduce((a, b) => a + b, 0);
        let percentile = 50;
        if (totalScore > 160) percentile = 1;
        else if (totalScore > 140) percentile = 5;
        else if (totalScore > 120) percentile = 10;
        else if (totalScore > 100) percentile = 20;
        else percentile = 100 - Math.floor((totalScore / 200) * 100);

        const percentileEl = document.getElementById('percentile-rank');
        if (percentileEl) {
            percentileEl.textContent = `TOP ${percentile}%`;
            percentileEl.style.color = percentile <= 10 ? '#ff3333' : 'var(--color-accent-primary)';
        }

        // --- Reliability Check (Silent Analysis) ---
        let reliabilityIssues = [];
        const stages = ['machiavellianism', 'narcissism', 'psychopathy', 'sadism'];
        let totalFastResponses = 0;
        let totalQuestions = 0;

        stages.forEach(stage => {
            const metadata = JSON.parse(localStorage.getItem(`mnps_metadata_${stage}`) || '{}');
            const answers = JSON.parse(localStorage.getItem(`mnps_answers_${stage}`) || '{}');
            const keys = Object.keys(metadata);
            totalQuestions += keys.length;

            // Check Speed (Latency < 800ms)
            keys.forEach(k => {
                if (metadata[k].latency < 800) totalFastResponses++;
            });

            // Check Pattern (Straight-lining: 5+ identical answers)
            const answerValues = Object.values(answers);
            let consecutive = 1;
            for (let i = 1; i < answerValues.length; i++) {
                if (answerValues[i] === answerValues[i - 1]) {
                    consecutive++;
                    if (consecutive >= 5) {
                        if (!reliabilityIssues.includes('Pattern')) reliabilityIssues.push('Pattern');
                    }
                } else {
                    consecutive = 1;
                }
            }
        });

        // Threshold: > 30% fast responses
        if (totalQuestions > 0 && (totalFastResponses / totalQuestions) > 0.3) {
            reliabilityIssues.push('Speeding');
        }

        // Render Reliability Badge if issues exist
        if (reliabilityIssues.length > 0) {
            const infoSection = document.querySelector('.info-section');
            const badge = document.createElement('div');

            let title = '';
            let message = '';
            let color = '#ff0055';

            if (reliabilityIssues.includes('Speeding') && reliabilityIssues.includes('Pattern')) {
                title = '⚠️ 데이터 오염 경고 (Data Corruption)';
                message = '당신의 데이터에서 심각한 신뢰성 결함이 발견되었습니다.<br>이 결과는 당신의 <strong>가면(Mask)</strong>일 뿐, 진짜 모습이 아닐 수 있습니다.';
            } else if (reliabilityIssues.includes('Speeding')) {
                title = '⚡ 충동성 감지 (Impulsivity Detected)';
                message = '당신의 응답 속도는 비정상적으로 빠릅니다.<br>이것은 당신의 <strong>직관</strong>입니까, 아니면 진실을 마주하기 싫은 <strong>회피</strong>입니까?';
                color = '#ffcc00'; // Yellow for impulsivity
            } else if (reliabilityIssues.includes('Pattern')) {
                title = '🎭 기만 행위 감지 (Deception Detected)';
                message = '기계적인 응답 패턴이 포착되었습니다.<br>시스템을 속이려 하지 마십시오. 우리는 당신의 <strong>무성의함</strong>까지 분석합니다.';
            }

            badge.style.cssText = `
                background: rgba(20, 20, 20, 0.8);
                border: 1px solid ${color};
                color: #fff;
                padding: 20px;
                border-radius: 8px;
                margin-bottom: 20px;
                text-align: center;
                font-size: 0.95rem;
                animation: fadeIn 1s;
                box-shadow: 0 0 15px ${color}40;
            `;
            badge.innerHTML = `
                <strong style="display:block; margin-bottom:10px; color:${color}; font-size:1.1rem;">${title}</strong>
                <p style="margin:0; line-height:1.5; color:#ccc;">${message}</p>
            `;
            // Insert after Rank Badge
            if (infoSection && document.querySelector('.rank-badge')) {
                infoSection.insertBefore(badge, document.querySelector('.rank-badge').nextSibling);
            }
        }

        // --- Content Logic ---

        // Determine dominant trait
        const sortedTraits = Object.keys(scores).sort((a, b) => scores[b] - scores[a]);
        const dominantTrait = sortedTraits[0];
        const secondaryTrait = sortedTraits[1];

        // Determine Level
        let level = 'mid';
        if (scores[dominantTrait] >= 35) level = 'high';
        else if (scores[dominantTrait] <= 20) level = 'low';

        const traitData = feedback[dominantTrait][level];

        // 3. Shadow Self (Archetype) & Animation
        const archetypeTitleEl = document.getElementById('archetype-title');
        const archetypeSloganEl = document.getElementById('archetype-slogan');
        const archetypeDescEl = document.getElementById('archetype-desc');

        // New Dominant Feedback Elements
        const dominantFeedbackEl = document.getElementById('dominant-feedback');
        const dominantReactionEl = document.getElementById('dominant-reaction');
        const dominantLongDescEl = document.getElementById('dominant-long-desc');

        // Try combination key first
        const comboKey = [dominantTrait, secondaryTrait].sort().join('_');
        let archetypeData = archetypes[comboKey];

        // Fallback
        if (!archetypeData) {
            archetypeData = archetypes[dominantTrait];
        }

        if (archetypeTitleEl && archetypeDescEl && archetypeData) {
            // Animation Sequence
            setTimeout(() => {
                // 1. Title Reveal
                archetypeTitleEl.textContent = archetypeData.title;
                archetypeTitleEl.classList.add('reveal-1');

                // 2. Slogan (Quote) Reveal
                const sloganText = archetypeData.quote || "\"Darkness reveals truth.\"";
                archetypeSloganEl.textContent = sloganText;
                archetypeSloganEl.classList.add('reveal-2');

                // 3. Description Reveal
                archetypeDescEl.textContent = archetypeData.description;
                archetypeDescEl.classList.add('reveal-3');

                // 4. Dominant Feedback Reveal
                if (dominantFeedbackEl && traitData) {
                    dominantReactionEl.textContent = `"${traitData.reaction}"`;
                    dominantLongDescEl.innerHTML = traitData.long_desc;
                    dominantFeedbackEl.style.opacity = '1';
                    dominantFeedbackEl.classList.add('reveal-4');
                }
            }, 1500); // 1.5s delay for "Calculating..." effect
        }

        // Render Locked Content
        const shadowMasteryEl = document.getElementById('result-shadow-mastery');
        if (shadowMasteryEl && traitData) {
            shadowMasteryEl.innerHTML = traitData.shadow_mastery;
        }

        const blindSpotsEl = document.getElementById('result-blind-spots');
        if (blindSpotsEl && traitData) {
            blindSpotsEl.innerHTML = traitData.blind_spots;
        }

        const relationshipsEl = document.getElementById('result-relationships');
        if (relationshipsEl && traitData) {
            relationshipsEl.innerHTML = traitData.relationships;
        }

        const careerGuideEl = document.getElementById('result-career-guide');
        if (careerGuideEl && traitData) {
            careerGuideEl.innerHTML = traitData.career_guide;
        }

        // Render Radar Chart (Octagon of Darkness)
        const canvasRadar = document.getElementById('radarChart');
        if (canvasRadar) {
            if (typeof Chart !== 'undefined') {
                try {
                    const ctxRadar = canvasRadar.getContext('2d');

                    // Custom Gradient for Radar
                    const gradientRadar = ctxRadar.createRadialGradient(
                        canvasRadar.width / 2, canvasRadar.height / 2, 0,
                        canvasRadar.width / 2, canvasRadar.height / 2, canvasRadar.width / 2
                    );
                    gradientRadar.addColorStop(0, 'rgba(0, 255, 136, 0.4)'); // Center bright
                    gradientRadar.addColorStop(1, 'rgba(0, 255, 136, 0.05)'); // Edge fade

                    // Calculate Bridge Traits (Derived Scoring)
                    const dominance = (scores.narcissism + scores.machiavellianism) / 2;
                    const coldBloodedness = (scores.machiavellianism + scores.psychopathy) / 2;
                    const brutality = (scores.psychopathy + scores.sadism) / 2;
                    const malice = (scores.sadism + scores.narcissism) / 2;

                    // 8-Point Data Structure (Octagon of Darkness)
                    const radarLabels = [
                        '나르시시즘', '지배성',
                        '마키아벨리즘', '냉혈성',
                        '사이코패시', '잔혹성',
                        '가학성', '악의성'
                    ];
                    const radarData = [
                        scores.narcissism, dominance,
                        scores.machiavellianism, coldBloodedness,
                        scores.psychopathy, brutality,
                        scores.sadism, malice
                    ];

                    radarChart = new Chart(ctxRadar, {
                        type: 'radar',
                        data: {
                            labels: radarLabels,
                            datasets: [{
                                label: '나의 다크 테트라드',
                                data: radarData,
                                backgroundColor: gradientRadar,
                                borderColor: '#00ff88',
                                borderWidth: 3,
                                pointBackgroundColor: '#000',
                                pointBorderColor: '#00ff88',
                                pointBorderWidth: 2,
                                pointHoverBackgroundColor: '#fff',
                                pointHoverBorderColor: '#00ff88',
                                pointRadius: 5,
                                pointHoverRadius: 8,
                                pointStyle: 'rectRot', // Diamond shape for sharpness
                                tension: 0, // Force straight lines
                                fill: true,
                                // Custom property for shadow (requires plugin or context manipulation, but standard Chart.js ignores it without plugin. 
                                // We will rely on pointStyle and tension for now)
                            }]
                        },
                        options: {
                            scales: {
                                r: {
                                    angleLines: {
                                        color: 'rgba(0, 255, 136, 0.2)',
                                        lineWidth: 1
                                    },
                                    grid: {
                                        color: 'rgba(255, 255, 255, 0.1)',
                                        circular: false // Polygon (Octagon)
                                    },
                                    pointLabels: {
                                        color: (context) => {
                                            // Highlight Core Traits in White, Bridge Traits in Grey
                                            const index = context.index;
                                            return index % 2 === 0 ? '#fff' : '#aaa';
                                        },
                                        font: (context) => {
                                            const index = context.index;
                                            return {
                                                size: index % 2 === 0 ? 14 : 12,
                                                family: 'Pretendard, sans-serif',
                                                weight: index % 2 === 0 ? 'bold' : 'normal'
                                            };
                                        },
                                        backdropColor: 'transparent'
                                    },
                                    suggestedMin: 0,
                                    suggestedMax: 50,
                                    ticks: { display: false, backdropColor: 'transparent' }
                                }
                            },
                            plugins: {
                                legend: {
                                    display: false
                                },
                                tooltip: {
                                    backgroundColor: 'rgba(0, 20, 10, 0.95)',
                                    titleColor: '#00ff88',
                                    bodyColor: '#fff',
                                    borderColor: '#00ff88',
                                    borderWidth: 1,
                                    padding: 12,
                                    displayColors: false,
                                    callbacks: {
                                        title: function (context) {
                                            const label = context[0].label;
                                            const engMap = {
                                                '나르시시즘': 'Narcissism', '지배성': 'Dominance',
                                                '마키아벨리즘': 'Machiavellianism', '냉혈성': 'Cold-Bloodedness',
                                                '사이코패시': 'Psychopathy', '잔혹성': 'Brutality',
                                                '가학성': 'Sadism', '악의성': 'Malice'
                                            };
                                            return `${label} (${engMap[label]})`;
                                        },
                                        label: function (context) {
                                            return context.raw + ' / 50';
                                        }
                                    }
                                }
                            },
                            maintainAspectRatio: false,
                            animation: {
                                duration: 2000,
                                easing: 'easeOutElastic'
                            },
                            elements: {
                                line: {
                                    tension: 0 // Straight lines for sharp octagon
                                }
                            }
                        }
                    });
                } catch (e) {
                    console.error('Failed to render Radar Chart:', e);
                }
            }
        }

        // Render Sub-trait Bar Chart (Cyberpunk Skill Bar)
        const canvasBar = document.getElementById('subTraitChart');
        if (canvasBar) {
            if (typeof Chart !== 'undefined') {
                try {
                    const ctxBar = canvasBar.getContext('2d');

                    // Cyberpunk Gradients
                    const createGradient = (ctx, colorStart, colorEnd) => {
                        const gradient = ctx.createLinearGradient(0, 0, 400, 0);
                        gradient.addColorStop(0, colorStart);
                        gradient.addColorStop(1, colorEnd);
                        return gradient;
                    };

                    subTraitChart = new Chart(ctxBar, {
                        type: 'bar',
                        data: {
                            labels: ['처세술 (Social Tactics)', '자기 PR (Self-Promotion)', '강철 멘탈 (Steel Mental)', '팩트 폭력 (Fact Bomber)'], // Option A: Social Survival Skills
                            datasets: [{
                                label: '생존 스킬 레벨',
                                data: [
                                    scores.machiavellianism,
                                    scores.narcissism,
                                    scores.psychopathy,
                                    scores.sadism
                                ],
                                backgroundColor: [
                                    createGradient(ctxBar, 'rgba(255, 99, 132, 0.8)', 'rgba(255, 99, 132, 0.4)'),
                                    createGradient(ctxBar, 'rgba(54, 162, 235, 0.8)', 'rgba(54, 162, 235, 0.4)'),
                                    createGradient(ctxBar, 'rgba(255, 206, 86, 0.8)', 'rgba(255, 206, 86, 0.4)'),
                                    createGradient(ctxBar, 'rgba(75, 192, 192, 0.8)', 'rgba(75, 192, 192, 0.4)')
                                ],
                                borderColor: 'rgba(255, 255, 255, 0.2)',
                                borderWidth: 1,
                                borderRadius: 4,
                                barPercentage: 0.6
                            }]
                        },
                        options: {
                            indexAxis: 'y', // Horizontal Bar
                            scales: {
                                x: {
                                    beginAtZero: true,
                                    max: 50,
                                    grid: { color: 'rgba(255, 255, 255, 0.05)' },
                                    ticks: { color: '#666', font: { family: 'Inter' } }
                                },
                                y: {
                                    grid: { display: false },
                                    ticks: {
                                        color: '#fff',
                                        font: { family: 'Outfit', size: 12, weight: 'bold' }
                                    }
                                }
                            },
                            plugins: {
                                legend: { display: false },
                                tooltip: {
                                    backgroundColor: 'rgba(0, 0, 0, 0.8)',
                                    titleColor: '#fff',
                                    bodyColor: '#ccc',
                                    borderColor: 'rgba(255, 255, 255, 0.1)',
                                    borderWidth: 1
                                }
                            },
                            maintainAspectRatio: false,
                            animation: {
                                duration: 1500,
                                easing: 'easeOutQuart',
                                delay: 300
                            }
                        }
                    });
                } catch (e) {
                    console.error('Failed to render Bar Chart:', e);
                }
            }
        }

        // Handle Unlock (Paid, Viral, or Master)
        const isViralUnlocked = localStorage.getItem('mnps_viral_unlocked') === 'true';
        let isMaster = false;

        // Check for Master Account
        try {
            const authResponse = await fetch('/api/auth/me');
            const authData = await authResponse.json();
            if (authData.success && authData.user && authData.user.username === 'alyce') {
                isMaster = true;
                console.log('Master account detected. Unlocking all content.');
            }
        } catch (e) {
            console.warn('Failed to check auth status:', e);
        }

        if (data.isPaid || isViralUnlocked || isMaster) {
            const lockOverlay = document.getElementById('lock-overlay');
            const lockedContent = document.getElementById('locked-content-area');

            if (lockOverlay) lockOverlay.style.display = 'none';
            if (lockedContent) {
                lockedContent.style.filter = 'none';
                lockedContent.style.opacity = '1';
                lockedContent.style.userSelect = 'text';
            }

            // Hide payment buttons if unlocked
            const paymentBtns = document.querySelectorAll('.premium-btn');
            paymentBtns.forEach(btn => btn.style.display = 'none');
        }
    }

    // Helper: Dummy Data
    function generateDummyData() {
        return {
            scores: {
                machiavellianism: 30,
                narcissism: 30,
                psychopathy: 30,
                sadism: 30
            },
            report: {
                description: "당신은 전략적인 사고를 가진 사람입니다.",
                strategy: "타인의 감정을 이해하려 노력하세요.",
                weakness: "지나친 계산은 고립을 초래할 수 있습니다.",
                archetype: "전략가"
            },
            resultId: 'dummy'
        };
    }
});

// Global Functions for Buttons
async function unlockPremium() {
    const clientKey = 'test_ck_D5GePWvyJnrK0W0k6q8gLzN97Eoq'; // Toss Test Key
    if (typeof TossPayments === 'undefined') {
        alert('결제 시스템을 로드하는 중입니다. 잠시 후 다시 시도해주세요.');
        return;
    }
    const tossPayments = TossPayments(clientKey);

    try {
        const urlParams = new URLSearchParams(window.location.search);
        const currentResultId = urlParams.get('id') || (JSON.parse(localStorage.getItem('mnps_last_result') || '{}').resultId);

        if (!currentResultId) {
            alert('결제할 분석 결과 정보가 없습니다.');
            return;
        }

        await tossPayments.requestPayment('카드', {
            amount: 1000,
            orderId: 'ORDER_' + currentResultId + '_' + new Date().getTime(),
            orderName: 'MNPS Premium Report',
            customerName: 'MNPS User',
            successUrl: window.location.origin + `/pages/success.html?id=${currentResultId}`,
            failUrl: window.location.origin + '/pages/fail.html',
        });
    } catch (error) {
        console.error('Payment Error:', error);
        alert('결제 요청 중 오류가 발생했습니다.');
    }
}

function unlockViral() {
    // Mock Viral Unlock
    // In a real scenario, we would check if the user actually shared or invited friends.
    // For now, we simulate success.

    if (confirm("친구에게 초대를 보냈습니까? (확인 시 잠금 해제)")) {
        localStorage.setItem('mnps_viral_unlocked', 'true');
        alert("잠금이 해제되었습니다!");
        location.reload();
    }
}

function copyLink() {
    const url = window.location.href;
    navigator.clipboard.writeText(url).then(() => {
        alert('링크가 복사되었습니다.');
    }).catch(err => {
        console.error('Copy failed', err);
        const textArea = document.createElement("textarea");
        textArea.value = url;
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand("Copy");
        textArea.remove();
        alert('링크가 복사되었습니다.');
    });
}

async function shareKakao() {
    if (typeof Kakao === 'undefined') {
        alert('카카오 SDK가 로드되지 않았습니다.');
        return;
    }

    if (!Kakao.isInitialized()) {
        try {
            const response = await fetch('/api/config');
            const data = await response.json();
            if (data.success && data.kakaoJsKey) {
                Kakao.init(data.kakaoJsKey);
            } else {
                console.warn('Kakao Key not found in config');
                alert('카카오 공유 설정을 불러올 수 없습니다.');
                return;
            }
        } catch (e) {
            console.error('Failed to fetch config:', e);
            alert('서버 통신 오류가 발생했습니다.');
            return;
        }
    }

    Kakao.Share.sendDefault({
        objectType: 'feed',
        content: {
            title: 'MNPS - 내면의 본성 분석',
            description: '나의 Dark Tetrad 점수는?',
            imageUrl: window.location.origin + '/assets/img/og_image.png',
            link: {
                mobileWebUrl: window.location.href,
                webUrl: window.location.href,
            },
        },
        buttons: [
            {
                title: '결과 확인하기',
                link: {
                    mobileWebUrl: window.location.href,
                    webUrl: window.location.href,
                },
            },
        ],
    });

    // Auto-unlock on share attempt (Optional strategy)
    // localStorage.setItem('mnps_viral_unlocked', 'true');
}

// Expose to window for HTML onclick
window.shareKakao = shareKakao;
window.copyLink = copyLink;
window.unlockPremium = unlockPremium;
window.unlockViral = unlockViral;
