import { Component, Input } from "@angular/core";
import { CalculationService } from "../../services/calculation.service";
import { FoodTileData } from "../../models/models";

@Component({
  selector: "food-tile",
  templateUrl: "./food-tile.component.html",
  styleUrls: ["./food-tile.component.scss"]

})
export class FoodTileComponent implements onInit {
  @Input() public tileData: FoodTileData;
  public sliderValue = 50;

  constructor(private calculationService: CalculationService) {
  }

  public ngOnInit(): void {
    this.sliderValue = this.tileData.value;
  }

  public updateValue(newValue: number): void {
    this.sliderValue = newValue;
  }
}
