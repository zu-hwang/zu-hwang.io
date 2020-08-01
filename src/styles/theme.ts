import { DefaultTheme } from 'styled-components';

// src/styles/styled.d.ts에서 정의한 타입을 불러와서 내가 생성한 테마에 적용한다
// 다크모드/ 화이트 모드 다양한 테마와 자주쓰는 컬러리스트 , 폰트리스트 등 정의해 두자
const theme: DefaultTheme = {
  basicWidth: '320px',
  color: {
    main: 'black',
    sub: 'white',
  },
};

export { theme }; // 컴포넌트에서 임포트 하여 적용한다
