# MNPS Deployment Guide

## Prerequisites
- Node.js (v18 or higher)
- NPM (v9 or higher)
- PM2 (Global install recommended: `npm install -g pm2`)

## Installation
1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd mnps2
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Configure Environment:
   - Copy `.env.example` to `.env` (if available) or create `.env`:
     ```
     PORT=3000
     DB_PATH=./mnps.db
     TOSS_CLIENT_KEY=your_toss_client_key
     KAKAO_JS_KEY=your_kakao_js_key
     ```

## Running with PM2 (Production)
1. Start the application:
   ```bash
   pm2 start ecosystem.config.js --env production
   ```

2. Monitor logs:
   ```bash
   pm2 logs mnps-app
   ```

3. Stop application:
   ```bash
   pm2 stop mnps-app
   ```

## Running Locally (Development)
```bash
npm run dev
```
or
```bash
node server.js
```

## Database
- SQLite database is automatically initialized at `DB_PATH` on first run.
- Ensure the directory has write permissions.
