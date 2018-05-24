import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup } from "@angular/forms";
import { CalculationService } from "../../services/calculation.service";

@Component({
  selector: "consumption-summary",
  templateUrl: "./consumption-summary.component.html",
  styleUrls: ["./consumption-summary.scss"]
})
export class ConsumptionSummaryComponent implements OnInit {
  public summaryForm: FormGroup;

  constructor(private calculationService: CalculationService) {

  }

  public ngOnInit(): void {
    this.summaryForm = new FormGroup({
      calories: new FormControl(),
      protein: new FormControl(),
    });

    this.summaryForm.valueChanges.subscribe(({calories, protein}) => {
      this.calculationService.updateConsumption(calories || 0, protein || 0);
    });
  }
}
