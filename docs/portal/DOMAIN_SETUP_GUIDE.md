# 🌐 도메인 연결 가이드

**KPSY LAB Portal - Vercel 커스텀 도메인 설정**

---

## 📋 현재 상황

- **현재 URL**: `kkimsspy.vercel.app` (Vercel 기본 도메인)
- **목표 도메인**: `www.kpsylab.com` (커스텀 도메인)

---

## 🔧 단계별 설정 방법

### Step 1: Vercel에서 도메인 추가

1. **Vercel 대시보드 접속**
   - https://vercel.com/dashboard
   - 로그인

2. **프로젝트 선택**
   - `kkimsspy` 프로젝트 클릭

3. **Settings → Domains**
   - 왼쪽 메뉴에서 **Settings** 클릭
   - **Domains** 탭 클릭

4. **도메인 추가**
   - **Add Domain** 버튼 클릭
   - 도메인 입력: `www.kpsylab.com`
   - **Add** 클릭

5. **DNS 레코드 확인**
   - Vercel이 DNS 설정 안내를 표시합니다
   - **중요**: 여기에 표시된 DNS 레코드를 복사하세요!

---

## 📝 DNS 레코드 설정 (도메인 관리자에서)

### 일반적인 DNS 레코드 (Vercel이 제공)

Vercel은 보통 다음 중 하나를 제공합니다:

#### 옵션 1: CNAME 레코드 (권장)

```
Type: CNAME
Name: www
Value: cname.vercel-dns.com
TTL: 3600 (또는 자동)
```

#### 옵션 2: A 레코드

```
Type: A
Name: @ (또는 www)
Value: 76.76.21.21
TTL: 3600 (또는 자동)
```

**⚠️ 중요**: Vercel 대시보드에 표시된 정확한 값을 사용하세요!

---

## 🎯 주요 도메인 관리자별 설정 방법

### GoDaddy

1. GoDaddy 로그인
2. **My Products** → **Domains** 클릭
3. `kpsylab.com` 클릭
4. **DNS** 탭 클릭
5. **Records** 섹션에서 **Add** 클릭
6. Vercel이 제공한 레코드 입력:
   - **Type**: CNAME 또는 A
   - **Name**: `www` (또는 `@`)
   - **Value**: Vercel이 제공한 값
   - **TTL**: 3600
7. **Save** 클릭

### Namecheap

1. Namecheap 로그인
2. **Domain List** 클릭
3. `kpsylab.com` 옆의 **Manage** 클릭
4. **Advanced DNS** 탭 클릭
5. **Add New Record** 클릭
6. Vercel이 제공한 레코드 입력
7. **Save All Changes** 클릭

### Cloudflare

1. Cloudflare 대시보드 접속
2. `kpsylab.com` 도메인 선택
3. **DNS** → **Records** 클릭
4. **Add record** 클릭
5. Vercel이 제공한 레코드 입력
6. **Save** 클릭

### 기타 도메인 관리자

일반적인 절차:
1. 도메인 관리자 로그인
2. DNS 설정 또는 DNS 관리 메뉴 찾기
3. 새 레코드 추가
4. Vercel이 제공한 값 입력
5. 저장

---

## ⏱️ DNS 전파 시간

- **일반적으로**: 5분 ~ 24시간
- **평균**: 1-2시간
- **최대**: 48시간

DNS 전파 확인 방법:
```bash
# Windows PowerShell
nslookup www.kpsylab.com

# 또는 온라인 도구 사용
# https://dnschecker.org
```

---

## ✅ 확인 방법

### 1. DNS 레코드 확인

```bash
nslookup www.kpsylab.com
```

정상적으로 설정되면 Vercel IP 주소가 표시됩니다.

### 2. Vercel 대시보드 확인

- Vercel → 프로젝트 → Settings → Domains
- 도메인 옆에 **Valid Configuration** 또는 **✓** 표시가 나타나야 합니다

### 3. 브라우저에서 접속

- `https://www.kpsylab.com` 접속
- 사이트가 정상적으로 로드되면 성공!

---

## 🔒 SSL 인증서

- Vercel이 **자동으로 SSL 인증서를 발급**합니다
- DNS 설정 완료 후 몇 분 내에 HTTPS 활성화
- 별도 설정 불필요

---

## ⚠️ 주의사항

1. **정확한 값 사용**: Vercel 대시보드에 표시된 정확한 DNS 값을 사용하세요
2. **TTL 설정**: 가능하면 3600초(1시간)로 설정
3. **기존 레코드 확인**: 같은 이름의 레코드가 있으면 수정하거나 삭제
4. **루트 도메인**: `kpsylab.com` (www 없이)도 연결하려면 추가 설정 필요

---

## 🆘 문제 해결

### DNS 전파가 안 됨

1. **캐시 삭제**: 브라우저 캐시 및 DNS 캐시 삭제
2. **다른 네트워크에서 테스트**: 모바일 데이터 등
3. **시간 대기**: 최대 48시간까지 기다려보기

### Vercel에서 "Invalid Configuration" 오류

1. DNS 레코드 값이 정확한지 확인
2. TTL이 너무 길지 않은지 확인 (3600 권장)
3. 도메인 관리자에서 레코드가 저장되었는지 확인

### SSL 인증서 발급 실패

1. DNS 전파 완료 대기
2. Vercel 대시보드에서 "Redeploy" 시도
3. 몇 시간 후 다시 확인

---

## 📞 다음 단계

DNS 설정 완료 후:
1. ✅ DNS 전파 확인 (1-2시간 대기)
2. ✅ Vercel 대시보드에서 "Valid Configuration" 확인
3. ✅ `https://www.kpsylab.com` 접속 테스트
4. ✅ SSL 인증서 자동 발급 확인

---

**도메인 관리자**: _________________  
**설정 완료일**: _________________  
**확인 완료일**: _________________
