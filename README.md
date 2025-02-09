# Triumph Motorcycles Management System

## Contributors
[@Ulysseassoo](uassooemane@myges.fr) - ASSO'O EMANE Ulysse

[@fabian222222](fzuo@myges.fr) - ZUO Fabian

[@jabsraighs](abouaki1@myges.fr) - BOUAKI Arthur

## Description

This project is a management system for Triumph Motorcycles, including functionalities for managing motorcycles, drivers, maintenances, orders, and more. The project is built using a clean architecture approach with separate layers for domain, application, and infrastructure.

## Project Structure

![Project Structure](https://private-user-images.githubusercontent.com/73486687/411360294-49da7b27-dff8-4b68-a32b-73233e24464c.png?jwt=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJnaXRodWIuY29tIiwiYXVkIjoicmF3LmdpdGh1YnVzZXJjb250ZW50LmNvbSIsImtleSI6ImtleTUiLCJleHAiOjE3MzkxMzgyNDUsIm5iZiI6MTczOTEzNzk0NSwicGF0aCI6Ii83MzQ4NjY4Ny80MTEzNjAyOTQtNDlkYTdiMjctZGZmOC00YjY4LWEzMmItNzMyMzNlMjQ0NjRjLnBuZz9YLUFtei1BbGdvcml0aG09QVdTNC1ITUFDLVNIQTI1NiZYLUFtei1DcmVkZW50aWFsPUFLSUFWQ09EWUxTQTUzUFFLNFpBJTJGMjAyNTAyMDklMkZ1cy1lYXN0LTElMkZzMyUyRmF3czRfcmVxdWVzdCZYLUFtei1EYXRlPTIwMjUwMjA5VDIxNTIyNVomWC1BbXotRXhwaXJlcz0zMDAmWC1BbXotU2lnbmF0dXJlPTJlNDE3YmExZmQ4Mjc3ZWE4MWI1ZWIyOGUzY2UzMzg2ZjIwNGQxNjIzZDkyNmRkMWM2ZTJmNTU4Y2IxZjY0YWYmWC1BbXotU2lnbmVkSGVhZGVycz1ob3N0In0._mYsITMPv_weJgAF5KmJTozWxb2z6A6S4t4hz_7EdDY)

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