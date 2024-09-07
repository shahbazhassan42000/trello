import https from 'https';
import http from 'http';
import fs from "fs";
import path from "path";
import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import morganBody from 'morgan-body';
import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import dotenv from 'dotenv';
import routes from './routes';
import swaggerOptions from './config/swagger';
import middlewares from './middlewares';
import dbConnect from "./utils/db";

dotenv.config();
const port = process.env.PORT || 5000;
const app = express();

const {errorHandler} = middlewares.errorHandler;

// middleware
const corsOption = {
  origin: process.env.CORS_ORIGIN,
  credentials: true,
};
app.use(cors(corsOption));
app.use(express.json());

// swagger Documentation
const swaggerSpec = swaggerJSDoc(swaggerOptions);
const swaggerUiHandler = swaggerUi.setup(swaggerSpec);
const docsJsonPath = '/api-docs.json';

app.get(docsJsonPath, (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  res.send(swaggerSpec);
});

app.use('/docs', swaggerUi.serve, (req, res, next) => {
    if (!req.query.url) {
        res.redirect(
            `/docs?url=${req.protocol}://${req.headers.host}${docsJsonPath}`
        );
    } else {
        swaggerUiHandler(req, res);
    }
});


app.use(
    bodyParser.json({
        limit: process.env.BODY_LIMIT,
    })
);

// hook morganBody to express app
if (process.env.NODE_ENV === 'development') {
    morganBody(app);
}

// api routes to /api
app.use('/api', routes);

console.log("ENV: ", process.env.NODE_ENV);
if (process.env.NODE_ENV == 'production') {
  // Serve static files from the React app
  const buildPath = path.join(__dirname, '../../frontend/build');
  app.use(express.static(buildPath));

  // The "catchall" handler: for any request that doesn't match one above, send back React's index.html file.
  app.get('*', (req, res) => {
    res.sendFile(path.join(buildPath, 'index.html'));
  });
}


// global error handler function
app.use(errorHandler);

let server;

// Load SSL certificates in development mode
if (process.env.NODE_ENV === 'development') {
  const privateKey = fs.readFileSync(path.join(process.env.DIRNAME, 'key.pem'), 'utf8');
  const certificate = fs.readFileSync(path.join(process.env.DIRNAME, 'cert.pem'), 'utf8');
  const credentials = { key: privateKey, cert: certificate };
  server = https.createServer(credentials, app);
} else {
  server = http.createServer(app);
}



// starting the server
server.listen(port, () => {
  dbConnect();
  console.log(`Server running on port ${port}`);
});


export default app;
