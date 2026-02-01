# MNPS System Architecture

## 1. Core Philosophy
**"Error-Proof Modular MPA"**
- **Simplicity**: HTML > Link > HTML. 복잡한 라우팅 배제.
- **Stability**: 각 페이지는 독립적으로 동작하며, Global Scope 오염을 방지.
- **Persistence**: `localStorage`를 적극 활용하여 데이터 유실 방지.

## 2. Technology Stack
| Component | Technology | Reason |
|-----------|------------|--------|
| **Frontend** | HTML5, Vanilla JS, CSS3 | 가볍고 빠르며 디버깅이 용이함. |
| **Backend** | Node.js (Express) | 정적 파일 서빙 및 간단한 API 처리에 최적화. |
| **Database** | SQLite | 파일 기반으로 관리가 쉽고 데이터 무결성 보장. |
| **Payments** | Toss Payments SDK | 개발 편의성 및 우수한 UI. |

## 3. Directory Structure
```
/
├── pages/                  # Entry Points (HTML)
│   ├── index.html          # Landing
│   ├── intro.html          # Consent
│   ├── stage[1-4].html     # Assessment Steps
│   └── result.html         # Analysis Result
├── modules/                # Logic Modules
│   ├── engine/             # Question Engine (Hybrid Generation)
│   ├── storage/            # Data Manager (LocalStorage <-> DB)
│   └── ui/                 # UI Components
├── assets/                 # Static Resources
└── server.js               # Main Server File
```

## 4. Data Flow & Security
### 4.1 Data Collection
- **Anonymous ID**: UUID + Digital Fingerprinting으로 비회원 식별.
- **Behavioral Data**: 응답 시간(Hesitation Time), 인터랙션 패턴 수집.

### 4.2 Security
- **Input Validation**: 클라이언트/서버 이중 검증.
- **SQL Injection**: Prepared Statements 사용.
- **XSS**: 입력 데이터 필터링.

## 5. Management System (The Control Tower)
- **Dashboard**: Funnel 분석, 매출 모니터링.
- **Content Control**: 문항/로직 Hot-fix (JSON 기반).
- **Error Logging**: 클라이언트 JS 오류 실시간 수집.
