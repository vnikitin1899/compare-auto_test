import { ModelExtended } from './models/model-extended';
import { ModelsGroup } from './models/models-group.model';
import { Component, ViewChild } from '@angular/core';
import { MatHorizontalStepper } from '@angular/material/stepper';
import { StepperSelectionEvent } from '@angular/cdk/stepper';
import { ModelService } from './services/model.service';
import { BaseComponent } from './components/base-component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent extends BaseComponent {
  selectedManufacturersCount = 0;
  selectedManufacturersIds: number[] = [];
  selectModelData: ModelsGroup[] = [];
  selectedModels: ModelExtended[] = [];

  @ViewChild(MatHorizontalStepper) stepper: MatHorizontalStepper;

  constructor(private readonly modelsService: ModelService) {
    super();
  }

  updateManufacturersCount(count: number) {
    this.selectedManufacturersCount = count;
  }

  next() {
    this.stepper.next();
  }

  onNavigate(event: StepperSelectionEvent) {
    if (event.selectedIndex === 1) {
      this.subscriptions.push(
        this.modelsService.getManufacturers(this.selectedManufacturersIds).subscribe(response => {
          this.selectModelData = response;
        })
      );
    }
  }
}
