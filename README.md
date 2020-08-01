- [styled-components + 타입스크립트 적용](#styled-components--타입스크립트-적용)
  - [파일 목록](#파일-목록)
  - [`styled-reset`](#styled-reset)
    - [사용법](#사용법)
  - [스타일컴포넌트에 타입적용하기](#스타일컴포넌트에-타입적용하기)
    - [interface + 제네릭](#interface--제네릭)
      - [신규 스타일-컴포넌트에 적용](#신규-스타일-컴포넌트에-적용)
      - [상속받는 스타일-컴포넌트에 적용 1](#상속받는-스타일-컴포넌트에-적용-1)
      - [상속받는 스타일-컴포넌트에 적용 2](#상속받는-스타일-컴포넌트에-적용-2)
      - [상속받는 스타일-컴포넌트에 적용 3](#상속받는-스타일-컴포넌트에-적용-3)
      - [상속받는 스타일-컴포넌트에 적용 4](#상속받는-스타일-컴포넌트에-적용-4)

# styled-components + 타입스크립트 적용

`npm i styled-component`
`npm i -D @types/styled-components`

**예전방식**
`styled-components` 설치후 theme을 활용하기위해

## 파일 목록

- `styled-components.ts`
  파일을 만들고 선언해주어야 했는대, `@types/styled-components` 가 추가된 이후
- `src/styles/styled.d.ts` : `ThemeProvider`에서 사용할 & 기타 스타일 적용시 사용할 값의 타입 지정
  > 타입스크립트 선언 파일 d.ts는 타입스크립트 코드의 타입 추론을 돕는 파일
- `src/styles/theme.ts` : : `styled.d.ts`에서 정의한 테마 interface의 실제 테마를 구현하는 곳!
- `src/styles/global-styles.ts` : reset-css과 전체적용 스타일을 작성

  를 생성해주면 됨, 내가 불러다 쓸것이기에 위치는 편한곳에 두자. 나는 `src/styles`폴더에 모았다.

## `styled-reset`

`global-styles.ts`에 reset-css를 적용해보쟈.npm에 `styled-reset`, styled 전용이 있길래 받아봤다.
`npm i styled-reset`

### 사용법

1. `<Reset/>`로 사용하기
2. `${reset} + createGlobalStyle`로 사용하기

```js
// 최상위 컴포넌트 : ex App.js, _app.js

// 1번 컴포넌트 방식
import { Reset } from 'styled-reset';
const App = () => (
  <>
    <Reset /> {/* 여기에 리셋-컴포넌트 위치 */}
    <div>여기는 최상위 컴포넌트</div>
  </>
);

// 2번 createGlobalstyle 방식
import { reset } from 'styled-reset';
import { createGlobalStyle } from 'styled-components';

// 글로벌 스타일은 src/styles/global-style.ts 에 위치하고 임포트 하여 사용하자!
const GlobalStyle = createGlobalStyle`
  ${reset}
  // 그 밖에 글로벌 스타일 적용할 내용 적기
`;
const App = () => (
  <>
    <GlobalStyle /> {/* 여기에 글로벌-스타일-컴포넌트 위치 */}
    <div>여기는 최상위 컴포넌트</div>
  </>
);
```

## 스타일컴포넌트에 타입적용하기

### interface + 제네릭

#### 신규 스타일-컴포넌트에 적용

```ts
// 컴포넌트
// 스타일-컴포넌트에 적용할 타입과 프롭스-이름: 값 interface 생성
interface TitleProps {
  readonly isActive: boolean;
}
// 위에서 생성한 인터메이스를 제네릭으로 지정
const Title = styled.h1<TitleProps>`
  color: ${(props) => (props.isActive ? 'blue' : 'red')};
`;
```

#### 상속받는 스타일-컴포넌트에 적용 1

```ts
// 컴포넌트 파일
// const 뉴컴포넌트명 = styled(상속받을컴포명)<{프롭스명 : 타입}>`스타일정의`
const NewHeader = styled(Header)<{ customColor: string }>`
  color: ${(props) => props.customColor};
`;
```

#### 상속받는 스타일-컴포넌트에 적용 2

```ts
// 컴포넌트 파일
// const 뉴컴포넌트명 = styled<{프롭스:타입지정}>Header`스타일지정`
const Title =
  styled <
  { isActive: boolean } >
  Header`
  color: ${(props) =>
    props.isActive ? props.theme.primaryColor : props.theme.secondaryColor}
`;
```

#### 상속받는 스타일-컴포넌트에 적용 3

```ts
// 컴포넌트 파일
import Header, { Props as HeaderProps } from './Header';

// const 뉴컴포넌트명 = styled<{프롭스:타입지정}>((isActive,...rest)=>{<Header {...rest} />)`스타일지정`
const Title = styled<{ isActive: boolean }>(({ isActive, ...rest }) => (
  <Header {...rest} />
))`
  color: ${(props) =>
    props.isActive ? props.theme.primaryColor : props.theme.secondaryColor};
`;
```

#### 상속받는 스타일-컴포넌트에 적용 4

```ts
import Header, { Props as HeaderProps } from './Header';

const Title =
  (styled < { isActive: boolean }) &
  (HeaderProps >
    (({ isActive, ...rest }) => <Header {...rest} />)`
  color: ${(props) =>
    props.isActive ? props.theme.primaryColor : props.theme.secondaryColor}
`);
```
