# InfluxDB No-Code Solution Backend

## Description

This repository contains the backend API for the InfluxDB No-Code Solution. It provides a Node.js Express server that interfaces with InfluxDB, handling queries and data management for the frontend application.

## Features

- RESTful API for InfluxDB operations
- Query parsing and execution
- Data transformation for frontend consumption
- Authentication and authorization
- Integration with Grafana API

## Getting Started

### Prerequisites

- Node.js (v18 or later)
- Docker (optional, for containerized development)
- InfluxDB (v2.7)

### Installation

1. Clone the repository:
   ```
   git clone https://github.com/your-organization/influxdb-no-code-backend.git
   cd influxdb-no-code-backend
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Set up environment variables:
   Copy `.env.example` to `.env` and fill in the required variables:
   ```
   cp .env.example .env
   ```

4. Start the development server:
   ```
   npm run dev
   ```

The server will start on `http://localhost:3000` by default.

## Project Structure

```
backend/
├── src/
│   ├── config/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── services/
│   ├── utils/
│   └── app.js
├── tests/
├── .env
├── .gitignore
├── .eslintrc.js
├── .prettierrc
├── nodemon.json
├── package.json
└── README.md
```

## Development

To start the development server with hot-reloading:

```
npm run dev
```

## Testing

Run the test suite:

```
npm test
```

## Linting and Formatting

To lint the code:

```
npm run lint
```

To automatically fix linting issues:

```
npm run lint:fix
```

To format the code:

```
npm run format
```

## Docker

A Dockerfile is provided for containerized development and deployment. To build and run the Docker image:

```
docker build -t influxdb-no-code-backend .
docker run -p 3000:3000 influxdb-no-code-backend
```

## API Documentation

API documentation is available at `/api-docs` when the server is running.

## Contributing

Please read [CONTRIBUTING.md](CONTRIBUTING.md) for details on our code of conduct and the process for submitting pull requests.

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details.
