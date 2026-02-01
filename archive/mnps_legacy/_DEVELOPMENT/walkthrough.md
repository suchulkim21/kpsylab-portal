# MNPS Project Walkthrough

## Project Overview
MNPS is a web-based psychological assessment platform analyzing the Dark Tetrad traits (Machiavellianism, Narcissism, Psychopathy, Sadism).

## Implemented Features

### 1. User Flow (Non-Member)
- **Landing Page**: `index.html` - Directly links to the assessment via "검사 시작하기".
- **Assessment**: 4-stage hybrid question engine (`stage1.html` - `stage4.html`).
- **Result**: Interactive radar chart and score summary (`result.html`).
    - **Note**: Payment and Premium Report features are disabled for non-members.
    - **Viral**: Link copy and KakaoTalk sharing features are available.

### 2. Backend Engine
- **Server**: Node.js/Express server handling API requests.
- **Database**: SQLite (`mnps.db`) storing users and results.
- **Logic**: `result_saver.js` handles data persistence and retrieval.

### 3. Monetization (Member Only - Planned)
- **Payment**: Toss Payments integration (Currently disabled for non-members).
- **Premium Content**: Detailed analysis (Currently hidden for non-members).

### 4. Deployment & Security
- **Environment**: `.env` file for secure configuration.
- **Process Management**: `ecosystem.config.js` for PM2.
- **Testing**: Automated `test_suite.js` verifying API health and flows.

## Validation Results
- **User Flow**: Verified direct navigation from Landing to Assessment.
- **Result Page**: Verified absence of Premium/Payment features for non-members.

## How to Run
1. Install dependencies: `npm install`
2. Start server: `node server.js` or `npm run dev`
3. Access: `http://localhost:3000`
