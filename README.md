# InfluxDB No-Code Solution

This project aims to develop a user-friendly, no-code interface for InfluxDB, simplifying the process of querying and trending data for users without programming expertise.

## Prerequisites

- Docker
- Docker Compose
- Node.js and npm

## Getting Started

1. Clone the repository:
   ```
   git clone [your-repo-url]
   cd [your-repo-name]
   ```

2. Start InfluxDB:
   ```
   docker-compose -f docker/docker-compose.yml up -d
   ```

3. Install Node.js dependencies:
   ```
   npm install
   ```

4. Start the Node.js server:
   ```
   npm run start
   ```

5. Access the application:
   - Backend API: http://localhost:3000
   - InfluxDB UI: http://localhost:8086
     Login using:
     ```
     Username: admin
     Password: password123
     ```

## Development

- Use `npm run dev` instead of `npm run start` to run the server with nodemon for automatic restarts on file changes.
- The Node.js backend code is in the `src` directory.
- To make changes, edit the files in the `src` directory.

## Stopping the Application

1. Stop the Node.js server by pressing `Ctrl+C` in the terminal where it's running.

2. Stop InfluxDB:
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




