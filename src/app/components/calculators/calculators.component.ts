import { Component, OnInit } from "@angular/core";
import { CalculationService } from "../../services/calculation.service";
import { FoodTileData } from "../../models/models";

@Component({
  selector: "calculators",
  templateUrl: "./calculators.component.html",
  styleUrls: ["./calculators.component.scss"]
})
export class CalculatorsComponent implements OnInit {
  public foodTiles: FoodTileData[] = [];

  constructor(private calculationService: CalculationService) {
  }

  public ngOnInit(): void {
    this.foodTiles.push({name: "qwe", maxValue: 100, value: 50});
    this.foodTiles.push({name: "qwe2", maxValue: 100, value: 50});
    this.foodTiles.push({name: "qwe3", maxValue: 100, value: 50});
  }
}
