import { HttpEvent, HttpInterceptor, HttpRequest, HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Injectable } from '@angular/core';
import { MockDataService } from './mock-data.service';

@Injectable()
export class RequestInterceptor implements HttpInterceptor {
    constructor(private readonly dataService: MockDataService) {}

    intercept(request: HttpRequest<any>): Observable<HttpEvent<any>> {
        const result = this.dataService.mockRequest(request.url, request.params);
        return of(new HttpResponse({ status: 200, body: result }));
    }
}
