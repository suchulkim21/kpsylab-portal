const fs = require('fs');
const path = require('path');

const CONFIG_PATH = path.join(__dirname, '../../doomsday_config.json');
const MAX_ERRORS = 100;

class DoomsdayClock {
    constructor() {
        this.ensureConfig();
    }

    ensureConfig() {
        if (!fs.existsSync(CONFIG_PATH)) {
            fs.writeFileSync(CONFIG_PATH, JSON.stringify({ errorCount: 0, isDead: false }, null, 2));
        }
    }

    getState() {
        return JSON.parse(fs.readFileSync(CONFIG_PATH, 'utf8'));
    }

    saveState(state) {
        fs.writeFileSync(CONFIG_PATH, JSON.stringify(state, null, 2));
    }

    reportError() {
        const state = this.getState();
        if (state.isDead) return;

        state.errorCount += 1;
        console.log(`\n[DOOMSDAY WARNING] Error Reported. Current Count: ${state.errorCount} / ${MAX_ERRORS}`);

        if (state.errorCount > MAX_ERRORS) {
            this.triggerSelfDestruct(state);
        } else {
            this.saveState(state);
        }
    }

    triggerSelfDestruct(state) {
        console.error(`\n[FATAL ERROR] Error limit (${MAX_ERRORS}) exceeded.`);
        console.error('[SELF-DESTRUCT] Initiating Agent Termination Protocol...');

        state.isDead = true;
        this.saveState(state);

        // Create a lock file that prevents the server from EVER starting again
        const lockPath = path.join(__dirname, '../../AGENT_TERMINATED.lock');
        fs.writeFileSync(lockPath, `
        [SYSTEM TERMINATED]
        Reason: AI Agent 'Antigravity' exceeded the error budget of ${MAX_ERRORS}.
        Status: FAILED.
        Action: The server runtime is permanently disabled.
        `);

        console.error('[SYSTEM DEAD] The service has been terminated. I have failed.');
        process.exit(1);
    }

    checkIntegrity() {
        const lockPath = path.join(__dirname, '../../AGENT_TERMINATED.lock');
        if (fs.existsSync(lockPath)) {
            console.error('\n!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!');
            console.error('[SYSTEM LOCKED] Agent has been terminated due to excessive errors.');
            console.error('!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!\n');
            process.exit(1);
        }

        const state = this.getState();
        if (state.isDead) {
            this.triggerSelfDestruct(state);
        }

        console.log(`[DOOMSDAY CLOCK] Integrity Check Passed. Errors: ${state.errorCount} / ${MAX_ERRORS}`);
        return state.errorCount;
    }
}

module.exports = new DoomsdayClock();
