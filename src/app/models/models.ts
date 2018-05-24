export interface FoodDetails {
  name?: string;
  amount?: number;
  maxValue?: number;
  caloryValue?: number;
  proteinValue?: number;
  fatValue?: number;

  caloryProteinRatio: number;
}

export interface FoodTileData {
  name?: string;
  amount?: number;
  maxValue?: number;
  caloryValue?: number;
  proteinValue?: number;
  fatValue?: number;
}

export class CalculationRatio {
  public cpRatio: number;
  public weight: number;

  get ratio() {
    return this.cpRatio * this.weight;
  }

  constructor(cpRatio: number, ratio: number) {
    this.cpRatio = cpRatio;
    this.weight = ratio;
  }
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
