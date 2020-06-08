import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpService } from './http.service';
import { ModelsGroup } from '../models/models-group.model';

@Injectable({
    providedIn: 'root'
})
export class ModelService {
    constructor(private http: HttpService) {}
    // tslint:disable-next-line: ban-types
    getManufacturers(manufacturersIds: number[]): Observable<ModelsGroup[]> {
        const params = this.http.simpleArrayToParams(manufacturersIds, 'manufacturersIds');
        return this.http.getData(`models?${params}`);
    }
}
