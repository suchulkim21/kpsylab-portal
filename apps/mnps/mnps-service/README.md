# MNPS 서비스 (Production Ready)

이 폴더는 MNPS 서비스 실행에 필요한 핵심 파일만 포함합니다.

## 📁 폴더 구조

```
mnps-service/
├── server.js              # 메인 서버 파일
├── package.json           # 의존성 정의
├── ecosystem.config.js    # PM2 설정
├── doomsday_config.json   # 시스템 무결성 설정
├── .env.example          # 환경 변수 예제
├── pages/                 # HTML 페이지
├── modules/               # 비즈니스 로직 모듈
│   ├── engine/           # 검사 엔진
│   ├── data_layer/       # 데이터 저장/조회
│   ├── text/             # 콘텐츠 데이터
│   └── system/           # 시스템 모듈
├── assets/                # 정적 리소스 (CSS, JS, 이미지)
├── routes/               # Express 라우트
└── blog/                 # 블로그 플랫폼
```

## 🚀 빠른 시작

### 1. 의존성 설치

```bash
npm install
```

### 2. 환경 변수 설정

```bash
# .env.example을 .env로 복사
cp .env.example .env

# .env 파일을 열어 실제 값으로 수정
# - SESSION_SECRET: 강력한 랜덤 문자열
# - TOSS_CLIENT_KEY: 토스페이먼츠 클라이언트 키
# - KAKAO_JS_KEY: 카카오 JavaScript 키
```

### 3. 서버 실행

#### 개발 모드
```bash
npm start
# 또는
node server.js
```

#### 프로덕션 모드 (PM2)
```bash
# PM2 설치 (전역)
npm install -g pm2

# 서버 시작
pm2 start ecosystem.config.js --env production

# 로그 확인
pm2 logs mnps-app

# 서버 중지
pm2 stop mnps-app
```

접속: `http://localhost:7777` (또는 .env에서 설정한 PORT)

## 📋 필수 설정

### 환경 변수

- `PORT`: 서버 포트 (기본값: 7777)
- `SESSION_SECRET`: 세션 암호화 키 (강력한 랜덤 문자열 권장)
- `DB_PATH`: SQLite 데이터베이스 경로 (기본값: ./mnps.db)
- `TOSS_CLIENT_KEY`: 토스페이먼츠 클라이언트 키
- `KAKAO_JS_KEY`: 카카오톡 JavaScript 키

### 데이터베이스

- SQLite: 자동으로 초기화됩니다 (`DB_PATH`에 지정된 경로)
- MySQL: `modules/data_layer/mysql_client.js`에서 설정

## 🔧 주요 기능

- ✅ 4단계 검사 엔진 (120문항)
- ✅ 동적 결과 분석 및 리포트 생성
- ✅ 회원가입/로그인 시스템
- ✅ 프리미엄 리포트 잠금 시스템
- ✅ 토스페이먼츠 결제 연동
- ✅ 카카오톡 공유 기능
- ✅ 관리자 대시보드
- ✅ 블로그 플랫폼

## 📝 참고사항

- 이 폴더는 서비스 실행에 필요한 최소한의 파일만 포함합니다
- 개발 문서는 `_LEGACY/_DEVELOPMENT/` 폴더를 참조하세요
- 데이터베이스는 자동으로 초기화되지만, 기존 데이터가 있다면 백업하세요

## 🛠️ 문제 해결

### 포트가 이미 사용 중인 경우
`.env` 파일에서 `PORT` 값을 변경하세요.

### 데이터베이스 오류
- SQLite: `DB_PATH`에 지정된 경로에 쓰기 권한이 있는지 확인
- MySQL: 연결 정보가 올바른지 확인

### 모듈을 찾을 수 없는 경우
`npm install`을 다시 실행하세요.

