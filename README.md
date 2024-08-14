# InfluxDB No-Code Solution

This project aims to develop a user-friendly, no-code interface for InfluxDB, simplifying the process of querying and trending data for users without programming expertise.

## Prerequisites

- Docker
- Docker Compose

## Project Structure

```
project-root/
├── docker/
│   └── docker-compose.yml
├── src/
│   ├── routes/
│   ├── middleware/
│   ├── queries/
│   └── server.js
├── Dockerfile
├── package.json
├── .env
└── README.md
```

## Getting Started

1. Clone the repository:
   ```
   git clone [your-repo-url]
   cd [your-repo-name]
   ```

2. Start the application in the background:
   ```
   docker-compose -f docker/docker-compose.yml up -d --build
   ```
   The `-d` flag runs the containers in detached mode (in the background).

3. Access the application:
   - Backend API: http://localhost:3000
   - InfluxDB UI: http://localhost:8086. Login using:

    ```
    Username: admin
    Password: password123
    ```

## Development

- The Node.js backend code is in the `src` directory.
- To make changes, edit the files in the `src` directory. The changes will be reflected immediately due to volume mounting and nodemon.

### Adding New Packages

To add a new package to the project:

1. Stop the running containers:
   ```
   docker-compose -f docker/docker-compose.yml down
   ```

2. Install the new package:
   ```
   npm install <package-name>
   ```

3. Rebuild and restart the containers:
   ```
   docker-compose -f docker/docker-compose.yml up -d --build
   ```

This process ensures that the new package is properly installed in the Docker container.


## Viewing Logs

To view logs for the backend service:
```
docker-compose -f docker/docker-compose.yml logs -f backend
```

## Stopping the Application

To stop the application:
```
docker-compose -f docker/docker-compose.yml down
```

## Contributing

### Adding New Queries

1. Create a new file in `src/queries/` for your query. For example, `src/queries/getTemperature.js`:

   ```javascript
   const getTemperature = `
     from(bucket:"mybucket")
       |> range(start: -1h)
       |> filter(fn: (r) => r._measurement == "temperature")
       |> yield(name: "mean")
   `;

   module.exports = getTemperature;
   ```

2. Import and use your query in the appropriate route file.

### Adding New Routes

1. Create a new file in `src/routes/` for your route. For example, `src/routes/temperature.js`:

   ```javascript
   const express = require('express');
   const router = express.Router();
   const { queryApi } = require('../influxdb');
   const getTemperature = require('../queries/getTemperature');

   router.get('/temperature', async (req, res) => {
     try {
       const result = await queryApi.collectRows(getTemperature);
       res.json(result);
     } catch (error) {
       res.status(500).json({ error: error.message });
     }
   });

   module.exports = router;
   ```

2. Import and use your route in `src/server.js`:

   ```javascript
   const temperatureRoutes = require('./routes/temperature');
   app.use('/api', temperatureRoutes);
   ```

### Adding Middleware

1. Create a new file in `src/middleware/` for your middleware. For example, `src/middleware/errorHandler.js`:

   ```javascript
   const errorHandler = (err, req, res, next) => {
     console.error(err.stack);
     res.status(500).json({ error: 'Something went wrong!' });
   };

   module.exports = errorHandler;
   ```

2. Use the middleware in `src/server.js`:

   ```javascript
   const errorHandler = require('./middleware/errorHandler');
   app.use(errorHandler);
   ```

## Additional Information

- The InfluxDB data is persisted in a Docker volume. To completely reset the database, you'll need to remove this volume.
- For security in a production environment, never commit sensitive information like API keys or tokens to the repository. Always use environment variables for such data.

