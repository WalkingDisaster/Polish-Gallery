import * as bodyParser from 'body-parser';
import * as cookieParser from 'cookie-parser';
import * as express from 'express';
import * as logger from 'morgan';
import * as path from 'path';

import errorHandler = require('errorhandler');
import methodOverride = require('method-override');

import { Settings } from './configuration';
import { PolishRoute } from './routes/polish-route';

export class Server {

  public static bootstrap(): Server {
    return new Server();
  }

  public app: express.Application;

  constructor() {
    // create expressjs application
    this.app = express();

    // configure application
    this.config();

    // add routes
    this.routes();

    // add api
    this.api();
  }

  public api() {
    // empty for now
  }

  public config() {
    // add static paths
    this.app.use(express.static(path.join(__dirname, 'public')));

    // configure pug
    this.app.set('views', path.join(__dirname, 'views'));
    this.app.set('view engine', 'pug');

    // mount logger
    this.app.use(logger('dev'));

    // mount json form parser
    this.app.use(bodyParser.json());

    // mount query string parser
    this.app.use(bodyParser.urlencoded({
      extended: true,
    }));

    // mount cookie parker
    this.app.use(cookieParser(Settings.application.cookieSecret));

    // mount override?
    this.app.use(methodOverride());

    // catch 404 and forward to error handler
    this.app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
        err.status = 404;
        next(err);
    });

    // error handling
    this.app.use(errorHandler());

    this.app.use((req, res, next) => {
      res.header('Access-Control-Allow-Origin', '*');
      res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
      res.header('Access-Control-Allow-Credentials', 'true');
      res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, PATCH, DELETE');
      next();
    });
  }

  private routes() {
    let router: express.Router;
    router = express.Router();

    // IndexRoute
    PolishRoute.create(router);

    // use router middleware
    this.app.use(router);
  }
}
