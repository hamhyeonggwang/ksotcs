# KSOTCS 공개 사이트 이미지 교체 안내

현재 홈 히어로는 프로젝트에 있던 사진을 임시로 사용합니다. 공식 로고와 최종 히어로 원본을 받으면 아래 이름으로 추가하고 `components/SiteBrand.tsx`, `components/Hero.tsx`의 슬롯 경로를 교체합니다.

## 공식 로고

- 권장 파일명: `logo-ksotcs.svg` 또는 `logo-ksotcs.png`
- 투명 배경
- PNG는 가로 1000px 이상
- 로고에 포함된 글자와 여백을 임의로 다시 그리지 않습니다.

## 히어로 2장

- `hero-01-desktop.jpg`: 2000 × 900px 이상
- `hero-01-mobile.jpg`: 900 × 1200px 이상
- `hero-02-desktop.jpg`: 2000 × 900px 이상
- `hero-02-mobile.jpg`: 900 × 1200px 이상
- JPG 또는 WebP 권장, 파일당 500KB 전후로 최적화
- 모바일 이미지는 데스크탑 원본을 단순 축소하지 않고 인물이 세로 화면 안에 들어오도록 별도 크롭

## 현재 연결된 임시 사진

- 첫 화면: `hero-landing.png`
- 두 번째 화면: `feature-research-practice.png`

교육공지 포스터는 정적 파일이 아니라 Supabase `activity_photos` 테이블과 스토리지에서 불러옵니다.
