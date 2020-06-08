import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

const defaultHttpOptions = {
    headers: new HttpHeaders(
        {
            'Access-Control-Allow-Origin': '*',
            'Content-type': 'application/json'
        })
};

@Injectable()
export class HttpService {
    host = '';
    constructor(private http: HttpClient) { }

    // tslint:disable-next-line: ban-types
    getData(route: string): Observable<any> {
        return this.http.get<any>(this.host + route, defaultHttpOptions);
    }

    simpleArrayToParams(arr: any[], key: string): string {
        const result = arr.map(x => `${key}=${x}`).join('&');
        return result;
    }
}
