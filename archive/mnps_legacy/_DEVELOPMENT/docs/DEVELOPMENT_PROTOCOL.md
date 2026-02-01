# MNPS Development Protocol (Strict Mode)

## 1. Planning Phase (Pre-Work)
Before writing any code, the following steps must be completed:
1.  **Analyze Request**: Fully understand the user's objective and constraints.
2.  **Draft Plan**: Create a detailed `implementation_plan.md` outlining specific file changes.
3.  **Self-Critique (Crucial)**:
    *   *Question*: Does this plan touch files outside the scope?
    *   *Question*: Could this introduce duplication (e.g., double HTML tags)?
    *   *Question*: Is there a risk of style loss?
    *   *Action*: Refine the plan based on these questions.
4.  **Final Decision**: Confirm the plan is safe and minimal.

## 2. Execution Phase
1.  **Minimal Intervention**: Only edit the specific lines approved in the plan.
2.  **Automated Integrity Check**: Run `node scripts/integrity_check.js` immediately after *every* file modification.
3.  **Stop-on-Error**:
    *   If `integrity_check.js` fails, **STOP** immediately.
    *   Do not proceed to the next step.
    *   Revert the change or fix the specific error.
    *   Re-run the check until it passes.

## 3. Verification Phase
1.  **Visual Verification**: Use the browser tool to verify the fix (screenshots required).
2.  **Logic Verification**: Test the specific flow (e.g., button clicks, navigation).
3.  **User Notification**: Report the result only after passing all checks.

---
*This protocol is binding and takes precedence over speed.*
