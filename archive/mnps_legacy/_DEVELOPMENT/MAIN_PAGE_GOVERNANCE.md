# Main Page Governance Protocol (메인 페이지 절대 보존 원칙)

## 1. 개요 (Overview)
메인 페이지(`index.html`)는 서비스의 얼굴로서 **절대적인 안정성**을 유지해야 합니다. 본 문서는 메인 페이지의 수정 및 기능 추가에 대한 엄격한 규칙을 정의합니다.

## 2. 절대 불변 영역 (Immutable Core)
다음 요소는 **사용자의 명시적인 '구조 변경' 승인 없이는 절대 수정할 수 없습니다.**

### 2.1 레이아웃 구조 (Layout Structure)
- **Navbar**: `position: fixed`, `top: 0`, `z-index: 1000`.
- **Landing Container**: `min-height: 100vh`, `flex-direction: column`, `justify-content: center`.
- **Background**: `radial-gradient` (Dark Theme).

### 2.2 핵심 파일 경로 (Core Paths)
- CSS: `assets/css/style.css` (경로 변경 금지)
- JS: `assets/js/navbar.js` (기능 분리 원칙)

## 3. 가변 허용 영역 (Mutable Zones)
다음 요소는 기능 업데이트나 마케팅 목적에 따라 수정이 가능합니다.

### 3.1 텍스트 및 링크 (Content)
- **Slogan**: `<p class="slogan">` 태그 내부 텍스트.
- **CTA Button**: `<a class="cta-button">`의 `href` 속성 및 텍스트.
- **Nav Links**: `<div class="nav-links">` 내부의 메뉴 항목 추가/삭제.

### 3.2 기능 주입 (Feature Injection)
- **원칙**: 모든 추가 기능(예: 눈 내리는 효과, 팝업)은 **외부 스크립트 파일**로 분리하여 `</body>` 직전에 `<script src="...">` 형태로만 추가해야 합니다.
- **금지**: `index.html` 내부에 긴 JavaScript 로직을 직접 작성(`inline script`)하는 것을 금지합니다.

### 3.3 무결성 검증 (Integrity Check)
- **필수 절차**: 메인 페이지 수정 후 반드시 `node scripts/validate_integrity.js`를 실행하여 무결성을 검증해야 합니다.
- **검증 항목**:
    1. `.landing-container` 클래스 존재 여부.
    2. `height: 100vh` 스타일 적용 여부.
    3. `radial-gradient` 배경 적용 여부.

## 4. 복구 프로토콜 (Recovery Protocol)
- **Golden Master**: `pages/index.html.golden` (최정상 상태 백업 파일)
- 오류 발생 시, 즉시 Golden Master 파일로 덮어씌워 복구합니다.
