import {Injectable} from "@angular/core";
import {FoodTilesService} from "./food-tiles.service";
import {CalculationRatio, FoodTileData} from "../models/models";

const MINIMUM_RATIO_INTERVAL = 0.0001;

@Injectable()
export class CalculationService {
  private foodTiles: FoodTileData[];
  private calories: number;
  private proteins: number;

  constructor(private foodTilesService: FoodTilesService) {
    foodTilesService.foodTiles.subscribe((tiles) => {
      this.foodTiles = tiles;
    });
  }

  public updateConsumption(calories: number, protein: number) {
    this.calories = calories;
    this.proteins = protein;
    this.recalculate();
  }

  private recalculate() {
    const cpRatios = this.foodTiles.map((tile: FoodTileData) => tile.caloryValue / tile.proteinValue);
    const calculationRatios = cpRatios.map((value, index) => new CalculationRatio(value, 1));

    const min = calculationRatios.reduce((accumulator, value) => accumulator.cpRatio < value.cpRatio ? accumulator : value);
    const max = calculationRatios.reduce((accumulator, value) => accumulator.cpRatio > value.cpRatio ? accumulator : value);
    if (min.cpRatio >= this.caloryProteinRatio) {
      const resultArray = calculationRatios.map((value) => new CalculationRatio(value.cpRatio, 0));
      resultArray[calculationRatios.indexOf(min)] = min;
      this.updateFoodTiles(resultArray);
      return;
    }
    if (max.cpRatio <= this.caloryProteinRatio) {
      const resultArray = calculationRatios.map((value) => new CalculationRatio(value.cpRatio, 0));
      resultArray[calculationRatios.indexOf(max)] = max;
      this.updateFoodTiles(resultArray);
      return;
    }

    const result = this.getRatios(calculationRatios, 1);
    this.updateFoodTiles(result);

    let average = 0;
    for (const ratio of calculationRatios) {
      average += ratio.ratio;
    }
    console.log(average / calculationRatios.length);
  }

  private getRatios(ratios: CalculationRatio[], iteration: number): CalculationRatio[] {
    if (iteration > 20) {
      return ratios;
    }
    let currentAverageRatio = 0;
    for (const calculationRatio of ratios) {
      currentAverageRatio += calculationRatio.ratio;
    }
    if (Math.abs((currentAverageRatio / ratios.length) - this.caloryProteinRatio) <= MINIMUM_RATIO_INTERVAL) {
      return ratios;
    }

    const lesserRatios = ratios.filter((value) => value.ratio < this.caloryProteinRatio);
    const biggerRatios = ratios.filter((value) => value.ratio > this.caloryProteinRatio);
    let lesserAverage = 0;
    let biggerAverage = 0;

    for (const calculationRatio of lesserRatios) {
      lesserAverage += calculationRatio.ratio;
    }
    lesserAverage /= lesserRatios.length;

    for (const calculationRatio of biggerRatios) {
      biggerAverage += calculationRatio.ratio;
    }
    biggerAverage /= biggerRatios.length

    if (Math.abs(lesserAverage - this.caloryProteinRatio) > Math.abs(biggerAverage - this.caloryProteinRatio)) {
      for (const calculationRatio of lesserRatios) {
        const projectedWeight = this.caloryProteinRatio / calculationRatio.cpRatio;
        calculationRatio.weight = (calculationRatio.weight + projectedWeight) / 2;
      }
    } else {
      for (const calculationRatio of biggerRatios) {
        const projectedWeight = this.caloryProteinRatio / calculationRatio.cpRatio;
        calculationRatio.weight = (calculationRatio.weight + projectedWeight) / 2;
      }
    }

    return this.getRatios(ratios, ++iteration);
  }

  private updateFoodTiles(calculationRatios: CalculationRatio[]) {
    let calories = 0;

    for (let i = 0; i < this.foodTiles.length; i++) {
      calories += calculationRatios[i].weight;
    }

    //calories = this.calories / calories;
    let proteins = this.proteins / calories

    for (let i = 0; i < this.foodTiles.length; i++) {
      const foodTile = this.foodTiles[i];

      foodTile.amount = calculationRatios[i].weight// * proteins / foodTile.proteinValue

      if (foodTile.amount > foodTile.maxValue) {
        foodTile.maxValue = foodTile.amount;
      }
    }

    this.foodTilesService.updateTiles(this.foodTiles);
  }

  private get caloryProteinRatio() {
    return this.calories / this.proteins;
  }
}
