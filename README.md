# Triumph Motorcycles Management System

## Contributors
[@Ulysseassoo](uassooemane@myges.fr) - ASSO'O EMANE Ulysse

[@fabian222222](fzuo@myges.fr) - ZUO Fabian

[@jabsraighs](abouaki1@myges.fr) - BOUAKI Arthur

## Description

This project is a management system for Triumph Motorcycles, including functionalities for managing motorcycles, drivers, maintenances, orders, and more. The project is built using a clean architecture approach with separate layers for domain, application, and infrastructure.

## Project Structure

├── .gitignore
├── jest.config.ts
├── package.json
├── README.md
├── tsconfig.json
└── src
    ├── application
    │   ├── exceptions
    │   ├── repositories
    │   └── usecases
    ├── domain
    │   ├── entities
    │   └── interfaces
    ├── infrastructure
    │   ├── database
    │   ├── frameworks
    │   │   ├── express
    │   │   ├── nestjs
    │   │   └── react
    │   └── orm
    └── test
        ├── useCases
            ├── addMaintenanceUseCase.spec.ts
            ├── listUserUseCase.spec.ts
        ├── attempt.service.spec.ts
        ├── breakdown.service.spec.ts
        ├── corrective-action.service.spec.ts
        ├── crash.service.spec.ts
        ├── driver.service.spec.ts
        ├── driverLicense.spec.ts
        ├── maintenance.service.spec.ts
        ├── moto.service.spec.ts
        ├── notification.service.spec.ts
        └── order.service.spec.ts

## Prerequisites

- Node.js (version 14 or higher)
- npm or yarn
- Docker (optional, for running services in containers)

1. Clone the repository:

```sh
git clone https://github.com/Ulysseassoo/triumph.git
cd triumph
```

2. Install dependencies:
```sh
npm install
# or
yarn install
```

3. Running the Services
### Express
To run the Express service:
```sh
cd src/infrastructure/frameworks/express
npm install
npm load-fixtures
npm run dev
```

### NestJs
To run the NestJs service:
```sh
cd src/infrastructure/frameworks/nestjs
npm install
npm run start:dev
```

### React
To run the React frontend:
```sh
cd src/infrastructure/frameworks/react
npm install
npm run dev
```

## Running Tests
You must be at the root of the entire project
```sh
npm run test
# or
yarn test
```