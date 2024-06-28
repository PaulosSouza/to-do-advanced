<div align="center">
  <img src="./.github/assets/logo.png" alt="To do - Advanced" width="80">
  <br>
  <h1>To do - Advanced</h1>
  <strong>Redefining Task Management with Advanced Features</strong>
</div>
<br>

"To Do - Advanced" is a task list application with advanced features, including user authentication and an audit log to track all user actions.

## Table of Contents

- [Table of Contents](#table-of-contents)
- [Getting Started](#getting-started)
  - [Prerequisites](#prequisites)
  - [Installation](#installation)
  - [Environment Variables](#environment-variables)
  - [Running Locally](#running-locally)
- [License](#license)


## Getting Started

To get started with this project, follow these steps:

### Prerequisites

Ensure you have the following installed on your local development environment:

- [Docker](https://www.docker.com/products/docker-desktop/)
- [Node.js](https://nodejs.org/en/download/package-manager)
- [npm](https://www.npmjs.com/) (Node Package Manager, comes with Node.js)


### Installation

**Clone the project and access the folder**

```bash
git clone https://github.com/PaulosSouza/to-do-advanced.git && cd to-do-the-new-way
```

**Install the dependencies**

```bash
npm install
```

**Docker volume for mongodb**
It is necessary to set the permissions of the mongodb folder to 777 before starting the container.

```bash
mkdir -p .docker/mongodb && sudo chmod -R 777 .docker/mongodb
```

**Run docker compose**

```bash
docker-compose up -d
```

### Environment Variables
Creates a .env file in the root of your project that must be a copy from .env.example.

```bash
cp .env.example .env
```

### Running Locally
To run the project locally, use the following command:

>If you did not run the Docker Compose command and already have MongoDB and PostgreSQL set up with your credentials, you must update the MONGODB_URL and POSTGRESQL_URL environment variables accordingly.

```bash
npm run start:dev
```

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
