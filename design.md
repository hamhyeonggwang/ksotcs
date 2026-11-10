# Design: KSOTCS 대한아동학교작업치료학회

공개 사이트의 잠금 디자인 시스템. `www.childedu.or.kr/user/index.asp`의 명확한 기관형 정보 구조와 사용자 제공 모바일 레퍼런스를 KSOTCS 콘텐츠에 맞게 재구성한다.

## System

- Font: Pretendard Variable only
- Desktop: centered masthead, separate horizontal navigation, wide image hero, four quick links, three information panels
- Mobile: hamburger, centered wordmark, quick menu, portrait hero, 2 × 2 text panels, stacked information cards
- Palette: white and warm gray grounds with sky, peach, lime and lilac accents
- Motion: one two-slide carousel; 6-second interval with visible pause, hover/focus pause and reduced-motion stop

## Tokens

`app/tokens.css` is the source of truth. All colours and typography pass through its semantic roles.

## Brand material

- The official logo and four final hero assets remain replaceable slots.
- Until supplied, the wordmark is typeset and the two existing project photographs fill the hero slots.
- No substitute logo is invented.

## Breakpoint

Desktop and mobile chrome switch at 64rem. This is an intentional component change, not a compressed desktop header.
