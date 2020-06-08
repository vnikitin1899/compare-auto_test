import { Manufacturer } from './../models/manufacturer.model';
import { HttpService } from './http.service';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class ManufacturersService {
    constructor(private http: HttpService) {}

    // tslint:disable-next-line: ban-types
    getManufacturers(): Observable<Manufacturer[]> {
        return this.http.getData(`manufacturers`);
    }
}
