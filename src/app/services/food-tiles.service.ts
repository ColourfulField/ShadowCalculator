import { Injectable } from "@angular/core";
import { FoodTileData } from "../models/models";
import { BehaviorSubject } from "rxjs/BehaviorSubject";

@Injectable()
export class FoodTilesService {
  public foodTiles: BehaviorSubject<FoodTileData[]>;

  private _foodTiles: FoodTileData[] = [];

  constructor() {
    this._foodTiles.push({name: "qwe", maxValue: 1000, amount: 50, caloryValue: 10, proteinValue: 5});
    this._foodTiles.push({name: "qwe2", maxValue: 1000, amount: 50, caloryValue: 10, proteinValue: 15});
    this._foodTiles.push({name: "qwe3", maxValue: 1000, amount: 50, caloryValue: 10, proteinValue: 10});

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
