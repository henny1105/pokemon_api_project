# 포켓몬 도감 프로젝트
<img alt="PokéAPI" src="https://raw.githubusercontent.com/PokeAPI/media/master/logo/pokeapi_256.png">
포켓몬 open API를 활용한 리액트 프로젝트

## 프로젝트 소개
포켓몬 OpenAPI를 활용하여 비동기적으로 포켓몬 데이터를 호출하고, Redux Toolkit으로 상태 관리를 통해 포켓몬 검색, 선택, 배틀, 진화 등의 기능을 제공하는 리액트 프로젝트

## 배포주소
https://pokemon-api-project-nine.vercel.app/

## 개발 기간
- 24년 4월 14일~21일
  
## 멤버구성
- [선웅태(Product Owner)](https://github.com/moojaa) : 나의 포켓몬 리스트 
- [김혜인(Scrum master)](https://github.com/henny1105) : 포켓몬 랜덤뽑기
- [곽슬기](https://github.com/noel-vibe) : 포켓몬 도감 메인 
- [김현주](https://github.com/hyesom2) : 포켓몬 도감 상세
- [윤신혜](https://github.com/sinheyy) : 포켓몬 배틀
  
## 기술 스택
### Environment
<img src="https://img.shields.io/badge/Visual%20Studio-007ACC?style=for-the-badge&logo=visual-studio&logoColor=white"> <img src="https://img.shields.io/badge/git-F05032?style=for-the-badge&logo=git&logoColor=white"> <img src="https://img.shields.io/badge/github-181717?style=for-the-badge&logo=github&logoColor=white"> 

### Config
<img src="https://img.shields.io/badge/npm-CB3837?style=for-the-badge&logo=npm&logoColor=white">

### Developmnet 
<img src="https://img.shields.io/badge/html5-E34F26?style=for-the-badge&logo=html5&logoColor=white"> <img src="https://img.shields.io/badge/css-1572B6?style=for-the-badge&logo=css3&logoColor=white"> <img src="https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black">
 <img src="https://img.shields.io/badge/react-61DAFB?style=for-the-badge&logo=react&logoColor=black"> <img src="https://img.shields.io/badge/react%20query-FF0000?style=for-the-badge&logo=react-query&logoColor=white"> <img src="https://img.shields.io/badge/bootstrap-7952B3?style=for-the-badge&logo=bootstrap&logoColor=white"> <img src="https://img.shields.io/badge/redux-764ABC?style=for-the-badge&logo=redux&logoColor=white">

### Communication
<img src="https://img.shields.io/badge/Discord-5865F2?style=for-the-badge&logo=discord&logoColor=white"> <img src="https://img.shields.io/badge/KakaoTalk-FEE500?style=for-the-badge&logo=kakaotalk&logoColor=black">


## 주요기능
### ✨ 포켓몬 OpenAPI를 활용한 비동기적 데이터 호출
 Axios 등의 HTTP 클라이언트를 통해 포켓몬 리스트를 비동기적으로 호출하고 결과 데이터를 앱 상태로 관리 

### ✨ 포켓몬 검색 및 필터 기능
사용자의 입력에 따라 자동으로 결과를 필터링하고 이를 Redux를 통해 상태로 업데이트 하여, 실시간 UI 반영을 지원

### ✨ Redux Toolkit을 이용한 포켓몬 데이터 상태 관리
나의 포켓몬 리스트 데이터 관리를 위해 Redux Toolkit을 사용하고 앱의 상태 슬라이스를 생성 및 관리하며, 코드의 간결성을 유지

### ✨ 랜덤 포켓몬 선택 및 관리
난수 생성 알고리즘을 사용하여, 포켓몬을 랜덤으로 선택하고 이를 Redux 상태에 저장하여 앱 전반에서 관리

### ✨ 포켓몬 배틀 및 승패 결정
사용자가 선택한 포켓몬과 랜덤 상대 포켓몬 간의 stats 비교를 통해 배틀의 승패를 결정하고 승리시 티켓 획득

### ✨ 포켓몬 진화 매커니즘
사용자가 가지고 있는 포켓몬이 일정 레벨에 도달하면 진화를 할 수 있는 기능 구현 


## 아키텍쳐
### 디렉토리 구조
