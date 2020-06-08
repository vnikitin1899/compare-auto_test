import { ModelsGroup } from './../models/models-group.model';
import { Model } from './../models/model.model';
import { Manufacturer } from './../models/manufacturer.model';
import { Injectable } from '@angular/core';
import { HttpParams } from '@angular/common/http';
import * as manufacturers from '../../json-data/manufacturers.json';
import * as models from '../../json-data/models.json';

@Injectable({
  providedIn: 'root'
})
export class MockDataService {

  mockRequest(route: string, params: HttpParams) {
    let result;

    if (route === 'manufacturers') {
      result = this.parseManufacturers();
    } else if (route.includes('models?')) {
      result = this.parseModels(route);
    }
    return result;
  }

  parseManufacturers(): Manufacturer[] {
    const result = ((manufacturers as any).default as Manufacturer[]);
    return result;
  }

  parseModels(route: string): ModelsGroup[] {
    const params = route.replace('models?', '').split('&').map(x => parseInt(x.replace('manufacturersIds=', ''), 10));

    const result = ((models as any).default as ModelsGroup[]).filter(x => {
      return params.includes(x.id);
    });

    return result;
  }
}





