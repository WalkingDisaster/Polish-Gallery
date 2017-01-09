import { Injectable } from '@angular/core';
import { Headers, Response, Http } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/toPromise';

import { PolishModel } from 'models/polish';
import { Tag } from 'models/tag';

@Injectable()
export class PolishService {
  private headers = new Headers();

  constructor(private http: Http) {
    this.headers.append('Content-Type', 'application/json');
  }

  initializeDatabase(): Promise<void> {
    this.http.patch('http://localhost:8080/polish/reset', JSON.stringify({}), this.headers)
      .toPromise()
      .then(() => {
        console.log('Database has been reset.');
      })
      .catch(this.handleError);


    return Promise.resolve();
  }

  addPolish(PolishModel): Promise<void> {
    // todo mnm save
    return Promise.resolve();
  }

  getFeaturedPolish(): Observable<PolishModel[]> {
    return this.http.get('http://localhost:8080/polish/featured', this.headers)
      .map((res) => {
        let meh: PolishModel[];
        meh = this.extractDataPolishes(res);
        return meh;
      })
      .catch(this.handleError);
  }

  private extractDataPolishes(res: Response): PolishModel[] {
    let body = res.json();
    return body.polishes;
  }

  private handleError(error: Response | any) {
    // In a real world app, we might use a remote logging infrastructure
    console.error(error);
    let errMsg: string;
    if (error instanceof Response) {
      const body = error.json() || '';
      const err = body.error || JSON.stringify(body);
      errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
    } else {
      errMsg = error.message ? error.message : error.toString();
    }
    return Observable.throw(errMsg);
  }
}
