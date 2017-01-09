import { CollectionMeta, DatabaseMeta, DocumentClient } from 'documentdb';
import { NextFunction, Request, Response, Router } from 'express';

import { Settings } from '../configuration';
import { DocumentDbService } from '../document-db-service';
import { BaseRoute } from './api-route';

export class PolishRoute extends BaseRoute {

  public static create(router: Router) {
    let route = new PolishRoute();
    router.patch('/polish/reset', (req: Request, res: Response, next: NextFunction) => {
      route.resetDatabase(req, res, next);
    });
    router.get('/polish/featured', (req: Request, res: Response, next: NextFunction) => {
      route.getFeaturedPolishes(req, res, next);
    });
  }

  constructor() {
    super();
  }

  private resetDatabase(req: Request, res: Response, next: NextFunction) {
    let service = this.databaseService;
    service.resetDatabase()
      .then(() => {
        console.info('Successfully reset database');
        res.json(this.createResult(true));
      })
      .catch((err) => {
        console.error(err);
        let result = this.createResult(false);
        result.error = err;
        res.json(result);
      });
  }

  private getFeaturedPolishes(req: Request, res: Response, next: NextFunction) {
    let service = this.databaseService;
    service.getPolishes()
      .then((results) => {
        console.info(`Got ${results.length} polishes.`);
        let result = this.createResult(true);
        result.polishes = results;
        res.json(result);
      })
      .catch((err) => {
        console.error(err);
        let result = this.createResult(false);
        result.error = err;
        res.json(result);
      });
  }

  private get databaseService() {
    let database = new DocumentDbService();
    return database;
  }

  private createResult(success: boolean): any {
    let result: any = { };
    result.success = success;
    return result;
  }
}