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

public caloryValue: number;
  public proteinValue: number;

  get ratio() {
    return this.cpRatio * this.weight;
  }

  constructor(cpRatio: number, ratio: number, caloryValue = 0, proteinValue = 0) {
    this.cpRatio = cpRatio;
    this.weight = ratio;
    this.caloryValue = caloryValue;
    this.proteinValue = proteinValue;
  }

  public getImpact(cpRatio): number {
    return Math.abs(this.proteinDelta(cpRatio));
    //Math.abs(cpRatio - this.cpRatio) * this.weight;
  }

  public proteinDelta(cpRatio: number): number{
    return this.proteinValue * (this.cpRatio - cpRatio) * this.weight;
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
