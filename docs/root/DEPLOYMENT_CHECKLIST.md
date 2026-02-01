# 🚀 프로덕션 배포 체크리스트

**배포 전 필수 확인 사항**

---

## ✅ 1. 빌드 및 테스트

### 빌드 확인
- [ ] **Portal 프로젝트 빌드**
  ```bash
  cd apps/portal
  npm run build
  ```
  - 빌드 오류가 없는지 확인
  - `.next` 폴더가 생성되었는지 확인

### 테스트 실행
- [ ] **단위 테스트**
  ```bash
  cd apps/portal
  npm run test:unit
  ```

- [ ] **API 통합 테스트**
  ```bash
  cd apps/portal
  npm run test:api
  ```

- [ ] **E2E 테스트** (선택사항, 시간이 오래 걸릴 수 있음)
  ```bash
  cd apps/portal
  npm run test:e2e
  ```

---

## ✅ 2. 환경 변수 설정

### Portal 프로젝트 `.env` 파일 생성

서버에 배포할 때 다음 환경 변수들을 설정해야 합니다:

```env
# 서버 포트
PORT=7777

# Next.js 환경
NODE_ENV=production

# 데이터베이스 경로 (절대 경로 권장)
DATABASE_PATH=/path/to/app/apps/portal/data/database.sqlite

# 세션 시크릿 (강력한 랜덤 문자열 생성)
SESSION_SECRET=your_very_strong_random_secret_key_here

# 도메인 설정
NEXT_PUBLIC_BASE_URL=https://www.kpsylab.com
```

### 세션 시크릿 생성 방법

```bash
# Node.js로 강력한 랜덤 문자열 생성
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

---

## ✅ 3. 데이터베이스 준비

### 데이터베이스 백업
- [ ] **기존 데이터베이스 백업** (이미 있는 경우)
  ```bash
  # 개발 환경에서
  cp apps/portal/data/database.sqlite apps/portal/data/database.sqlite.backup
  ```

### 데이터베이스 마이그레이션
- [ ] **데이터베이스 파일 준비**
  - `apps/portal/data/database.sqlite` 파일 존재 확인
  - 마이그레이션 파일 확인: `apps/portal/migrations/`

### 블로그 데이터베이스 경로 확인
- [ ] **블로그 DB 경로 설정**
  - Portal에서 MNPS의 `blog.db` 경로 확인
  - 필요시 경로 수정

---

## ✅ 4. 서버 설정

### Node.js 버전
- [ ] **Node.js 18 이상 설치 확인**
  ```bash
  node --version
  ```

### 포트 확인
- [ ] **포트 7777 사용 가능 확인**
  ```bash
  # Linux/Mac
  lsof -i :7777
  
  # Windows
  netstat -ano | findstr :7777
  ```

### 방화벽 설정
- [ ] **포트 7777 열기** (필요한 경우)
  - AWS: Security Group 설정
  - Linux: ufw/firewalld 설정

---

## ✅ 5. 파일 업로드

### 업로드할 파일/폴더

#### 필수 항목
- [ ] `apps/portal/` 폴더 전체
- [ ] `apps/portal/package.json`
- [ ] `apps/portal/next.config.ts`
- [ ] `apps/portal/tsconfig.json`
- [ ] `apps/portal/.env` (서버에서 생성, Git에 업로드하지 말 것!)

#### 제외할 항목 (`.gitignore`에 있는 것들)
- `node_modules/` (서버에서 설치)
- `.next/` (서버에서 빌드)
- `.env*` (서버에서 생성)
- `logs/`
- `*.log`

### 업로드 방법

**방법 1: Git 사용 (권장)**
```bash
# 개발 환경에서
git add .
git commit -m "Production deployment"
git push origin main

# 서버에서
git pull origin main
```

**방법 2: SFTP/SCP 사용**
```bash
# 개발 환경에서
scp -r apps/portal/ user@server:/path/to/app/
```

**방법 3: 압축 파일 사용**
```bash
# 개발 환경에서 압축 (node_modules 제외)
tar -czf portal.tar.gz --exclude='node_modules' --exclude='.next' apps/portal/

# 서버에서 압축 해제
tar -xzf portal.tar.gz
```

---

## ✅ 6. 서버에서 설치 및 빌드

### 의존성 설치
```bash
cd /path/to/app/apps/portal
npm install --production
```

### 프로덕션 빌드
```bash
cd /path/to/app/apps/portal
npm run build
```

---

## ✅ 7. 프로세스 관리자 설정

### PM2 사용 (권장)

#### PM2 설치
```bash
npm install -g pm2
```

#### PM2 설정 파일 생성

`apps/portal/ecosystem.config.js` 파일 생성:

```javascript
module.exports = {
  apps: [{
    name: 'kpsylab-portal',
    script: 'node_modules/next/dist/bin/next',
    args: 'start -p 7777',
    instances: 1,
    exec_mode: 'cluster',
    autorestart: true,
    watch: false,
    max_memory_restart: '1G',
    env: {
      NODE_ENV: 'production',
      PORT: 7777
    },
    error_file: './logs/pm2-error.log',
    out_file: './logs/pm2-out.log',
    log_date_format: 'YYYY-MM-DD HH:mm:ss Z'
  }]
};
```

#### PM2로 시작
```bash
cd /path/to/app/apps/portal
pm2 start ecosystem.config.js
pm2 save
pm2 startup  # 시스템 재시작 시 자동 시작 설정
```

#### PM2 명령어
```bash
# 상태 확인
pm2 status

# 로그 확인
pm2 logs kpsylab-portal

# 재시작
pm2 restart kpsylab-portal

# 중지
pm2 stop kpsylab-portal
```

---

## ✅ 8. 리버스 프록시 설정 (선택사항)

### Nginx 설정 예시

`/etc/nginx/sites-available/kpsylab`:

```nginx
server {
    listen 80;
    server_name www.kpsylab.com kpsylab.com;

    # HTTPS로 리다이렉트 (Let's Encrypt 사용 시)
    return 301 https://$server_name$request_uri;
}

server {
    listen 443 ssl http2;
    server_name www.kpsylab.com kpsylab.com;

    ssl_certificate /path/to/ssl/cert.pem;
    ssl_certificate_key /path/to/ssl/key.pem;

    location / {
        proxy_pass http://localhost:7777;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
```

---

## ✅ 9. SSL 인증서 설정 (HTTPS)

### Let's Encrypt 사용 (권장)

```bash
# Certbot 설치
sudo apt-get update
sudo apt-get install certbot python3-certbot-nginx

# 인증서 발급
sudo certbot --nginx -d www.kpsylab.com -d kpsylab.com

# 자동 갱신 확인
sudo certbot renew --dry-run
```

---

## ✅ 10. 최종 확인

### 서버 상태 확인
- [ ] **서버 실행 확인**
  ```bash
  curl http://localhost:7777
  ```

- [ ] **외부 접속 확인**
  ```bash
  curl https://www.kpsylab.com
  ```

### 기능 테스트
- [ ] 메인 페이지 로드
- [ ] 로그인/회원가입
- [ ] 블로그 페이지 접속
- [ ] MNPS 서비스 접속
- [ ] Second Genesis 서비스 접속
- [ ] 관리자 대시보드 접속 (마스터 계정)

### 성능 확인
- [ ] 페이지 로딩 속도 확인
- [ ] API 응답 시간 확인
- [ ] 메모리 사용량 확인 (PM2 모니터링)

---

## ✅ 11. 모니터링 설정

### 로그 확인
- [ ] **PM2 로그 위치 확인**
  - `apps/portal/logs/pm2-error.log`
  - `apps/portal/logs/pm2-out.log`

### 헬스 체크
- [ ] **Health Check 엔드포인트 확인**
  - `/health` 또는 `/api/health`

---

## ⚠️ 주의사항

1. **`.env` 파일 절대 Git에 업로드하지 마세요!**
2. **세션 시크릿은 강력한 랜덤 문자열을 사용하세요.**
3. **프로덕션에서는 `NODE_ENV=production`을 설정하세요.**
4. **데이터베이스는 정기적으로 백업하세요.**
5. **보안 업데이트를 정기적으로 확인하세요.**

---

## 🔄 롤백 절차

문제가 발생할 경우:

```bash
# PM2 중지
pm2 stop kpsylab-portal

# 이전 버전으로 복원
git checkout <previous-commit-hash>
# 또는
# 백업 파일로 복원

# 재시작
pm2 restart kpsylab-portal
```

---

## 📞 지원

배포 중 문제가 발생하면:
1. PM2 로그 확인: `pm2 logs kpsylab-portal`
2. 서버 로그 확인
3. 데이터베이스 상태 확인
4. 환경 변수 확인

---

**배포 준비 완료! 위 체크리스트를 모두 확인한 후 서버에 배포하세요.**

