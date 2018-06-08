import { Injectable } from "@angular/core";
import { FoodTileData } from "../models/models";
import { BehaviorSubject } from "rxjs/BehaviorSubject";

@Injectable()
export class FoodTilesService {
  public foodTiles: BehaviorSubject<FoodTileData[]>;

  private _foodTiles: FoodTileData[] = [];

  constructor() {
    this._foodTiles.push({name: "Cheese", maxValue: 100, amount: 50, caloryValue: 100, proteinValue: 3});
    this._foodTiles.push({name: "Milk", maxValue: 100, amount: 50, caloryValue: 150, proteinValue: 10});
    this._foodTiles.push({name: "Meat", maxValue: 100, amount: 50, caloryValue: 200, proteinValue: 5});
    this._foodTiles.push({name: "Cool Meat", maxValue: 100, amount: 50, caloryValue: 300, proteinValue: 9});

    this.foodTiles = new BehaviorSubject<FoodTileData[]>(this._foodTiles);
  }

  public addTile(tile: FoodTileData): void {
    this._foodTiles.push(tile);
    this.foodTiles.next(this._foodTiles);
  }

  public updateTiles(tiles: FoodTileData[]) {
    this._foodTiles = tiles;
    this.foodTiles.next(this._foodTiles);
  }
}

