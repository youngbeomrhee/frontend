# React와 Redux를 사용한 Bingo 프로그램

## 관리되어야 할 액션
- 게임 시작
- 게임 재시작
- 사용자의 숫자 선택
- 게임 종료

### 기본구성
- 게임 (재)시작 버튼
- 1P용 5x5 빙고판과 완성 줄 표시 목록
- 2P용 5x5 빙고판과 완성 줄 표시 목록

### 게임 시작
1. 모든 셀은 비어있고, '게임 시작' 버튼 이외의 어떤 영역을 클릭해도 반응하지 않는다.
2. '게임 시작' 버튼을 클릭하면 1에서 25까지의 숫자가 임의로 배치 게임이 시작된다
3. '게임 시작' 버튼이 "게임 재시작" 버튼으로 바뀐다

### 게임 재시작
'게임 재시작' 버튼을 누르면 완성 줄 목록이 초기화되며, 빙고판은 초기화됨

### 사용자의 숫자 선택
1. 1p부터 선택. 2p와 번갈아가며 선택. 자신의 차례가 아닌 경우 선택할 경우 '잘못된 차례입니다.' 알림
2. 선택되지 않은 cell을 클릭하면 해당 숫자에 마킹
3. 가로, 세로, 대각선으로 5개가 연달아 마킹되면 완성줄 목록에 완성된 숫자대로 표기

### 게임 종료
5줄을 완성한 플레이어가 생기면, 결과에 따라 '1/2P가 빙고를 완성했습니다.', '무승부입니다.' 알림. 확인을 누르면 UI가 완전히 초기화

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.<br>
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.<br>
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br>
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (Webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: https://facebook.github.io/create-react-app/docs/code-splitting

### Analyzing the Bundle Size

This section has moved here: https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size

### Making a Progressive Web App

This section has moved here: https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app

### Advanced Configuration

This section has moved here: https://facebook.github.io/create-react-app/docs/advanced-configuration

### Deployment

This section has moved here: https://facebook.github.io/create-react-app/docs/deployment

### `npm run build` fails to minify

This section has moved here: https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify
