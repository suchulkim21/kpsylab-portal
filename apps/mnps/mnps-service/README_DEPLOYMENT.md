# MNPS 프로덕션 배포 가이드

## 🚀 빠른 시작 체크리스트

### 1. 환경 변수 설정 (필수)
```bash
cd mnps/mnps-service
cp .env.example .env
# .env 파일을 열어 다음 값들을 설정:
# - SESSION_SECRET (강력한 랜덤 값)
# - TOSS_CLIENT_KEY
# - KAKAO_JS_KEY
```

**SESSION_SECRET 생성:**
```bash
node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"
```

### 2. 의존성 설치
```bash
npm install
```

### 3. 데이터베이스 초기화
데이터베이스는 자동으로 생성됩니다. 기존 데이터가 있다면 백업하세요:
```bash
npm run backup
```

### 4. 헬스 체크
```bash
npm run health
```

### 5. 서버 실행

#### 개발 모드
```bash
npm start
```

#### 프로덕션 모드 (PM2)
```bash
# PM2 설치 (전역)
npm install -g pm2

# 서버 시작
pm2 start ecosystem.config.js --env production

# 상태 확인
pm2 status

# 로그 확인
pm2 logs mnps-app

# 자동 재시작 설정
pm2 startup
pm2 save
```

## 📋 운영 스크립트

### 데이터베이스 백업
```bash
npm run backup
```
- SQLite 데이터베이스 백업 (blog.db, mnps.db)
- 백업 파일 위치: `backups/`
- 30일 이상된 백업 자동 삭제

### 헬스 체크
```bash
npm run health
```
- 데이터베이스 연결 상태 확인
- 디스크 공간 확인
- HTTP 헬스 체크 엔드포인트: `/health`

### 로그 확인
```bash
npm run logs
```

## 🔒 보안 체크리스트

- [ ] `.env` 파일 생성 및 SESSION_SECRET 설정
- [ ] 프로덕션 환경에서 HTTPS 설정
- [ ] 쿠키 secure 플래그 활성화 (프로덕션)
- [ ] 방화벽 설정 (포트 7777)
- [ ] 데이터베이스 백업 자동화 설정

## 📊 모니터링

### 로그 위치
- `logs/info-YYYY-MM-DD.log` - 일반 로그
- `logs/error-YYYY-MM-DD.log` - 에러 로그
- `logs/warn-YYYY-MM-DD.log` - 경고 로그
- `logs/debug-YYYY-MM-DD.log` - 디버그 로그

### 헬스 체크 엔드포인트
```
GET /health
```

응답 예시:
```json
{
  "timestamp": "2024-01-01T00:00:00.000Z",
  "status": "ok",
  "checks": {
    "blog_db": { "name": "blog.db", "status": "ok", "message": "Connected" },
    "mnps_db": { "name": "mnps.db", "status": "ok", "message": "Connected" },
    "disk_space": { "status": "ok", "message": "Disk space available" }
  }
}
```

## 🔄 자동 백업 설정 (cron)

Linux/Mac:
```bash
# 매일 자정에 백업 실행
0 0 * * * cd /path/to/mnps-service && npm run backup
```

Windows (Task Scheduler):
1. 작업 스케줄러 열기
2. 기본 작업 만들기
3. 트리거: 매일
4. 작업: 프로그램 시작
   - 프로그램: `node`
   - 인수: `scripts/backup-database.js`
   - 시작 위치: `C:\Projects\Pj-main\mnps\mnps-service`

## 📝 문제 해결

### 포트가 이미 사용 중인 경우
`.env` 파일에서 `PORT` 값을 변경하세요.

### 데이터베이스 오류
1. 데이터베이스 파일 권한 확인
2. 디스크 공간 확인
3. 백업에서 복원 시도

### 모듈을 찾을 수 없는 경우
```bash
rm -rf node_modules package-lock.json
npm install
```

## 🎯 성능 최적화

### PM2 클러스터 모드
```javascript
// ecosystem.config.js 수정
apps: [{
    instances: 'max', // CPU 코어 수만큼
    exec_mode: 'cluster'
}]
```

### 로그 로테이션
PM2가 자동으로 처리하지만, 수동 설정도 가능합니다.

---

**문의**: 프로젝트 성공을 위해 항상 준비되어 있습니다! 🚀

