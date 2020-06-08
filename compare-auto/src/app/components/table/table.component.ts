import { ModelExtended } from './../../models/model-extended';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit {
  @Input() data: ModelExtended[] = [];

  constructor() { }

  ngOnInit(): void {
  }

}
