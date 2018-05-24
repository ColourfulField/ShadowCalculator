import { Component, OnInit } from "@angular/core";
import { CalculationService } from "../../services/calculation.service";
import { FoodTileData } from "../../models/models";
import { FoodTilesService } from "../../services/food-tiles.service";

@Component({
  selector: "calculators",
  templateUrl: "./calculators.component.html",
  styleUrls: ["./calculators.component.scss"]
})
export class CalculatorsComponent implements OnInit {
  public foodTiles: FoodTileData[] = [];

  constructor(private calculationService: CalculationService,
              private foodTilesService: FoodTilesService) {
  }

  public ngOnInit(): void {
    this.foodTilesService.foodTiles.subscribe((tiles) => {
      this.foodTiles = tiles;
    });
  }
}
