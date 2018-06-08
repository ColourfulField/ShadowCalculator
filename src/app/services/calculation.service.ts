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
    const calculationRatios = cpRatios.map((value, index) => new CalculationRatio(value, 1, this.foodTiles[index].caloryValue, this.foodTiles[index].proteinValue));

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
    if (iteration > 200) {
      return ratios;
    }
    let currentAverageRatio = 0;
    for (const calculationRatio of ratios) {
      currentAverageRatio += calculationRatio.ratio;
    }

    //TODO optimize - no need to recalculate on each step
    const lesserRatios = ratios.filter((value) => value.cpRatio < this.caloryProteinRatio);
    const biggerRatios = ratios.filter((value) => value.cpRatio > this.caloryProteinRatio);
    let lesserImpacts = 0;
    let biggerImpacts = 0;

    for (const calculationRatio of lesserRatios) {
      lesserImpacts += calculationRatio.getImpact(this.caloryProteinRatio);
    }

    for (const calculationRatio of biggerRatios) {
      biggerImpacts += calculationRatio.getImpact(this.caloryProteinRatio);
    }

    if (Math.abs(lesserImpacts - biggerImpacts) <= MINIMUM_RATIO_INTERVAL) {
      return ratios;
    }

    if (lesserImpacts < biggerImpacts) {
      for (const calculationRatio of biggerRatios) {
        const projectedWeight = this.caloryProteinRatio / calculationRatio.cpRatio;
        calculationRatio.weight = (calculationRatio.weight/2)// + projectedWeight) / 2;
      }
    } else {
      for (const calculationRatio of lesserRatios) {
        const projectedWeight = this.caloryProteinRatio / calculationRatio.cpRatio;
        calculationRatio.weight = (calculationRatio.weight/2)//   + projectedWeight) / 2;
      }
    }

    return this.getRatios(ratios, ++iteration);
  }

  private updateFoodTiles(calculationRatios: CalculationRatio[]) {
    let weights = 0;
    let calories = 0;

    for (let i = 0; i < this.foodTiles.length; i++) {
      weights += calculationRatios[i].weight;
      calories += calculationRatios[i].caloryValue;
    }

    let caloryValue = this.calories / calories;

    let  a = this.calories / weights;

    for (let i = 0; i < this.foodTiles.length; i++) {
      const foodTile = this.foodTiles[i];

      foodTile.amount = calculationRatios[i].weight/weights * caloryValue * calculationRatios.length;

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

