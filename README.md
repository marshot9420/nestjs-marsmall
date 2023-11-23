# MarsMall-backend

MarsMall 백엔드 저장소

<h1 align="center">MarsMall-Backend</h1>

<br>

<p align="center">
    <a href="" target="_blank"><img src="#" /></a>
</p>

<br><br>

<h2 id="tech-stack">⚒ Tech Stack ⚒</h2>

<br>

#### ✅ Language

[![TypeScript](https://img.shields.io/badge/TypeScript-333?style=flat-square&logo=typescript&logoColor=white&labelColor=007ACC)](#)
[![JavaScript](https://img.shields.io/badge/JavaScript-333?style=flat-square&logo=JavaScript&logoColor=F7DF1E&labelColor=323330)](#)

#### ✅ Backend

[![NestJS](https://img.shields.io/badge/Nest_JS-333?style=flat-square&logo=nestjs&logoColor=white&labelColor=E0234E)](#)
[![TypeORM](https://img.shields.io/badge/TypeORM-333?style=flat-square&logo=nestjs&logoColor=thie&labelColor=E34F26)](#)
[![MariaDB](https://img.shields.io/badge/MariaDB-333?style=flat-square&logo=MariaDB&logoColor=white&labelColor=003545)](#)
[![Passport](https://img.shields.io/badge/Passport-333?style=flat-square&logo=Passport&logoColor=white&labelColor=34E27A)](#)
[![Swagger](https://img.shields.io/badge/Swagger-333?style=flat-square&logo=Swagger&logoColor=85EA2D&labelColor=000)](#)
[![PM2](https://img.shields.io/badge/PM2-333?style=flat-square&logo=PM2&logoColor=white&labelColor=2B037A)](#)

#### ✅ Deploy & OS & Web Server

[![AWS ECS](https://img.shields.io/badge/AWS_ECS-333?style=flat-square&logo=amazonaws&logoColor=white&labelColor=232F3E)](#)
[![Docker](https://img.shields.io/badge/Docker-333?style=flat-square&logo=docker&logoColor=white&labelColor=2496ED)](#)
[![Ubuntu](https://img.shields.io/badge/Ubuntu-333?style=flat-square&logo=ubuntu&logoColor=white&labelColor=E95420)](#)
[![Github Actions](https://img.shields.io/badge/Github_Actions-333?style=flat-square&logo=githubactions&logoColor=white&labelColor=2088FF)](#)

#### ✅ Code Style

[![ESLint](https://img.shields.io/badge/eslint-333?style=flat-square&logo=eslint&logoColor=white&labelColor=3A33D1)](#)
[![Prettier](https://img.shields.io/badge/prettier-333?style=flat-square&logo=prettier&logoColor=F7BA3E&labelColor=1A2C34)](#)

#### ✅ Other Libraries

[![GIT](https://img.shields.io/badge/GIT-333?style=flat-square&logo=git&logoColor=white&labelColor=E44C30)](#)
[![Yarn](https://img.shields.io/badge/Yarn-333?style=flat-square&logo=yarn&logoColor=white&labelColor=2C8EBB)](#)
[![JWT](https://img.shields.io/badge/JWT-333?style=flat-square&logo=JSON%20web%20tokens&logoColor=white&labelColor=000000)](#)

<br><br><br>

<h2 id="start">▶ 시작하기</h2>

<br>

**프로젝트 설치**

```bash
git clone https://github.com/WeeklyBest/weeklybest-backend
```

<br>

**환경변수 설정**

> `.env.development` 파일에 환경변수를 넣어<br> > **루트 디렉토리**에 위치시켜야 애플리케이션이 정상적으로 동작합니다.

<br>

**템플릿 파일**

👉 [.env.template](.env.template)

**환경변수 설명**

|       키        |           설명           |       예시       |
| :-------------: | :----------------------: | :--------------: |
|     `HOST`      |       호스트 주소        | http://localhost |
|     `PORT`      |        서버 포트         |       4000       |
|  `CLIENT_PORT`  |     클라이언트 포트      |       3000       |
|    `DB_HOST`    |    TypeORM DB 호스트     |    localhost     |
|    `DB_PORT`    |   TypeORM DB 포트 번호   |       3306       |
|  `DB_DATABASE`  |     TypeORM DB 이름      |       test       |
|  `DB_USERNAME`  |    TypeORM DB 유저명     |      admin       |
|  `DB_PASSWORD`  | TypeORM DB 유저 비밀번호 |       1234       |
| `COOKIE_SECRET` |      쿠키 시크릿 키      |                  |

<br>

**패키지 설치 및 실행**

```bash
yarn            # package.json dependencies 설치
yarn start:dev  # 개발 모드로 실행
```

<br><br>
