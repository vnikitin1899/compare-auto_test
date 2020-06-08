import { Model } from './model.model';

export class ModelExtended extends Model {
    manufacturer: string;
    logoSrc: string;

    constructor(model: Model, logoSrc: string, manufacturer: string) {
        super();
        Object.assign(this, {
            manufacturer,
            logoSrc,
            ...model
        });
    }
}
