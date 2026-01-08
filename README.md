# 숫자야구 

### 서로 다른 숫자를 추리해 정답을 맞춰보세요!

## 🍏 App Store
- 플랫폼 : IOS
- 출시 상태 : App Store 배포 완료
- [앱스토어 다운로드 링크](https://apps.apple.com/app/%EC%88%AB%EC%9E%90%EC%95%BC%EA%B5%AC/id6757119119)

## 폴더 구조
```
RN
├── app (화면 흐름 제어)
│   └── _layout.tsx
│   ├── index.tsx
│   └── mainPage.tsx
│
├── components (화면 랜더링 조각 모음)
│   ├── Display.tsx
│   ├── DisplayBanner.tsx
│   ├── GameStatsModal.tsx
│   ├── InputWindow.tsx
│   ├── IntroModal.tsx
│   └── Keypad.tsx
│
├── hooks (게임 진행 로직)
│   ├── useGameLogic.ts
│   └── useBannerLogic.ts
│
├── utils (게임 관련 함수 모음)
│   ├── chooseEndingMent.ts
│   ├── createRandomNumber.ts
│   ├── judgeResult.ts
│   └── storageLogic.ts
│
└── types (공용 타입 관리)
    └── types.ts
```
폴더 구조에 명확한 의미를 담고자 했습니다.  

이전까지 코드를 작성하며 파일별로 그 역할이 명확하지 않다 느꼈고, 이러한 구조는 시간이 조금만 지나도 코드의 의도를 파악하기 어렵다는 문제로 이어졌습니다. 이를 개선하기 위해 각 폴더가 담당하는 책임을 명확히 구분하는 방향으로 설계했습니다.

components 폴더는 화면 내부 UI 랜더링을 담당합니다. 해당 폴더의 파일들은 상태를 갖지않고, 모두 props로 전달 받아 화면을 그리기만 합니다. 가능한 작은 단위로 컴포넌트를 분리하여, 상태 변화시 불필요한 리랜더링을 최소화 하도록 했습니다.  
hooks 폴더는 게임의 진행을 위한 로직이 담겨있습니다. 게임에 필요한 여러 상태값을 관리하고, 상태 변화를 유발하는 함수들 역시 이 영역에서 함께 관리합니다.  
utils 폴더는 상태 관리와 직접적인 연관은 없지만, 게임 진행에 필요한 몇가지 함수들을 보다 편히 관리하기 위해 생성했습니다.  

추후 이 앱에 추가 기능들이 붙는 상황을 고려했을때, 각 폴더의 역할이 명확히 분리된만큼 보다 더 빠른 작업이 가능할 것으로 예상됩니다.

## 기술스택

![Expo](https://img.shields.io/badge/expo-1C1E24?style=for-the-badge&logo=expo&logoColor=#D04A37)
![React Native](https://img.shields.io/badge/react_native-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white)

## 전역 상태관리 라이브러리 미사용의 이유

이 앱의 상태는 모두 hooks 폴더 하위 커스텀훅에서 관리됩니다. 상태 변화에 따라 리렌더링되는 components들은 해당 훅으로부터 필요한 상태만을 props로 전달받아 화면을 그리는 구조입니다. 이 과정은 모두 1~2 depth의 얕은 props 전달 과정을 거치고, 상태의 흐름 역시 단방향으로 흘러갑니다. 또한 동시에 여러 컴포넌트에서 같은 상태를 읽거나 변경해야할 상황 역시 존재하지 않았습니다.  
이에 따라 useState와 커스텀훅 만으로도 충분히 명확하고 유지보수 가능한 상태관리가 가능하다 판단하여 전역 상태 관리 라이브러리를 도입하지 않았습니다.

## 로컬 스토리지 활용

별도의 서버를 두지 않고, 사용자의 플레이 기록을 유지하기 위해 로컬 스토리지를 활용했습니다. 단순한 값의 저장이 아닌, 기록에 목적을 두고 데이터 구조를 설계했습니다.  
게임이 종료될 때마다 게임의 시도 횟수, 볼/스트라이크 비율, 결과 등을 하나의 단위로 저장, 해당 기록들은 누적되어 통계 정보로 활용됩니다.  
이와 관련된 로직들은 컴포넌트에서 직접 처리하지 않고, utils 폴더의 storageLogic 함수로 분리하여 관리했습니다. 해당 함수 내부에 저장,조회,초기화 로직을 모아 가독성 및 유지보수성을 향상시켰습니댜. 

## 4.3(a) design-spam 심사 대응

[심사 대응 블로그 글](https://velog.io/@seongnam-si/App-Store-4.3a-Design-Spam-%EB%8C%80%EC%9D%91%EA%B8%B0)