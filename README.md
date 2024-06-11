# [Bed Management System](https://github.com/lukeol11/Bed-Management-System-Frontend)

[![build](https://github.com/lukeol11/Bed-Management-System-Frontend/actions/workflows/build.yml/badge.svg)](https://github.com/lukeol11/Bed-Management-System-Frontend/actions/workflows/build.yml)
[![GitHub license](https://img.shields.io/github/license/lukeol11/Bed-Management-System-Frontend?color=blue)](https://github.com/lukeol11/Bed-Management-System-Frontend/blob/master/LICENSE)
[![GitHub issues](https://img.shields.io/github/issues/lukeol11/Bed-Management-System-Frontend)](https://github.com/lukeol11/Bed-Management-System-Frontend/issues)
![GitHub Created At](https://img.shields.io/github/created-at/lukeol11/Bed-Management-System-Frontend)
![GitHub last commit](https://img.shields.io/github/last-commit/lukeol11/Bed-Management-System-Frontend)

[![Quality Gate Status](https://sonarcloud.io/api/project_badges/measure?project=lukeol11_Bed-Management-System-Frontend&metric=alert_status)](https://sonarcloud.io/summary/new_code?id=lukeol11_Bed-Management-System-Frontend)
[![Bugs](https://sonarcloud.io/api/project_badges/measure?project=lukeol11_Bed-Management-System-Frontend&metric=bugs)](https://sonarcloud.io/summary/new_code?id=lukeol11_Bed-Management-System-Frontend)
[![Vulnerabilities](https://sonarcloud.io/api/project_badges/measure?project=lukeol11_Bed-Management-System-Frontend&metric=vulnerabilities)](https://sonarcloud.io/summary/new_code?id=lukeol11_Bed-Management-System-Frontend)
[![Code Smells](https://sonarcloud.io/api/project_badges/measure?project=lukeol11_Bed-Management-System-Frontend&metric=code_smells)](https://sonarcloud.io/summary/new_code?id=lukeol11_Bed-Management-System-Frontend)
[![Duplicated Lines (%)](https://sonarcloud.io/api/project_badges/measure?project=lukeol11_Bed-Management-System-Frontend&metric=duplicated_lines_density)](https://sonarcloud.io/summary/new_code?id=lukeol11_Bed-Management-System-Frontend)
[![Security Rating](https://sonarcloud.io/api/project_badges/measure?project=lukeol11_Bed-Management-System-Frontend&metric=security_rating)](https://sonarcloud.io/summary/new_code?id=lukeol11_Bed-Management-System-Frontend)
[![Reliability Rating](https://sonarcloud.io/api/project_badges/measure?project=lukeol11_Bed-Management-System-Frontend&metric=reliability_rating)](https://sonarcloud.io/summary/new_code?id=lukeol11_Bed-Management-System-Frontend)
[![Maintainability Rating](https://sonarcloud.io/api/project_badges/measure?project=lukeol11_Bed-Management-System-Frontend&metric=sqale_rating)](https://sonarcloud.io/summary/new_code?id=lukeol11_Bed-Management-System-Frontend)

[![Vue.js](https://img.shields.io/badge/Vue%20js-35495E?style=for-the-badge&logo=vuedotjs&logoColor=4FC08D)](https://vuejs.org/)
[![Charts.js](https://img.shields.io/badge/Chart%20js-FF6384?style=for-the-badge&logo=chartdotjs&logoColor=white)](https://www.chartjs.org/)
[![Firebase](https://img.shields.io/badge/firebase-ffca28?style=for-the-badge&logo=firebase&logoColor=black)](https://firebase.google.com/)
[![NPM](https://img.shields.io/badge/npm-CB3837?style=for-the-badge&logo=npm&logoColor=white)](https://www.npmjs.com/)
[![Node.js](https://img.shields.io/badge/Node%20js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)](https://nodejs.org/en)
[![Jest](https://img.shields.io/badge/Jest-C21325?style=for-the-badge&logo=jest&logoColor=white)](https://jestjs.io/)
[![JavaScript](https://img.shields.io/badge/JavaScript-323330?style=for-the-badge&logo=javascript&logoColor=F7DF1E)](https://www.javascript.com/)
[![SonarCloud](https://img.shields.io/badge/Sonar%20cloud-F3702A?style=for-the-badge&logo=sonarcloud&logoColor=white)](https://www.sonarsource.com/products/sonarcloud/)
[![Prettier](https://img.shields.io/badge/prettier-1A2C34?style=for-the-badge&logo=prettier&logoColor=F7BA3E)](https://prettier.io/)

## Table of Contects

- [Description](#description)
- [Project setup](#project-setup)
  - [Install Project Dependencies](#install-project-dependencies)
  - [Firebase Configuration](#firebase-configuration)
  - [Backend](#backend)
- [Development](#development)
  - [Run development build](#run-development-build)
- [Deployment](#deployment)
  - [Build](#build)
  - [Run Build](#run-build)
- [Testing](#testing)
  - [Run unit tests](#run-unit-tests)
- [Contributors](#contributors)
- [License](#license)

## Description

## Project setup

### Install Project Dependencies

```bash
nvm use
npm install
```

### Firebase Configuration

```bash
cp src\firebaseConfig.template.js src\firebaseConfig.js
```

Add Firebase configuration to `src\firebaseConfig.js`. See [Firebase Documentation](https://firebase.google.com/docs/web/learn-more#config-object) for more information.

```javascript
export default {
  apiKey: "",
  authDomain: "",
  projectId: "",
  storageBucket: "",
  messagingSenderId: "",
  appId: "",
  measurementId: ""
};
```

### Backend

The backend for this project can be found [here](https://github.com/lukeol11/Bed-Management-System-Backend)

This is **required** to run the application for both development and deployment purposes

## Development

### Run development build

```bash
npm run serve
```

## Deployment

### Build

```bash
npm run build
```

### Run Build

```bash
cd build
npm start
```

## Testing

### Run unit tests

```bash
npm run test:unit
```

## Contributors

![Contributors](https://contrib.rocks/image?repo=lukeol11/Bed-Management-System-Frontend)

## License

This work is licensed under a
[Creative Commons Attribution 4.0 International License][cc-by].

[![CC BY 4.0][cc-by-image]][cc-by]

[cc-by]: http://creativecommons.org/licenses/by/4.0/
[cc-by-image]: https://i.creativecommons.org/l/by/4.0/88x31.png
