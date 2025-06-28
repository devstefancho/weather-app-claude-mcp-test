# 🌤️ Weather Apps Project

두 가지 스타일의 날씨 애플리케이션을 제공하는 프로젝트입니다.

## 📁 프로젝트 구조

```
claude-mcp-test/
├── v1/                    # iOS 스타일 날씨앱
│   ├── index.html
│   ├── styles.css
│   └── script.js
├── v2/                    # 애니메이션 날씨앱
│   ├── index.html
│   ├── styles.css
│   └── script.js
├── server.py              # Python 웹서버
├── start.sh               # 서버 시작 스크립트
└── README.md
```

## 🚀 실행 방법

### 방법 1: 시작 스크립트 사용 (권장)
```bash
./start.sh
```

### 방법 2: Python 직접 실행
```bash
python3 server.py
```

### 방법 3: 커스텀 포트로 실행
```bash
./start.sh 3000
# 또는
python3 server.py 3000
```

## 🌐 접속 주소

서버 실행 후 다음 주소에서 앱에 접속할 수 있습니다:

- **메인 페이지**: http://localhost:8000
- **v1 (iOS Style)**: http://localhost:8000/v1/
- **v2 (Animated)**: http://localhost:8000/v2/

## 📱 앱 소개

### v1: iOS Style Weather App
- iOS 네이티브 날씨앱과 유사한 디자인
- 글래스모피즘 효과와 블러 처리
- 깔끔하고 미니멀한 인터페이스
- 시간별/주간 날씨 예보
- 다양한 날씨 정보 (습도, 바람, 가시거리 등)

### v2: Animated Weather App
- 풍부한 애니메이션과 시각 효과
- 날씨 조건에 따른 파티클 시스템
- 실시간 온도 차트
- 인터랙티브한 요소들
- 현대적이고 화려한 디자인

## 🛠️ 기술 스택

- **Frontend**: HTML5, CSS3, Vanilla JavaScript
- **Backend**: Python HTTP Server
- **데이터**: Mock Data (외부 API 없음)

## ✨ 주요 기능

- 📱 반응형 디자인 (모바일/데스크톱 지원)
- 🎨 두 가지 다른 UI/UX 스타일
- ⚡ 실시간 시간 업데이트
- 🌈 다양한 애니메이션 효과
- 📊 온도 차트 및 그래프
- 🔄 자동 데이터 새로고침

## 🔧 서버 중지

서버를 중지하려면 터미널에서 `Ctrl + C`를 누르세요.

---

🌤️ **즐거운 날씨앱 체험 되세요!**