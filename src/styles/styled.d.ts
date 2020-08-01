import 'styled-components';

// declare module을 사용해 extend 하는 방법!
declare module 'styled-components' {
  // styled-compoents가 ThemeProvider를 활용하기 위해 interface추가
  export interface DefaultTheme {
    // 내가 사용할 값을 작성한다.
    // 나는 basicWidth, color 값 2가지 타입 정으함,
    basicWidth: string;
    color: {
      main: string;
      sub: string;
    };
  }
}
