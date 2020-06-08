import { ModelExtended } from './../../models/model-extended';
import { Model } from './../../models/model.model';
import { BaseComponent } from './../base-component';
import { ModelsGroup } from './../../models/models-group.model';
import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';

@Component({
  selector: 'app-models',
  templateUrl: './models.component.html',
  styleUrls: ['./models.component.scss']
})
export class ModelsComponent extends BaseComponent implements OnInit {
  @Input() data: ModelsGroup[] = [];
  @Output() next = new EventEmitter();
  @Output() modelSelected = new EventEmitter<Model[]>();
  maxSelectionCount = 10;
  selectedModels: ModelExtended[] = [];

  constructor() {
    super();
  }

  ngOnInit(): void {
  }

  get avaliableModelsCount() {
    return this.maxSelectionCount - this.data.length > this.totalModelsCount
      ? this.totalModelsCount - this.selectedModels.length
      : this.maxSelectionCount - this.data.length - this.selectedModels.length;
  }

  get totalModelsCount() {
    let result = 0;
    this.data.forEach(x => result += x.models.length);
    return result;
  }

  goNext() {
    this.next.emit();
  }

  isSelected(id: number) {
    return this.selectedModels.filter(x => x.id === id).length;
  }

  selectModel(item: Model, group: ModelsGroup) {
    if (this.isSelected(item.id)) {
      this.selectedModels = this.selectedModels.filter(x => x.id !== item.id);
    }
    else {
      if (this.avaliableModelsCount) {
        this.selectedModels.push(new ModelExtended(item, group.logoSrc, group.name));
      }
    }
    this.modelSelected.emit(this.selectedModels);
  }

  selectedCountInGroup(models: Model[]): number {
    let count = 0;
    models.forEach(x => {
      count += this.isSelected(x.id) ? 1 : 0;
    });
    return count;
  }

  availableModelsCountForGroup(models: Model[]): number {
    const count = models.length - this.selectedCountInGroup(models) > this.avaliableModelsCount
      ? this.avaliableModelsCount
      : models.length - this.selectedCountInGroup(models);

    return count;
  }
}
