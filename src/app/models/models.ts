export interface FoodDetails {

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
