
## React Next Snippets

React, NextJS 학습하면서 이해한 내용을 재사용 하기위해 관련 코드를 모아둔 레포입니다.<br>

예를 들어, <br>
Client Component 에서 Server Component 를 사용하는 경우,<br>
Server Component 에서 Client Component 를 사용해야 하는 경우 <br>
등 다양한 조합을 통해서 코드를 작성하였습니다.<br>

## Dependencies
- React 19.1.0
- Next 15.2.5

## Getting Started

First, run the development server:

```bash
pnpm install

pnpm dev
```

http://localhost:3010

## Preview
![미리보기](/public/images/sample_screen.png)

## Library

- "react-intersection-observer": 무한 스크롤 구현을 위해 필요
- "react-error-boundary": 컴포넌트 에러 영역 처리를 위해 필요
- "react-hook-form": Form Validation을 위해 필요
- "zod": Form Validation을 위해 필요 ( react-hook-form 과 함께 사용 )
- "axios": API 통신을 위해 필요 ( interceptor 로 전처리, 후처리 )
- "dayjs": 날짜 포맷을 위해 필요
- "immer": 복잡한 상태 관리를 위해 필요 ( 불변성 유지 )
- "js-cookie": 쿠키 관리를 위해 필요
- "winston": 로깅을 위해 필요 ( 서버 사이드 )
- "winston-daily-rotate-file": 로깅을 위해 필요
- "qs": 쿼리 스트링을 객체로 변환하기 위해 필요
- "@tanstack/react-query": API 통신을 위해 필요 ( 캐시 처리 )
- "classnames": CSS 클래스 이름을 조합하기 위해 필요
- "clsx": CSS 클래스 이름을 조합하기 위해 필요 ( classnames 대체 )
- "lodash": 유틸리티 함수들을 사용하기 위해 필요
- "use-debounce": 디바운스 처리를 위해 필요
- "zustand": 상태 관리를 위해 필요 ( 전역 상태 관리 )
- "react-copy-to-clipboard-ts": 클립보드 복사를 위해 필요
- "next-navigation-guard": 페이지 이동 시 확인을 위해 필요
  - ex) 페이지 이동 시 저장되지 않은 데이터가 있는 경우 확인
- "next-intl": 다국어 처리를 위해 필요
  - with routing, without routing 방식 모두 사용 가능
  - i18next, react-i18next 조합은 너무 복잡
  - react-intl 아님 헷갈리지 말 것
