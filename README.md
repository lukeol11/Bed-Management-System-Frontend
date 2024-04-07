# [Bed Management System](https://github.com/lukeol11/Bed-Management-System-Frontend)

[![Quality Gate Status](https://sonarcloud.io/api/project_badges/measure?project=lukeol11_Bed-Management-System-Frontend&metric=alert_status)](https://sonarcloud.io/summary/new_code?id=lukeol11_Bed-Management-System-Frontend)
[![Bugs](https://sonarcloud.io/api/project_badges/measure?project=lukeol11_Bed-Management-System-Frontend&metric=bugs)](https://sonarcloud.io/summary/new_code?id=lukeol11_Bed-Management-System-Frontend)
[![Vulnerabilities](https://sonarcloud.io/api/project_badges/measure?project=lukeol11_Bed-Management-System-Frontend&metric=vulnerabilities)](https://sonarcloud.io/summary/new_code?id=lukeol11_Bed-Management-System-Frontend)
[![Code Smells](https://sonarcloud.io/api/project_badges/measure?project=lukeol11_Bed-Management-System-Frontend&metric=code_smells)](https://sonarcloud.io/summary/new_code?id=lukeol11_Bed-Management-System-Frontend)
[![Duplicated Lines (%)](https://sonarcloud.io/api/project_badges/measure?project=lukeol11_Bed-Management-System-Frontend&metric=duplicated_lines_density)](https://sonarcloud.io/summary/new_code?id=lukeol11_Bed-Management-System-Frontend)

[![Security Rating](https://sonarcloud.io/api/project_badges/measure?project=lukeol11_Bed-Management-System-Frontend&metric=security_rating)](https://sonarcloud.io/summary/new_code?id=lukeol11_Bed-Management-System-Frontend)
[![Reliability Rating](https://sonarcloud.io/api/project_badges/measure?project=lukeol11_Bed-Management-System-Frontend&metric=reliability_rating)](https://sonarcloud.io/summary/new_code?id=lukeol11_Bed-Management-System-Frontend)
[![Maintainability Rating](https://sonarcloud.io/api/project_badges/measure?project=lukeol11_Bed-Management-System-Frontend&metric=sqale_rating)](https://sonarcloud.io/summary/new_code?id=lukeol11_Bed-Management-System-Frontend)

## Contributors

Developed by Luke O'Leary as part of their final year project at the University of Limerick titled "_A Web-Based Approach to Hospital Bed Management_"

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
