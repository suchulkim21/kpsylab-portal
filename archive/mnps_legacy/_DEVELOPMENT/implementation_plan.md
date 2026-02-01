# Implementation Plan: Core Web Service Stabilization

## Goal
Verify and stabilize the entire user journey from Landing Page to Result and Authentication, ensuring no critical errors or flow interruptions.

## User Review Required
- None (Internal Verification)

## Verification Scenarios

### 1. End-to-End User Flow
1.  **Landing**: Open `index.html` -> Click "Start Assessment".
2.  **Assessment**:
    - Complete Stage 1 (Machiavellianism).
    - Complete Stage 2 (Narcissism).
    - Complete Stage 3 (Psychopathy).
    - Complete Stage 4 (Sadism).
3.  **Result**:
    - Verify Radar Chart rendering.
    - Verify "Premium Lock" visibility.
4.  **Conversion**:
    - Click "Sign Up" from Result Page.
    - Create a new account.
    - Verify redirection back to Result (or Dashboard).

### 2. Admin Flow
1.  Login as `alyce` (Admin).
2.  Access `admin.html`.
3.  Verify Stats Charts.

## Proposed Changes
- **Fix**: Any bugs found during verification will be fixed immediately using the Strict Protocol.
- **Refine**: Improve transition smoothness if laggy.

## Safety Measures
- **Integrity Check**: Run `integrity_check.js` after any fix.
- **Backup**: Ensure `mnps.db` is backed up before stress testing.

# System Re-architecture

## Goal
Refactor the assessment system to maximize engagement and monetization through progressive feedback, ad exposure delays, and a viral/paid unlock model.

## User Review Required
> [!IMPORTANT]
> **Ad Exposure Strategy**: A 3-5 second "Analyzing..." animation will be added between stages to increase banner dwell time.
> **Content Split**: 80% of the result (Archetype, Nature) will be free. The critical 20% (Strategy, Weakness) will be locked behind Payment or Viral Action.

## Proposed Changes

### Frontend
#### [MODIFY] [intermediate_result.html](file:///c:/Projects/mnps2/pages/intermediate_result.html)
- Add "Analyzing..." overlay with 3s delay.
- Implement progressive feedback logic (Stage 1: Simple -> Stage 3: Detailed).

#### [MODIFY] [result.html](file:///c:/Projects/mnps2/pages/result.html)
- Restructure content into "Free" (80%) and "Locked" (20%) sections.
- Add "Unlock with Friends" option to the lock overlay.

#### [MODIFY] [result-script.js](file:///c:/Projects/mnps2/assets/js/result-script.js)
- Implement the 80/20 rendering logic.
- Add logic for "Viral Unlock" (mock or actual referral check).

### Backend / Data
#### [MODIFY] [feedback.js](file:///c:/Projects/mnps2/modules/data/feedback.js)
- Structure feedback data to support progressive depth.

## Verification Plan
### Automated Tests
- Verify navigation flow with delays.
- Check lock state on result page.

### Manual Verification
- Run through all 4 stages.
- Verify "Analyzing..." animation appears.
- Verify feedback gets longer/deeper each stage.
- Verify "Strategy" section is blurred/locked on final page.
