import { Injectable } from '@angular/core';
import { Feedback } from '../shared/feedback';
import { Observable } from 'rxjs/Observable';
import { Http, Response } from '@angular/http';
import { baseURL } from '../shared/baseurl';
import { ProcessHTTPMsgService } from './process-httpmsg.service';
import 'rxjs/add/operator/delay';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/catch';
import { RestangularModule, Restangular } from 'ngx-restangular';

@Injectable()
export class FeedbackService {

    constructor(private restangular: Restangular,
      private ProcessHTTPMsgService: ProcessHTTPMsgService) { }

  submitFeedback(feedback: Feedback) {
      this.restangular.all('feedback').post(feedback)
  }

  getFeedbacks(): Observable<Feedback> {
    return this.restangular.all('feedback').getList();
  }

  getFeedback(email: string): Observable<Feedback> {
    return this.restangular.one('feedback', email).get();
  }
}
