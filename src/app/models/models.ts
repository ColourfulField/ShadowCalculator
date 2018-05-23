export interface FoodDetails {

}

export interface FoodTileData{
  name: string;
  value: number;
  maxValue: number;
  caloryValue: number;
  proteinValue: number;
  fatValue: number;
}

export interface ShortFoodDescription {
  name: string;
  group: string;
  id: number;
}

export interface FoodList {
  list: ShortFoodDescription[];
  totalItems: number;
}
