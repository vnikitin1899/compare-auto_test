import { BaseComponent } from './../base-component';
import { ManufacturersService } from './../../services/manufacturers.service';
import { Manufacturer } from './../../models/manufacturer.model';
import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import * as _ from 'lodash';
import { Many } from 'lodash';

@Component({
  selector: 'app-manufacturers',
  templateUrl: './manufacturers.component.html',
  styleUrls: ['./manufacturers.component.scss']
})
export class ManufacturersComponent extends BaseComponent implements OnInit {
  searchString = '';
  selectedManufacturersIds: number[] = [];
  maxManufacturersCount = 5;
  manufacturers: Manufacturer[] = [];
  sort: Many<boolean | 'asc' | 'desc'>;
  isList = false;
  @Output() manufacturerSelected = new EventEmitter<number[]>();
  @Output() next = new EventEmitter();

  constructor(private readonly service: ManufacturersService) {
    super();
  }

  ngOnInit(): void {
    this.getManufacturers();
  }

  get availableManufacturersCount(): number {
    return this.maxManufacturersCount <= this.manufacturers.length ? this.maxManufacturersCount : this.manufacturers.length;
  }

  getManufacturers() {
    this.subscriptions.push(
      this.service.getManufacturers().subscribe(response => {
        this.manufacturers = response;
      })
    );
  }

  get filteredManufacturers() {
    const filtered = this.manufacturers.filter(x => x.name.toLowerCase().includes(this.searchString.toLowerCase()));
    const result = _.orderBy(filtered, 'name', this.sort);
    return result;
  }

  selectManufacturer(id: number) {
    if (this.selectedManufacturersIds.includes(id)) {
      this.selectedManufacturersIds = this.selectedManufacturersIds.filter(x => x !== id);
    }
    else {
      if (this.availableManufacturersCount - this.selectedManufacturersIds.length) {
        this.selectedManufacturersIds.push(id);
      }
    }
    this.manufacturerSelected.emit(this.selectedManufacturersIds);
  }

  isSelected(id: number) {
    return this.selectedManufacturersIds.includes(id);
  }

  goNext() {
    this.next.emit();
  }
}
