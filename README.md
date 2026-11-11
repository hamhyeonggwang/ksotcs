# 대한아동·학교작업치료학회 홈페이지

2026년 트렌드에 맞춘 현대적인 랜딩 페이지로 리뉴얼된 학회 홈페이지입니다.

## 기술 스택

- **Next.js 14** - React 기반 프레임워크
- **TypeScript** - 타입 안정성
- **Tailwind CSS** - 유틸리티 기반 CSS 프레임워크
- **App Router** - Next.js 최신 라우팅 시스템

## 주요 기능

- 🎨 현대적이고 세련된 UI/UX 디자인
- 📱 완전 반응형 디자인 (모바일, 태블릿, 데스크톱)
- 🚀 빠른 페이지 로딩 및 부드러운 애니메이션
- 🎯 직관적인 네비게이션 메뉴

## 메뉴 구조

- **학회소개** (`/about`) - 학회에 대한 소개
- **학회지 안내** (`/journal`) - 학회지 및 논문 안내
- **학회소식** (`/news`) - 최신 소식 및 공지사항
- **교육센터** (`/center`) - 교육 센터 안내 및 교육 프로그램

## 설치 및 실행

### 1. 의존성 설치

```bash
npm install
```

### 2. 개발 서버 실행

```bash
npm run dev
```

브라우저에서 [http://localhost:3000](http://localhost:3000)을 열어 확인하세요.

### 3. 프로덕션 빌드

```bash
npm run build
npm start
```

## 프로젝트 구조

```
ksotcs/
├── app/                    # Next.js App Router
│   ├── layout.tsx         # 루트 레이아웃
│   ├── page.tsx           # 메인 페이지
│   ├── globals.css        # 전역 스타일
│   ├── about/             # 학회소개 페이지
│   ├── journal/           # 학회지 안내 페이지
│   ├── news/              # 학회소식 페이지
│   └── center/            # 교육센터 페이지
├── components/            # 재사용 가능한 컴포넌트
│   ├── Navbar.tsx         # 네비게이션 바
│   ├── Hero.tsx           # 히어로 섹션
│   ├── About.tsx          # 소개 섹션
│   ├── Features.tsx       # 주요 서비스 섹션
│   ├── News.tsx           # 최신 소식 섹션
│   ├── CTA.tsx            # Call-to-Action 섹션
│   └── Footer.tsx         # 푸터
├── public/                # 정적 파일
├── tailwind.config.ts     # Tailwind CSS 설정
├── tsconfig.json          # TypeScript 설정
└── package.json           # 프로젝트 의존성
```

## 다음 단계

각 페이지는 현재 플레이스홀더 내용으로 구성되어 있습니다. 추후 실제 내용과 링크를 연동하여 업데이트할 수 있습니다.

## 라이선스

Copyright © 2015 대한아동·학교작업치료학회. All right reserved.
